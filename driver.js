window.mapComponent = {
  map: null,
  marker: null,

  init: function() {
    // Create map container
    let container = document.getElementById('map-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'map-container';
      container.style.height = '400px';
      container.style.width = '100%';
      document.body.appendChild(container);
    }

    // Initialize map
    if (window.L && !this.map) {
      this.map = L.map(container).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        this.setMarker(lat, lng);
      });
    }
  },

  setMarker: function(lat, lng) {
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = L.marker([lat, lng]).addTo(this.map);
    
    // Update Glide with new coordinates
    if (window.glide) {
      window.glide.setValue(JSON.stringify({ lat, lng }));
    }
  }
};
