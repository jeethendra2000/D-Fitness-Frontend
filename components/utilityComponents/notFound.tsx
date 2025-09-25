import Link from "next/link";

export default function NotFound() {
  return (
    <>
         {/* <!-- 404 Section Begin --> */}
    <section  className="section-404">
        <div  className="container">
            <div  className="row">
                <div  className="col-lg-12">
                    <div  className="text-404">
                        <h1>404</h1>
                        <h3>Opps! This page Could Not Be Found!</h3>
                        <p>Sorry bit the page you are looking for does not exist, have been removed or name changed</p>
                        <form action="#"  className="search-404">
                            <input type="text" placeholder="Enter your keyword"/>
                            <button type="submit"><i  className="fa fa-search"></i></button>
                        </form>
                        <Link href="/"><i  className="fa fa-home"></i> Go back home</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- 404 Section End --> */}
      </>
  );
}