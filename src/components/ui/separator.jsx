export function Separator({ className = '', ...props }) {
  return <div role="separator" className={`ui-separator ${className}`.trim()} {...props} />;
}
