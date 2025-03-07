export default function Footer({footerTextA, footerTextB, footerLink}) {
  return (
    <footer className="footer">
      <p>{footerTextA}</p>
      <a href="#">{footerLink}
      </a>
      <p>{footerTextB}</p>
    </footer>
  );
}
