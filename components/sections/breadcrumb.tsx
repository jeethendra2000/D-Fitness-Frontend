import Link from "next/link";

interface BreadcrumbProps {
  title: string; // main heading
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <>
      <section
        className="breadcrumb-section"
        style={{
          backgroundImage: "url('/img/hero2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-left">
              <div className="breadcrumb-text">
                <h2>{title}</h2>
                <div className="bt-option">
                  <Link href="/">Home</Link>
                  <span style={{ color: "white" }}>{title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
