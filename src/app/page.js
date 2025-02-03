import Category from "../components/Category";
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
    <Parallax image="/parallax1.jpg" text="Special Snacks and Meals" textStyle="pl-24 text-start text-gradient1" />
    <New />
    <Parallax image="/parallax2.jpg" text="Delicious Desserts" textStyle="pl-24 text-end text-gradient2" />
    </>
  );
}
