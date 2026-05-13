import { Polyline } from 'react-leaflet';

/**
 * start       – original doctor start position {lat,lng}
 * current     – live doctor position (animates)
 * destination – patient position
 */
export default function RouteOverlay({ start, current, destination }) {
  if (!current || !destination) return null;
  return (
    <>
      {/* Completed trail: start → current (emerald green, solid) */}
      {start && (
        <Polyline
          positions={[[start.lat, start.lng], [current.lat, current.lng]]}
          pathOptions={{
            color: '#059669',
            weight: 5,
            opacity: 0.6,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      )}
      {/* Ahead route: current → destination (electric blue, flowing dashes) */}
      <Polyline
        positions={[[current.lat, current.lng], [destination.lat, destination.lng]]}
        pathOptions={{
          color: '#0052D9',
          weight: 5,
          opacity: 0.85,
          dashArray: '8 12',
          lineCap: 'round',
          className: 'route-line',
        }}
      />
    </>
  );
}
