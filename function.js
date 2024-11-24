window.function = function(coordinates) {
  if (coordinates?.value) {
    try {
      const coords = JSON.parse(coordinates.value);
      if (coords.lat && coords.lng) {
        window.mapComponent.setMarker(coords.lat, coords.lng);
      }
      return coordinates.value;
    } catch (e) {
      console.error('Invalid coordinates format');
      return '';
    }
  }
  
  if (!window.mapComponent.initialized) {
    window.mapComponent.init();
  }
  
  return '';
}
