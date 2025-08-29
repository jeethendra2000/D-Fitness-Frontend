import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery Page",
  description: "D-Fitness Gallery Page",
};

export default async function Gallery() {
  return (
    <>
      <Breadcrumb title="Gallery" />

      {/* <!-- Gallery Section Begin --> */}
      <div className="gallery-section gallery-page">
        <div className="gallery">
          <div className="grid-sizer"></div>
          <div
            className="gs-item grid-wide set-bg"
            data-setbg="img/gallery/gallery-1.jpg"
          >
            <a
              href="img/gallery/gallery-1.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-2.jpg"
          >
            <a
              href="img/gallery/gallery-2.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-3.jpg"
          >
            <a
              href="img/gallery/gallery-3.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-4.jpg"
          >
            <a
              href="img/gallery/gallery-4.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-5.jpg"
          >
            <a
              href="img/gallery/gallery-5.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item grid-wide set-bg"
            data-setbg="img/gallery/gallery-6.jpg"
          >
            <a
              href="img/gallery/gallery-6.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item grid-wide set-bg"
            data-setbg="img/gallery/gallery-7.jpg"
          >
            <a
              href="img/gallery/gallery-7.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-8.jpg"
          >
            <a
              href="img/gallery/gallery-8.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
          <div
            className="gs-item set-bg"
            data-setbg="img/gallery/gallery-9.jpg"
          >
            <a
              href="img/gallery/gallery-9.jpg"
              className="thumb-icon image-popup"
            >
              <i className="fa fa-picture-o"></i>
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Gallery Section End --> */}
      
      <GetInTouch />
    </>
  );
}
