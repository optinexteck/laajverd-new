document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.artistic-map-container');
    const mapImage = document.querySelector('.base-map');
    const markersContainer = document.querySelector('.markers-container');
    let currentDrawingMode = null;
    let drawingPath = [];
    let activeElement = null;

    // Line drawing functionality
    document.getElementById('line-btn').addEventListener('click', function() {
        resetActiveMode();
        currentDrawingMode = 'line';
        this.classList.add('active');
        mapImage.style.cursor = 'crosshair';
        
        let startPoint = null;
        let line = document.createElement('div');
        line.className = 'drawing-line';
        markersContainer.appendChild(line);

        function drawLine(e) {
            const rect = mapImage.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            if (!startPoint) {
                startPoint = { x, y };
                // Add start point marker
                addPointMarker(x, y, 'blue');
            } else {
                line.style.cssText = `
                    position: absolute;
                    height: 3px;
                    background: #2196F3;
                    left: ${startPoint.x}%;
                    top: ${startPoint.y}%;
                    width: ${calculateDistance(startPoint, { x, y })}px;
                    transform: rotate(${calculateAngle(startPoint, { x, y })}deg);
                    transform-origin: left center;
                `;
                // Add end point marker
                addPointMarker(x, y, 'blue');
                mapImage.removeEventListener('click', drawLine);
                resetActiveMode();
            }
        }

        mapImage.addEventListener('click', drawLine);
    });

    // Area drawing functionality
    document.getElementById('polygon-btn').addEventListener('click', function() {
        resetActiveMode();
        currentDrawingMode = 'polygon';
        this.classList.add('active');
        mapImage.style.cursor = 'crosshair';

        let points = [];
        let polygon = document.createElement('div');
        polygon.className = 'drawing-polygon';
        markersContainer.appendChild(polygon);

        function drawPolygon(e) {
            const rect = mapImage.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            points.push({ x, y });
            addPointMarker(x, y, 'green');

            if (points.length >= 3) {
                polygon.style.cssText = `
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(76, 175, 80, 0.2);
                    clip-path: polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')});
                `;
                mapImage.removeEventListener('click', drawPolygon);
                resetActiveMode();
            }
        }

        mapImage.addEventListener('click', drawPolygon);
    });

    // Measure functionality
    document.getElementById('measure-btn').addEventListener('click', function() {
        resetActiveMode();
        currentDrawingMode = 'measure';
        this.classList.add('active');
        mapImage.style.cursor = 'crosshair';

        let startPoint = null;
        let measureLine = document.createElement('div');
        measureLine.className = 'measure-line';
        markersContainer.appendChild(measureLine);

        function measure(e) {
            const rect = mapImage.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            if (!startPoint) {
                startPoint = { x, y };
                addPointMarker(x, y, 'orange');
            } else {
                const distance = calculateDistance(startPoint, { x, y });
                measureLine.style.cssText = `
                    position: absolute;
                    height: 3px;
                    background: #FFC107;
                    left: ${startPoint.x}%;
                    top: ${startPoint.y}%;
                    width: ${distance}px;
                    transform: rotate(${calculateAngle(startPoint, { x, y })}deg);
                    transform-origin: left center;
                `;
                
                // Add measurement label
                const label = document.createElement('div');
                label.className = 'measurement-label';
                label.textContent = `${Math.round(distance)} units`;
                label.style.cssText = `
                    position: absolute;
                    left: ${(startPoint.x + x) / 2}%;
                    top: ${(startPoint.y + y) / 2}%;
                    transform: translate(-50%, -100%);
                `;
                markersContainer.appendChild(label);
                
                addPointMarker(x, y, 'orange');
                mapImage.removeEventListener('click', measure);
                resetActiveMode();
            }
        }

        mapImage.addEventListener('click', measure);
    });

    // Helper functions
    function addPointMarker(x, y, color) {
        const point = document.createElement('div');
        point.className = 'point-marker';
        point.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${color};
            border: 2px solid white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 4px rgba(0,0,0,0.4);
        `;
        markersContainer.appendChild(point);
    }

    function resetActiveMode() {
        currentDrawingMode = null;
        mapImage.style.cursor = 'default';
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    }

    function calculateDistance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function calculateAngle(point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
    }

    // Clear all functionality
    document.getElementById('clear-btn').addEventListener('click', function() {
        markersContainer.innerHTML = '';
        resetActiveMode();
    });

    // Add at the beginning of your DOMContentLoaded function
    document.getElementById('marker-btn').addEventListener('click', function() {
        resetActiveMode();
        currentDrawingMode = 'marker';
        this.classList.add('active');
        mapImage.style.cursor = 'crosshair';
        
        function addCustomMarker(e) {
            const rect = mapImage.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const marker = document.createElement('div');
            marker.className = 'map-marker';
            marker.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
            `;
            
            // Create marker dot
            const dot = document.createElement('div');
            dot.className = 'marker-dot';
            marker.appendChild(dot);
            
            // Add popup on click
            marker.addEventListener('click', function(e) {
                e.stopPropagation();
                showMarkerPopup(marker);
            });
            
            markersContainer.appendChild(marker);
        }
        
        mapImage.addEventListener('click', addCustomMarker);
        
        // Remove the event listener after placing a marker
        mapImage.addEventListener('click', function cleanup() {
            mapImage.removeEventListener('click', addCustomMarker);
            mapImage.removeEventListener('click', cleanup);
            resetActiveMode();
        });
    });

    // Add this function for marker popups
    function showMarkerPopup(marker) {
        // Remove any existing popups
        const existingPopup = marker.querySelector('.marker-popup');
        if (existingPopup) {
            existingPopup.remove();
            return;
        }
        
        const popup = document.createElement('div');
        popup.className = 'marker-popup';
        popup.innerHTML = `
            <h4>Location Marker</h4>
            <div class="popup-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add button functionality
        popup.querySelector('.delete-btn').addEventListener('click', function() {
            marker.remove();
        });
        
        popup.querySelector('.edit-btn').addEventListener('click', function() {
            const color = marker.classList.contains('red') ? 'green' : 
                         marker.classList.contains('green') ? 'orange' : 'red';
            marker.className = `map-marker ${color}`;
        });
        
        marker.appendChild(popup);
        
        // Close popup when clicking outside
        document.addEventListener('click', function closePopup(e) {
            if (!marker.contains(e.target)) {
                popup.remove();
                document.removeEventListener('click', closePopup);
            }
        });
    }
});
