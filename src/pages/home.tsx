import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import img1 from "./images/1.jpeg";
import img2 from "./images/2.jpeg";
import img3 from "./images/3.jpeg";
import img4 from "./images/4.jpeg";
import img5 from "./images/5.jpeg";
import img6 from "./images/6.jpeg";

interface cardImagesType {
    src: string,
    id: string,
    matched: boolean
}

const cardImages = [
    {"src": img1, id: "1", matched: false},
    {"src": img2, id: "2", matched: false},
    {"src": img3, id: "3", matched: false},
    {"src": img4, id: "4", matched: false},
    {"src": img5, id: "5", matched: false},
    {"src": img6, id: "6", matched: false}
];

export const Home = () => {
    const [images, setImages] = useState<cardImagesType[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [cardOne, setCardOne] = useState<cardImagesType | null>(null);
    const [cardTwo, setCardTwo] = useState<cardImagesType | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    const shuffleImages = () => {
        // duplicating and shuffling images
        const shuffledImages:cardImagesType[] = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((image, index) => ({ ...image, id: index.toString() }));
        
        setCardOne(null);
        setCardTwo(null);
        setImages(shuffledImages);
        setMoves(0);
    };

    // console.log(images);
    // console.log(moves);

    const handleChoice = (image: cardImagesType) => {
        cardOne ? setCardTwo(image) : setCardOne(image);
    };

    useEffect(() => {
        if(cardOne && cardTwo) {
            setDisabled(true);
            if(cardOne.src === cardTwo.src) {
                // console.log("Images matched");
                setImages(prevImages => {
                    return prevImages.map((image) => {
                        if(image.src === cardOne.src) {
                            return {...image, matched: true}
                        }
                        else {
                            return image;
                        }
                    })
                })
                resetImages();
            }
            else {
                // console.log("Images do not match");
                setTimeout(() => resetImages(), 500);
            }
        }
    }, [cardOne, cardTwo]);

    // console.log(images);

    const resetImages = () => {
        setCardOne(null);
        setCardTwo(null);
        setMoves((prevValue) => prevValue + 1);
        setDisabled(false);
    }

    useEffect(() => {
        shuffleImages();
    }, []);

    return(
        <div className="bg-gradient-to-b from-sky-200 to-white font-semibold flex flex-col px-[250px] text-center py-[10px]">
            <div className="space-y-5">
                <p className="text-4xl">Flip & Find</p>
                <button
                    className="text-lg p-1 text-yellow-200 rounded-lg bg-sky-600 active:bg-sky-500 active:transition-all"
                    onClick={shuffleImages}>
                        New Game
                </button>
            </div>
            <div className="grid grid-cols-4 mt-[40px] gap-[20px]">
                {
                    images.map((image) => (
                        <Card
                            key={image.id}
                            image={image}
                            handleChoice={handleChoice}
                            turnedUp={image === cardOne || image === cardTwo || image.matched}
                            disabled={disabled}
                        />
                    ))
                }
            </div>
            <p className="text-2xl my-5">Moves: {moves}</p>
        </div>
    )
}