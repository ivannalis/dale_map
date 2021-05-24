const IMG_FOLDER = "assets/images/"
const GEOJSON_FOLDER = "assets/geojson/dale.geojson"
const IMG_FORMAT = '.jpg'

mapboxgl.accessToken =
    'pk.eyJ1IjoiaXZhbm5hbGlzIiwiYSI6ImNrbzM0Y2c5ZjBzOTAydmpudXdtcnBuZTYifQ.BRwjq1JbwZfZOty3CnXTXA';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-3.931,50.3465], // starting position [lng, lat]
    zoom: 18 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.addSource("location", {
        "type": "geojson",
        "data": GEOJSON_FOLDER
    });

    map.addLayer({
        "id": "location",
        "type": "circle",
        "source": "location",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#ff0000"
        }
    });
});

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['location'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }
    let feature = features[0];
    let popup = new mapboxgl.Popup({
            offset: [0, 0]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<p style="text-align:center;" class="center">Image Name </p><h3 style="font-size:18px; font-weight:bold;text-align:center;">${feature.properties.image_id}</h3><iframe width="350" height="250" allowfullscreen style="border-style:none;" src="https://ivannalis.github.io/dale_map_dev/imgprev.html?thumb=${feature.properties.thumb}&show_high=${feature.properties.image_link}"></iframe> `) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

});
