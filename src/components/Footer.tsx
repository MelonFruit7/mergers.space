/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaSteam } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="h-[15vh] relative bg-[#000b2e] flex justify-between px-2 md:px-10">
            <div className='flex items-center justify-center w-full'>
                <img alt="logo" src="logo.png" className='w-24 md:w-40'></img>
            </div>
            <div className='flex flex-col items-center justify-center w-full overflow-hidden'>
                <p className='text-[0.7rem] md:text-sm'>melonfruith1@gmail.com</p>
                <p className='text-gray-500 text-[0.5rem] md:text-xs text-center'>@ 2024 Space Mergers, mergers.space</p>
            </div>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <a href='https://store.steampowered.com/app/2821220/Space_Mergers/' target='_blank' className='w-8 md:w-20'>
                    <FaSteam className='w-full h-full'></FaSteam>
                </a>
            </div>
        </div>
    )
};

export default Footer;