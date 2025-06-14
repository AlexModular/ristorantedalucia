'use client'

import React from 'react';
import {APIProvider, Map as GoogleMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Map as MAP } from "../../../sanity.types";
import Image from 'next/image';

export default function Map(params: {item: MAP}) {
  const { item } = params;
  const mapCenter = item?.mapCenter ? {lat: item?.mapCenter?.lat ?? 0, lng: item?.mapCenter?.lng ?? 0} : {lat: 0, lng: 0};
  return (
    <div className="map m-auto">
      <h4 className="text-center pb-12 pt-12 subtitle">{item.heading}</h4>
      <APIProvider apiKey={'AIzaSyCu72qBp5nAsUd7i3oVGDAgtoaL5eTbvIw'}>
        <GoogleMap
          mapId={"custom_style"}
          style={{width: '99vw', height: '55vh'}}
          defaultCenter={mapCenter}
          defaultZoom={12}
          gestureHandling={'cooperative'}
          disableDefaultUI={true}
        />
        {item.locations?.filter(location => location?.lat !== undefined && location?.lng !== undefined).map((location, index) => (
          location?.lat !== undefined && location?.lng !== undefined ? (
            <AdvancedMarker position={{lat: location?.lat, lng: location?.lng}} key={index}>
              <Image src="images/marker.svg" alt="alt" width={45} height={45} />
            </AdvancedMarker>
          ) : null
        ))}
      </APIProvider>
    </div>
  );
}