# Ethnography Report: Real-World vs. Digital Drawing
Prepared by: Muhammad Bilal Shahid (Seat No: B23110006091)

### Introduction
As illustrated in **Figure 5.1 of the Interaction Design Process**, Ethnography falls under the Phase 2 Analysis block. Before moving to Design and Implementation, we must observe how users currently work in their natural environment to inform our system's behavior. 

### Observation of Physical Drawing Behaviors
When observing users sketching with physical mediums (pen, paper, rulers), the workflow is highly linear and unforgiving. If a user draws a complex polygonal shape and makes an error on a specific corner, their physical options are heavily constrained:
1. Use a physical eraser, which causes area-of-effect damage, often smudging the paper or removing adjacent correct lines.
2. Discard the paper entirely and start over (high cognitive and physical cost).
3. Draw heavily over the mistake, leading to visual clutter.

Because physical "lines" are fixed marks, users must mentally plan extensively before executing to avoid permanent errors.

### Implications for the Polyline Editor's Design
A digital drawing program must alleviate the anxiety of permanence found in physical sketching. By analyzing the user's natural workflow, we determine that our digital editor should treat lines not as static pixels, but as a fluid array of coordinate data. 

**Behavioral Translations for the System:**
* **Targeted Erasure (The 'd' key):** Instead of a physical eraser that relies on friction, the system mathematically targets *only* the specific vertex the user wants gone, automatically bridging the gap. This directly solves the area-of-effect problem observed in physical drawing.
* **Liquid Adjustment (The 'm' key):** In real life, moving a point requires complete erasure and redrawing. By allowing the user to "grab" a vertex and drag it to a new $(x,y)$ coordinate, the program dynamically stretches the connected lines in real-time. 

**Conclusion:**
Following the interaction design process, this ethnography confirms that the Polyline Editor should behave less like drawing with physical ink, and more like pinning elastic bands to a board. This prioritizes rapid iteration, enabling the Design phase to focus on fluidity and error recovery.