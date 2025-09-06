export default function HeroSection() {
  return (
    // <!-- Hero Section Begin -->
    <section className="hero-section">
      <div className="hs-slider owl-carousel">
        <div
          className="hs-item"
          style={{
            backgroundImage: "url('/img/hero/hero-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text">
                  <span>Shape your body</span>
                  <h1>
                    Be <strong>strong</strong> traning hard
                  </h1>
                  <a href="#" className="primary-btn">
                    Get info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hs-item"
          style={{
            backgroundImage: "url('/img/hero/hero-2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text">
                  <span>Shape your body</span>
                  <h1>
                    Be <strong>strong</strong> traning hard
                  </h1>
                  <a href="#" className="primary-btn">
                    Get info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
