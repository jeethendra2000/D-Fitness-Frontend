import Image from "next/image";
export default async function Testimonial() {
  return (
    <>
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Testimonial</span>
                <h2>Our cilent say</h2>
              </div>
            </div>
          </div>
          <div className="ts_slider owl-carousel">
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <Image
                      src="/img/testimonial/testimonial-3.jpg"
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </div>
                  <div className="ti_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                      <br /> ut labore et dolore magna aliqua. Quis ipsum
                      suspendisse ultrices gravida. Risus commodo
                      <br /> viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <h5>Jeethendra S R</h5>
                    <div className="tt-rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <Image
                      src="/img/testimonial/testimonial-1.jpg"
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </div>
                  <div className="ti_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                      <br /> ut labore et dolore magna aliqua. Quis ipsum
                      suspendisse ultrices gravida. Risus commodo
                      <br /> viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <h5>Jayanth Kumar S</h5>
                    <div className="tt-rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ts_item">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="ti_pic">
                    <Image
                      src="/img/testimonial/testimonial-2.jpg"
                      width={200}
                      height={200}
                      alt="logo"
                    />
                  </div>
                  <div className="ti_text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                      <br /> ut labore et dolore magna aliqua. Quis ipsum
                      suspendisse ultrices gravida. Risus commodo
                      <br /> viverra maecenas accumsan lacus vel facilisis.
                    </p>
                    <h5>Nikitha</h5>
                    <div className="tt-rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
