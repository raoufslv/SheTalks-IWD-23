import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "@fontsource/poppins"; // Defaults to weight 400.
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    const offsetTop = element.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-between justify-items-center px-28 bg-linear-hero">
        <div>
          <h1 className="text-5xl font-black text-red-600 my-3">
            Breaking <span className=" primary-color">the Silence</span>{" "}
          </h1>
          <h3 className="text-4xl font-bold w-120 lino leading-[3rem]">
            Our platform help Women Speak Up About Mental <br /> Health
          </h3>
          <div className=" my-10 flex gap-20">
            <a href="/SignUp">
              <button className=" bg-red-600 text-white py-2 px-3 text-xl font-semibold rounded-xl ">
                Sign up today
              </button>
            </a>

            <button
              className=" primary-color text-xl font-semibold flex gap-2 items-center"
              onClick={() => scrollToSection("#AboutUs")}
            >
              <img src="/arrowdown.svg" className="w-1/5" alt="" />
              Discover first
            </button>
          </div>
        </div>
        <div>
          <img src="/hero.svg" className="w-120" alt="img mra" />
        </div>
      </div>

      <div id="AboutUs" className=" ">
        <h2 className=" text-3xl font-extrabold flex justify-center items-end ">
          <img src="/L.svg" className=" w-72" alt="" />
          <div className="mb-1 flex justify-center items-center flex-col">
            <span className="pb-1">About us</span>
            <img src="Rectangle.svg" className=" w-40" alt="" />
          </div>
          <img src="/L2.svg" className=" w-72 relative top-74 " alt="" />
        </h2>
        <br />
        <br />

        <p className=" text-center text-xl font-semibold mx-96 px-36">
          Welcome to <span className=" text-red-600">She</span>
          <span className=" primary-color">Talks</span> - where women's mental
          health matters! Our safe and inclusive space offers women personalized
          support, mental health resources, and a stigma-free environment. Join
          us as we navigate the unique challenges of being a woman in today's
          world.
        </p>
        <div className="flex justify-center items-center mt-20">
          <img src="/blueTracks.svg" className=" w-40 " alt="" />
        </div>
      </div>
      <div id="features" className="">
        <h2 className=" text-3xl font-extrabold text-center flex justify-center items-end">
          <div className="mb-1 flex justify-center items-center flex-col">
            <span className="pb-2">Discover the Features</span>

            <img src="Rectangle.svg" className=" w-48" alt="" />
          </div>
          <div className=" relative -mr-[11.95rem] -mt-4 ">
            <img src="/L3.svg" className="h-60" alt="" />
            <img
              src="End.svg"
              className=" absolute top-[13.7rem]  right-[14.05rem] w-6 "
              alt=""
            />
          </div>
          <img
            src="/L4.svg"
            className=" w-[28rem] absolute left-[12rem] -mb-[45rem]"
            alt=""
          />
        </h2>

        <div className=" flex gap-20  justify-center pt-12">
          <Card
            icon={"/tabledocument.svg"}
            title={"Experts Articles"}
            text={
              "Our platform features a collection of insightful articleswritten by mental health experts, specifically tailored towomen's unique experiences and challenges."
            }
          />

          <Card
            icon={"/devicemessage.svg"}
            title={"Online events"}
            text={
              "Women can come together to discuss their mental health challenges, share experiences and strategies, and learn from each other."
            }
          />

          <Card
            icon={"/people.svg"}
            title={"Share Your Story"}
            text={
              "Post about your experiences and connect with other women who have faced similar challenges"
            }
          />
        </div>
        <div className="flex justify-center items-center mt-20">
          <img src="/redTracks.svg" className=" w-40 mt-10 " alt="" />
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="linear2 border-y-8  border-secondary mx-28 pb-14  flex justify-end flex-col gap-5 items-center">
          <h4 className=" text-white font-black text-4xl w-3/5 text-center uppercase">
            Connecting with a Counselor from Anywhere: The Advantages of Online
            Therapy
          </h4>
          <button
            className="text-white bg-secondary rounded-2xl px-4 py-2 font-bold"
            onClick={() => window.open("/SignUp")}
          >
            Get Started
          </button>
        </div>

        <img
          src="/L5.svg"
          className=" w-[27.5rem] absolute left-[14rem]"
          alt=""
        />
        <div id="Testmonials" className=" mt-56">
          <h2 className="text-3xl font-extrabold text-center pb-1">
            Testmonials
          </h2>
          <img
            src="/L6.svg"
            className=" w-[27.5rem] absolute right-56"
            alt=""
          />
          <div className="mb-1 flex justify-center items-center flex-col">
            <img src="Rectangle.svg" className=" w-40" alt="" />
          </div>

          <div className="flex flex-col gap-5 items-center justify-center my-20">
            <img
              src="/womenTesto.png"
              className="rounded-full w-36 border-4 border-primary"
              alt=""
            />

            <h3 className="text-center font-bold text-2xl">Carla johnson</h3>
            <img src="/rate.svg" className=" w-24" alt="" />
            <p className="text-center text-xl w-120">
              I never realized how much sharing my story with others could
              impact my healing process until I found SheTalks. Being able to
              connect with other women who have gone through similar experiences
              has been incredibly empowering.
            </p>
            <img src="/redTracks.svg" className=" w-40 mt-10" alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
