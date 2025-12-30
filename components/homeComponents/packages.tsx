import Link from "next/link";

export default async function Packages() {
  return (
    <>
      <section className="pricing-section service-pricing spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Our Plan</span>
                <h2>Choose your pricing plan</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* Plan 1: Monthly */}
            <div className="col-lg-3 col-md-6">
              <div className="ps-item">
                <h3>Monthly</h3>
                <div className="pi-price">
                  <h2>₹ 1200</h2>
                  <span>PER MONTH</span>
                </div>
                <ul>
                  <li>General Training (G.T.)</li>
                  <li>Morning & Evening Access</li>
                  <li>Unlimited Equipment</li>
                  <li
                    style={{ textDecoration: "line-through", opacity: "0.6" }}
                  >
                    Personal Training
                  </li>
                  <li
                    style={{ textDecoration: "line-through", opacity: "0.6" }}
                  >
                    Diet Guidance
                  </li>
                </ul>
                <Link href="/contact" className="primary-btn pricing-btn">
                  Enroll now
                </Link>
              </div>
            </div>

            {/* Plan 2: 3 Months */}
            <div className="col-lg-3 col-md-6">
              <div className="ps-item">
                <h3>3 Months</h3>
                <div className="pi-price">
                  <h2>₹ 3000</h2>
                  <span>TOTAL</span>
                </div>
                <ul>
                  <li>General Training (G.T.)</li>
                  <li>
                    <strong>5 Days</strong> Personal Training
                  </li>
                  <li>Diet & Nutrition Guidance</li>
                  <li>Morning & Evening Access</li>
                  <li>Unlimited Equipment</li>
                </ul>
                <Link href="/contact" className="primary-btn pricing-btn">
                  Enroll now
                </Link>
              </div>
            </div>

            {/* Plan 3: 6 Months */}
            <div className="col-lg-3 col-md-6">
              <div className="ps-item">
                <h3>6 Months</h3>
                <div className="pi-price">
                  <h2>₹ 5500</h2>
                  <span>TOTAL</span>
                </div>
                <ul>
                  <li>General Training (G.T.)</li>
                  <li>
                    <strong>15 Days</strong> Personal Training
                  </li>
                  <li>Diet & Nutrition Guidance</li>
                  <li>Morning & Evening Access</li>
                  <li>Unlimited Equipment</li>
                </ul>
                <Link href="/contact" className="primary-btn pricing-btn">
                  Enroll now
                </Link>
              </div>
            </div>

            {/* Plan 4: 1 Year */}
            <div className="col-lg-3 col-md-6">
              <div className="ps-item">
                <h3>1 Year</h3>
                <div className="pi-price">
                  <h2>₹ 9999</h2>
                  <span>TOTAL</span>
                </div>
                <ul>
                  <li>General Training (G.T.)</li>
                  <li>
                    <strong>1 Month </strong> Personal Training
                  </li>
                  <li>Diet & Nutrition Guidance</li>
                  <li>Morning & Evening Access</li>
                  <li>Unlimited Equipment</li>
                </ul>
                <Link href="/contact" className="primary-btn pricing-btn">
                  Enroll now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
