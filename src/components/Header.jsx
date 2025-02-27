function Header({title, description, fondo}) {
  return (
    <div>
      <header style={{backgroundImage: `url(${fondo})`,}} className="header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    </div>
  );
}


export default Header;