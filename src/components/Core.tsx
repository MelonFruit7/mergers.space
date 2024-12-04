/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Nodes from "@/components/Nodes";
import Separate from "./Separate"

const Core = () => {
    const [text, setText] = useState('');
    const [renderState, setRenderState] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const images = 8;
    // const img_urls = [ "./ship.png", "./ship.png",  "./ship.png",  "./ship.png", "./ship.png", "./ship.png", "./ship.png", "./ship.png"]
    const img_urls = Array.from({length: images}, () => "./ship.png");
    const img_height = "h-[10%]"

    const itemsRef = Array.from({length: images}, () => useRef<HTMLImageElement>(null));


    interface Shape {
        imgRef: React.RefObject<HTMLImageElement>;
        position: {x: number, y: number},
        velocity: {dx: number, dy: number},
        rotation: number,
    }
    const shapes = useRef<Shape[]>(
        Array.from({ length: images }, (_, i) => ({
            imgRef: itemsRef[i],
            position: { x: Math.random() * 0, y: Math.random() * 0 },
            velocity: { dx: 2, dy: 2 },
            rotation: 0,
        })
    ));

    const animationFrameRef = useRef<number | null>(null);  // Store the animation frame ID for canceling the animation
    // Start the animation loop
    useEffect(() => {
        setTimeout(() => {
            Separate({images: shapes.current, parent: containerRef.current});
            setRenderState(!renderState);
        }, 20);
    }, [renderState]);

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await fetch('/SpaceMergers.txt');
                const data = await response.text();
                setText(data);
            } catch (error) {
                console.error('Error fetching text file:', error);
            }
        };
        fetchText();
    }, []);


    return (
        <div className="min-h-[100vh] relative bg-white flex flex-col-reverse md:flex-row">
         
           <div className='relative w-full md:w-[25vw] h-[100vh] flex justify-center items-center border-r-2 border-black bg-black'>
                <img className="max-h-[75%] max-w-[90%] w-auto h-auto border-purple-700 border-2 rounded-xl" alt="gameplay" src="ship.png"></img>
           </div>

           <div className='relative w-full md:w-[75vw] h-[100vh] 
                            flex flex-col items-center gap-5 md:gap-10
                            p-5 md:p-10 
                            bg-[#b4c3db]'>

                <div className='border-2 w-[100%] h-[100%] text-black overflow-scroll bg-white'>

                    <h1 className='font-bold text-xl md:text-3xl font-mono sticky top-0 bg-white text-center'>What is Space Mergers?</h1>
                    <ReactMarkdown className="prose p-5 font-serif" components={{
                        h2: ({node, ...props}) => <h2 className="text-blue-500" {...props} />, // Blue h2 headers
                        // p: ({node, ...props}) => <p className="text-white" {...props}/>,
                        // strong: ({node, ...props}) => <strong className="text-white" {...props}/>,
                        // li: ({ node, ...props }) => <li className="text-white" {...props} />
                    }}>{text}</ReactMarkdown>

                </div>

                <div ref={containerRef} className='relative border-2 w-[100%] h-[50%] flex flex-col items-center bg-black border-white'>
                    <h1 className='text-white font-bold text-md lg:text-3xl font-mono'>Some Space Mergers assets!</h1>
                        {   
                                img_urls.map((url, idx) => (

                                        <img key={idx} ref={itemsRef[idx]} alt="img" className={`${img_height}`} src={`${url}`}
                                            style={
                                                (renderState || true) ?
                                                {
                                                    position: "absolute",
                                                    left: `${shapes.current[idx].position.x}px`,
                                                    top: `${shapes.current[idx].position.y}px`,
                                                    transform: `translate(-50%, -50%) rotate(${shapes.current[idx].rotation}deg)`, // Apply rotation
                                                    transition: "transform 0.1s linear", // Smooth rotation
                                                }
                                                : {}
                                        }/>

                                ))
                        }
                </div>
           </div>
        </div>
    )
}

export default Core;