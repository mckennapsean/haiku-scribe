### **Design & Requirements: Haiku Save/Clear Interaction**

**Version:** 1.0
**Date:** September 3, 2025
**Feature Owner:** [Your Name/Team]

---

#### **1. Objective**

To design and implement an intuitive, delightful, and platform-aware user interaction for saving and clearing haikus. The system should feel fluid on touch-based devices while remaining fully functional and accessible on traditional desktop environments.

#### **2. Core Design Principles**

* **Intuitive & Discoverable:** Interactions should feel natural and require minimal learning. Gestures are prioritized for a modern feel.
* **Delightful & Engaging:** The experience should be enhanced with subtle animations, visual feedback, and optional sound to make the simple actions of saving and clearing feel satisfying.
* **Forgiving & Intentional:** Deleting content should require more deliberate effort than saving it to prevent accidental data loss.
* **Platform-Aware:** The UI should intelligently adapt, presenting the optimal interaction model for both touch-screen and mouse/keyboard users.

#### **3. Primary Interaction Model: Card Drag/Swipe Gesture**

This model will serve as the primary interaction on both touch devices and mouse-enabled desktops. Each haiku is presented as a distinct card that can be manipulated.

**3.1. Save Action (Drag/Swipe Right)**

* **Gesture:** The user clicks/taps and drags the haiku card to the right.
* **Activation Threshold:** The action is primed when the card is dragged more than **30%** of its own width to the right.
* **Visual Feedback During Drag:**
    * A "Save" icon (e.g., a heart, bookmark, or checkmark) and/or a subtle green background layer are revealed underneath the card on the left side.
    * The card's opacity may decrease slightly as it is dragged.
* **Confirmation Feedback on Release:**
    * **Animation:** The card smoothly animates off-screen to the right.
    * **Sound (Optional):** A positive, gentle "whoosh" or "chime" sound effect plays.
    * **Haptics (Mobile-only):** A single, light haptic tap is triggered.
    * **UI Update:** A temporary toast notification "Haiku saved!" may appear for first-time users.

**3.2. Clear/Delete Action (Drag/Swipe Left)**

This interaction is intentionally designed with more "friction" to prevent accidental clearing.

* **Gesture:** The user clicks/taps and drags the haiku card to the left.
* **Activation Threshold:** The action requires a more significant drag, priming only after moving more than **60%** of the card's width to the left.
* **Visual Feedback & Friction During Drag:**
    * **Visual Cue:** A "Clear" icon (e.g., a trash can) and/or a subtle red background layer are revealed underneath the card on the right side.
    * **Warning Gradient:** As the card approaches the activation threshold, the red background layer intensifies in color, signaling imminent deletion.
    * **Physicality Animation:** As the user drags the card left, it will visually scale down slightly (e.g., to 95% of its original size), creating a feeling of resistance. If the user releases the card before the threshold, it snaps back to its original position and size.
* **Confirmation Feedback on Release:**
    * **Animation:** The card smoothly animates off-screen to the left.
    * **Sound (Optional):** A distinct "crumple" or lower-toned "swoosh" sound effect plays.
    * **Haptics (Mobile-only):** A more insistent double-tap haptic feedback is triggered.

#### **4. Fallback Interaction Model: On-Card Buttons**

To ensure accessibility and usability on all platforms, explicit buttons will be provided.

* **Context-Aware Visibility:**
    * **Desktop (Non-touch):** The "Save" and "Clear" icon buttons are persistently visible on the haiku card (e.g., in the top-right corner) or appear on hover.
    * **Mobile/Touch:** The buttons are hidden by default to maintain a clean UI and prioritize the swipe gesture. They could optionally be revealed with a long-press or tap gesture if needed for accessibility.
* **Button Actions:**
    * **Save Button:** A single click/tap instantly triggers the Save action, complete with the confirmation animation and feedback described in section 3.1.
    * **Clear Button:** A single click/tap triggers a confirmation dialog (`"Are you sure you want to clear this haiku? This cannot be undone."`) before proceeding with the deletion.

#### **5. Technical Implementation Plan (Proof-of-Concept)**

* **Framework:** Svelte & SvelteKit.
* **Gestures:** Implement gesture logic using native mouse (`mousedown`, `mousemove`, `mouseup`) and touch (`touchstart`, `touchmove`, `touchend`) events to calculate drag distance and direction.
* **Animations:**
    * **Initial PoC:** Use simple CSS `transform: translateX()` and `transition` properties for the card movement and scaling ("shrinking") effect. This is lightweight and performant.
    * **Future Enhancement:** For more complex, physics-based animations (e.g., the "snap back" effect), consider integrating a library like GreenSock Animation Platform (GSAP).
* **Platform Detection:** Use a simple JavaScript check (e.g., `'ontouchstart' in window`) to differentiate between touch and non-touch environments to toggle the visibility of the on-card buttons.

***