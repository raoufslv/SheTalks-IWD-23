import React, { Component } from "react";
import axios from "axios";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    if (this.state.username === "" || this.state.password === "") {
      alert("Please fill all the fields");
      return;
    } else if (this.state.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    console.log(this.state);

    // send the data to the server

    const { username, password } = this.state;
    axios
      .post("http://localhost:5001/LogIn", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 201) {
          alert("Login successful");
          // redirect to the home page
          this.props.history.push("/");
        } else {
          alert("Login failed");
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
          <h1 className=" text-4xl font-bold text-center flex gap-5 justify-center items-center pt-10">
            Enter as a
            <a href="/" className="flex  justify-center items-center gap-3">
              <span className="text-black"> Guest</span>
              <img src="/rightArrow.svg" alt="" />
            </a>
          </h1>

          <h2 className=" text-4xl font-bold text-center  pt-10">Login</h2>

          <form
            onSubmit={this.handleSubmit}
            className="flex flex-col gap-6 justify-center items-center pt-10"
          >
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="username" className="text-xl m-3 font-semibold">
                Username
              </label>
              <input
                type="text"
                className=" py-3 px-16 shadow flex justify-center items-center text-black rounded-xl"
                name="username"
                placeholder=""
                value={this.state.username}
                onChange={this.handleChange}

              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="password" className="text-xl m-3 font-semibold">
                Password
              </label>
              <input
                type="password"
                className=" py-3 px-16 shadow  flex justify-center items-center text-black rounded-xl"
                name="password"
                placeholder
                value={this.state.password}
                onChange={this.handleChange}
              />
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
  }
}

export default LogIn;
