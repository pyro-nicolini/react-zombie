function Header({ title1, description1, fondo }) {
  return (
    <div className="header" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="p1">
          <h1 id="title1">{title1}</h1>
          <h2 id="desc1">{description1}</h2>
        <img
          className="itemHeader"
          src="src/images/hand.png"
          alt="Fotografía de mano Plants Vs Zombie"
        />
        </div>
    </div>
  );
}

export default Header;
