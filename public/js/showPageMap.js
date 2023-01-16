
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',// stylesheet location 
        center: gym.geometry.coordinates, //starting position [lng, lat]
        zoom: 8
    });

    map.addControl(new mapboxgl.NavigationControl());

  new mapboxgl.Marker()
    .setLngLat(gym.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25})
      .setHTML(
        `<h3> ${gym.title}</h3><p>${gym.location}</p>`
      )
      )
    .addTo(map)