import { MapComponent } from './components/MapComponent';

interface GlidePlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  initialize: () => void;
}

export class MyGlidePlugin implements GlidePlugin {
  id = 'glide-map-plugin';
  name = 'Glide Map Plugin';
  description = 'A map plugin for Glide Apps with pin dropping functionality';
  version = '1.0.0';
  private mapComponent: MapComponent | null = null;

  initialize() {
    console.log('Map Plugin initialized');
    this.mapComponent = new MapComponent('map-container');
  }

  createMap(containerId = 'map-container') {
    if (!this.mapComponent) {
      this.mapComponent = new MapComponent(containerId);
    }
    return {
      type: 'create-map',
      compute: () => {
        return this.mapComponent?.initialize();
      }
    };
  }

  dropPin(lat: number, lng: number) {
    return {
      type: 'drop-pin',
      compute: () => {
        return this.mapComponent?.setMarker(lat, lng);
      }
    };
  }

  getLocation() {
    return {
      type: 'get-location',
      compute: () => {
        return this.mapComponent?.getCoordinates();
      }
    };
  }
}