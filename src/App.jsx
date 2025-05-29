import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const text = document.querySelectorAll(".three-text");
    text.forEach(function (elem) {
      var t = elem.textContent;
      var s = t.split("");
      var clutter = "";
      s.forEach(function (el) {
        clutter += `<span>${el}</span>`;
      });
      elem.innerHTML = clutter;
    });

    gsap.from(".three-text span", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".three-text",
        start: "top 80%",
        end: "top 50%",
        scrub: 4,
      },
    });
  }, [showContent]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.from(".rotating-pic", {
      rotate: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".limg",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  A
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./public/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <>
          <div className="navbar fixed top-0 left-0 py-5 px-5 z-[100] w-full flex items-center justify-between">
            <div className="name flex items-center gap-5">
              <div className="lines flex flex-col gap-1">
                <div className="line h-1 w-10 bg-white"></div>
                <div className="line h-1 w-6 bg-white"></div>
                <div className="line h-1 w-3 bg-white"></div>
              </div>
              <h1 className="text-white -mt[7px] text-3xl font-bold">
                Portfolio
              </h1>
            </div>
            <div className="social text-md font-bold flex items-center gap-5">
              <h4 className="text-white">About me</h4>
              <h4 className="text-white">Resume</h4>
              <h4 className="text-white">Work</h4>
              <div className="bg-yellow-500 px-2 py-1">
                <h4 className="text-white">Get in touch!</h4>
              </div>
            </div>
          </div>

          <div className="main w-full h-full rotate-[-10deg] scale-[1.7]">
            <div className="landing overflowx-hidden relative w-full h-screen bg-black">
              <div className="imagediv relative overflow-hidden w-full h-screen">
                <img
                  className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                  src="./public/sky.png"
                  alt=""
                />

                <img
                  className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                  src="./public/bg.png"
                  alt=""
                />

                <div className="relative w-fit h-fit top-20 left-1/2 -translate-x-1/2  flex items-center justify-center">
                  <div className="text text-white flex flex-col gap-2 transform scale-[1.4] rotate-[-10deg] text-center">
                    <h1 className="text-[12rem] leading-none">Anshika!</h1>
                    <div className="bg-yellow-500 px-2 py-1 text-m font-bold -ml-0  text-white w-fit mx-auto">
                      <h1>Web Developer</h1>
                    </div>
                  </div>
                </div>

                <img
                  className="scale-[1] object-cover z-20 absolute left-1/2 -translate-x-1/2  translate-y-1/2 bottom-0"
                  src="./public/ChatGPT Image May 22, 2025, 04_00_50 PM.png"
                  alt=""
                />
              </div>

              <div className="footer text-sm flex items-center z-[30] gap-2 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent text-white bottom-0 left-0 absolute">
                <i className="ri-arrow-down-line"></i>
                <h4> Scroll down</h4>
              </div>

              {/* next page */}
              <div className="aboutme w-full h-screen flex items-center justify-center  bg-black">
                <div className="cntnr flex text-white w-full h-[80%] ">
                  <div className="limg relative w-1/2 h-full">
                    <div className="absolute h-[80%] w-[80%] top-1/2 left-[30%] -translate-y-1/2 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 blur-3xl"></div>
                    <img
                      className="rotating-pic h-[80%] top-1/2 rounded-2xl absolute left-[30%] -translate-y-1/2 rotate-20"
                      src="./public/_DSC0787.JPG"
                      alt=""
                    />
                    <img
                      className="rotating-pic absolute h-[80%] rounded-2xl top-1/2 left-[30%] -translate-y-1/2 rotate-15"
                      src="./public/_DSC0810.JPG"
                      alt=""
                    />
                    <img
                      className="static-pic absolute h-[80%] rounded-2xl top-1/2 left-[30%] -translate-y-1/2"
                      src="./public/_DSC0786.JPG"
                      alt=""
                    />
                  </div>

                  <div className=" rg w-[30%] flex flex-col items-start justify-center">
                    <h1 className="text-4xl three-text text-amber-100">
                      Hello,
                    </h1>

                    <p className="mt-10 text-x font-[gilroy] three-text">
                      I'm Anshika Srivastava — a 21 year old, web developer with
                      a passion for turning ideas into fast, functional, and
                      beautiful digital experiences. I specialize in building
                      clean, responsive websites that not only look good but
                      work seamlessly across devices.
                    </p>
                    <p className="mt-3 text-x font-[gilroy] three-text">
                      I don't just write code, I translate ideas into
                      interactive realities. I believe the web should never feel
                      static. It should move, react, respond — and most
                      importantly, connect. I specialize in building sleek,
                      high-performance websites and immersive digital
                      experiences that leave lasting impressions.
                    </p>
                    <p className="mt-3 text-x font-[gilroy] three-text">
                      My approach? Dream boldly, design smart, build sharp.
                      Let's create not just what works, but what wows!
                    </p>
                    <button className="bg-yellow-500 px-2 py-1 font-bold text-black mt-10 text-xl">
                      Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* next page */}
              <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="skills-container w-full h-[80%] relative"></div>
              </div>

              <div className="w-full h-screen flex items-center justify-center bg-black"></div>

              <div className="w-full h-screen flex items-center justify-center bg-black"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
