import React from "react";
import axios from "axios";
import MyContext from "../utils/MyContext";



const SignUp = () => {
  const {
    setConnected,
    setUserid,
    username,
    setUsername,
    email,
    setEmail,
    FirstName,
    setFirstName,
    LastName,
    setLastName,
    age,
    setAge,
    setUserType,
    phone,
    setPhone,
  } = React.useContext(MyContext);

  const [password, setPassword] = React.useState("");
  const [Confirmpassword, setConfirmpassword] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "FirstName":
        setFirstName(value);
        if (value === "") {
          document.getElementById("FirstName-error").classList.remove("hidden");
        } else {
          document.getElementById("FirstName-error").classList.add("hidden");
        }
        break;
      case "LastName":
        setLastName(value);
        if (value === "") {
          document.getElementById("LastName-error").classList.remove("hidden");
        } else {
          document.getElementById("LastName-error").classList.add("hidden");
        }
        break;
      case "phone":
        // accept only numbers
        if (value.match(/^[0-9]*$/)) {
          setPhone(value);
        }
        if (value === "") {
          document.getElementById("phone-error").classList.remove("hidden");
        } else {
          document.getElementById("phone-error").classList.add("hidden");
        }
        break;
      case "age":
        // accept only numbers
        if (value.match(/^[0-9]*$/)) {
          setAge(value);
        }
        if (value === "") {
          document.getElementById("age-error").classList.remove("hidden");
        } else {
          document.getElementById("age-error").classList.add("hidden");
        }
        break;
      case "username":
        setUsername(value);
        if (value === "") {
          document.getElementById("username-error").classList.remove("hidden");
        } else {
          document.getElementById("username-error").classList.add("hidden");
        }
        break;
      case "email":
        setEmail(value);

        if (value === "") {
          document.getElementById("email-error").classList.remove("hidden");
          document.getElementById("email-valid").classList.add("hidden");
          document.getElementById("email-used").classList.add("hidden");
        } else {
          document.getElementById("email-error").classList.add("hidden");
          document.getElementById("email-valid").classList.add("hidden");
          document.getElementById("email-used").classList.add("hidden");
        }
        break;
      case "password":
        setPassword(value);
        if (value === "") {
          document.getElementById("password-length").classList.add("hidden");
          document.getElementById("password-error").classList.remove("hidden");
        } else {
          document.getElementById("password-error").classList.add("hidden");
          if (value.length < 8) {
            document
              .getElementById("password-length")
              .classList.remove("hidden");
          } else {
            document.getElementById("password-length").classList.add("hidden");
          }
        }
        break;
      case "Confirmpassword":
        setConfirmpassword(value);
        if (value === "") {
          document
            .getElementById("Confirmpassword-error")
            .classList.remove("hidden");
          document
            .getElementById("Confirmpassword-match")
            .classList.add("hidden");
        } else {
          document
            .getElementById("Confirmpassword-error")
            .classList.add("hidden");
          if (value !== password) {
            document
              .getElementById("Confirmpassword-match")
              .classList.remove("hidden");
          } else {
            document
              .getElementById("Confirmpassword-match")
              .classList.add("hidden");
          }
        }
        break;
      default:
        break;
    }
  };

  // keep listening to fields changes

  const handleSubmit = async (e) => {
    let errors = false;
    e.preventDefault();
    // verify for each field it's condition is met
    if (FirstName === "") {
      document.getElementById("FirstName-error").classList.remove("hidden");
      errors = true;
    }
    if (LastName === "") {
      document.getElementById("LastName-error").classList.remove("hidden");
      errors = true;
    }
    if (phone === "") {
      document.getElementById("phone-error").classList.remove("hidden");
      errors = true;
    }
    if (age === "") {
      document.getElementById("age-error").classList.remove("hidden");
      errors = true;
    }
    if (username === "") {
      document.getElementById("username-error").classList.remove("hidden");
      errors = true;
    }
    if (email === "") {
      document.getElementById("email-error").classList.remove("hidden");
      errors = true;
    } else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null) {
      document.getElementById("email-valid").classList.remove("hidden");
      errors = true;
    }
    if (password === "") {
      document.getElementById("password-error").classList.remove("hidden");
      errors = true;
    } else if (password.length < 8) {
      document.getElementById("password-length").classList.remove("hidden");
      errors = true;
    }

    if (Confirmpassword === "") {
      document
        .getElementById("Confirmpassword-error")
        .classList.remove("hidden");
      document.getElementById("Confirmpassword-match").classList.add("hidden");
      errors = true;
    } else if (password !== Confirmpassword) {
      document
        .getElementById("Confirmpassword-match")
        .classList.remove("hidden");
      errors = true;
    }
    // if there is an error stop the function
    if (errors) {
      return;
    }
    // send the data to the server
    try {
      const response = await axios.post(
        "http://localhost:5001/SignUp",
        {
          FirstName,
          LastName,
          phone,
          age,
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.data === "user created") {
        // recover the user data
        const user = response.data.user;
        // set every attribute
        setConnected(true);
        setUserid(user._id);
        setUserType(user.userType);

        // redirect to the Posts page
        window.location.href = "/Posts";
      }
    } catch (error) {
      try {
        console.log("error :", error);
        if (error.response.data.data === "email is taken") {
          console.log("email used");
          document.getElementById("email-used").classList.remove("hidden");
          return;
        }
        // if the username is already used
        if (error.response.data.data === "username is taken") {
          console.log("username used");
          document.getElementById("username-used").classList.remove("hidden");
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
        <h2 className=" text-5xl font-bold text-center  pt-16">Sign up</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center pt-10"
        >
          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="FirstName" className="text-xl m-3 font-semibold">
                First name
              </label>
              <input
                type="text"
                name="FirstName"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="FirstName"
                placeholder="Abderrahman"
                onChange={handleChange}
                value={FirstName}
              />
              <span
                id="FirstName-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your FirstName*
              </span>
            </div>
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="LastName" className="text-xl m-3 font-semibold">
                Last name
              </label>
              <input
                type="text"
                name="LastName"
                className=" py-3 px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="LastName"
                placeholder="Tamazouzt"
                value={LastName}
                onChange={handleChange}
              />
              <span
                id="LastName-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your LastName*
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="phone" className="text-xl m-3 font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="phone"
                placeholder="06 00 00 00 00"
                value={phone}
                onChange={handleChange}
              />
              <span
                id="phone-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your phone number*
              </span>
            </div>
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="age" className="text-xl m-3 font-semibold">
                age
              </label>
              <input
                type="text"
                name="age"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="age"
                placeholder="20"
                value={age}
                onChange={handleChange}
              />
              <span
                id="age-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your age*
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="username" className="text-xl m-3 font-semibold">
                username
              </label>
              <input
                type="text"
                name="username"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="username"
                placeholder="Abderrahman"
                value={username}
                onChange={handleChange}
              />
              <span
                id="username-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your username*
              </span>
              <span
                id="username-used"
                className="text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *This username is already used*
              </span>
            </div>
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="email" className="text-xl m-3 font-semibold">
                email
              </label>
              <input
                type="text"
                name="email"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="email"
                placeholder="DahmanTamazozta02@gmail.com "
                value={email}
                onChange={handleChange}
              />
              <span
                id="email-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your email*
              </span>
              <span
                id="email-used"
                className="text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *This email is already used*
              </span>
              <span id="email-valid" className="text-red-700 hidden text-sm">
                *Please enter a valid email*
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="password" className="text-xl m-3 font-semibold">
                password
              </label>
              <input
                type="text"
                name="password"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="password"
                placeholder="********"
                value={password}
                onChange={handleChange}
              />
              <span
                id="password-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your password*
              </span>
              <span
                id="password-length"
                className="text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Your password must be at least 8 characters*
              </span>
            </div>
            <div className="flex flex-col justify-center items-start relative">
              <label
                htmlFor="Confirmpassword"
                className="text-xl m-3 font-semibold"
              >
                Confirm password
              </label>
              <input
                type="text"
                name="Confirmpassword"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="Confirmpassword"
                placeholder="********"
                value={Confirmpassword}
                onChange={handleChange}
              />
              <span
                id="Confirmpassword-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter your Confirmpassword*
              </span>
              <span
                id="Confirmpassword-match"
                className="text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Your password doesn't match*
              </span>
            </div>
          </div>

          <button
            className=" bg-secondary text-xl font-bold px-7 py-2 mt-7 rounded-xl"
          >
            Sign up
          </button>
        </form>
        <a href="/Posts">
          {" "}
          <button>Temporarly</button>
        </a>
      </div>
    </div>
  );
};

export default SignUp;
