import React from "react";
import logo from "assets/img/logo.svg";

const Header = () => {
  return (
    <div className="p-5">
      <img role="img" className="h-16 w-16" src={logo} alt="" />
    </div>
  );
};

export default Header;
