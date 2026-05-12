import L from 'leaflet';

// Returns a Leaflet divIcon, used by react-leaflet <Marker icon={...}>
export default function DoctorPin({ status = 'available', selected = false } = {}) {
  return L.divIcon({
    className: '',
    html: `
      <div class="doctor-pin ${status} ${selected ? 'selected' : ''}">
        <div class="ring"></div>
        <div class="ring delay"></div>
        <div class="core"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
