import DoctorCard from './DoctorCard.jsx';

export default function DoctorList({ doctors, selectedId, onSelect, onBook }) {
  if (!doctors.length) {
    return (
      <div className="glass-soft p-8 text-center text-ink-muted text-sm">
        No doctors match your filters. Try widening your search.
      </div>
    );
  }
  return (
    <div className="stagger flex flex-col gap-3">
      {doctors.map((d) => (
        <DoctorCard
          key={d.id}
          doctor={d}
          selected={selectedId === d.id}
          onSelect={onSelect}
          onBook={onBook}
        />
      ))}
    </div>
  );
}
