import logo_light from "./Edible1.png";
import logo_dark from "./Edible2.png";
import parallax1 from "./parallax1.jpg";
import parallax2 from "./parallax2.jpg";
import { RiDrinks2Fill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";

export const assets = {
  logo_light,
  logo_dark,
  parallax1,
  parallax2,
};

export const category = [
  {
    id: 1,
    image: <IoFastFood />,
    title: "Combos",
    description: "Discover our wide range of burgers, pizzas, and smoothies.",
    link: "/combos",
  },
  {
    id: 2,
    image: <RiDrinks2Fill />,
    title: "Drinks",
    description: "Experience our fresh and healthy options in our smoothie bar.",
    link: "/drinks",
  },
  {
    id: 3,
    image: <LuDessert />,
    title: "Desserts",
    description: "Indulge in our delicious pizza toppings and crusts.",
    link: "/desserts",
  },
  {
    id: 4,
    image: <FaBowlFood />,
    title: "Main Dish",
    description: "Get your favorite pasta cooked to perfection with our fresh ingredients.",
    link: "/main-dishes",
  }
]