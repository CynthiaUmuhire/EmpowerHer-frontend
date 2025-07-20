import rwandaGeoJson from '@/rwandaDistrict.json';
export const geoDistrictMap = new Map();
rwandaGeoJson.features.forEach(feature => {
    const districtName = feature.properties.NAME_2?.trim();

    if (districtName) {
        geoDistrictMap.set(districtName, {
            supportGroups: [
                {
                    coordinates: feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]), // [lng, lat]
                }
            ],
            totalMembers: 0,
        });
    }
});