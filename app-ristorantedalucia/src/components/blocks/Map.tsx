'use client'

import React, { useEffect, useState } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Map as MAP } from "../../../sanity.types";
import Image from 'next/image';

function MapHandler({ locations }: { locations: MAP['locations'] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !locations || locations.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => {
      if (location?.lat !== undefined && location?.lng !== undefined) {
        bounds.extend({ lat: location.lat, lng: location.lng });
      }
    });

    map.fitBounds(bounds);
    
    // Adjust zoom if there's only one marker or if it's too close
    const listener = google.maps.event.addListener(map, 'idle', () => {
      if (map.getZoom()! > 16) map.setZoom(16);
      google.maps.event.removeListener(listener);
    });
  }, [map, locations]);

  return null;
}

export default function Map(params: { item: MAP }) {
  const { item } = params;
  const mapCenter = item?.mapCenter ? { lat: item?.mapCenter?.lat ?? 0, lng: item?.mapCenter?.lng ?? 0 } : { lat: 44.4949, lng: 11.3426 }; // Bologna default

  return (
    <div className="map-wrapper w-full overflow-hidden">
      <h4 className="text-center pb-12 pt-12 subtitle px-4">{item.heading}</h4>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-none">
        <APIProvider apiKey={'AIzaSyCu72qBp5nAsUd7i3oVGDAgtoaL5eTbvIw'}>
          <GoogleMap
            mapId={"custom_style"}
            style={{ width: '100%', height: '55vh' }}
            defaultCenter={mapCenter}
            defaultZoom={15}
            gestureHandling={'cooperative'}
            disableDefaultUI={true}
            colorScheme="DARK"
          >
            {item.locations?.filter(location => location?.lat !== undefined && location?.lng !== undefined).map((location, index) => (
              <AdvancedMarker position={{ lat: location?.lat!, lng: location?.lng! }} key={index}>
                <div className="marker-container">
                  <Image src="/images/marker.svg" alt="marker" width={45} height={45} />
                </div>
              </AdvancedMarker>
            ))}
            <MapHandler locations={item.locations} />
          </GoogleMap>
        </APIProvider>
      </div>
    </div>
  );
}