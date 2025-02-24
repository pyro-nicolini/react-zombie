function Button({ type = 'button', buttonText, className = '', onClick }) {
  return (
    <button
      type={type}
      className={`btn mb-1 btn-sm ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}


export default Button;