"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react"
import ReviewCard from "@/components/ReviewCard";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";

const Preview = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [data, setData] = useState<any>();
    const [r, setR] = useState<number>(0);

    const fetch_data = async () => {
        const response = await fetch("https://store.steampowered.com/appreviews/2821220?json=1&filter=recent&cursor=*&review_type=positive");
        if (!response.ok) return;
        const json_data = await response.json();
        setData(json_data.reviews);
    }

    const update_review_right = () => {if (data && r != data.length-1) setR(r+1);}
    const update_review_left = () => {if (r != 0) setR(r-1);}


    // ORBIT
    const [orbit, setOrbit] = useState<number>(0);
    useEffect(() => {
        setTimeout(() => {
            setOrbit(orbit+0.2);
        }, 20);
    }, [orbit]);

    // PLANETS
    const mercury = useRef<HTMLImageElement | null>(null);
    const venus = useRef<HTMLImageElement | null>(null);
    const earth = useRef<HTMLImageElement | null>(null);
    const mars = useRef<HTMLImageElement | null>(null);
    const jupiter = useRef<HTMLImageElement | null>(null);
    const saturn = useRef<HTMLImageElement | null>(null);
    const uranus = useRef<HTMLImageElement | null>(null);
    const neptune = useRef<HTMLImageElement | null>(null);


    const [offset_mercury, setOffsetMercury] = useState<number>(0);
    const [offset_venus, setOffsetVenus] = useState<number>(0);
    const [offset_earth, setOffsetEarth] = useState<number>(0);
    const [offset_mars, setOffsetMars] = useState<number>(0);
    const [offset_jupiter, setOffsetJupiter] = useState<number>(0);
    const [offset_saturn, setOffsetSaturn] = useState<number>(0);
    const [offset_uranus, setOffsetUranus] = useState<number>(0);
    const [offset_neptune, setOffsetNeptune] = useState<number>(0);




    // ON START
    useEffect(() =>  {
        if (videoRef.current) videoRef.current.volume = 0.25;

        if (mercury && mercury.current) setOffsetMercury((mercury.current.offsetLeft + mercury.current.offsetWidth/2) / mercury.current.offsetWidth * 100);
        if (venus && venus.current) setOffsetVenus((venus.current.offsetLeft + venus.current.offsetWidth/2) / venus.current.offsetWidth * 100);
        if (earth && earth.current) setOffsetEarth((earth.current.offsetLeft + earth.current.offsetWidth/2) / earth.current.offsetWidth * 100);
        if (mars && mars.current)   setOffsetMars((mars.current.offsetLeft + mars.current.offsetWidth/2) / mars.current.offsetWidth * 100);
        if (jupiter && jupiter.current) setOffsetJupiter((jupiter.current.offsetLeft + jupiter.current.offsetWidth/2) / jupiter.current.offsetWidth * 100);
        if (saturn && saturn.current) setOffsetSaturn((saturn.current.offsetLeft + saturn.current.offsetWidth/2) / saturn.current.offsetWidth * 100);
        if (uranus && uranus.current) setOffsetUranus((uranus.current.offsetLeft + uranus.current.offsetWidth/2) / uranus.current.offsetWidth * 100);
        if (neptune && neptune.current) setOffsetNeptune((neptune.current.offsetLeft + neptune.current.offsetWidth/2) / neptune.current.offsetWidth * 100);

        
        fetch_data();
    }, []);

    return (
        <>
            <img alt="waveBottom" src="waveBottom.svg" className='w-[100vw] h-48 bg-white'/>
            <div className=" bg-white flex flex-col lg:flex-row">

                {/* <div className="bg-gradient-to-b from-black to-white h-[10vh] w-[100vw] z-10"></div> */}
                <div 
                    className="relative w-[100vw] h-[100vh] min-h-[50vh] flex-1 overflow-hidden border-b-2 lg:border-r-2 lg:border-b-0 border-black"
                    style={{
                        background: `radial-gradient(circle at 0% 100%, red, #FFDA40 10%, transparent 20%)`
                    }}>
                    <div className="p-2 h-full">
                        <div className="flex justify-evenly items-center h-8 lg:h-16">
                            {<BsArrowLeftSquareFill onClick={update_review_left} className={`text-black h-full w-auto z-10 ${r == 0 ? "invisible" : ""}`}></BsArrowLeftSquareFill>}
                            <p className="text-black text-3xl lg:text-6xl text-center font-PressStart select-none z-10">Reviews</p>
                            {<BsArrowRightSquareFill onClick={update_review_right} className={`text-black h-full w-auto z-10 ${data && r == data.length-1 ? "invisible" : ""}`}></BsArrowRightSquareFill>}
                        </div>
                        <div className="flex flex-col items-center">
                            {   
                                data ? 
                                    <ReviewCard review={data[r].review} playtime={Math.round(data[r].author.playtime_forever/60.0*100)/100}></ReviewCard>
                                :
                                    <></>
                            }
                        </div>
                        <img className="absolute bottom-0 left-0 w-[30%] transform translate-x-[-50%] translate-y-[50%]" src="planets/pixel_sun.png" alt="sun"></img>
                        <img ref={mercury} className="absolute bottom-0 left-[20%] w-[3%]" style={{
                            transform: `translate(-${offset_mercury}%, 0) rotate(-${orbit}deg) translate(${offset_mercury}%, 0)`
                        }} src="planets/pixel_mercury.png" alt="mercury"></img>
                        <img ref={venus} className="absolute bottom-0 left-[28%] w-[4%]" style={{
                            transform: `translate(-${offset_venus}%, 0) rotate(-${orbit*0.73}deg) translate(${offset_venus}%, 0)`
                        }} src="planets/pixel_venus.png" alt="venus"></img>
                        <img ref={earth} className="absolute bottom-0 left-[39%] w-[5%]" style={{
                            transform: `translate(-${offset_earth}%, 0) rotate(-${orbit*0.62}deg) translate(${offset_earth}%, 0)`
                        }} src="planets/pixel_earth.png" alt="earth"></img>
                        <img ref={mars} className="absolute bottom-0 left-[47%] w-[5%]" style={{
                            transform: `translate(-${offset_mars}%, 0) rotate(-${orbit*0.5}deg) translate(${offset_mars}%, 0)`
                        }} src="planets/pixel_mars.png" alt="mars"></img>
                        <img ref={jupiter} className="absolute bottom-0 left-[57%] w-[10%]" style={{
                            transform: `translate(-${offset_jupiter}%, 0) rotate(-${orbit*0.27}deg) translate(${offset_jupiter}%, 0)`
                        }} src="planets/pixel_jupiter.png" alt="jupiter"></img>
                        <img ref={saturn} className="absolute bottom-0 left-[70%] w-[12%]" style={{
                            transform: `translate(-${offset_saturn}%, 0) rotate(-${orbit*0.2}deg) translate(${offset_saturn}%, 0)`
                        }} src="planets/pixel_saturn.png" alt="saturn"></img>
                        <img ref={uranus} className="absolute bottom-0 left-[82%] w-[7%]" style={{
                            transform: `translate(-${offset_uranus}%, 0) rotate(-${orbit*0.14}deg) translate(${offset_uranus}%, 0)`
                        }} src="planets/pixel_uranus.png" alt="uranus"></img>
                        <img ref={neptune} className="absolute bottom-0 left-[92%] w-[7%]" style={{
                            transform: `translate(-${offset_neptune}%, 0) rotate(-${orbit*0.11}deg) translate(${offset_neptune}%, 0)`
                        }} src="planets/pixel_neptune.png" alt="neptune"></img>
                    </div>
                </div>

                <div className="relative w-[100vw] h-[100vh] min-h-[50vh] flex-1 flex justify-center overflow-hidden">
                    <div className="p-2">
                        <p className="text-black text-3xl lg:text-6xl text-center font-PressStart select-none">Trailer</p>
                        <video ref={videoRef} className="max-h-[100vh] border-8 rounded-xl z-10" controls style={{
                            borderStyle: "ridge",
                        }}>
                            <source src=" https://video.akamai.steamstatic.com/store_trailers/256998915/movie480_vp9.webm?t=1707961792" type="video/mp4" />
                        </video>
                        {/* <img className="absolute bottom-0 left-[50%] w-[8%] transform translate-x-[-50%] translate-y-[50%] -rotate-90" src="ship2.png" alt="neptune"></img> */}


                    </div>
                </div>
            </div>
            <hr className="bg-black w-[100vw] h-1"></hr>
        </>
    )
};

export default Preview;