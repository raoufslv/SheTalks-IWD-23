import React from "react";

const NewNavbar = () => {
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
            <img
              src="/RectangleTop.svg"
              className=" w-32 absolute top-0 z-0 -mr-20 -ml-8"
              alt=""
            />
            <button
              className="relative text-white"
              onClick={() => scrollToSection("#AboutUs")}
            >
              Stories
              {/* <hr className=" bg-thrid h-1 rounded mt-2" /> */}
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("#features")}>
              Meetings
              <hr className=" bg-thrid h-1 rounded mt-2" />
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("#Testmonials")}>
              Articles
              <hr className=" bg-thrid h-1 rounded mt-2" />
            </button>
          </li>

          <li>
            <button onClick={() => scrollToSection("#Testmonials")}>
              Counselor
              <hr className=" bg-thrid h-1 rounded mt-2" />
            </button>
          </li>

          <li>
            <button onClick={() => scrollToSection("#Testmonials")}>
              <img src="/settings.svg" className="w-10" alt="" />
            </button>
            <button onClick={() => scrollToSection("#Testmonials")}>
              <img src="/Messages.svg" className="w-10" alt="" />
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

export default NewNavbar;
