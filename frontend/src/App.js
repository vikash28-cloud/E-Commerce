import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader"

import Header from "./Components/layout/header/Header";
import Footer from "./Components/layout/footer/Footer";


const App = () => {
// we have to load fonts first on start
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    })
  },[])

  return (
    <Router>
      <Header />
      <Footer/>
    </Router>
  );
};

export default App;
