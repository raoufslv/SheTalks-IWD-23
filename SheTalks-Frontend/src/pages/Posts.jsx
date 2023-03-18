import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewNavbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import Post from "../components/Post";

class Posts extends Component {
  render() {
    return (    
      <div>
        <NewNavbar />
        <div className="bg-thrid mt-12">
          <h1 className="text-center text-white text-3xl font-bold py-2">
            Turning Pain into Power
          </h1>
        </div>

        <div className="mx-20">
          <div className=" mt-4 flex gap-5">
            <button className="bg-thrid px-4 py-1 text-white rounded-xl">
              Newest
            </button>
            <button className="bg-thrid px-4 text-white rounded-xl">
              Trauma
            </button>
          </div>
          <div className=" mt-10 flex flex-row-reverse gap-10">
            <div className="  w-[17rem] bg-fourth rounded-xl p-5 flex flex-col justify-around gap-10 mb-10">
              <div>
                <h2 className=" text-center font-semibold text-xl">
                  {" "}
                  Search for a story
                </h2>
                <div className="relative flex justify-center">
                  <input
                    type="text"
                    className="rounded-lg my-2 px-2 py-1"
                    placeholder="Period issues"
                  />
                  <img
                    src="/receiptsearch.svg"
                    className="absolute right-7 bottom-3"
                    alt=""
                  />
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

              <button className="bg-secondary text-white text-xl font-semibold rounded-lg py-3">
                Add your story
              </button>
            </div>

            <Post/>

          </div>
        </div>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default Posts;
