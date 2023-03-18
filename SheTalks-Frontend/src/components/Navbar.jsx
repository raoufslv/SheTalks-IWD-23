import React from "react";

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    const offsetTop = element.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <navbar className=" flex justify-between p-5 content-center items-center ml-20 mr-12 text-xl">
      <img
        src="/tach.svg"
        className=" absolute right-0 top-0 z-0 w-48"
        alt=""
      />
      <a href="/">
        <img src="/Logo.svg" alt="logo hna" />
      </a>

      <div className=" flex gap-36 items-center">
        <ul className=" flex gap-16 font-bold ">
          <li className="font-bold">
            <button onClick={() => scrollToSection("#AboutUs")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("#features")}>
              Our Features
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("#Testmonials")}>
              Testmonials
            </button>
          </li>
        </ul>
        <a href="/LogIn">
          <button className=" shadow font-bold secondary-color bg-white rounded-xl px-3 py-2 relative z-30">
            Login
          </button>
        </a>
      </div>
    </navbar>
  );
};

export default Navbar;
