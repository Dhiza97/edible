import logo_light from "./Edible1.png";
import logo_dark from "./Edible2.png";
import { RiDrinks2Fill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { LuDessert } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";

export const assets = {
  logo_light,
  logo_dark,
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

export const products = [
  {
    id: 1,
    title: "Grilled Chicken Sandwich",
    price: 8.99,
    image: "/burg.png",
  },
  {
    id: 2,
    title: "Mozarella Pizza",
    price: 7.99,
    image: "/pizza.png",
  },
  {
    id: 3,
    title: "Baked Salmon",
    price: 9.99,
    image: "/pesto.png",
  },
  {
    id: 4,
    title: "Chocolate Cheesecake",
    price: 5.99,
    image: "/smoothie.png",
  },
  {
    id: 5,
    title: "Beef Stroganoff",
    price: 12.99,
    image: "/burg.png",
  },
  {
    id: 6,
    title: "Pineapple Smoothie",
    price: 4.99,
    image: "/pesto.png",
  }
]