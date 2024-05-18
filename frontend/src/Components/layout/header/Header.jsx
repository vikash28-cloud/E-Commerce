import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png"
import {FaUserAlt, FaSearch ,FaShoppingCart } from "react-icons/fa"
const Header = () => {
  return (
    <ReactNavbar
    navColor1="rgba(0,0,0,0.3)"
    navColor2="rgba(0,0,0,0.1)"
    navColor3="rgba(0,0,0,0.1)"
    navColor4="rgba(0,0,0,0.1)"
      logo={logo}
      burgerColor="#f76c61"
      burgerColorHover="#fc1202"
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconUrl="/login"
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"

      profileIcon = {true}
      ProfileIconElement={FaUserAlt}
      searchIcon = {true}
      SearchIconElement ={FaSearch }
      cartIcon={true}
      CartIconElement= {FaShoppingCart }
    />
  );
};

export default Header;
