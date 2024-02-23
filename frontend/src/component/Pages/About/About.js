
import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.linkedin.com/in/umar-aziz-b23b21250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
  };
  return (
    <div className="aboutSection mt-16">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer mt-16">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dvobpdvef/image/upload/v1708695561/aaf936da-0222-4901-b2b5-e008f48bc2fc_rmtkrd.jpg"
              alt="Founder"
            />
            <h1 className="font-semibold">Tech Cave</h1>
           
            <span>
                 Wait for further about , we are working on it 
            </span>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default About;
