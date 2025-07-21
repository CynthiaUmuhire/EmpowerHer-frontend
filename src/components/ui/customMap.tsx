import {
    LayerProps, Layer,
    Map,
    MapRef, Source,
    Popup
} from "@vis.gl/react-maplibre";
import { useMemo, useRef, useState } from "react";

interface SupportGroup {
    id: string;
    name: string;
    district: string;
    memberCount: number;
    coordinates: [number, number]; // [lng, lat]
    contacts: string;
}

export interface DistrictData {
    supportGroups: SupportGroup[];
    totalPeople: number;
}

const INITIAL_VIEW_STATE = {
    latitude: -1.9403,
    longitude: 29.8739,
    zoom: 8,

};

// Convert support groups to GeoJSON
const supportGroupsToGeoJSON = (data: Record<string, DistrictData>) => {
    const features: { type: "Feature"; properties: { id: any; name: any; district: string; memberCount: any; contacts: string; }; geometry: { type: "Point"; coordinates: any; }; }[] = [];

    for (const [district, districtData] of Object.entries(data)) {
        districtData.supportGroups.forEach((sg: SupportGroup) => {
            features.push({
                type: "Feature" as const,
                properties: {
                    id: sg.id,
                    name: sg.name,
                    district,
                    memberCount: sg.memberCount,
                    contacts: sg.contacts
                },
                geometry: {
                    type: "Point" as const,
                    coordinates: sg.coordinates,
                },
            });
        });
    }

    return {
        type: "FeatureCollection" as const,
        features,
    };
};

// Cluster layer configuration
const clusterLayer: LayerProps = {
    id: "clusters",
    type: "circle",
    source: "support-groups",
    filter: ["has", "point_count"],
    paint: {
        "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6", // Default color
            5,
            "#f1f075", // Medium clusters
            10,
            "#f28cb1", // Large clusters
        ],
        "circle-radius": [
            "step",
            ["get", "point_count"],
            15, // Default size
            5,
            20,
            10,
            25,
        ],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
    },
};

// Cluster count layer
const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: "support-groups",
    filter: ["has", "point_count"],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Noto Sans Regular"], // Compatible with OpenFreeMap
        "text-size": 12,
        "text-allow-overlap": true,
    },
};

// Single point layer for support groups
const supportGroupPointLayer: LayerProps = {
    id: "supportgroup-point",
    type: "circle",
    source: "support-groups",
    filter: ["all", ["!", ["has", "point_count"]]],
    paint: {
        "circle-color": "#f0a732",
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
    },
};

// District boundary layer
const districtBoundaryLayer: LayerProps = {
    id: "district-boundaries",
    type: "line",
    source: "districts",
    paint: {
        "line-color": "#4e3fc8",
        "line-width": 2,
        "line-opacity": 0.5,
    },
};

export default function CustomMap({ dataSource }: { dataSource: Record<string, DistrictData> }) {
    const mapRef = useRef<MapRef>(null)

    const [popupInfo, setPopupInfo] = useState<{
        type: string;
        name: string;
        count: number;
        coordinates: [number, number];
        district?: string;
        contacts: string;
    } | null>(null);
    const geoJsonData = useMemo(() => supportGroupsToGeoJSON(dataSource), [dataSource]);;

    const handleClusterClick = async (event: any) => {
        const feature = event.features?.[0];
        if (!feature || !mapRef.current) return;

        if (feature.properties?.cluster_id) {
            const source = mapRef.current.getSource("support-groups") as any;
            const zoom = await source.getClusterExpansionZoom(feature.properties.cluster_id);

            mapRef.current.easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500,
            });
        } else {
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;
            setPopupInfo({
                type: "supportGroup",
                name: props.name,
                district: props.district,
                count: props.memberCount,
                coordinates: [lng, lat],
                contacts: props.contacts
            });
        }
    };

    return (
        <div className="relative w-full max-w-full h-[400px]">
            <Map
                ref={mapRef}
                initialViewState={INITIAL_VIEW_STATE}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                interactiveLayerIds={[clusterLayer.id!, supportGroupPointLayer.id!]}
                onClick={handleClusterClick}
                maplibreLogo={false}
            >
                <Source
                    id="support-groups"
                    type="geojson"
                    data={geoJsonData}
                    cluster={true}
                    clusterMaxZoom={10}
                    clusterRadius={50}
                    clusterProperties={{
                        memberCount: ["+", ["get", "memberCount"]],
                    }}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...supportGroupPointLayer} />
                    <Layer {...districtBoundaryLayer} />
                </Source>

                {popupInfo && (
                    <Popup
                        anchor="bottom"
                        longitude={popupInfo.coordinates[0]}
                        latitude={popupInfo.coordinates[1]}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className="p-2 max-w-xs bg-accent-50">
                            <h3 className="font-bold text-lg">{popupInfo.name}</h3>
                            <p className="text-sm text-gray-600">{popupInfo.district} District</p>
                            <p className="text-sm text-gray-600">Contacts: {popupInfo.contacts}</p>
                            <p className="mt-1">
                                <span className="font-medium">Members:</span> {popupInfo.count}
                            </p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>

    );
}