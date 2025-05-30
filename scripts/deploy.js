import { execa } from 'execa';
import fs from 'fs';

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        console.log("Building...");
        await execa("npm", ["run", "build"]);
        const folderName = "dist";

        const indexHtmlContent = fs.readFileSync(`${folderName}/index.html`, 'utf8');
        fs.writeFileSync(`${folderName}/404.html`, indexHtmlContent);

        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]); 

        if (process.platform === "win32") {
            console.log("removing dist on windows OS");
            await execa("cmd", ["/c", "rmdir", "/s", "/q", folderName]);
        } else {
            console.log("removing dist on linux OS");
            await execa("rm", ["-r", folderName]);
        }

        await execa("git", ["checkout", "-f", "main"]);
        await execa("git", ["branch", "-D", "gh-pages"]);
        console.log("Successfully deployed");
    } catch (e) {
        console.log(e.message);       
        process.exit(1); /*global process*/
    }
})();
