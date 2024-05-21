import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download our APP </h4>
            <p>Download App for Android and IOS mobile Phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
          <h1>ECOMMERCE.</h1>
          <p>High quality is our First Priority</p>

          <p>Copyright 2021 &copy; Vikash Sharma </p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="https://github.com/vikash28-cloud/">GitHub</a>
          <a href="https://github.com/vikash28-cloud/">LinkedIn</a>
          <a href="https://github.com/vikash28-cloud/">Twitter</a>
        </div>  
    </footer>
  )
}

export default Footer