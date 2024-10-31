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
        setWidthX(window.screen.width);
        document.body.style.overflow = 'hidden';
        
        slider.current!.style.height = '0vh';
        slider.current!.addEventListener("transitionend", () => {
            logo.current!.style.opacity = '1';
        });
        logo.current!.addEventListener("transitionend", () => {
            setLoad(true);
            document.body.style.overflow = 'auto';
        });
    }, []);
    return (
        <div className={load ? "" : "fixed z-10"}>
            <div ref={slider} className="h-[100vh] w-[100vw] relative bg-black duration-[3s] ease-in transition-[height] overflow-hidden flex justify-around items-end">
                {
                    [...Array(spaceships)].map((x, i) => (
                        <div key={i} style={{
                                width: `${widthX/10}px`,
                                height: `${widthX/10}px`,
                                backgroundSize: `${widthX/10}px ${widthX/10}px`,
                            }}
                            className={`bg-[url('/ship.png')] bg-no-repeat`}>
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