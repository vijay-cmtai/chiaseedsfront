// src/api/blogs.js

// Apne project mein maujood images ka path yahan dein.
// Main aapke purane imports (b1, b2, b3) ka istemaal kar raha hoon.
import b1 from "../images/blog/b1.jpg";
import b2 from "../images/blog/b2.jpg";
import b3 from "../images/blog/b3.webp";

const blogs = [
  {
    id: "1",
    title: "The Ultimate Guide to Chia Seeds: Benefits and Uses",
    screens: b1, // Image for the list page
    blogSingleImg: b1, // Image for the detail page
    author: "Healthy Living Co.",
    create_at: "22 MAY, 2024",
    comment: "15",
    // --- DYNAMIC CONTENT FOR DETAIL PAGE ---
    description:
      "Chia seeds are the tiny black seeds from the Salvia hispanica plant, a member of the mint family. Despite their small size, they are one of the most nutritious foods on the planet. They're loaded with fiber, protein, omega-3 fatty acids, and various micronutrients.",
    quote:
      "A powerhouse of nutrition in a tiny package. The journey to a healthier you can start with a single seed.",
    conclusion:
      "Incorporating chia seeds into your diet is simple. You can add them to smoothies, yogurt, oatmeal, or even use them as an egg substitute in baking. Their versatility and incredible health benefits make them a must-have in any modern kitchen.",
  },
  {
    id: "2",
    title: "5 Delicious Chia Seed Pudding Recipes to Try Today",
    screens: b2,
    blogSingleImg: b2,
    author: "Nutri-Boost Recipes",
    create_at: "20 MAY, 2024",
    comment: "8",
    // --- DYNAMIC CONTENT FOR DETAIL PAGE ---
    description:
      "Looking for a healthy and delicious breakfast or snack? Chia seed pudding is your answer! It's incredibly easy to make, packed with nutrients, and can be customized with your favorite toppings. It's the perfect meal prep option for busy mornings.",
    quote:
      "Breakfast is the most important meal of the day. Make it count, make it delicious.",
    conclusion:
      "Simply mix chia seeds with your choice of milk (almond, coconut, or dairy) and a sweetener. Let it sit for a few hours or overnight. Top with fresh fruits, nuts, or a drizzle of honey for a delightful treat.",
  },
  {
    id: "3",
    title: "Chia Seeds for Weight Loss: Fact or Fiction?",
    screens: b3,
    blogSingleImg: b3,
    author: "Wellness Experts",
    create_at: "18 MAY, 2024",
    comment: "21",
    // --- DYNAMIC CONTENT FOR DETAIL PAGE ---
    description:
      "Many health enthusiasts claim that chia seeds can aid in weight loss. The high fiber and protein content in chia seeds can help you feel full for longer, which may reduce overall calorie intake. The fiber also aids in healthy digestion.",
    quote: "Small seeds, big impact on your health goals.",
    conclusion:
      "While chia seeds are not a magic bullet for weight loss, they can be a valuable addition to a balanced diet and active lifestyle. Their ability to promote satiety makes them a smart choice for those looking to manage their weight.",
  },
];

export default blogs;
