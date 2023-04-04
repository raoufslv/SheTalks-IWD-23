import React, { useState } from "react";
import Modal from "react-awesome-modal";
import CheckBox from "./CheckBox";
import axios from "axios";


const MAX_SELECTIONS = 3;

const Model = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = React.useState("");
  const [story, setStory] = React.useState("");
  const [feeling, setFeeling] = React.useState("");

  const handleOnChangeCheckBox = () => {
    setIsChecked(!isChecked);
  };
  const [visible, setVisible] = React.useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < MAX_SELECTIONS) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCustomTagChange = (event) => {
    setCustomTag(event.target.value);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() !== "" && !tags.includes(customTag)) {
      setTags([...tags, customTag]);
      setCustomTag("");
    }
  };

  const [tags, setTags] = useState(["Violence", "Depression", "racism"]);

  const isTagSelected = (tag) => selectedTags.includes(tag);

  const ShowCustomDiv = () => {
    document.getElementById("CustomDiv").classList.remove("hidden");
    document.getElementById("CustomDiv").classList.add("flex");
    document.getElementById("plus").classList.add("hidden");
    document.getElementById("minus").classList.remove("hidden");
  };

  const HideCustomDiv = () => {
    document.getElementById("CustomDiv").classList.add("hidden");
    document.getElementById("CustomDiv").classList.remove("flex");
    document.getElementById("plus").classList.remove("hidden");
    document.getElementById("minus").classList.add("hidden");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "title") {
      setTitle(value);
      if (value == "") {
        document.getElementById("title-error").classList.remove("hidden");
      } else {
        document.getElementById("title-error").classList.add("hidden");
      }
    } else if (name == "feeling") {
      setFeeling(value);
      if (value == "") {
        document.getElementById("feeling-error").classList.remove("hidden");
      } else {
        document.getElementById("feeling-error").classList.add("hidden");
      }
    } else {
      setStory(value);
      if (value == "") {
        document.getElementById("story-error").classList.remove("hidden");
      } else {
        document.getElementById("story-error").classList.add("hidden");
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

    if (story == "") {
      errors = true;
      document.getElementById("story-error").classList.remove("hidden");
    }

    if (feeling == "") {
      errors = true;
      document.getElementById("feeling-error").classList.remove("hidden");
    }

    if (errors) {
      return;
    }

    try {
      const response = axios.post(
        "http://localhost:5001/Poster",
        {
          title,
          story,
          feeling,
          tags: selectedTags,
          anonymous: isChecked,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // closeModal()
      window.location.href = "/Posts";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <button
        value="Open"
        onClick={() => openModal()}
        className="bg-secondary w-full text-white text-xl font-semibold rounded-lg py-3"
      >
        Add your story
      </button>
      <Modal
        visible={visible}
        width="400"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <form
          onSubmit={handleSubmit}
          className="p-10 flex h-[46rem] flex-col gap-5 overflow-y-scroll"
        >
          <div className="relative">
            <h1 className=" text-xl font-semibold mb-2">Add Title*</h1>
            <input
              type="text"
              name="title"
              className="py-3 border-b-2 pr-3 w-[19.3rem] text-sm"
              id="title"
              placeholder="Ex: Depression"
              onChange={handleChange}
              value={title}
            />
            <span
              id="title-error"
              className=" text-red-700  text-sm absolute bottom-[-1.2rem] hidden"
            >
              *Please enter the title*
            </span>
          </div>
          <div className="relative">
            <h1 className=" text-xl font-semibold mb-2">Add your feeling*</h1>
            <input
              type="text"
              name="feeling"
              className="py-3 border-b-2 pr-3 w-[19.3rem] text-sm"
              id="feeling"
              placeholder="EX: Depressed"
              onChange={handleChange}
              value={feeling}
            />
            <span
              id="feeling-error"
              className=" text-red-700  text-sm absolute bottom-[-1.2rem] hidden"
            >
              *Please enter your feeling*
            </span>
          </div>

          <div>
            <h1 className=" text-xl font-semibold mb-2">
              choose tags <span className=" text-sm">(three max)</span>
            </h1>
            <div className=" flex flex-wrap items-center">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`mt-2 mr-3 px-2 border-2 border-thrid rounded font-medium text-sm ${
                    isTagSelected(tag)
                      ? " thrid-color  px-1 py-1"
                      : " text-white bg-thrid py-2"
                  }`}
                  onClick={() => handleTagClick(tag)}
                  disabled={
                    selectedTags.length === MAX_SELECTIONS &&
                    !isTagSelected(tag)
                  }
                >
                  {tag}
                </button>
              ))}
              <img
                id="plus"
                src="+.svg"
                onClick={ShowCustomDiv}
                className="w-8 cursor-pointer"
                alt=""
              />
              <img
                id="minus"
                src="-.svg"
                onClick={HideCustomDiv}
                className="w-8 cursor-pointer hidden"
                alt=""
              />
            </div>
          </div>

          <div id="CustomDiv" className="items-center mt-4 hidden">
            <input
              type="text"
              className="mx-2 px-4 py-2 border-b-2 rounded"
              placeholder="Custom tag"
              value={customTag}
              onChange={handleCustomTagChange}
              maxLength={20}
            />
            <button
              type="button"
              className="mx-2 px-4 py-2 rounded bg-secondary text-white"
              onClick={handleAddCustomTag}
            >
              Add
            </button>
          </div>

          <div className="relative">
            <h1 className=" text-xl font-semibold mb-2">Tell your story*</h1>
            <textarea
              type="text"
              name="story"
              className=" py-3 border rounded px-5 h-44 w-[19.3rem] text-sm"
              id="story"
              onChange={handleChange}
              value={story}
            />
            <span
              id="story-error"
              className=" text-red-700  text-sm absolute bottom-[-1.2rem] hidden"
            >
              *Please enter your story*
            </span>
          </div>
          <div className="flex justify-between pr-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={isChecked}
                onChange={handleOnChangeCheckBox}
                id="checkbox"
                value={isChecked}
              />
              <label
                className="ml-2 text-gray-700 cursor-pointer select-none text-sm"
                htmlFor="checkbox"
                onClick={handleOnChangeCheckBox}
              >
                Publish anonymously
              </label>
            </div>
            <button
              className="border border-secondary secondary-color text-xl font-semibold rounded py-2 flex justify-center items-center gap-2 w-36"
              // onClick={() => closeModal()}
            >
              <img src="Publish.svg" className=" w-8" alt="" />
              Publish
            </button>
          </div>

          <a
            href="javascript:void(0);"
            className=" absolute top-3 right-3"
            onClick={() => closeModal()}
          >
            <img src="X.svg" className="w-6" alt="" />
          </a>
        </form>
      </Modal>
    </section>
  );
};

export default Model;
