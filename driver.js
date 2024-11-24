window.mapComponent = {
  map: null,
  marker: null,
  initialized: false,

  init: function() {
    if (this.initialized) return;
    
    let container = document.getElementById('map-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'map-container';
      document.body.appendChild(container);
    }

    this.map = L.map('map-container').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this.setMarker(lat, lng);
    });

    this.initialized = true;
  },

  setMarker: function(lat, lng) {
    if (!this.map) return;

    if (this.marker) {
      this.marker.remove();
    }
    this.marker = L.marker([lat, lng]).addTo(this.map);
    
    if (window.glide) {
      window.glide.setValue(JSON.stringify({ lat, lng }));
    }
    return JSON.stringify({ lat, lng });
  }
};
