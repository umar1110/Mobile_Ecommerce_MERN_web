
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
              src="https://res.cloudinary.com/dvobpdvef/image/upload/v1702994254/WhatsApp_Image_2023-12-19_at_6.57.10_PM_tszfof.jpg"
              alt="Founder"
            />
            <h1 className="font-semibold">M.Umar Aziz</h1>
            <Button onClick={visitInstagram} color="primary">
              Visit Linkdin
            </Button>
            <span>
              This is my MERN Stack complete Project. Some modifications and optimisation left yet.
            </span>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default About;
