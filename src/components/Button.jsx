function Button({ type = 'button', buttonText, className = '', onClick, buttonImg='' }) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
    >
    {buttonText}
    {buttonImg? <img className="buttonImg" src={buttonImg} alt="button img" /> : null}
    </button>
  );
}


export default Button;