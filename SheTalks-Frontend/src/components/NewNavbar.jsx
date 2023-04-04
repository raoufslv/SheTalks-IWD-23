import React from "react";
import axios from "axios";

const NewNavbar = () => {
  const checkConnected = async () => {
    const response = await axios.get("http://localhost:5001/checkConnected", {
      withCredentials: true,
    });
    try {
      if (response.data.message == "user connected") {
        setConnected(true);
        return true;
      } else {
        setConnected(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setConnected(false);
      return false;
    }
  };

  const [connected, setConnected] = React.useState(
    checkConnected().then((res) => {
      return res;
    })
  );

  React.useEffect(() => {
    checkConnected().then((res) => {
      setConnected(res);
    });
  }, [connected]);

  const logout = async () => {
    const response = await axios.get("http://localhost:5001/logout", {
      withCredentials: true,
    });

    try {
      if (response.data.message == "User is logged out") {
        setConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex justify-between p-5 content-center items-center ml-20 mr-12 text-xl">
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
        {connected ? (
          <button
            id="btn-logout"
            className=" shadow font-bold secondary-color bg-white rounded-xl px-3 py-2 relative z-30"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <a href="/LogIn">
            <button
              id="btn-login"
              className=" shadow font-bold secondary-color bg-white rounded-xl px-3 py-2 relative z-30"
            >
              Login
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default NewNavbar;
