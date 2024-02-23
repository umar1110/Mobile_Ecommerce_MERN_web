import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:umar10022004@gmail.com">
        <Button>Contact: umarbusiness1110@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;