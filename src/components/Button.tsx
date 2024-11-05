interface ButtonProps {
  title?: string;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>)=>void;
}
function Button({ title, className, id, onClick }: ButtonProps) {
  return <button className={`px-4 py-2 border border-b-4 border-r-4 border-black ${className}`} id={id} onClick={onClick}>{title}</button>;
}
export default Button;
