function Button({
  type = "button",
  buttonText,
  className = "",
  onClick,
  buttonImg = "",
  idx="",
  disabled,
}) {
  return (
    <>
      {buttonImg ? <div className="buttonImg"></div> : null}
      <button id={idx} type={type} className={`button ${className}`} onClick={onClick} disabled={disabled}>
        {buttonText}
      </button>
    </>
  );
}

export default Button;
