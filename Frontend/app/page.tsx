import Image from "next/image";
import Land from '@/components/Land'
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Land/>
      <Footer/>
    </main>

  );
}
