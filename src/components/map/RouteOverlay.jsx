import { Polyline } from 'react-leaflet';

export default function RouteOverlay({ from, to, color = '#00E5FF' }) {
  if (!from || !to) return null;
  return (
    <Polyline
      positions={[[from.lat, from.lng], [to.lat, to.lng]]}
      pathOptions={{
        color,
        weight: 3,
        opacity: 0.9,
        dashArray: '2 12',
        lineCap: 'round',
        className: 'route-line',
      }}
    />
  );
}
