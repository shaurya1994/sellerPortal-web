import { layoutStyles } from "./Layout.styles";

const Footer = () => {
  return (
    <footer style={layoutStyles.footer}>
      <p className="m-0">
        © 2026 <strong>Raw Alliance</strong>. All rights reserved. |{" "}
        <a href="#" style={layoutStyles.footerLink}>
          Contact Us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
