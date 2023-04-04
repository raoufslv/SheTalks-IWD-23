import React, { Component } from "react";
import axios from "axios";
import NewNavbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import Post from "../components/Post";
import Model from "../components/Model";

const Posts = () => {
  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/Posts", {
        withCredentials: true,
      });

      if (response.data.message == "found") {
        return response.data.posts;
      } else if (response.data.message == "not found") {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
      <NewNavbar />
      <div className="bg-thrid mt-12">
        <h1 className="text-center text-white text-3xl font-bold py-2">
          Express your feelings
        </h1>
      </div>

      <div className="mx-20">
        <div className=" mt-10 flex flex-row-reverse gap-10">
          <div className="  w-[30rem] bg-fourth rounded-xl p-5 flex flex-col justify-around gap-10 mb-10">
            <div>
              <h2 className=" text-center font-semibold text-xl">
                {" "}
                Search for a story
              </h2>
              <div className="relative flex justify-center">
                <input
                  type="text"
                  className="rounded-lg my-2 px-2 py-3 w-full"
                  placeholder="Period issues"
                />
                <button>
                  <img
                    src="/receiptsearch.svg"
                    className="absolute right-5 bottom-5"
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div>
              <h3 className=" text-lg font-semibold  my-2">
                filtres
                <hr className=" h-1 bg-thrid rounded w-10" />
              </h3>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                Newest
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                Algeria
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                month ago
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                week ago
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                most liked
              </button>

              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                relevant
              </button>

              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                newest
              </button>
            </div>

            <div>
              <h3 className=" text-lg font-semibold my-2">
                Topics
                <hr className=" h-1 bg-thrid rounded w-10" />
              </h3>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                depression
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                violence
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                period issues
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                sexual harassment
              </button>
              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                racism
              </button>

              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                sexism
              </button>

              <button className="bg-thrid px-4 py-1 m-1 text-white rounded-xl">
                body image
              </button>
            </div>

            <Model />
          </div>

          <div className="">
            <div className="flex flex-col gap-10">
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post_id={post._id}
                  title={post.title}
                  description={post.description}
                  createdAt={post.createdAt}
                  user_id={post.user_id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Posts;
