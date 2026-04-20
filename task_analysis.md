# Phase 2 Documentation: Task Analysis
Prepared by: Muhammad Bilal Shahid (Seat No: B23110006091)

### Overview
In accordance with **Figure 5.1 (Bird’s-eye view of the interaction design process)**, Phase 2 (Analysis) serves to translate the raw requirements ("What is wanted") into a concrete understanding of user behavior before Design begins. This document breaks down the exact steps a user takes to achieve their goals within the Polyline Editor.

### 1. Creating a New Polyline (Begin)
* **Goal:** Start drawing a fresh shape.
* **Step 1:** User conceptualizes the starting point.
* **Step 2:** User positions the mouse cursor at the desired $(x,y)$ coordinate on the canvas.
* **Step 3:** User presses the 'b' key on the keyboard.
* **Step 4:** System registers the coordinate and initializes a new polyline in the first available array slot.

### 2. Modifying a Vertex (Move)
* **Goal:** Adjust a mistakenly placed point.
* **Step 1:** User identifies a vertex that needs repositioning.
* **Step 2:** User moves the mouse cursor near the target vertex.
* **Step 3:** User presses the 'm' key.
* **Step 4:** System calculates Euclidean distance to find and highlight the closest vertex.
* **Step 5:** User moves the mouse to the new desired $(x,y)$ coordinate.
* **Step 6:** User clicks the mouse button to confirm the new location.

### 3. Removing a Vertex (Delete)
* **Goal:** Erase a specific point without deleting the whole shape.
* **Step 1:** User identifies an erroneous point.
* **Step 2:** User hovers the mouse cursor close to the target point.
* **Step 3:** User presses the 'd' key.
* **Step 4:** System calculates Euclidean distance to locate the nearest vertex.
* **Step 5:** System removes the point, erases the connecting segments, and joins the $n-1$ and $n+1$ vertices.

### 4. Clearing the Screen (Refresh)
* **Goal:** Start completely over or clean up visual glitches.
* **Step 1:** User presses the 'r' key.
* **Step 2:** System erases the entire canvas and redraws all active polylines from memory.

### 5. Exiting the Program (Quit)
* **Goal:** End the drawing session.
* **Step 1:** User presses the 'q' key.
* **Step 2:** System terminates the application process.