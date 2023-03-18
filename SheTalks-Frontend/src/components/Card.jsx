import React from "react";

const Card = ({ icon, title, text }) => {
  return (
    <div className=" shadow rounded-xl text-white   flex flex-col ">
      <div className="  py-5 px-5 flex flex-col justify-center items-center bg-secondary mb-2 rounded-t-xl flex-grow ">
        <img src={icon} className=" w-44 p-5" alt="" />
        <h3 className=" text-xl font-bold">{title}</h3>
        <p className=" w-64 text-center">{text}</p>
      </div>

      <div className="bg-primary p-5 flex justify-center rounded-b-xl ">
        <button
          className=" text-xl font-bold"
          onClick={() => window.open("/SignUp")}
        >
          Discover
        </button>
      </div>
    </div>
  );
};

export default Card;
