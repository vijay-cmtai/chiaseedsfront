import React, { Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Hero from "../../components/hero";
import Category from "../../components/Category";
import Product from "../../components/Product";
import OfferSection from "../../components/OfferSection";
import FlashSale from "../../components/FlashSale";
import Project from "../../components/Project";
import ChiaMistakes from "../../components/chiaMistakes";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import BlogSection from "../../components/BlogSection";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import WarriorHero from "../../components/Warriorhero";
import { addToCart, addToWishList } from "../../store/actions/action";
import api from "../../api";

const HomePage = ({ addToCart, addToWishList }) => {
  const productsArray = api();

  const addToCartProduct = (product, qty = 1) => {
    addToCart(product, qty);
  };
  const addToWishListProduct = (product, qty = 1) => {
    addToWishList(product, qty);
  };

  const products = productsArray;

  return (
    <Fragment>
      <Navbar hClass={"header-style-1"} />
      <Hero />
      <Category />
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
      <ChiaMistakes />
      <WarriorHero />
      <Service />
      <Testimonial />
      <Client />
      <BlogSection />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default connect(null, { addToCart, addToWishList })(HomePage);
