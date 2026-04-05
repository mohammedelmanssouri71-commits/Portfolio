export function Avatar({ className = '', children, ...props }) {
  return <div className={`ui-avatar ${className}`.trim()} {...props}>{children}</div>;
}

export function AvatarImage({ src, alt, className = '', ...props }) {
  return <img src={src} alt={alt} className={`ui-avatar-image ${className}`.trim()} {...props} />;
}

export function AvatarFallback({ className = '', children, ...props }) {
  return <div className={`ui-avatar-fallback ${className}`.trim()} {...props}>{children}</div>;
}
