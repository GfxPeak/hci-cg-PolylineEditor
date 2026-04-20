const canvas = document.getElementById('polylineCanvas');
const ctx = canvas.getContext('2d');

// Try to grab the status element from the DOM (Based on Student C's Mockup)
// Note: Ensure your HTML has an element with id="currentStatus"
const statusDisplay = document.getElementById('currentStatus');

// Set actual internal canvas resolution to match its display size
canvas.width = canvas.offsetWidth || 800;
canvas.height = canvas.offsetHeight || 500;

// Application State
let polylines = []; 
let currentPolyline = null;
let mode = 'idle'; // Matches Dialog Notation initial state
let selectedPoint = null;
let mousePos = { x: 0, y: 0 };

/**
 * Centralized State Manager
 * Updates the internal mode, the UI text, and the cursor style
 */
function setMode(newMode, uiText) {
    mode = newMode;
    
    // 1. Update the UI Text (Mockup requirement)
    if (statusDisplay) {
        statusDisplay.innerHTML = `Current Mode: <strong>${uiText}</strong>`;
    }

    // 2. Update Visual Feedback (Cursor)
    switch(newMode) {
        case 'drawing':
            canvas.style.cursor = 'crosshair';
            break;
        case 'moving_start':
            canvas.style.cursor = 'grab';
            break;
        case 'moving_active':
            canvas.style.cursor = 'grabbing';
            break;
        case 'deleting':
            canvas.style.cursor = 'crosshair'; // Or 'not-allowed'
            break;
        default:
            canvas.style.cursor = 'default';
            break;
    }
}

// Initialize default state
setMode('idle', 'Idle');

// Find distance for 'm' and 'd' logic (Euclidean Distance)
const getDist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);

function findClosest(x, y) {
    let closest = null;
    let min = 15; // Selection sensitivity radius
    polylines.forEach((line, lIdx) => {
        line.forEach((pt, pIdx) => {
            let d = getDist(x, y, pt.x, pt.y);
            if (d < min) { 
                min = d; 
                closest = { lIdx, pIdx }; 
            }
        });
    });
    return closest;
}

// Render loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all completed/active polylines
    polylines.forEach(line => {
        if (line.length < 1) return;
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        line.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = '#2563eb'; // Primary color matching typical UI
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw vertex dots
        line.forEach((pt, pIdx) => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            
            // Highlight selected point if moving
            if (mode === 'moving_active' && selectedPoint && 
                selectedPoint.lIdx === polylines.indexOf(line) && 
                selectedPoint.pIdx === pIdx) {
                ctx.fillStyle = '#ef4444'; // Red highlight for active point
                ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2); // Make it slightly larger
            }
            
            ctx.fill();
        });
    });

    // Draw rubber-band line if actively drawing
    if (mode === 'drawing' && currentPolyline && currentPolyline.length > 0) {
        const lastPt = currentPolyline[currentPolyline.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPt.x, lastPt.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = '#94a3b8'; // Muted grey for rubber band
        ctx.setLineDash([5, 5]); // Dashed line to indicate preview
        ctx.stroke();
        ctx.setLineDash([]); // Reset
    }
}

// --- Event Listeners based on Dialog Notation ---

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
    
    if (mode === 'moving_active' && selectedPoint) {
        polylines[selectedPoint.lIdx][selectedPoint.pIdx] = { ...mousePos };
    }
    draw();
});

canvas.addEventListener('mousedown', () => {
    if (mode === 'drawing' && currentPolyline) {
        currentPolyline.push({ ...mousePos });
        
    } else if (mode === 'deleting') {
        const target = findClosest(mousePos.x, mousePos.y);
        if (target) {
            polylines[target.lIdx].splice(target.pIdx, 1);
            // Cleanup empty lines
            if (polylines[target.lIdx].length === 0) polylines.splice(target.lIdx, 1);
        }
        // Dialog diagram: Return to idle after delete
        setMode('idle', 'Idle');
        
    } else if (mode === 'moving_start') {
        selectedPoint = findClosest(mousePos.x, mousePos.y);
        if (selectedPoint) {
            setMode('moving_active', 'Placing Point...');
        } else {
            setMode('idle', 'Idle (Missed Point)');
        }
        
    } else if (mode === 'moving_active') {
        // Drop the point and return to idle
        setMode('idle', 'Idle');
        selectedPoint = null;
    }
    
    draw();
});

window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    
    if (k === 'b') {
        let newArr = [];
        polylines.push(newArr);
        currentPolyline = newArr;
        setMode('drawing', 'Drawing (Click to add points)');
    } 
    else if (k === 'd') {
        setMode('deleting', 'Deleting (Click a point to remove)');
        currentPolyline = null;
    } 
    else if (k === 'm') {
        setMode('moving_start', 'Moving (Click a point to grab)');
        currentPolyline = null;
    } 
    else if (k === 'r') {
        polylines = [];
        currentPolyline = null;
        setMode('idle', 'Idle (Canvas Cleared)');
    } 
    else if (k === 'q') {
        setMode('quit', 'Application Quit');
        currentPolyline = null;
        // Optional: Remove event listeners here if true quit is required
    }
    else if (k === 'Escape') {
        // Good UX practice: allow escaping out of a mode
        setMode('idle', 'Idle');
        currentPolyline = null;
    }
    
    draw();
});

// Initial render
draw();