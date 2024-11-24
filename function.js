window.function = function(coordinates) {
  // Initialize the map component if it hasn't been initialized
  if (!window.mapComponent) {
    window.mapComponent = {
      init: function() {
        if (!window.L) {
          // Load Leaflet if not already loaded
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          document.head.appendChild(script);

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
      }
    };
    window.mapComponent.init();
  }

  // Return the coordinates value
  return coordinates ? coordinates.value : "";
}
