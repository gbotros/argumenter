<template>
  <section class="max-w-3xl mx-auto p-8 ">
    <!-- <h1 class="text-4xl font-extrabold mb-4 text-blue-400 flex items-center gap-2">
      Argumenter
    </h1> -->
    <div class="mb-6">
      <!-- <img src="/public/help-hero-placeholder.png" alt="App Hero" class="w-full h-48 object-cover rounded mb-4 border-2 border-blue-700" /> -->
      <h2 class="text-2xl font-bold text-green-400 mb-2">Argumenter</h2>
      <ul id="about-argumenter" class="mb-2 list-disc pl-6">
        <li class="mb-1">
          Makes it easy to share feedback✍️, ask questions❓, or add notes on any video📺,
          presentation, or topic.
        </li>
        <li class="mb-1">
          Add your thoughts or questions exactly when the presenter is making a point ⏱️, so your
          feedback is always clear and in context🎯.
        </li>
        <li class="mb-1">
          Turn lectures and arguments into interactive discussions💬: add your own comments, start a
          conversation, or just keep organized notes for yourself🗣️.
        </li>
        <li class="mb-1">
          Use timelines to keep debates🤯, responses, and ideas💡 in order, and bring together info
          from different sources🗂️ or videos.
        </li>
        <li class="mb-1">
          Great for learning, teaching🧑‍🏫, or just making sure everyone’s on the same page. Whether
          you’re working alone or with others, it’s a simple way to keep your ideas clear and
          connected🤝.
        </li>
      </ul>
    </div>

    <h2 class="text-2xl font-bold text-green-400 mb-2">Features</h2>
    <ul class="list-disc pl-6 mb-6">
      <li>
        <span class="font-semibold text-blue-300">No Account Required:</span> No account or login
        needed—everything works offline using JSON files or instantly with sharable links. 🔒
      </li>
      <li>
        <span class="font-semibold text-blue-300">Sharable Links:</span> Sharable links🔗 let you
        send your timeline to anyone: the link contains all the timeline data, so others can open
        and view your argument or notes right away.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Timeline Editor:</span> Add, edit, and reorder
        argument segments using a drag-and-drop interface.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Segment Types:</span> Supports text, video, and
        for comprehensive argument representation.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Player Mode:</span>
        Watch and follow someone else's argument timeline or test your own by viewing the argument
        step by step, just like a presentation.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Import/Export:</span> Save timelines as JSON files
        or import existing ones.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Demo Data:</span> Access built-in demo arguments
        for quick learning and testing.
      </li>
      <li>
        <span class="font-semibold text-blue-300">Dark Theme:</span> Minimalist dark interface for
        comfortable viewing.
      </li>
    </ul>

    <h2 class="text-2xl font-bold text-green-400 mb-2">How to Use</h2>
    <ol class="list-decimal pl-6 mb-6">
      <li class="mb-4">
        <span class="font-semibold">Open the Player:</span> Click
        <span class="px-2 py-1 rounded">🎬 Open the player</span> in the header to view and follow
        an argument timeline step by step.
      </li>

      <li class="mb-4">
        <span class="font-semibold">Open the Editor:</span> Click
        <span class="px-2 py-1 rounded">📝 Open the editor</span> in the header to begin editing a
        timeline.
      </li>

      <li class="mb-4">
        <span class="font-semibold">Add Segments:</span> Use the
        <span class="bg-green-800 px-2 py-1 rounded">+ Add Segment</span> button to add new argument
        segments.
      </li>
      <li class="mb-4">
        <span class="font-semibold">Edit & Organize:</span> Click on segments to edit their content,
        drag to reorder, and use stance buttons to set positions.
      </li>
      <li class="mb-4">
        <span class="font-semibold">Play Timeline:</span> Click
        <span class="bg-blue-800 px-2 py-1 rounded">▶️ Play</span> to preview the argument timeline.
      </li>
      <li class="mb-4">
        <span class="font-semibold">Share or Export:</span> Use the
        <span class="bg-purple-800 px-2 py-1 rounded">📤 Export</span> or
        <span class="bg-green-800 px-2 py-1 rounded">🔗 Copy Link</span> buttons to export or share
        your timeline.
      </li>
    </ol>

    <h2 class="text-2xl font-bold text-green-400 mb-2">Best Practices</h2>
    <ul class="list-disc pl-6 mb-6">
      <li>Use clear and concise segment titles and content for better understanding.</li>
      <li>Utilize demo data to familiarize yourself with the application's features.</li>
      <li>Export your work regularly to prevent data loss.</li>
      <li>
        <span class="text-yellow-400"
          >Note: Argumenter does not store your data—it's your responsibility to save and version
          your argument files as needed.</span
        >
      </li>
    </ul>
  </section>

  <!-- Developer Section -->
  <section class="max-w-3xl mx-auto p-8 mt-8 bg-zinc-800 rounded-lg shadow text-white">
    <h2 class="text-2xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
      <span>👩‍💻</span> Are You a Developer?
    </h2>
    <p class="mb-3">Interested in contributing, customizing, Here’s what you need to know:</p>
    <ul class="list-disc pl-6 mb-4">
      <li class="mb-2">
        Contributions and suggestions are welcome!
        <a
          href="https://github.com/gbotros/argumenter"
          target="_blank"
          class="underline text-blue-400 hover:text-blue-200"
          >Argumenter on github.</a
        >
      </li>
      <li class="mb-2">
        Built with <span class="font-semibold text-blue-300">Vue 3</span>,
        <span class="font-semibold text-blue-300">TypeScript</span>,
        <span class="font-semibold text-blue-300">Tailwind CSS</span>.
      </li>
      <li class="mb-2">Organized by feature for clarity and maintainability.</li>
      <li class="mb-2">Feel free to fork, star, or open issues on GitHub!</li>
      <li class="mb-2">
        Built with help from 🤖Copilot.
        <a
          href="https://github.com/gbotros/argumenter/blob/main/.github/copilot-instructions.md"
          target="_blank"
          class="underline text-blue-400 hover:text-blue-200"
          >See Copilot instructions</a
        >.
      </li>
    </ul>
    <p class="text-blue-300">Happy coding! 🚀</p>
  </section>

  <div class="text-center mt-8">
    <a href="#top" class="text-blue-400 underline hover:text-blue-200">Back to Top ↑</a>
  </div>

</template>

<script setup lang="ts">
// No logic needed for static help page
</script>

<style scoped lang="scss">
/* Add any extra custom styles here if needed */
</style>
