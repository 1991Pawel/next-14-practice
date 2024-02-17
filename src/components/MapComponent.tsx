"use client";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useRef } from "react";
import { IoIosAlert } from "react-icons/io";
import airports from "../airports.json"
export const MapComponent = () => {
	const mapboxToken =  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);

	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
	};

	return (
		<div className="map-container">
        		<Map
				ref={mapRef}
				mapboxAccessToken={mapboxToken}
				mapStyle="mapbox://styles/mapbox/streets-v12"
			
				initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}
				maxZoom={20}
				minZoom={3}
			>
				<GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />
				{airports.map((airport, index) => {
					return (
						<Marker key={index} longitude={airport.lon} latitude={airport.lat}>
							<button
								type="button"
								className="cursor-pointer"
								onClick={(e) => zoomToSelectedLoc(e, airport, index)}
							>
								{<IoIosAlert size={30} color="tomato" />}
							</button>
						</Marker>
					);
				})}
					{selectedMarker ? (
					<Popup
						offset={25}
						latitude={selectedMarker.airport.lat}
						longitude={selectedMarker.airport.lon}
						onClose={() => {
							setSelectedMarker(null);
						}}
						closeButton={false}
					>
						<h2>Lorem ipsum dolor sit amet.</h2>
						
					</Popup>
				) : null}
				
			</Map>
			
        </div>
	);
};
