'use client'

import { TransformedMap } from "../../../sanity.types.custom";
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import AOSComponent from "../AOS";
import Image from "next/image";
import { useEffect } from "react";

function MapBounds({ locations }: { locations: Array<{ lat?: number; lng?: number; location?: { lat?: number; lng?: number } }> }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !locations || locations.length === 0 || !window.google?.maps) return;

    const bounds = new window.google.maps.LatLngBounds();
    let hasValidLocations = false;

    locations.forEach(loc => {
      const lat = loc.lat || loc.location?.lat;
      const lng = loc.lng || loc.location?.lng;
      if (lat && lng) {
        bounds.extend({ lat, lng });
        hasValidLocations = true;
      }
    });

    if (hasValidLocations) {
      map.fitBounds(bounds);
      // Limit zoom if there's only one location or they are very close
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom()! > 16) {
          map.setZoom(16);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [map, locations]);

  return null;
}

export default function Map({ item }: { item: TransformedMap }) {
  const center = {
    lat: item.mapCenter?.lat || 41.8902,
    lng: item.mapCenter?.lng || 12.4922
  };

  return (
    <AOSComponent>
      <section className="map-block box" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 mb-12 text-center">
          {item.heading && (
            <h2 className="family-playfair text-[30px]">{item.heading}</h2>
          )}
        </div>

        <div className="map-block-container relative w-full h-[400px] md:h-[600px] overflow-hidden shadow-2xl border border-gold/10" data-aos="zoom-out">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <GoogleMap
              mapId={process.env.NEXT_PUBLIC_MAPS_ID || ''}
              style={{ width: '100%', height: '100%' }}
              defaultCenter={center}
              defaultZoom={item.mapCenter?.alt || 15}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
            >
              <MapBounds locations={item.locations || []} />
              
              {item.locations?.map((loc, index) => {
                // Support both structures: {lat, lng} or {location: {lat, lng}}
                const lat = loc.lat || loc.location?.lat;
                const lng = loc.lng || loc.location?.lng;

                if (!lat || !lng) {
                  console.log("Missing coordinates for marker", index, loc);
                  return null;
                }

                return (
                  <AdvancedMarker
                    key={loc._key || index}
                    position={{ lat, lng }}
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <Image
                        src="/images/marker.svg"
                        alt="Marker"
                        width={48}
                        height={48}
                        className="block object-contain transition-transform duration-300 hover:scale-110"
                        priority
                      />
                    </div>
                  </AdvancedMarker>
                )
              })}
            </GoogleMap>
          </APIProvider>
        </div>
      </section>
    </AOSComponent>
  )
}