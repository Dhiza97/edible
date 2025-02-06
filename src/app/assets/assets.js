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
    name: "Combos",
    description: "Discover our wide range of burgers, pizzas, and smoothies.",
    link: "/combos",
  },
  {
    id: 2,
    image: <RiDrinks2Fill />,
    name: "Drinks",
    description:
      "Experience our fresh and healthy options in our smoothie bar.",
    link: "/drinks",
  },
  {
    id: 3,
    image: <LuDessert />,
    name: "Desserts",
    description: "Indulge in our delicious pizza toppings and crusts.",
    link: "/desserts",
  },
  {
    id: 4,
    image: <FaBowlFood />,
    name: "Main Dish",
    description:
      "Get your favorite pasta cooked to perfection with our fresh ingredients.",
    link: "/main-dishes",
  },
];

export const products = [
  {
    id: 1,
    name: "Grilled Chicken Sandwich",
    price: 8.99,
    image: "/burg.png",
    category: "combo",
  },
  {
    id: 2,
    name: "Mozarella Pizza",
    price: 7.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 3,
    name: "Baked Salmon",
    price: 9.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 4,
    name: "Chocolate Cheesecake",
    price: 5.99,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 5,
    name: "Beef Stroganoff",
    price: 12.99,
    image: "/burg.png",
    category: "main-dishes",
  },
  {
    id: 6,
    name: "Pineapple Smoothie",
    price: 4.99,
    image: "/pesto.png",
    category: "drinks",
  },
  {
    id: 7,
    name: "Spicy Chicken Wings",
    price: 6.99,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 8,
    name: "BBQ Beef Burger",
    price: 10.99,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 9,
    name: "Margherita Pizza",
    price: 8.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 10,
    name: "Pepperoni Pizza",
    price: 9.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 11,
    name: "Pesto Pasta",
    price: 7.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 12,
    name: "Tiramisu",
    price: 6.49,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 13,
    name: "Chicken Alfredo",
    price: 11.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 14,
    name: "Fruit Smoothie",
    price: 5.49,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 15,
    name: "Veggie Pizza",
    price: 8.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 16,
    name: "Blueberry Cheesecake",
    price: 5.99,
    image: "/smoothie.png",
    category: "desserts",
  },
  {
    id: 17,
    name: "Bacon Cheeseburger",
    price: 11.49,
    image: "/burg.png",
    category: "combos",
  },
  {
    id: 18,
    name: "Salmon Teriyaki",
    price: 13.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 19,
    name: "Vanilla Milkshake",
    price: 4.99,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 20,
    name: "BBQ Chicken Pizza",
    price: 9.99,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 21,
    name: "Turkey Sandwich",
    price: 7.49,
    image: "/burg.png",
    category: "breakfast",
  },
  {
    id: 22,
    name: "Strawberry Smoothie",
    price: 5.49,
    image: "/smoothie.png",
    category: "drinks",
  },
  {
    id: 23,
    name: "Garlic Butter Shrimp",
    price: 14.99,
    image: "/pesto.png",
    category: "main-dishes",
  },
  {
    id: 24,
    name: "Four Cheese Pizza",
    price: 10.49,
    image: "/pizza.png",
    category: "main-dishes",
  },
  {
    id: 25,
    name: "Mushroom Risotto",
    price: 12.49,
    image: "/pesto.png",
    category: "main-dishes",
  },
];

export const team = [
  {
    id: 1,
    name: "Dhiza Garbs",
    image: "/team1.png",
    position: "Founder & CEO",
  },
  {
    id: 2,
    name: "Sophia Adeyemi",
    image: "/team2.png",
    position: "Head Chef",
  },
  {
    id: 3,
    name: "David Okoro",
    image: "/team3.png",
    position: "Operations Manager",
  },
  {
    id: 4,
    name: "Fayla Bello",
    image: "/team4.png",
    position: "Marketing Lead",
  },
  {
    id: 5,
    name: "Michael Oke",
    image: "/team5.png",
    position: "Customer Relations Manager",
  },
  {
    id: 6,
    name: "Chioma Nwankwo",
    image: "/team6.png",
    position: "Head Pastry Chef",
  },
  {
    id: 7,
    name: "Samuel Etim",
    image: "/team7.png",
    position: "Logistics Coordinator",
  },
  {
    id: 8,
    name: "Grace Oladimeji",
    image: "/team8.png",
    position: "Social Media Manager",
  },
];
