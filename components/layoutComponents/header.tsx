import Head from "next/head";
import Navbar from "@/components/layoutComponents/navbar";
import Sidebar from "@/components/layoutComponents/sidebar";
import Image from 'next/image';

export default function Header() {
  return (
    <>
    <Sidebar/>
     <header className="header-section">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3">
                    <div className="logo">
                        <a href="./index.html">
                             <Image src="/img/logo.png" width={150} height={150} alt="Picture of the author"/>
                        </a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <Navbar/>
                </div>
                <div className="col-lg-3">
                    <div className="top-option">
                        <div className="to-search search-switch">
                            <i className="fa fa-search"></i>
                        </div>
                        <div className="to-social">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-youtube-play"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="canvas-open">
                <i className="fa fa-bars"></i>
            </div>
        </div>
    </header>
    </>
  );
}
