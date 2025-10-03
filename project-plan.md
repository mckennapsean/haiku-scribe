## Technology Stack Summary

- **Framework:** **Svelte** and **SvelteKit**. This is an excellent choice. Svelte's compiler-based approach will result in a very fast and lightweight app. SvelteKit will be useful for managing different pages, like the main editor and the "My Haikus" view.

- **Syllable & Synonym Data:** The implementation will be decided during development, with a **strong preference for offline libraries** over APIs to ensure speed and reduce external dependencies.

    - **Options to Evaluate:** JavaScript libraries (e.g., `syllable.js`, word-thesaurus libraries) vs. a comprehensive API (e.g., Datamuse).

---

## Instructions

While working on this project plan, continue down the phases and work on
each task one at a time. Ask questions to clarify anything that is unclear
or could use more detail. Once done, check off the task and commmit the changes.

---

## Phase 1: The Core Haiku Workbench (MVP)

This phase focuses on creating a complete, standalone tool for writing haikus.

#### **Project Setup & Foundation**

- [x] **Initialize Project:** Set up the `haiku-scribe` Git repository and initialize a new SvelteKit project.

- [x] **Component Scaffolding:** Create placeholder Svelte components for `Editor.svelte`, `WordAssistant.svelte`, and `HaikuList.svelte`.

- [x] **Routing:** Set up two basic routes using SvelteKit: one for the main editor (`/`) and one for the saved haikus page (`/my-haikus`).

- [x] **Initial Styling:** Implement a basic, clean, and responsive CSS structure for mobile and desktop views.


#### **Core Editor & Syllable Logic**

- [x] **Build Editor UI:** Create the three-line text input interface.

- [x] **Research & Implement Syllable Counting:**

    - Evaluate options for American English syllable counting.

    - Prioritize a lightweight, offline JavaScript library.

    - Implement the chosen solution to count syllables in real-time as the user types.

- [x] **Implement Color-Blind Friendly Feedback:**

    - Display the live syllable count next to each line.

    - Dynamically style each line based on the syllable count:

        - **Under count:** Light gray

        - **Correct count:** A pleasant, calm blue

        - **Over count:** A subtle, non-jarring red

- [x] **Research & Implement Synonym Lookup:**

    - Evaluate options for an offline synonym dictionary/library.

    - If no suitable library exists, plan for using a free API as a fallback.

- [x] **Build Word Assistant:**

    - Create the UI panel that appears when a word is clicked.

    - Integrate the synonym lookup to populate the panel with suggestions and their syllable counts.


#### **Haiku Management**

- [x] **Implement Local Storage:** Create utility functions to save to and load from the browser's local storage. Implement auto-saving for the current draft.

- [x] **Build "My Haikus" Page:** Design the page to display a list of saved haikus, each showing its text and creation date.

- [x] **Add Management Functions:** Implement the "Save," "Load to Editor," "Copy to Clipboard," and "Delete" functionalities for saved haikus.

- [x] **Delete and save Haikus seamlessly:** see the design doc: `create-delete-design-doc.md` to build this feature to replace other methods for delete/save.i

---

## Phase 2: The AI-Powered Poet (DEFERRED)

**Reasoning:** To accelerate the launch of the core Haiku Workbench (Phase 1), the AI features are being deferred. The core AI functionality (prompt engineering and testing) will be explored separately using the Gemini web CLI, which avoids the need to wire up and secure API keys in the application for the initial release.

**Feature Ideas (for future implementation):**
- **Text-to-Haiku:** Summarize user input text into a 5-7-5 haiku.
- **"Stuck?" (Line Completion):** Suggest completions for the current line within the syllable limit.

---

## Phase 3: Flair & Fun

This final phase is about adding personality and delight to the finished application.

#### Editor Polish

- [x] **Drag/Swipe Usability:** Increase the draggable area and card width for better usability, and add whitespace around the haiku lines to make them easier to grab.
- [x] **Syllable Counter Update:** Update the syllable counter to display the target count (e.g., "0 / 5") and remove the target count from the placeholder text.
- [x] **Placeholder Text Cleanup:** Simplify placeholder text (e.g., remove "First/Second/Third line" and "syllables" count).
- [x] **Textarea Styling:** Remove the resize handle from textareas and style them to blend better with the card background.
- [ ] **Completion Feedback:** Add visual feedback (e.g., a color change or icon) to the card when the haiku is complete (5-7-5).
- [ ] **Initial Focus:** Ensure the first line's textarea is focused on page load, with the caret at the end of any existing draft text.
- [ ] **Save Validation:** Implement logic to prevent saving empty haikus and optionally warn the user if the haiku is incomplete (not 5-7-5).

- [ ] **Design Easter Egg Triggers:** Decide how users will activate the easter eggs. For example, typing "10001" or "0x11" directly into a haiku line.

- [ ] **Implement Visual Easter Egg:** Create a fun, subtle visual effect when an easter egg is triggered. This could be a brief color shift, a shower of confetti, or a simple animation.

- [ ] **Implement Console Easter Egg:** Add a creative message that logs to the browser's developer console, rewarding curious users who look under the hood. For example: `console.log("Haiku Scribe // 10001 // 0x11");`


---

## Phase 4: Polish & Refinement

This phase focuses on refining the project's identity, user experience, and cleaning up remaining boilerplate.

#### **Branding and Identity**

- [ ] **Update README.md:** Describe what Haiku Scribe is, its features, and why someone would want to use it.
- [ ] **Update Page Title & Favicon:** Change the HTML page title to "Haiku Scribe" and replace the default Svelte logo with a custom one (placeholder initially, then custom asset).

#### **Application Layout and Navigation**

- [ ] **Create a Shared Header:** Add a persistent header to the application in `src/routes/+layout.svelte`. This header should contain the application's name and clear navigation links to switch between the "Editor" (/) and "My Haikus" (/my-haikus) pages.
- [ ] **Add a Footer:** Implement a simple footer for the application.

#### **Code and Comment Cleanup**

- [ ] **Remove Boilerplate Comments:** Clean up boilerplate comments in files like `src/lib/index.ts` and `app.d.ts`.