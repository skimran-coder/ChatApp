interface ButtonPropsType {
  onClickHandler: () => void;
  title: string;
  type?: "primary" | "secondary" | "send";
  size?: "lg" | "md" | "sm";
}

const Button = ({ onClickHandler, title, type, size }: ButtonPropsType) => {
  const defaultStyles =
    "rounded-md hover:bg-opacity-80 transition-all text-white";

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "lg:px-6 lg:py-2 lg:text-lg md:px-4 md:py-2 md:text-base px-3 py-1 text-base",
  };

  const styleType = {
    primary: "bg-green-600 ",
    secondary: "bg-gray-600 ",
    send: "bg-blue-600 ",
  };

  return (
    <button
      onClick={onClickHandler}
      className={`${defaultStyles} ${sizeStyles[size || "md"]} ${
        styleType[type || "primary"]
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
