import { useRef, useEffect } from 'react';
import maplibregl, { LngLatBounds, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function CustomMap() {
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
            style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
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
            }
        });
    }, []);
    return (
        <div ref={mapContainer} id='map' style={{ width: '100%', height: '500px' }} />
    );
}

export default CustomMap;