import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import DoctorPin from './DoctorPin.jsx';

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const ATTRIB = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function userIcon() {
  return L.divIcon({
    className: '',
    html: '<div class="user-pin"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points || points.length < 2) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [points, map]);
  return null;
}

function Recenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView([center.lat, center.lng], zoom ?? map.getZoom(), { animate: true });
  }, [center, zoom, map]);
  return null;
}

export default function LiveMap({
  center,
  zoom = 14,
  doctors = [],
  user,
  selectedId,
  onSelect,
  fitToAll = false,
  children,
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      zoomControl
      scrollWheelZoom
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url={LIGHT_TILES} attribution={ATTRIB} subdomains="abcd" maxZoom={20} />

      {user && (
        <Marker position={[user.lat, user.lng]} icon={userIcon()} />
      )}

      {doctors.map((d) => (
        <Marker
          key={d.id}
          position={[d.coords.lat, d.coords.lng]}
          icon={DoctorPin({ status: d.status, selected: selectedId === d.id })}
          eventHandlers={{ click: () => onSelect && onSelect(d) }}
        />
      ))}

      {fitToAll && (
        <FitBounds points={[user, ...doctors.map((d) => d.coords)].filter(Boolean)} />
      )}

      <Recenter center={center} zoom={zoom} />
      {children}
    </MapContainer>
  );
}
