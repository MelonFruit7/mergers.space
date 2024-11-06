/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import {useState, useRef, useEffect} from "react";


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

class Vector {
    x: number;
    y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    
    dot = (b: Vector): number => this.x*b.x + this.y*b.y;
    get_mag = (): number => Math.sqrt(this.x*this.x + this.y*this.y);
}

const MoveWithin = ({image, parent, others} : {image: Shape, parent: HTMLDivElement | null, others: Shape}) => {
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
    const overlap_on_axis = (points1: Vector[], points2: Vector[], axis: Vector) => {
        const mm1 = get_interval(points1, axis);
        const mm2 = get_interval(points2, axis);

        return (mm1.x <= mm2.y) && (mm2.x <= mm1.y);
    };

    const get_points_from_shape = (im: Shape) => {
        const ref = im.imgRef.current;
        if (ref) {
            const imageWidth = ref.offsetWidth*Math.abs(Math.cos(im.rotation*Math.PI/180)) + ref.offsetHeight*Math.abs(Math.sin(im.rotation*Math.PI/180));
            const imageHeight = ref.offsetHeight*Math.abs(Math.cos(im.rotation*Math.PI/180)) + ref.offsetWidth*Math.abs(Math.sin(im.rotation*Math.PI/180));
            let points: Vector[] = [];

            let versions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
            versions.forEach((val, idx) => {
                points.push(new Vector(im.position.x + val[0]*imageWidth/2, im.position.y + val[1]*imageHeight/2));
            });
            return points;
        }
        return [];
    } 
    const SAT = (im1: Shape, im2: Shape) => {
        const points1 = get_points_from_shape(im1);
        const points2 = get_points_from_shape(im2);

        const axes = [new Vector(Math.cos(im1.rotation), Math.sin(im1.rotation)),
                      new Vector(Math.sin(im1.rotation), Math.cos(im1.rotation)),
                      new Vector(Math.cos(im2.rotation), Math.sin(im2.rotation)),
                      new Vector(Math.sin(im2.rotation), Math.cos(im2.rotation))];
        
        for (let i = 0; i < axes.length; i++) {
            let overlap = overlap_on_axis(points1, points2, axes[i]);
            if (!overlap) return false; 
        }
        return true;
    };
    
    useEffect(() => {
        const image_element = image.imgRef.current;
        
        const move = () => {
                const new_pos = {
                    x: image.position.x+image.velocity.dx,
                    y: image.position.y+image.velocity.dy
                };
                if (image_element && parent) {
                    const container_width = parent.offsetWidth;
                    const container_height = parent.offsetHeight;

                    const imageWidth = image_element.offsetWidth*Math.abs(Math.cos(image.rotation*Math.PI/180)) + image_element.offsetHeight*Math.abs(Math.sin(image.rotation*Math.PI/180));
                    const imageHeight = image_element.offsetHeight*Math.abs(Math.cos(image.rotation*Math.PI/180)) + image_element.offsetWidth*Math.abs(Math.sin(image.rotation*Math.PI/180));

                    // Check horizontal boundaries
                    if (new_pos.x <= imageWidth/2 || new_pos.x + imageWidth/2 >= container_width) {
                        image.velocityUpdate(-image.velocity.dx, image.velocity.dy);
                        new_pos.x = Math.max(imageWidth/2, Math.min(new_pos.x, container_width - imageWidth/2)); // Keep image within bounds
                    }

                    // Check vertical boundaries
                    if (new_pos.y <= imageHeight/2 || new_pos.y + imageHeight/2 >= container_height) {
                        image.velocityUpdate(image.velocity.dx, -image.velocity.dy);
                        new_pos.y = Math.max(imageHeight/2, Math.min(new_pos.y, container_height - imageHeight/2)); // Keep image within bounds
                    }

                    // for (let i = 0; i < others.length; i++) {
                        // let overlap = SAT(image, others);
                        // if (overlap) {
                        //     let vec = new Vector(others.velocity.dx-image.velocity.dx, others.velocity.dy-image.velocity.dy);
                        //     if (vec.get_mag() > 5) {
                        //         vec.x = (5.0/vec.get_mag())*vec.x;
                        //         vec.y = (5.0/vec.get_mag())*vec.y;
                        //     }
                        //     if (others.position.x < image.position.x) {
                        //         others.velocityUpdate(vec.x, vec.y);
                        //     } else {
                        //         image.velocityUpdate(vec.x, vec.y);
                        //     }
                        // }
                    // }
                }

                image.rotationUpdate(image.rotation+Math.random());
                image.positionUpdate(new_pos.x, new_pos.y);
        }
        const intervalId = setInterval(move, 20); // Adjust interval for speed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [image.rotation, image.velocity, parent]);


    return (
        <>
            {image.img}
        </>
    )
}

export default MoveWithin;