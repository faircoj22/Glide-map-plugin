import L from 'leaflet';

export class MapComponent {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private container: HTMLElement;

  constructor(containerId: string) {
    this.container = document.createElement('div');
    this.container.id = containerId;
    this.container.style.height = '400px';
    this.container.style.width = '100%';
  }

  initialize(lat = 51.505, lng = -0.09) {
    this.map = L.map(this.container).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.setMarker(lat, lng);
    });

    return this.container;
  }

  setMarker(lat: number, lng: number) {
    if (this.map) {
      if (this.marker) {
        this.marker.remove();
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
      return { lat, lng };
    }
    return null;
  }

  getCoordinates() {
    if (this.marker) {
      const position = this.marker.getLatLng();
      return {
        lat: position.lat,
        lng: position.lng
      };
    }
    return null;
  }
}