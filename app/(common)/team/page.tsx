import GetInTouch from "@/components/homeComponents/getintouch";
import Breadcrumb from "@/components/sections/breadcrumb";
import type { Metadata } from "next";
import { TeamMembersList } from "@/configs/teamMembersList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team Page",
  description: "D-Fitness Our Team Page",
};

export default async function Team() {
  return (
    <>
      <Breadcrumb title="Our Team" />

      {/* <!-- Team Section Begin --> */}
      <section className="team-section team-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                {/* <a href="#" className="primary-btn btn-normal appoinment-btn">
                  appointment
                </a> */}
              </div>
            </div>
          </div>
          <div className="row">
            {TeamMembersList.map((teamMember) => (
              <div className="col-lg-4 col-sm-6" key={teamMember.imageURL}>
                <div
                  className="ts-item"
                  style={{
                    backgroundImage: `url(${teamMember.imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="ts_text">
                    <h4>{teamMember.name}</h4>
                    <span>{teamMember.role}</span>
                    <div className="tt_social">
                      {teamMember.socialLink.facebook && (
                        <Link href={teamMember.socialLink.facebook}>
                          <i className="fa fa-facebook"></i>
                        </Link>
                      )}
                      {teamMember.socialLink.instagram && (
                        <Link href={teamMember.socialLink.instagram}>
                          <i className="fa fa-instagram"></i>
                        </Link>
                      )}

                      {teamMember.socialLink.whatsapp && (
                        <Link href={teamMember.socialLink.whatsapp}>
                          <i className="fa fa-whatsapp"></i>
                        </Link>
                      )}
                      {teamMember.socialLink.email && (
                        <Link href={teamMember.socialLink.email}>
                          <i className="fa fa-envelope-o"></i>
                        </Link>
                      )}
                      {teamMember.socialLink.youtube && (
                        <Link href={teamMember.socialLink.youtube}>
                          <i className="fa fa-youtube-play"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- Team Section End --> */}

      <GetInTouch />
    </>
  );
}
