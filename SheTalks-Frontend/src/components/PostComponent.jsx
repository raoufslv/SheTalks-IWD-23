import React from "react";
import axios from "axios";

const Post = ({
  post_id,
  title,
  user_id,
  description,
  createdAt,
  tags,
  feelings,
  anonymous,
}) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);

  const likePost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/likePost/${post_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.message == "liked") {
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // unlike post
  const unlikePost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/unlikePost/${post_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.message == "unliked") {
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get the user name and image
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/Auser/${user_id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.message == "found") {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const countLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/countLikes/${post_id}`,
        {
          withCredentials: true,
        }
      );
      setLikes(response.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLiked = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/checkLiked/${post_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.message == "liked") {
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    checkLiked();
    countLikes();
  }, [liked, likes]);

  return (
    <div className="flex flex-col gap-3 mb-5 w-[60rem]">
      <div className="bg-fourth py-3 rounded px-3 flex items-center gap-3 justify-between">
        <div className=" flex gap-2">
          {anonymous ? (
            <img src="/anonym.svg" className="w-14" alt="" />
          ) : (
            <img src="/womenPost.png" className="w-14" alt="" />
          )}
          <div className="">
            <h2 className=" text-lg font-medium ">
              {anonymous ? "Anonymous" : firstName + " " + lastName}
            </h2>
            <p className=" text-xs">
              is feeling <span className="font-bold">{feelings}</span>
            </p>
          </div>
        </div>
        <h3 className=" flex gap-2 justify-center items-center secondary-color">
          <img src="/timer1.svg" alt="" />
          {createdAt &&
            createdAt.split("T")[0] &&
            createdAt.split("T")[0].split("-").reverse().join("-")}
        </h3>
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p>{description}</p>

      <div className="bg-fourth py-3 rounded px-2 flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className=" flex justify-center items-center">
            {liked ? (
              <img
                src="/heart.svg"
                className="cursor-pointer"
                onClick={unlikePost}
                alt=""
              />
            ) : (
              <img
                src="/heartEmpty.svg"
                className="cursor-pointer"
                onClick={likePost}
                alt=""
              />
            )}
            {likes}
          </div>
          <div className=" flex justify-center items-center">
            <img src="/directup.svg" alt="" />
            23
          </div>
          <div className=" flex justify-center items-center">
            <img src="/messagetext1.svg" alt="" />
            12
          </div>
        </div>
        <div>
          <div className=" flex gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
              className="bg-thrid text-white py-1 px-3 rounded-lg">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
