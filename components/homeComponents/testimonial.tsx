import { TestimonialsList } from "@/configs/testimonialsList";
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
            {TestimonialsList.map((testimonial, index) => (
              <div className="ts_item" key={index}>
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <div className="ti_pic">
                      <Image
                        src={testimonial.imageURL}
                        width={200}
                        height={200}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="ti_text">
                      <p style={{ whiteSpace: "pre-line" }}>
                        {testimonial.Comment}
                      </p>
                      <h5>{testimonial.name}</h5>
                      <div className="tt-rating">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <i key={i} className="fa fa-star"></i>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
