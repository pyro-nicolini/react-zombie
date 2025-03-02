function Header({title, description, fondo}) {
  return (
    <div>
      <header style={{backgroundImage: `url(${fondo})`,}} className="header">
        <img src="src/images/hand.png" alt="" style={{width:'auto', height: '11rem',}}/>
        <div>
        <h1>{title}</h1>
        <p>{description}</p>
        </div>
      </header>
    </div>
  );
}


export default Header;