import React, { Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Hero2 from "../../components/hero2";
import Category2 from "../../components/Category2";
import About from "../../components/about";
import Product from "../../components/Product";
import OfferSection from "../../components/OfferSection";
import FlashSale from "../../components/FlashSale";
import Project from "../../components/Project";
// === YAHAN BADLAV KIYA GAYA HAI ===
// 1. Sahi component ka naam (ChiaMistakes) import kiya gaya hai.
// 2. Naam ko Capital letter (PascalCase) se shuru kiya gaya hai.
import ChiaMistakes from "../../components/chiaMistakes";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import BlogSection from "../../components/BlogSection";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Warriorhero from "../../components/Warriorhero";
import { addToCart, addToWishList } from "../../store/actions/action";
import api from "../../api";

const HomePage2 = ({ addToCart, addToWishList }) => {
  const productsArray = api();

  const addToCartProduct = (product) => {
    addToCart(product);
  };

  const addToWishListProduct = (product) => {
    addToWishList(product);
  };

  const products = productsArray;

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <Hero2 />
      <Category2 />
      <About />
      <Product
        addToCartProduct={addToCartProduct}
        addToWishListProduct={addToWishListProduct}
        products={products}
      />
      <OfferSection />
      <FlashSale
        addToCartProduct={addToCartProduct}
        addToWishListProduct={addToWishListProduct}
        products={products}
      />
      <Project />
      {/* === YAHAN BHI BADLAV KIYA GAYA HAI === */}
      {/* 3. Component ko Capital letter se shuru karke istemal kiya gaya hai. */}
      <ChiaMistakes />
      <Warriorhero />
      <Service />
      <Testimonial />
      <Client />
      <BlogSection />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default connect(null, { addToCart, addToWishList })(HomePage2);
