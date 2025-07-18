import { useRef, useEffect } from 'react';
import maplibregl, { LngLatBounds, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// import Rwanda from '../../../Rwanda.geojson'

function CustomMap(dataSource) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const userPosition = useRef({
        latitude: 0,
        longitude: 0
    })
    let llb = new LngLatBounds([28.95, -2.85, 30.90, -1.05]);

    useEffect(() => {
        if (!mapContainer.current) return;
        if (map.current) return;
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [userPosition.current.longitude, userPosition.current.latitude],
            zoom: 6,
            bounds: llb
        });

        navigator.geolocation.getCurrentPosition((e) => {
            userPosition.current = {
                latitude: e.coords.latitude,
                longitude: e.coords.longitude
            };
            if (map.current) {
                new Marker()
                    .setLngLat([userPosition.current.longitude, userPosition.current.latitude])
                    .addTo(map.current);
                map.current.flyTo({
                    center: [userPosition.current.longitude, userPosition.current.latitude],
                    zoom: 10,
                    speed: 1,
                    curve: 1,
                    easing(t) {
                        return t;
                    }
                })

                map.current.on('load', () => {
                    console.log('in the onload functionn')
                    map.current?.addSource('groupsDistricts', {
                        type: 'geojson',
                        data: dataSource.coordinates,
                        cluster: true,
                        clusterMaxZoom: 14,
                        clusterRadius: 50
                    })
                })
                map.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'groupsDistricts',
                    filter: ['has', 'point_count'],
                    paint: {

                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            100,
                            '#f1f075',
                            750,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40
                        ]
                    }
                });
                map.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'groupsDistricts',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                });

                map.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'groupsDistricts',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff'
                    }
                });

            }
        });
    }, []);
    return (
        <div ref={mapContainer} id='map' style={{ width: '100%', height: '500px' }} />
    );
}

export default CustomMap;