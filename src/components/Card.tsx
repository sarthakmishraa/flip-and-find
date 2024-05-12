import React from "react";
import BG from "../pages/images/BG.jpeg";

interface CardProps {
    image: cardImagesType,
    handleChoice: (image: cardImagesType) => void,
    turnedUp: boolean,
    disabled: boolean
}

interface cardImagesType {
    "src": string,
    id: string,
    matched: boolean
}

export const Card: React.FC<CardProps> = ({ image, handleChoice, turnedUp, disabled }) => {
    const handleClick = () => {
        if(!disabled){
            handleChoice(image);
        }
    };

    return(
        <div className="relative w-[200px] cursor-pointer shadow-4xl" >
            <div>
                {
                    turnedUp ? (
                        <img
                            src={image.src}
                            alt="front"
                            className="w-[100%] border-4 border-gray-600 rounded-md"
                        />
                    ):(
                        <img
                            src={BG}
                            alt="back"
                            onClick={handleClick}
                            className="w-[100%] border-4 border-gray-600 rounded-md"
                        />
                    )
                }
            </div>
        </div>
    )
}