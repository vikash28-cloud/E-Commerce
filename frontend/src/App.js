import React from "react";
import Header from "./Components/layout/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader"


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
    </Router>
  );
};

export default App;
