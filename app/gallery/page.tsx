import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import { GalleryImagesList } from "@/configs/galleryImagesList";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery Page",
  description: "D-Fitness Gallery Page",
};

export default async function Gallery() {
  return (
    <>
      <Breadcrumb title="Gallery" />

      <div className="gallery-section gallery-page">
        <div className="gallery">
          <div className="grid-sizer"></div>
          {GalleryImagesList.map((image) => (
            <div
              key={image.href}
              className="gs-item"
              style={{
                backgroundImage: `url(${image.href})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Link href={image.href} className="thumb-icon image-popup">
                <i className="fa fa-picture-o"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <GetInTouch />
    </>
  );
}
