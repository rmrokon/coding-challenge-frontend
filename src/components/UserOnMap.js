import React, { useRef } from 'react';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import osm from "../osm-provider";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useUsers from '../hooks/useUsers';

const markerIcon = new L.Icon({
    iconUrl: require("../assets/map-marker-icon.png"),
    iconSize: [35, 45]
})

const UserOnMap = ({ selectedUser }) => {
    const [users] = useUsers();
    const user = users?.find(u => u.name === selectedUser);
    let location;

    if (user) {
        location = {
            lat: user?.address?.geo?.lat,
            lng: user?.address?.geo?.lng

        }
        console.log(location);
    }

    const ZOOM_LEVEL = 1;
    const mapRef = useRef();
    return (
        <div className='map-container'>
            {
                user && <MapContainer
                    center={location}
                    zoom={ZOOM_LEVEL}
                    ref={mapRef}
                >
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    <Marker position={location} icon={markerIcon} />
                </MapContainer>
            }
        </div>
    );
};

export default UserOnMap;