import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
       
      </div>

      <div className="midFooter">
        <h1>CellCave.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/umar-aziz-b23b21250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Linkdin</a>
        <a href="https://www.instagram.com/umar_aziz_0?igshid=YzVkODRmOTdmMw%3D%3D&utm_source=qr">Instagram</a>
        <a href="https://www.facebook.com/USA.21.06.umar?mibextid=LQQJ4d">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;