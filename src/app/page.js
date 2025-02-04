import Category from "../components/Category";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import New from "../components/New";
import Parallax from "../components/Parallax";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Category />
    <Parallax image="/parallax1.jpg" text="Special Snacks and Meals" textStyle="px-5 lg:px-8 xl:px-[8%] text-start text-gradient1" />
    <New />
    <Parallax image="/parallax2.jpg" text="Delicious Desserts" textStyle="px-5 lg:px-8 xl:px-[8%] text-end sm:text-end text-gradient2" />
    <Gallery />
    </>
  );
}
