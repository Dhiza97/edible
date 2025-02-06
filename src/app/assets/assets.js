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
    description:
      "Experience our fresh and healthy options in our smoothie bar.",
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
    description:
      "Get your favorite pasta cooked to perfection with our fresh ingredients.",
    link: "/main-dishes",
  },
];

export const products = [
  {
    id: 1,
    title: "Grilled Chicken Sandwich",
    price: 8.99,
    image: "/burg.png",
    category: "combo",
  },
  {
    id: 2,
    title: "Mozarella Pizza",
    price: 7.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 3,
    title: "Baked Salmon",
    price: 9.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 4,
    title: "Chocolate Cheesecake",
    price: 5.99,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 5,
    title: "Beef Stroganoff",
    price: 12.99,
    image: "/burg.png",
    category: "main-dishes",
  },
  {
    id: 6,
    title: "Pineapple Smoothie",
    price: 4.99,
    image: "/pesto.png",
    category: "drinks",
  },
  {
    id: 7,
    title: "Spicy Chicken Wings",
    price: 6.99,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 8,
    title: "BBQ Beef Burger",
    price: 10.99,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 9,
    title: "Margherita Pizza",
    price: 8.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 10,
    title: "Pepperoni Pizza",
    price: 9.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 11,
    title: "Pesto Pasta",
    price: 7.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 12,
    title: "Tiramisu",
    price: 6.49,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 13,
    title: "Chicken Alfredo",
    price: 11.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 14,
    title: "Fruit Smoothie",
    price: 5.49,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 15,
    title: "Veggie Pizza",
    price: 8.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 16,
    title: "Blueberry Cheesecake",
    price: 5.99,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 17,
    title: "Bacon Cheeseburger",
    price: 11.49,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 18,
    title: "Salmon Teriyaki",
    price: 13.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 19,
    title: "Vanilla Milkshake",
    price: 4.99,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 20,
    title: "BBQ Chicken Pizza",
    price: 9.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 21,
    title: "Turkey Sandwich",
    price: 7.49,
    image: "/burg.png",
    category: "breakfast",
  },
  {
    id: 22,
    title: "Strawberry Smoothie",
    price: 5.49,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 23,
    title: "Garlic Butter Shrimp",
    price: 14.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 24,
    title: "Four Cheese Pizza",
    price: 10.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 25,
    title: "Mushroom Risotto",
    price: 12.49,
    image: "/pesto.png",
    category: "main-dishes",
  },
];
