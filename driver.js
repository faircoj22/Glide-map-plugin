let map = null;
let marker = null;

window.mapComponent = {
  init: function(containerId) {
    // Create map container if it doesn't exist
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.height = '400px';
      container.style.width = '100%';
      document.body.appendChild(container);
    }

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => this.initializeMap(container);
      document.head.appendChild(script);
    } else {
      this.initializeMap(container);
    }
  },

  initializeMap: function(container) {
    const L = window.L;
    map = L.map(container).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.setMarker(lat, lng);
      
      // Update the Glide value
      if (window.glide?.setValue) {
        window.glide.setValue(JSON.stringify({ lat, lng }));
      }
    });

    // Initialize with any existing value
    const existingValue = window.glide?.getValue();
    if (existingValue) {
      try {
        const coords = JSON.parse(existingValue);
        this.setMarker(coords.lat, coords.lng);
      } catch (e) {
        console.error('Invalid coordinates format');
      }
    }
  },

  setMarker: function(lat, lng) {
    if (!map || !window.L) return null;
    
    if (marker) {
      marker.remove();
    }
    marker = window.L.marker([lat, lng]).addTo(map);
    return JSON.stringify({ lat, lng });
  }
};