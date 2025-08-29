## Technology Stack Summary

- **Framework:** **Svelte** and **SvelteKit**. This is an excellent choice. Svelte's compiler-based approach will result in a very fast and lightweight app. SvelteKit will be useful for managing different pages, like the main editor and the "My Haikus" view.
    
- **Syllable & Synonym Data:** The implementation will be decided during development, with a **strong preference for offline libraries** over APIs to ensure speed and reduce external dependencies.
    
    - **Options to Evaluate:** JavaScript libraries (e.g., `syllable.js`, word-thesaurus libraries) vs. a comprehensive API (e.g., Datamuse).
        

---

## Phase 1: The Core Haiku Workbench (MVP)

This phase focuses on creating a complete, standalone tool for writing haikus.

#### **Project Setup & Foundation**

- [ ] **Initialize Project:** Set up the `haiku-scribe` Git repository and initialize a new SvelteKit project.
    
- [ ] **Component Scaffolding:** Create placeholder Svelte components for `Editor.svelte`, `WordAssistant.svelte`, and `HaikuList.svelte`.
    
- [ ] **Routing:** Set up two basic routes using SvelteKit: one for the main editor (`/`) and one for the saved haikus page (`/my-haikus`).
    
- [ ] **Initial Styling:** Implement a basic, clean, and responsive CSS structure for mobile and desktop views.
    

#### **Core Editor & Syllable Logic**

- [ ] **Build Editor UI:** Create the three-line text input interface.
    
- [ ] **Research & Implement Syllable Counting:**
    
    - Evaluate options for American English syllable counting.
        
    - Prioritize a lightweight, offline JavaScript library.
        
    - Implement the chosen solution to count syllables in real-time as the user types.
        
- [ ] **Implement Color-Blind Friendly Feedback:**
    
    - Display the live syllable count next to each line.
        
    - Dynamically style each line based on the syllable count:
        
        - **Under count:** Light gray
            
        - **Correct count:** A pleasant, calm blue
            
        - **Over count:** A subtle, non-jarring red
            
- [ ] **Research & Implement Synonym Lookup:**
    
    - Evaluate options for an offline synonym dictionary/library.
        
    - If no suitable library exists, plan for using a free API as a fallback.
        
- [ ] **Build Word Assistant:**
    
    - Create the UI panel that appears when a word is clicked.
        
    - Integrate the synonym lookup to populate the panel with suggestions and their syllable counts.
        

#### **Haiku Management**

- [ ] **Implement Local Storage:** Create utility functions to save to and load from the browser's local storage. Implement auto-saving for the current draft.
    
- [ ] **Build "My Haikus" Page:** Design the page to display a list of saved haikus, each showing its text and creation date.
    
- [ ] **Add Management Functions:** Implement the "Save," "Load to Editor," "Copy to Clipboard," and "Delete" functionalities for saved haikus.
    

---

## Phase 2: The AI-Powered Poet

This phase enhances the core tool with AI-driven creative assistance.

- [ ] **Select AI Provider & Set Up:**
    
    - Choose an AI provider (e.g., Google AI, OpenAI).
        
    - Implement a secure client-side setup for the API key and create a simple API service wrapper.
        
- [ ] **Text-to-Haiku Feature:**
    
    - Design and build the UI component with a large text area for user input and a button to trigger generation.
        
    - Develop a clear and effective prompt to send to the AI, instructing it to summarize the input text into a 5-7-5 haiku.
        
    - Display the generated haiku and handle loading/error states gracefully.
        
- [ ] **"Stuck?" (Line Completion) Feature:**
    
    - Add a "Stuck?" button to the main editor UI.
        
    - Develop a prompt that sends the existing line(s) to the AI and asks for suggestions to complete the current line within the syllable limit.
        
    - Display the AI's suggestions to the user in a non-intrusive way (e.g., a small pop-up or in the assistant panel).
        

---

## Phase 3: Flair & Fun

This final phase is about adding personality and delight to the finished application.

- [ ] **Design Easter Egg Triggers:** Decide how users will activate the easter eggs. For example, typing "10001" or "0x11" directly into a haiku line.
    
- [ ] **Implement Visual Easter Egg:** Create a fun, subtle visual effect when an easter egg is triggered. This could be a brief color shift, a shower of confetti, or a simple animation.
    
- [ ] **Implement Console Easter Egg:** Add a creative message that logs to the browser's developer console, rewarding curious users who look under the hood. For example: `console.log("Haiku Scribe // 10001 // 0x11");`