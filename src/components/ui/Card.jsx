export default function Card({ children, className = '', as: Tag = 'div', glow = false, ...rest }) {
  return (
    <Tag
      className={`glass ${glow ? 'ring-glow' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
