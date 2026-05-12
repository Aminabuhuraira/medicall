// Desktop split: left panel (40%) + right panel (60%)
// Mobile: stacked, with right panel becoming a fixed background and left as a draggable bottom sheet (handled by consumer)
export default function SplitLayout({ left, right, className = '' }) {
  return (
    <div className={`relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] ${className}`}>
      <div className="relative order-2 lg:order-1 min-h-0 overflow-y-auto">
        {left}
      </div>
      <div className="relative order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
        {right}
      </div>
    </div>
  );
}
