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
    scale = (n: number): void => {
        this.x *= n;
        this.y *= n;
    }
    limit = (n: number): void => {
        const mag = this.get_mag();
        if (mag > n) this.scale(n/mag);
    }
    get_mag = (): number => Math.sqrt(this.x*this.x + this.y*this.y);
}

const MoveWithin = ({image, parent, others} : {image: Shape, parent: HTMLDivElement | null, others: Shape[]}) => {
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

        const start = Math.max(mm1.x, mm2.x);
        const end = Math.min(mm1.y, mm2.y);

        const diff = Math.max(end-start, 0);
        return diff;
    };

    const get_points_from_shape = (im: Shape) => {
        const ref = im.imgRef.current;
        if (ref) {
            // const imageWidth = ref.offsetWidth*Math.abs(Math.cos(im.rotation*Math.PI/180)) + ref.offsetHeight*Math.abs(Math.sin(im.rotation*Math.PI/180));
            // const imageHeight = ref.offsetHeight*Math.abs(Math.cos(im.rotation*Math.PI/180)) + ref.offsetWidth*Math.abs(Math.sin(im.rotation*Math.PI/180));
            const imageWidth = ref.offsetWidth;
            const imageHeight = ref.offsetHeight;
            let points: Vector[] = [];

            let versions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
            versions.forEach((val, idx) => {
                const original = new Vector(val[0]*imageWidth/2, val[1]*imageHeight/2);

                const rot = im.rotation*Math.PI/180;
                let updated = new Vector(0, 0);
                updated.x = original.x*Math.cos(rot) - original.y*Math.sin(rot);
                updated.y = original.x*Math.sin(rot) + original.y*Math.cos(rot);

                points.push(new Vector(im.position.x+updated.x, im.position.y+updated.y));
            });
            return points;
        }
        return [];
    } 
    const SAT = (im1: Shape, im2: Shape) => {
        const points1 = get_points_from_shape(im1);
        const points2 = get_points_from_shape(im2);

        const rot1 = im1.rotation*Math.PI/180, rot2 = im2.rotation*Math.PI/180;
        const axes = [new Vector(Math.cos(rot1), -Math.sin(rot1)),
                      new Vector(Math.sin(rot1), Math.cos(rot1)),
                      new Vector(Math.cos(rot2), -Math.sin(rot2)),
                      new Vector(Math.sin(rot2), Math.cos(rot2))];
        
        let smallest_overlap = 1e9;
        let axis = axes[0];
        for (let i = 0; i < axes.length; i++) {
            let overlap = overlap_on_axis(points1, points2, axes[i]);
            if (overlap == 0) return null; 
            else if (overlap < smallest_overlap) {
                axis = axes[i];
                smallest_overlap = overlap;
            }
        }

        axis.scale(smallest_overlap);
        return axis;
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

                    for (let i = 0; i < others.length; i++) {
                        let MVT = SAT(image, others[i]);
                        if (MVT) {
                            image.imgRef.current!.style.borderColor = "#ff0000";
                            const mag = MVT.get_mag();


                            const attempt1 = new Vector(image.position.x+MVT.x, image.position.y+MVT.y);
                            const attempt2 = new Vector(image.position.x-MVT.x, image.position.y-MVT.y);
                            
                            const a1 = new Vector(others[i].position.x-attempt1.x, others[i].position.y-attempt1.y);
                            const a2 = new Vector(others[i].position.x-attempt2.x, others[i].position.y-attempt2.y);

                            let multiplier = 1;
                            if (a1.get_mag() < a2.get_mag()) multiplier *= -1;

                            if (a1.get_mag() > a2.get_mag()) {
                                const res = new Vector(image.velocity.dx+MVT.x, image.velocity.dy+MVT.y);
                                res.limit(5);
                                image.velocityUpdate(res.x, res.y);
                            } else {
                                const res = new Vector(image.velocity.dx-MVT.x, image.velocity.dy-MVT.y);
                                res.limit(5);
                                image.velocityUpdate(res.x, res.y);
                            }
                        } else {
                            image.imgRef.current!.style.borderColor = "#ffffff";
                        }
                    }
                }

                image.rotationUpdate(image.rotation+Math.random());
                image.positionUpdate(new_pos.x, new_pos.y);
        }
        const intervalId = setInterval(move, 20); // Adjust interval for speed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [image.position, image.rotation, parent]);


    return (
        <>
            {image.img}
        </>
    )
}

export default MoveWithin;