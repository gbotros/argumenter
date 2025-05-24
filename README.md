# Interactive YouTube Video Player with Timeline Annotations

## Overview

This app is an interactive YouTube video player with a smart timeline. The timeline is made up of segments, each representing either a video clip or a text annotation. Users can easily jump between segments, see their progress, and understand the context of each part of the video.

## Key Features

- **Timeline Visualization:**

  - The timeline is shown as a line with dots for each segment.
  - **Visited segments:** Green dots
  - **Unvisited segments:** Gray dots
  - **Active segment:** Blue, larger dot
  - Hovering over a dot shows a description of the segment.
  - Clicking a dot jumps to that segment.
  - Next and Back buttons let users move through segments in order.

- **Segment Types:**

  - **TextualSegment:** Shows text for a set duration. Users see a countdown timer and can skip ahead with a button.
  - **VideoSegment:** Plays a specific part of a YouTube video (from `startAt` to `endAt`).

- **Stance Highlighting:**

  - Each segment can be marked as `main`, `supporting`, or `against`.
  - The video player border changes color based on the active segment's stance:
    - **main:** Dark green
    - **supporting:** Light green
    - **against:** Red

- **Type Safety & Modern Stack:**

  - Built with Vue 3, TypeScript, and SCSS.
  - All code is strongly typed and follows strict linting and formatting rules.
  - Minimalist dark theme for all UI components.

- **No Backend Required:**
  - All timeline data is loaded from a local JSON file in the SPA. No backend or API calls are needed.

## Folder Structure

- `components/` — Vue 3 components (Composition API, `<script setup>`)
- `data/` — Application-level data logic
- `types/` — Global type definitions
- `tests/` — Unit and integration tests
- Files are organized by feature for clarity and maintainability.

## Data Model

- `Segment` (abstract): Base class with `id`, `type`, `stance`, and `description`.
- `TextualSegment`: Adds `content` and `duration` (seconds).
- `VideoSegment`: Adds `videoId`, `startAt`, and `endAt` (seconds).
- `Timeline`: Manages segments, tracks the active and visited segments, and provides methods to activate segments by id or index.

## How It Works

1. **Add Segments:** Use the `Timeline` class to add `TextualSegment` and `VideoSegment` objects.
2. **Activate Segments:** Activate a segment by id or index. The timeline updates the active and visited segments.
3. **UI Integration:**
   - The timeline is rendered as a line of dots.
   - Dots are colored and sized based on their state (visited, unvisited, active).
   - Hovering over a dot shows the segment's description.
   - Next and Back buttons allow easy navigation.
   - The player border color reflects the stance of the active segment.

## Example Usage

```ts
const timeline = new Timeline([]);
timeline.addSegment(
  new TextualSegment(1, "main", "Introduction", 10, "Intro text")
);
timeline.addSegment(
  new VideoSegment(2, 30, 60, "supporting", "abc123", "Key argument")
);
timeline.activateSegmentById(1); // Activates the first segment
```

## Development

- **Tech Stack:** Vue 3, TypeScript, SCSS
- **Linting & Formatting:** Enforced by ESLint and Prettier
- **Testing:** All logic-heavy components have tests in `tests/`
