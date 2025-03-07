function Button({ type = 'button', buttonText, className = '', onClick, buttonImg='' }) {
  return (
    <>
    {buttonImg? <div className="buttonImg"></div> : null}
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      >
    {buttonText}
    </button>
        </>
  );
}


export default Button;