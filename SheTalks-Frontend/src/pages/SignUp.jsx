import React, { Component } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      age: "",
      username: "",
      email: "",
      password: "",
      Confirmpassword : "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // check if the labels are not empty
    if (
      this.state.FirstName === "" ||
      this.state.LastName === "" ||
      this.state.phone === "" ||
      this.state.age === "" ||
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      alert("Please fill all the fields");
      return;
    } else if (this.state.password.length < 8) {
      alert("password must be at least 8 characters");
      return;
    }
    // check if the confirm password is the same as the password
    if (this.state.password !== this.state.Confirmpassword) {
      alert("password and Confirm password must be the same");
      return;
    }


    console.log(this.state);

    // send the data to the server

    const { FirstName, LastName, phone, age, username, email, password } =
      this.state;
    axios 
      .post("http://localhost:5001/SignUp", {
        phone,
        age,
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("SignUp successful!");
          // redirect to posts page
          redirect("/posts")
        } else {
          alert("SignUp failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="w-screen flex h-screen text-white">
        <div className="w-1/2 flex justify-center items-center">
          <a href="/">
            <img src="/Logo.svg" className="w-96" alt="" />
          </a>
        </div>
        <div className="w-1/2 bg-thrid border-l-8 border-primary">
          <h2 className=" text-5xl font-bold text-center  pt-16">Sign up</h2>

          <form onSubmit={this.handleSubmit}
            className="flex flex-col gap-6 justify-center items-center pt-10"
          >
            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-start">
                <label
                  htmlFor="FirstName"
                  className="text-xl m-3 font-semibold"
                >
                  Frst name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="FirstName"
                  placeholder="Abderrahman"
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <label htmlFor="LastName" className="text-xl m-3 font-semibold">
                  Last name
                </label>
                <input
                  type="text"
                  name="LastName"
                  className=" py-3 px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="LastName"
                  placeholder="Tamazouzt"

                />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-start">
                <label
                  htmlFor="phone"
                  className="text-xl m-3 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="phone"
                  placeholder="06 00 00 00 00"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <label htmlFor="age" className="text-xl m-3 font-semibold">
                  age
                </label>
                <input
                  type="text"
                  name="age"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="age"
                  placeholder="20"
                  value={this.state.age}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-start">
                <label htmlFor="username" className="text-xl m-3 font-semibold">
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="username"
                  placeholder="Abderrahman"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <label htmlFor="email" className="text-xl m-3 font-semibold">
                  email
                </label>
                <input
                  type="text"
                  name="email"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="email"
                  placeholder="DahmanTamazozta02@gmail.com "
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col justify-center items-start">
                <label htmlFor="password" className="text-xl m-3 font-semibold">
                  password
                </label>
                <input
                  type="text"
                  name="password"
                  className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                  id="password"
                  placeholder="********"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
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
                  value={this.state.Confirmpassword}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <button
              //   type="submit"
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
  }
}

export default SignUp;
