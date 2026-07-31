export const Title = ({
  setName,
  shuffleImages,
  gameCompleted,
}: {
  setName: React.Dispatch<React.SetStateAction<string>>;
  shuffleImages: () => void;
  gameCompleted: boolean;
}) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <p className="text-5xl font-bold tracking-tighter">
        Flip & Find
      </p>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(event) => setName(event.target.value)}
        className="p-1 rounded-md mx-2 text-lg border-2 border-sky-500"
        disabled={gameCompleted}
      />
      <button
        className="text-lg px-4 py-1 text-yellow-200 rounded-lg bg-sky-700 active:text-yellow-400 active:bg-sky-400 hover:bg-sky-500 hover:transition hover:delay-100 hover:scale-[120%] active:transition-all"
        onClick={shuffleImages}
      >
        New Game
      </button>
    </div>
  );
};
