export default function Sidebar() {
  return (
    <>
      {/* <!-- Offcanvas Menu Section Begin --> */}
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch">
          <i className="fa fa-search"></i>
        </div>
        <nav className="canvas-menu mobile-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="./classes.html">Classes</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/team">Our Team</a>
            </li>
            <li>
              <a href="#">Pages</a>
              <ul className="dropdown">
                <li>
                  <a href="./about-us.html">About us</a>
                </li>
                <li>
                  <a href="./class-timetable.html">Classes timetable</a>
                </li>
                <li>
                  <a href="./bmi-calculator.html">Bmi calculate</a>
                </li>
                <li>
                  <a href="./team.html">Our team</a>
                </li>
                <li>
                  <a href="./gallery.html">Gallery</a>
                </li>
                <li>
                  <a href="./blog.html">Our blog</a>
                </li>
                <li>
                  <a href="./404.html">404</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="./contact.html">Contact</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-youtube-play"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      {/* <!-- Offcanvas Menu Section End --> */}
    </>
  );
}
