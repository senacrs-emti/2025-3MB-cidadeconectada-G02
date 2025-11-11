import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, CATEGORIAS } from '@/types/location';

interface MapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
}

export function Map({ locations, center = [-23.5505, -46.6333], zoom = 13 }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map once
    if (!leafletRef.current) {
      leafletRef.current = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
        preferCanvas: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(leafletRef.current);

      markersLayerRef.current = L.layerGroup().addTo(leafletRef.current);
    } else {
      // Update center/zoom if props change
      leafletRef.current.setView(center, zoom);
    }

    // Update markers
    const layer = markersLayerRef.current!;
    layer.clearLayers();

    const getCategoriaLabel = (categoria: Location['categoria']) =>
      CATEGORIAS.find((c) => c.value === categoria)?.label || categoria;

    const getCategoriaIcon = (categoria: Location['categoria']) =>
      CATEGORIAS.find((c) => c.value === categoria)?.icon || '📍';

    const getAcessibilidadeMedia = (ratings: Location['acessibilidade']) => {
      const { rampas, banheiros, elevadores, vagas } = ratings;
      return ((rampas + banheiros + elevadores + vagas) / 4).toFixed(1);
    };

    locations.forEach((loc) => {
      const marker: LeafletMarker = L.marker([loc.latitude, loc.longitude]);
      const popupHtml = `
        <article style="max-width:320px;">
          <header style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.5rem;">
            <h3 style="font-weight:800;font-size:1rem;line-height:1.2;margin:0;">${getCategoriaIcon(loc.categoria)} ${
        loc.nome
      }</h3>
            <span style="background: hsl(221 83% 38% / .1); color: hsla(255, 83%, 38%, 1.00); padding:.25rem .5rem; border-radius:.5rem; font-size:.75rem;">${getCategoriaLabel(
              loc.categoria
            )}</span>
          </header>
          <p style="margin:.25rem 0;font-weight:600;">Acessibilidade: ${getAcessibilidadeMedia(loc.acessibilidade)}/5</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.25rem;font-size:.875rem;">
            <div>♿ Rampas: <b>${loc.acessibilidade.rampas}/5</b></div>
            <div>🚻 Banheiros: <b>${loc.acessibilidade.banheiros}/5</b></div>
            <div>🛗 Elevadores: <b>${loc.acessibilidade.elevadores}/5</b></div>
            <div>🅿️ Vagas: <b>${loc.acessibilidade.vagas}/5</b></div>
          </div>
          ${
            loc.comentario
              ? `<p style="margin-top:.5rem;color:hsl(220 10% 40%);border-top:1px solid hsl(220 13% 85%);padding-top:.5rem;">${loc.comentario}</p>`
              : ''
          }
          ${
            loc.fotos.length
              ? `<img src="${loc.fotos[0]}" alt="${loc.nome}" style="width:100%;height:128px;object-fit:cover;border-radius:.5rem;margin-top:.5rem;" />`
              : ''
          }
        </article>
      `;
      marker.bindPopup(popupHtml, { maxWidth: 320 }).addTo(layer);
    });

    return () => {
      // Do not remove map instance on rerenders, only on unmount
    };
  }, [locations, center, zoom]);

  useEffect(() => {
    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '400px' }} aria-label="Mapa de acessibilidade" />;
}

export default Map;
