/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaSteam } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="h-[15vh] relative bg-[#000b2e] flex justify-between p-2 md:px-10">
            <div className='flex items-center justify-center w-[50%] h-full'>
                <img alt="logo" src="logo.png" className='w-auto max-h-[60%]'></img>
            </div>

            <div className='flex flex-col items-center justify-center w-full h-full'>
                <p className='text-[1.75vh] text-white'>melonfruith1@gmail.com</p>
                <p className='text-gray-500 text-[1vh] text-center'>@ 2024 Space Mergers, mergers.space</p>
            </div>

            <div className='flex flex-col items-center justify-center w-[50%] h-full'>
                <a href='https://store.steampowered.com/app/2821220/Space_Mergers/' target='_blank' className='h-[60%] group'>
                    <FaSteam className='w-auto h-full text-white group-hover:text-red-500'/>
                </a>
            </div>
        </div>
    )
};

export default Footer;