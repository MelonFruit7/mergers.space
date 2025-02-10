import React from "react"
import { FaRegThumbsUp } from "react-icons/fa";

interface ReviewCardProp {
    review: string,
    playtime: number
}

const ReviewCard = (f: ReviewCardProp) => {
    const maxWidthClass = `max-w-[375px]`;
    const maxHeightClass = `max-h-[250px]`;

    const mdMaxWidthClass = `md:max-w-[80%]`;
    const mdMaxHeightClass = `md:max-h-[min(500px,70vh)]`;

    return (
        <div className={`bg-[#1B283877] z-10 h-full w-full p-4 m-4 ${maxWidthClass} ${maxHeightClass} ${mdMaxWidthClass} ${mdMaxHeightClass} border-8 rounded-2xl overflow-scroll`}
              style={{
                borderStyle: "ridge",
                boxShadow: "inset 4px 4px 10px rgb(255, 255, 255)"
              }}>
            <div className="bg-[#3D546777] w-[100%] h-8 md:h-16 rounded-2xl flex flex-row items-center">
                <FaRegThumbsUp className="h-full w-auto p-2 bg-blue-500 text-white rounded-2xl"></FaRegThumbsUp>
                <p className="text-lg md:text-2xl p-2 text-white font-PixelSans">Played for: {f.playtime} hours</p>
            </div>
            <p className="text-lg p-2 font-PixelSans whitespace-pre-wrap text-white">
                {f.review}
            </p>
        </div>
    )
}

export default ReviewCard;