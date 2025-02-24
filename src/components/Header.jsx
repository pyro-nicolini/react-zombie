function Header({ title, description, fondo, style }) {
  return (
    <div>
      <header style={{ backgroundImage: `url(${fondo})`, ...style, }} className={"w-100 text-white p-4"}>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    </div>
  );
}


export default Header;