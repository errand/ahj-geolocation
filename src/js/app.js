import GeoLocator from './GeoLocator';

const geoLocator = new GeoLocator();
geoLocator.bindToDOM(document.querySelector('#app'));
geoLocator.init();
