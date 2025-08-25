import Head from "next/head";
import Navbar from "@/components/layoutComponents/navbar";
import Sidebar from "@/components/layoutComponents/sidebar";

export default function Header() {
  return (
    <header>
        Header
        <Navbar/>
        <Sidebar/>
    </header>
  );
}
