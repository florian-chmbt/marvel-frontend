import React from "react";

// import image
// import loader from "../assets/loader.svg";
import Logo from "../assets/marvel-logo.png";

const Loader = () => {
  return (
    <div className="loader">
      {/* <img alt="loader" src={loader} /> */}
      <img alt="loader" src={Logo} />
    </div>
  );
};

export default Loader;
