/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef, useState } from "react";
import Nodes from "@/components/Nodes";

const FirstView = () => {
    const [load, setLoad] = useState<boolean>(false);

    let slider = useRef<HTMLDivElement | null>(null);
    let logo = useRef<HTMLDivElement | null>(null);

    const [widthX, setWidthX] = useState<number>(0);
    let spaceships = 5;
    
    useEffect(() => {
        // Check if the elements exist
        if (!slider.current || !logo.current) return;
    
        // Ensure initial setup
        setWidthX(window.innerWidth);
        document.body.style.overflow = 'hidden';
    
        // Event handler functions
        const handleSliderTransitionEnd = () => {
            logo.current!.style.opacity = '1';
        };
    
        const handleLogoTransitionEnd = () => {
            setLoad(true);
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
        };
    
        // Add listeners
        slider.current.style.height = '0vh';
        slider.current.addEventListener("transitionend", handleSliderTransitionEnd);
        logo.current.addEventListener("transitionend", handleLogoTransitionEnd);
    
        // Cleanup listeners
        return () => {
            slider.current?.removeEventListener("transitionend", handleSliderTransitionEnd);
            logo.current?.removeEventListener("transitionend", handleLogoTransitionEnd);
        };
    }, []);
    
    return (
        <div className={load ? "" : "fixed z-20"}>
            <div ref={slider} className="h-[100vh] w-[100vw] relative bg-black duration-[3s] ease-in transition-[height] overflow-hidden flex justify-around items-end">
                {
                    [...Array(spaceships)].map((x, i) => (
                        <div key={i} style={{
                                width: `${widthX/(spaceships*2)}px`,
                                height: `${widthX/(spaceships*2)}px`,
                                backgroundSize: `${widthX/(spaceships*2)}px ${widthX/(spaceships*2)}px`,
                            }}
                            className={`bg-[url('/sprites/ship.png')] bg-no-repeat`}>
                        </div>
                    ))
                }
            </div>
            <div className="h-[100vh]">
                <Nodes id="1"></Nodes>
                <div ref={logo} className="relative h-full flex justify-center items-center opacity-0 duration-[2s] ease-in transition-opacity">
                    <img alt="logo" src="logo.png" className="w-[50%]"></img>
                    {/* <p className="text-3xl md:text-9xl font-mono select-none text-center">
                        <span className="block text-purple-600">Space</span>
                        <span>Mergers</span>
                    </p> */}
                </div>
            </div>
        </div>
    )
};

export default FirstView;