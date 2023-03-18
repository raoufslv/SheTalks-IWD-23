import React from "react";

const Footer = () => {
  return (
    <div className=" bg-secondary flex gap-10 text-white pt-10 pb-6 px-10  items-around  content-around justify-around">
      <div className=" flex flex-col content-around justify-around w-1/3">
        <img src="LogoWhite.svg" className=" w-44" alt="" />
        <div>
          <h3 className="font-bold text-xl">About us</h3>
          <p>
            A woman's mental health platform that focuses on providing mental
            health resources, support, and information
          </p>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-start gap-2 relative">
        <h3 className=" text-xl font-bold">Contact information</h3>
        <ul className=" flex flex-col justify-center items-start gap-1">
          <li>
            <a href="" className=" flex justify-center items-center  gap-1">
              <img src="/Email.svg" className="  w-8" alt="" />
              Shetalks@support.com
            </a>
          </li>
          <li>
            <a href="" className=" flex justify-center items-center gap-1">
              <img src="/Contact phone.svg" className="  w-7" alt="" />
              +213 552474189
            </a>
          </li>
          <li>
            <a href="" className=" flex justify-center items-center  gap-1">
              <img src="/Discord Bubble.svg" className="  w-8" alt="" />
              Join our Discord server
            </a>
          </li>
        </ul>
        <p className="pt-3">Copyright © 2023 All rights reserved.</p>
      </div>

      <div className=" w-1/3 flex flex-col justify-center items-center pl-20 gap-5">
        <h3 className=" text-xl font-bold text-start">SheTalks</h3>
        <ul className=" flex flex-col justify-center items-start gap-2">
          <li>
            <a href="" className=" flex justify-center items-center">
              <img src="/arrowright2.svg" alt="" />
              Get Started
            </a>
          </li>
          <li>
            <a href="" className=" flex justify-center items-center">
              <img src="/arrowright2.svg" alt="" />
              Get Premium
            </a>
          </li>
          <li>
            <a href="" className=" flex justify-center items-center">
              <img src="/arrowright2.svg" alt="" />
              Documentaton
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
