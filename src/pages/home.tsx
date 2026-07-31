import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import img1 from "./images/1.jpeg";
import img2 from "./images/2.jpeg";
import img3 from "./images/3.jpeg";
import img4 from "./images/4.jpeg";
import img5 from "./images/5.jpeg";
import img6 from "./images/6.jpeg";
import { Title } from "../components/Title";

interface cardImagesType {
  src: string;
  id: string;
  matched: boolean;
}

const cardImages = [
  { src: img1, id: "1", matched: false },
  { src: img2, id: "2", matched: false },
  { src: img3, id: "3", matched: false },
  { src: img4, id: "4", matched: false },
  { src: img5, id: "5", matched: false },
  { src: img6, id: "6", matched: false },
];

interface IFlippedCards {
  cardOne: cardImagesType | null;
  cardTwo: cardImagesType | null;
}

export const Home = () => {
  const [name, setName] = useState<string>("");

  const [gameCompleted, setGameCompleted] =
    useState<boolean>(false);
  const [images, setImages] = useState<cardImagesType[]>(
    []
  );
  const [moveCounter, setMoveCounter] = useState<number>(0);

  const [flippedCards, setFlippedCards] =
    useState<IFlippedCards | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false);

  const shuffleImages = () => {
    const shuffledImages: cardImagesType[] = [
      ...cardImages,
      ...cardImages,
    ]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        ...image,
        id: index.toString(),
      }));

    setImages(shuffledImages);

    setFlippedCards(null);
    setMoveCounter(0);
    setGameCompleted(false);
  };

  const handleChoice = (image: cardImagesType) => {
    if (flippedCards?.cardOne) {
      setFlippedCards({
        cardOne: flippedCards?.cardOne,
        cardTwo: image,
      });
    } else {
      setFlippedCards({
        cardOne: image,
        cardTwo: null,
      });
    }
  };

  useEffect(() => {
    const cardOne = flippedCards?.cardOne;
    const cardTwo = flippedCards?.cardTwo;
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setImages((prevImages) => {
          const tempImages = prevImages.filter(
            (image) => image.matched === true
          );
          if (
            tempImages.length ===
            cardImages.length * 2 - 2
          ) {
            setGameCompleted(true);
          }
          return prevImages.map((image) => {
            if (image.src === cardOne.src) {
              return { ...image, matched: true };
            } else {
              return image;
            }
          });
        });
        resetImages();
      } else {
        setTimeout(() => resetImages(), 500);
      }
    }
  }, [flippedCards]);

  const resetImages = () => {
    setFlippedCards(null);
    setMoveCounter((prevValue) => prevValue + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white font-semibold flex flex-col py-1 px-[50px] md:px-[150px] lg:px-[250px] text-center gap-4">
      <Title
        setName={setName}
        shuffleImages={shuffleImages}
        gameCompleted={gameCompleted}
      />
      <div className="flex justify-around">
        <div className="grid grid-cols-4 gap-[16px]">
          {images.map((image) => (
            <Card
              key={image.id}
              image={image}
              handleChoice={handleChoice}
              turnedUp={
                image === flippedCards?.cardOne ||
                image === flippedCards?.cardTwo ||
                image.matched
              }
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-around">
        {gameCompleted ? (
          <div className="px-[50px] md:px-[150px] lg:px-[250px] my-4 border-2 border-sky-300 rounded-lg shadow-2xl">
            <p className="text-2xl my-5">
              Congrats {name} !!!
            </p>
            <p className="text-2xl my-5">
              You completed the game in {moveCounter} moves!
            </p>
          </div>
        ) : (
          <p className="text-2xl my-5">
            Moves: {moveCounter}
          </p>
        )}
      </div>
    </div>
  );
};
