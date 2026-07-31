import React from "react";
import BG from "../pages/images/BG.jpeg";

interface CardProps {
  image: cardImagesType;
  handleChoice: (image: cardImagesType) => void;
  turnedUp: boolean;
  disabled: boolean;
}

interface cardImagesType {
  src: string;
  id: string;
  matched: boolean;
}

export const Card: React.FC<CardProps> = ({
  image,
  handleChoice,
  turnedUp,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(image);
    }
  };

  return (
    <div className="w-[80px] lg:w-[150px] xl:w-[200px] [perspective:1000px]">
      <div
        onClick={handleClick}
        className={`
      relative w-full cursor-pointer duration-500
      [transform-style:preserve-3d]
      ${turnedUp ? "[transform:rotateY(180deg)]" : ""}
    `}
      >
        <img
          src={BG}
          alt="back"
          className="w-full border-4 border-gray-600 rounded-md
                 [backface-visibility:hidden]"
        />
        <img
          src={image.src}
          alt="front"
          className="absolute inset-0 w-full border-4 border-gray-600 rounded-md
                 [transform:rotateY(180deg)]
                 [backface-visibility:hidden]"
        />
      </div>
    </div>
  );
};
