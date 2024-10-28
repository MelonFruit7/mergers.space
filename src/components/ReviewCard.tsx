import React from "react"
import { FaRegThumbsUp } from "react-icons/fa";

interface ReviewCardProp {
    review: string,
    playtime: number
}

const ReviewCard = (f: ReviewCardProp) => {
    const maxWidthClass = `max-w-[375px]`;
    const maxHeightClass = `max-h-[250px]`;

    const mdMaxWidthClass = `md:max-w-[700px]`;
    const mdMaxHeightClass = `md:max-h-[500px]`;

    return (
        <div className={`bg-[#1B2838] shadow-xl shadow-purple-800 h-full w-full p-4 m-4 ${maxWidthClass} ${maxHeightClass} ${mdMaxWidthClass} ${mdMaxHeightClass} border-2 rounded-2xl overflow-scroll`}>
            <div className="bg-[#3D5467] w-[100%] h-8 md:h-16 rounded-2xl flex flex-row items-center">
                <FaRegThumbsUp className="h-full w-auto p-2 bg-blue-500 rounded-2xl"></FaRegThumbsUp>
                <p className="text-lg md:text-2xl p-2">Played for: {f.playtime} hours</p>
            </div>
            <p className="text-lg p-2 font-mono">
                {f.review}
            </p>
        </div>
    )
}

export default ReviewCard;