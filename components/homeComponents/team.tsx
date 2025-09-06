import { TeamMembersList } from "@/configs/teamMembersList";

export default async function Team() {
  return (
    <>
      <section className="team-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                <a href="#" className="primary-btn btn-normal appoinment-btn">
                  appointment
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ts-slider owl-carousel">
              {TeamMembersList.map((teamMember) => (
                <div className="col-lg-4" key={teamMember.imageURL}>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
