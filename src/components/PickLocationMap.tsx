import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface LatLngLiteral { lat: number; lng: number }

interface PickLocationMapProps {
  value: LatLngLiteral | null;
  onChange: (pos: LatLngLiteral) => void;
  center?: [number, number];
  zoom?: number;
}

export function PickLocationMap({ value, onChange, center = [-23.5505, -46.6333], zoom = 13 }: PickLocationMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletRef.current) {
      leafletRef.current = L.map(mapRef.current, { center, zoom });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(leafletRef.current);

      leafletRef.current.on('click', (e: any) => {
        const pos = { lat: e.latlng.lat, lng: e.latlng.lng };
        if (!markerRef.current) {
          markerRef.current = L.marker([pos.lat, pos.lng]).addTo(leafletRef.current!);
        } else {
          markerRef.current.setLatLng([pos.lat, pos.lng]);
        }
        onChange(pos);
      });
    } else {
      leafletRef.current.setView(center, zoom);
    }

    // Initialize marker if value already exists
    if (value && leafletRef.current) {
      if (!markerRef.current) {
        markerRef.current = L.marker([value.lat, value.lng]).addTo(leafletRef.current);
      } else {
        markerRef.current.setLatLng([value.lat, value.lng]);
      }
    }

    return () => {};
  }, [center, zoom, value, onChange]);

  useEffect(() => {
    return () => { leafletRef.current?.remove(); };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '256px' }}
      aria-label="Selecionar localização no mapa"
    />
  );
}

export default PickLocationMap;
