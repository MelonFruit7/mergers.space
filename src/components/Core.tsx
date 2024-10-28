/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Core = () => {
    const [text, setText] = useState('');

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
           <div className='w-full md:w-[25vw] h-[100vh] flex justify-center items-center border-r-2 border-black bg-black'>
                <img className="w-96 h-96 border-purple-700 border-2 rounded-xl" alt="gameplay" src="ship.png"></img>
           </div>

           <div className='w-full md:w-[75vw] h-[100vh] flex flex-col items-center p-20 bg-[url(/background.png)]'>

                <div className='border-2 w-[100%] max-h-[500px] text-black overflow-scroll'>

                    <h1 className='font-bold text-3xl font-mono sticky top-0 bg-white text-center'>What is Space Mergers?</h1>
                    <ReactMarkdown className="prose p-5 font-serif" components={{
                        h2: ({node, ...props}) => <h2 className="text-blue-500" {...props} />, // Blue h2 headers
                        p: ({node, ...props}) => <p className="text-white" {...props}/>,
                        strong: ({node, ...props}) => <strong className="text-white" {...props}/>,
                        li: ({ node, ...props }) => <li className="text-white" {...props} />
                    }}>{text}</ReactMarkdown>

                </div>

                <div className='border-2 w-[100%] h-[50%] flex flex-col items-center'>
                    <h1 className='text-white font-bold text-md lg:text-3xl font-mono'>Some Space Mergers assets!</h1>
                    <img className="h-[100%]" alt="Cropped Sprites" src="/CroppedSprites.png"></img>
                </div>
           </div>
        </div>
    )
}

export default Core;