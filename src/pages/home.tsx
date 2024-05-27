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
    const [name, setName] = useState<string>("");
    const [nameEntered, setNameEntered] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
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
        setName("");
        setNameEntered(false);
        setGameCompleted(false);
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
                    const tempImages = prevImages.filter((image) => image.matched===true)
                    if(tempImages.length === cardImages.length*2 - 2) {
                        setGameCompleted(true);
                    }
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
    };

    const handleName = () => {
        setNameEntered(true);
    }

    useEffect(() => {
        shuffleImages();
    }, []);

    return(
        <div className="bg-gradient-to-b from-sky-200 to-white font-semibold flex flex-col px-[250px] text-center py-[10px]">
            <div className="space-y-5">
                <p className="text-4xl">Flip & Find</p>
                {
                    !nameEntered ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                onChange={(event) => setName(event.target.value)}
                                className="p-1 rounded-md mx-2 text-lg border-2 border-sky-500"
                            />
                            <button
                                onClick={handleName}
                                className="text-lg px-4 py-1 text-yellow-200 rounded-lg bg-sky-700 active:text-yellow-400 active:bg-sky-400 hover:bg-sky-500 hover:transition hover:delay-100 hover:scale-[120%] active:transition-all"
                            >
                                Enter
                            </button>
                        </div>
                    ):(
                        <p className="text-xl font-semibold">Good Luck { name }!</p>
                    )
                }
                <button
                    className="text-lg px-4 py-1 text-yellow-200 rounded-lg bg-sky-700 active:text-yellow-400 active:bg-sky-400 hover:bg-sky-500 hover:transition hover:delay-100 hover:scale-[120%] active:transition-all"
                    onClick={shuffleImages}>
                        New Game
                </button>
            </div>
            <div className="flex justify-around">
                <div className="grid grid-cols-4 mt-[40px] gap-[28px]">
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
            </div>
            <div className="flex justify-around">
                {
                    gameCompleted ? (
                        <div className="px-[50px] md:px-[150px] lg:px-[250px] my-4 border-2 border-sky-300 rounded-lg shadow-2xl">
                            <p className="text-2xl my-5">Congrats {name} !!!</p>
                            <p className="text-2xl my-5">You completed the game in {moves} moves!</p>
                        </div>
                    ):(
                        <p className="text-2xl my-5">Moves: {moves}</p>
                    )
                }
            </div>
        </div>
    )
}