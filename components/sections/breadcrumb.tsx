interface BreadcrumbProps {
  title: string; // main heading
}
export default function Breadcrumb({
  title,
}: BreadcrumbProps) {
  return (
    <>
      {/* <!-- Breadcrumb Section Begin --> */}
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb-text">
                <h2>{title}</h2>
                <div className="bt-option">
                  <a href="/">Home</a>
                  <span>{title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}
    </>
  );
}
