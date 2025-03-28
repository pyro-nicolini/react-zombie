function Button({
  type = "button",
  buttonText,
  className = "",
  onClick,
  buttonImg = "",
  id="",
}) {
  return (
    <>
      {buttonImg ? <div className="buttonImg"></div> : null}
      <button id={id} type={type} className={`button ${className}`} onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
}

export default Button;
