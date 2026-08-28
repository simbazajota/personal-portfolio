// MAP //

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltYmF6YWpvdGEiLCJhIjoiY2xrNGd6MDAxMHR6MzNtb3loODVremp0NSJ9.b1PuHNLwqm-py9vsXdXcjA';

const setMapStyle = function () {
    const rootElem = document.documentElement
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme

    newTheme = (dataTheme === 'light') ? 'dark' : 'light'

    const mapStyle = (newTheme === 'light')
        ? 'dark-v10'
        : 'light-v10';
    return mapStyle;
};

const setMapTheme = function () {
    const mapTheme = `mapbox://styles/mapbox/${setMapStyle()}`;
    return mapTheme;
};

let mapInstance = null;

function addMapMarker(map) {
    const sourceId = 'point';
    const layerId = 'points';
    const imageId = 'memoji';

    if (map.getLayer(layerId)) return;

    map.loadImage(
        '/assets/images/memoji4.png',
        (error, image) => {
            if (error) return;
            if (!map.hasImage(imageId)) {
                map.addImage(imageId, image);
            }

            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [0.0221, 51.4806]
                                }
                            }
                        ]
                    }
                });
            }

            if (!map.getLayer(layerId)) {
                map.addLayer({
                    'id': layerId,
                    'type': 'symbol',
                    'source': sourceId,
                    'layout': {
                        'icon-image': imageId,
                        'icon-size': 0.2,
                    }
                });
            }
        }
    );
}

export function initMap() {
    if (mapInstance) return;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: setMapTheme(), // style URL
        zoom: 11, // starting zoom
        center: [0.0221, 51.4806], // starting position
        attributionControl: false,
    });

    mapInstance = map;

    map.scrollZoom.disable()
    map.touchZoomRotate.enable();
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
        addMapMarker(map);
    });

    map.on('style.load', () => {
        addMapMarker(map);
    });
}

export function updateMapTheme() {
    if (!mapInstance) return;
    mapInstance.setStyle(setMapTheme());
}
