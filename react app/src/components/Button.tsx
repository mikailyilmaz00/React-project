interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button className="btn btn-' + color = 'primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
