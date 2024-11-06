/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Nodes from "@/components/Nodes";
import MoveWithin from "@/components/MoveWithin"

const Core = () => {
    const [text, setText] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);

    const images = 2;
    const img_urls = ["./CroppedSprites.png", "./ship.png"]
    const img_height = "h-[20%]"
    const [positions, setPositions] = useState(
        Array.from({ length: images }, () => ({ x: Math.random()*1000, y: Math.random()*1000 }))
    );
    const [rotations, setRotations] = useState(
        Array.from({ length: images }, () => 0)  
    );
    const [velocities, setVelocities] = useState(
        Array.from({ length: images }, () => ({dx: 2, dy: 2}))
    );

    const updatePosition = (index: number, newX: number, newY: number) => {
        setPositions((prevPositions) =>
            prevPositions.map((pos, i) =>
                i === index ? { x: newX, y: newY } : pos
            )
        );
    };

    const updateVelocity = (index: number, newX: number, newY: number) => {
        setVelocities((prevVelocities) =>
            prevVelocities.map((pos, i) =>
                i === index ? { dx: newX, dy: newY } : pos
            )
        );
    };


    const updateRotation = (index: number, newRotation: number) => {
        setRotations((prevRotation) =>
            prevRotation.map((rotation, i) =>
                i === index ? newRotation : rotation
            )
        );
    };

    interface Shape {
        imgRef: React.RefObject<HTMLImageElement>;
        img: React.ReactNode,
        position: {x: number, y: number},
        positionUpdate: (newX: number, newY: number) => void,
        velocity: {dx: number, dy: number},
        velocityUpdate: (newX: number, newY: number) => void,
        rotation: number,
        rotationUpdate: (newRotation: number) => void
    }

    const outer_object: Shape[] = Array.from({length: images}, (_, idx) => {
        const imgRef = useRef<HTMLImageElement>(null); // Create a ref for each image

        return {
            imgRef,
            img: <img ref={imgRef} alt="img" className={`${img_height}`} src={`${img_urls[idx]}`}
                    style={
                        {
                            position: "absolute",
                            left: `${positions[idx].x}px`,
                            top: `${positions[idx].y}px`,
                            transform: `translate(-50%, -50%) rotate(${rotations[idx]}deg)`, // Apply rotation
                            transition: "transform 0.1s linear", // Smooth rotation
                        }
                    }/>,
            position: positions[idx],
            positionUpdate: (newX: number, newY: number) => updatePosition(idx, newX, newY),
            velocity: velocities[idx],
            velocityUpdate: (newX: number, newY: number) => updateVelocity(idx, newX, newY),
            rotation: rotations[idx],
            rotationUpdate: (newRotation: number) => updateRotation(idx, newRotation)
        }
    })

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
                <img className="max-h-[75%] w-auto h-auto border-purple-700 border-2 rounded-xl" alt="gameplay" src="ship.png"></img>
           </div>

           <div className='relative w-full md:w-[75vw] h-[100vh] 
                            flex flex-col items-center gap-5 md:gap-10
                            p-5 md:p-10 
                            bg-[#b4c3db]'>

                <div className='border-2 w-[100%] flex-grow text-black overflow-scroll bg-white'>

                    <h1 className='font-bold text-xl md:text-3xl font-mono sticky top-0 bg-white text-center'>What is Space Mergers?</h1>
                    <ReactMarkdown className="prose p-5 font-serif" components={{
                        h2: ({node, ...props}) => <h2 className="text-blue-500" {...props} />, // Blue h2 headers
                        // p: ({node, ...props}) => <p className="text-white" {...props}/>,
                        // strong: ({node, ...props}) => <strong className="text-white" {...props}/>,
                        // li: ({ node, ...props }) => <li className="text-white" {...props} />
                    }}>{text}</ReactMarkdown>

                </div>

                <div ref={containerRef} className='relative border-2 w-[100%] h-[100%] flex flex-col items-center bg-black border-white'>
                    <h1 className='text-white font-bold text-md lg:text-3xl font-mono'>Some Space Mergers assets!</h1>
                    <MoveWithin image={outer_object[0]} parent={containerRef.current} others={outer_object[1]}></MoveWithin>
                    <MoveWithin image={outer_object[1]} parent={containerRef.current} others={outer_object[0]}></MoveWithin>
                </div>
           </div>
        </div>
    )
}

export default Core;