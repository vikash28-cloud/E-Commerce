import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css"
import Header from "./Components/layout/header/Header";
import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/Home/Home.jsx";
import ProductDetails from "./Components/Product/ProductDetails.jsx"
const App = () => {
  // we have to load fonts first on start
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
