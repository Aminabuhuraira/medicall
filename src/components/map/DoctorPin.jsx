import L from 'leaflet';

// Returns a Leaflet divIcon.
// moving=true adds   • CSS transition on the wrapper (.moving-marker)
//                    • faster ring pulse + brighter glow (.doctor-pin.moving)
//                    • a small directional chevron above the pin
export default function DoctorPin({ status = 'available', selected = false, moving = false } = {}) {
  const classes = ['doctor-pin', status, selected ? 'selected' : '', moving ? 'moving' : ''].filter(Boolean).join(' ');
  return L.divIcon({
    className: moving ? 'moving-marker' : '',
    html: `
      <div class="${classes}">
        <div class="ring"></div>
        <div class="ring delay"></div>
        <div class="core"></div>
        ${moving ? '<div class="move-arrow"></div>' : ''}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
