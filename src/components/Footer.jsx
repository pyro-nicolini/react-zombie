import logo from "../images/logo.png";


export default function Footer({footerTextA, footerTextB, footerLink}) {
  return (
    <footer className="footer">
      <p>{footerTextA}</p>
      <a href="#">{footerLink}
      <img src={logo} alt="Logo" className="logo" style={{height: '2rem'}}/>
      </a>
      <p>{footerTextB}</p>
    </footer>
  );
}
