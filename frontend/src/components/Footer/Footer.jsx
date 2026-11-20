import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        {/* LOGO */}

        <div className="footer-col">
          <h2 className="logo">Torado</h2>

          <p>
            Make your company flourish online with Torado, a theme especially
            designed for business websites.
          </p>

          <div className="socials">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>

        {/* WHAT WE DO */}

        <div className="footer-col">
          <h4>What We Do</h4>

          <ul>
            <li>Pricing Plan</li>
            <li>Help & FAQ's</li>
          </ul>
        </div>

        {/* ABOUT */}

        <div className="footer-col">
          <h4>About Torado</h4>

          <ul>
            <li>Our Project</li>
            <li>Single Project</li>
          </ul>
        </div>

        {/* EMAIL */}

        <div className="footer-col">
          <h3 className="email">support@torado.com</h3>

          <div className="subscribe">
            <input type="text" placeholder="Enter your email" />

            <span className="arrow">↗</span>
          </div>
        </div>
      </div>

      {/* BIG MARQUEE TEXT */}

      <div className="footer-marquee">
        <div className="marquee-track">
          <span>Let's Work Together  Let's Work Together </span>

          <span>Let's Work Together  Let's Work Together </span>
        </div>
      </div>

      {/* COPYRIGHT */}

      <div className="copyright">© Torado is proudly owned by EnvyTheme</div>
    </footer>
  );
}
