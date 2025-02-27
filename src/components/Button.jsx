function Button({ type = 'button', buttonText, className = '', onClick }) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}


export default Button;