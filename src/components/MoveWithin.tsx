/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import {useState, useRef, useEffect} from "react";


interface Shape {
    
}

class Vector {
    x: number;
    y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    
    dot = (b: Vector): number => this.x*b.x + this.y*b.y;
}

const MoveWithin = ({img_url, img_height, parent, others} : {img_url: string, img_height: string, parent: HTMLDivElement | null, others: HTMLImageElement[]}) => {

    const imageRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [velocity, setVelocity] = useState({dx: 2, dy: 2});
    const [rotation, setRotation] = useState(0);

    const get_interval = (points: Vector[], axis: Vector) => {
        //Axis will be a unit vector
        const res = new Vector(0, 0);
        res.x = res.y = axis.dot(points[0]);
        points.forEach((element) => {
            const pos = axis.dot(element);
            if (pos < res.x) res.x = pos;
            else if (pos > res.y) res.y = pos;
        });
        return res;
    };
    const overlap_on_axis = (axis: Vector) => {
        
    };
    const SAT = () => {

    };
    
    useEffect(() => {
        const image = imageRef.current;
        
        const move = () => {
            setPosition((prev_pos) => {
                const new_pos = {
                    x: prev_pos.x+velocity.dx,
                    y: prev_pos.y+velocity.dy
                };
                if (image && parent) {
                    const container_width = parent.offsetWidth;
                    const container_height = parent.offsetHeight;

                    const imageWidth = image.offsetWidth*Math.abs(Math.cos(rotation*Math.PI/180)) + image.offsetHeight*Math.abs(Math.sin(rotation*Math.PI/180));
                    const imageHeight = image.offsetHeight*Math.abs(Math.cos(rotation*Math.PI/180)) + image.offsetWidth*Math.abs(Math.sin(rotation*Math.PI/180));

                    // Check horizontal boundaries
                    if (new_pos.x <= imageWidth/2 || new_pos.x + imageWidth/2 >= container_width) {
                        setVelocity({dx: -velocity.dx, dy: velocity.dy});
                        new_pos.x = Math.max(imageWidth/2, Math.min(new_pos.x, container_width - imageWidth/2)); // Keep image within bounds
                    }

                    // Check vertical boundaries
                    if (new_pos.y <= imageHeight/2 || new_pos.y + imageHeight/2 >= container_height) {
                        setVelocity({dx: velocity.dx, dy: -velocity.dy});
                        new_pos.y = Math.max(imageHeight/2, Math.min(new_pos.y, container_height - imageHeight/2)); // Keep image within bounds
                    }

                    // for (let i = 0; i < others.length; i++) {
                    //     image.off
                    // }
                }

                setRotation(rotation+1);
                
                return new_pos;
            });
        }
        const intervalId = setInterval(move, 20); // Adjust interval for speed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [velocity, rotation, parent]);

    return (
        <img ref={imageRef} alt="img" className={`${img_height}`} src={`${img_url}`}
            style={
                {
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`, // Apply rotation
                    transition: "transform 0.1s linear", // Smooth rotation
                }
            }
        />
    )
}

export default MoveWithin;