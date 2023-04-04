import React from "react";
import axios from "axios";
import MyContext from "../utils/MyContext";

const LogIn = () => {
  const {
    connected,
    setConnected,
    username,
    setUsername,
    setUserid,
    setUserType,
    setEmail,
    setFirstName,
    setLastName,
    setAge,
    setPhone,
  } = React.useContext(MyContext);
  const [password, setPassword] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "username") {
      setUsername(value);
      if (value == "") {
        document.getElementById("userNameEmpty").classList.remove("hidden");
        document.getElementById("userNameIncorrect").classList.add("hidden");
      } else {
        document.getElementById("userNameEmpty").classList.add("hidden");
        document.getElementById("userNameIncorrect").classList.add("hidden");
      }
    } else {
      setPassword(value);
      if (value == "") {
        document.getElementById("passwordEmpty").classList.remove("hidden");
        document.getElementById("passwordIncorrect").classList.add("hidden");
      } else {
        document.getElementById("passwordEmpty").classList.add("hidden");
        document.getElementById("passwordIncorrect").classList.add("hidden");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = false;

    if (username == "") {
      errors = true;
      document.getElementById("userNameEmpty").classList.remove("hidden");
    }

    if (password == "") {
      errors = true;
      document.getElementById("passwordIncorrect").classList.remove("hidden");
    }

    if (errors) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/LogIn",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message == "user logged in") {
        setConnected(true);
        setUserid(response.data.user_id);
        setUserType(response.data.userType);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setAge(response.data.age);
        setPhone(response.data.phone);

        window.location.href = "/Posts";
      }
    } catch (error) {
      try {
        console.log("error :", error);
        if (error.response.data.message === "no account") {
          console.log("no account with this username");
          document
            .getElementById("userNameIncorrect")
            .classList.remove("hidden");
          return;
        }

        if (error.response.data.message === "password incorrect") {
          console.log("password incorrect");
          document
            .getElementById("passwordIncorrect")
            .classList.remove("hidden");
          return;
        }
      } catch (error) {
        console.log("error :", error);
      }
    }
  };

  return (
    <div className="w-screen flex h-screen text-white">
      <div className="w-1/2 flex justify-center items-center">
        <a href="/">
          <img src="/Logo.svg" className="w-96" alt="" />
        </a>
      </div>
      <div className="w-1/2 bg-thrid border-l-8 border-primary">
        <h1 className=" text-4xl font-bold text-center flex gap-5 justify-center items-center pt-10">
          Enter as a
          <a href="/" className="flex  justify-center items-end gap-3">
            <span className="text-black"> Guest</span>
            <img src="/rightArrow.svg" className="w-8" alt="" />
          </a>
        </h1>

        <h2 className=" text-4xl font-bold text-center  pt-10">Login</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center pt-10"
        >
          <div className="flex flex-col justify-center items-start relative">
            <label htmlFor="username" className="text-xl m-3 font-semibold">
              Username
            </label>
            <input
              type="text"
              className=" py-3 px-5 w-[20rem] shadow flex justify-center items-center text-black rounded-xl"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <span
              id="userNameEmpty"
              className="text-sm text-red-700 top-[6.3rem] absolute hidden"
            >
              *please enter your username*
            </span>
            <span
              id="userNameIncorrect"
              className="text-sm text-red-700 top-[6.3rem] absolute hidden"
            >
              *there is no account with this username*
            </span>
          </div>
          <div className="flex flex-col justify-center items-start relative">
            <label htmlFor="password" className="text-xl m-3 font-semibold">
              Password
            </label>
            <input
              type="password"
              className=" py-3 px-5 w-[20rem] shadow  flex justify-center items-center text-black rounded-xl"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <span
              id="passwordEmpty"
              className="text-sm text-red-700 absolute top-[6.3rem] hidden"
            >
              *please enter your password*
            </span>
            <span
              id="passwordIncorrect"
              className="text-sm text-red-700 absolute top-[6.3rem] hidden"
            >
              *your password is incorrect*
            </span>
          </div>

          <button
            // type="submit"
            className=" bg-secondary text-xl font-bold px-7 py-2 mt-7 rounded-xl"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col justify-center items-center gap-10">
          <a href="" className="text-center text-sm font-semibold">
            Forget Password ?
          </a>
          <p className="text-black  font-semibold">
            you don't have an account,{" "}
            <a href="/SignUp" className="text-white">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
