import React from "react";
import axios from "axios";
import NewNavbar from "../components/NewNavbar";

const Poster = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "title") {
      setTitle(value);
      if (value == "") {
        document.getElementById("title-error").classList.remove("hidden");
      } else {
        document.getElementById("title-error").classList.add("hidden");
      }
    } else {
      setDescription(value);
      if (value == "") {
        document.getElementById("description-error").classList.remove("hidden");
      } else {
        document.getElementById("description-error").classList.add("hidden");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = false;

    if (title == "") {
      errors = true;
      document.getElementById("title-error").classList.remove("hidden");
    }

    if (description == "") {
      errors = true;
      document.getElementById("description-error").classList.remove("hidden");
    }

    if (errors) {
      return;
    }

    try {
      const response = axios.post(
        "http://localhost:5001/Poster",
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      window.location.href = "/Posts";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NewNavbar />
      <div className="flex items-center justify-center">
        <div className="w-1/2 bg-thrid border-x-8 border-primary  pb-20">
          <h2 className=" text-5xl font-bold text-center  pt-16">
            Publish your post
          </h2>
          <form
            className="flex flex-col gap-6 justify-center items-center pt-10"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-center items-start relative">
              <label htmlFor="title" className="text-xl m-3 font-semibold">
                the title
              </label>
              <input
                type="text"
                name="title"
                className=" py-3  px-5 w-[19.3rem] shadow flex justify-center items-center text-black rounded-xl"
                id="title"
                placeholder="eg: I'm depressed"
                onChange={handleChange}
                value={title}
              />
              <span
                id="title-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter the title*
              </span>
            </div>
            <div className="flex flex-col justify-center items-start relative">
              <label
                htmlFor="description"
                className="text-xl m-3 font-semibold"
              >
                the description
              </label>
              <textarea 
                type="text"
                name="description"
                className=" py-3  px-5 w-[20rem] shadow flex justify-center items-center text-black rounded-xl"
                id="description"
                placeholder=" eg: I have struggled with anxiety for years..."
                onChange={handleChange}
                value={description}
              />
              <span
                id="description-error"
                className=" text-red-700 hidden text-sm absolute top-[6.3rem]"
              >
                *Please enter the description*
              </span>
            </div>
            <button className=" bg-secondary text-xl font-bold px-7 py-2 mt-7 rounded-xl">
              poster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Poster;
