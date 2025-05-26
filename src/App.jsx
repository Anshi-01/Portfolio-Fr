import React , {useState}from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'

function App() {
  let [showContent, setShowContent] = useState(false);

  useGSAP(()=>{
    const tl= gsap.timeline();

    tl.to(".vi-mask-group",{
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group",{
      scale: 10,
      duration : 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function(){
        if(this.progress()>=0.9){
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      }
    })
    
  })

  useGSAP(()=>{
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


      {showContent && <div className='main w-full h-full'>
        <div className='landing w-full h-screen bg-black'>


          <div className='navbar absolute top-0 left-0 py-5 px-5  z-[20] w-full flex items-center justify-between'>
           
            <div className='name flex items-center gap-5'>
              <div className='lines flex flex-col gap-1'>
                <div className='line h-1 w-10 bg-white'></div>
                <div className='line h-1 w-6 bg-white'></div>
                <div className='line h-1 w-3 bg-white'></div>
              </div>
              <h1 className='text-white -mt[7px]  text-3xl font-bold'>Anshika Srivastava</h1>
            </div>
            <div className='social text-md font-bold flex items-center gap-5'>
              <h4 className='text-white'>About me</h4>
              <h4 className='text-white'>Resume</h4>
              <h4 className='text-white'>Work</h4>
              <div className='px-2 py-2 rounded-3xl bg-amber-600'>
              <h4 className='text-white'>Get in touch!</h4>
              </div>
              
            </div>
          </div>


          <div className='imagediv relative overflow-hidden w-full h-screen'>
            <img className='sky scale-[1.2] w-full h-full object-cover absolute left-0 top-0' src="./public/sky.png" alt="" />

            <img className='bg scale-[1.2] w-full h-full object-cover absolute left-0 top-0' src="./public/bg.png" alt="" />

          <div className='text text-white flex flex-col gap-1 absolute top-40 left-1/2 -translate-x-1/2 '>
          <h1 className="text-[3rem] leading-none -ml-40">Hello, I'm</h1>
                <h1 className="text-[8rem] leading-[0.6] -ml-40">Anshika !</h1>
                <div className='bg-amber-600 flex items-center justify-center text-sm font-bold text-white px-2 py-1 w-fit -ml-40 rounded-3xl mt-2'><h1>Full Stack Developer  </h1></div>
               
          </div>
            <img className='scale-75 object-cover z-20 absolute left-1/2 -translate-x-1/2  translate-y-1/2 bottom-30' src="./public/ChatGPT Image May 22, 2025, 04_00_50 PM.png" alt="" />

          </div>

          <div className='footer text-sm flex items-center z-[30] gap-2 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent text-white bottom-0 left-0 absolute'>
           <i className="ri-arrow-down-line"></i>
            <h4> Scroll down</h4>
           </div>


        </div>
        

        <div className='w-full h-screen bg-black'></div>
        </div>}


   </>
  )
}

export default App
