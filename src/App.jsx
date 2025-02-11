import { useState } from "react";
import { motion } from "framer-motion";

// Animation configurations for envelope and letter
const animationConfig = {
    initial: { y: 0, opacity: 1 }, // Initial position
    envelopeHidden: { y: 200, opacity: 0 }, // Moves envelope downward and disappears
    letterVisible: { y: -50, opacity: 1 }, // Moves letter upward
    transition: { duration: 0.8 } // Smooth transition
};

export default function App() {
    const [opened, setOpened] = useState(false); // Tracks if the envelope has been opened
    const [noClicks, setNoClicks] = useState(0); // Counts the number of times 'No' is clicked
    const [accepted, setAccepted] = useState(false); // Tracks if 'Yes' has been clicked
    const [yesButtons, setYesButtons] = useState([]); // Stores dynamically generated 'Yes' buttons

    // Handles the 'No' button clicks by generating more 'Yes' buttons across the entire card
    const handleNoClick = () => {
        setNoClicks((prev) => prev + 1);
        setYesButtons((prev) => {
            if (prev.length > 250) return prev; // Increase the max limit for better coverage
            return [
                ...prev,
                ...Array(prev.length + 1).fill(null).map((_, i) => ({
                    top: `${Math.random() * 90 + 5}%`, // Spread across entire card vertically
                    left: `${Math.random() * 90 + 5}%`, // Spread across entire card horizontally
                    zIndex: prev.length + i, // Ensure overlap of Yes buttons
                })),
            ];
        });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-200">
            <div className="relative flex flex-col items-center w-full max-w-full h-screen justify-center">
                {/* Envelope */}
                <motion.div
                    initial={animationConfig.initial}
                    animate={opened ? animationConfig.envelopeHidden : animationConfig.initial}
                    transition={animationConfig.transition}
                    className="relative flex items-center justify-center bg-red-600 rounded-lg shadow-xl cursor-pointer w-full max-w-md md:max-w-lg h-auto min-h-[20vh] md:min-h-[30vh] text-white font-bold text-2xl"
                    onClick={() => setOpened(true)}
                >
                    {/* Stamp */}
                    <img src="https://jerseystamps.com/cdn/shop/collections/Lunar_New_Year_Snake_Stamp.png?v=1735565398"
                         alt="2025 Stamp"
                         className="absolute top-2 right-2 w-16 h-16 object-cover" />
                    <p className="absolute bottom-1 right-2 text-white text-xxs font-bold scale-50">2025</p>
                    <p className="absolute text-white text-3xl font-cursive">For Josie</p>
                </motion.div>

                {/* Letter */}
                {opened && (
                    <motion.div
                        initial={animationConfig.envelopeHidden}
                        animate={animationConfig.letterVisible}
                        transition={animationConfig.transition}
                        className="relative flex flex-col items-center p-6 bg-blue-200 shadow-lg rounded-lg w-full max-w-2xl h-auto min-h-[50vh] flex-grow"
                    >
                        {!accepted ? (
                            <>
                                {/* Confused GIF */}
                                <img src='https://media1.tenor.com/m/YciMs8-7iKAAAAAC/modcheck-confuse.gif' alt='Confused' className='w-240 h-240 mb-4' />
                                <p className="text-lg font-semibold text-center">Hi Josie, Will you be my Valentine? ❤️</p>
                                <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 mt-6 relative">
                                    {/* Yes button */}
                                    <motion.button
                                        className="bg-red-500 text-white px-4 py-2 rounded relative z-10"
                                        onClick={() => setAccepted(true)}
                                    >
                                        Yes!
                                    </motion.button>
                                    {/* No button */}
                                    <motion.button
                                        className="bg-red-500 text-white px-4 py-2 rounded relative z-0"
                                        onClick={handleNoClick}
                                    >
                                        No
                                    </motion.button>
                                    {/* Dynamically generated Yes buttons */}
                                    {yesButtons.map((pos, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setAccepted(true)}
                                            className="absolute bg-red-500 text-white  px-4 py-2 rounded"
                                            style={{ top: `calc(${pos.top} - 10%)`, left: `calc(${pos.left} - 10%)`, zIndex: pos.zIndex, maxWidth: '100px' }}
                                        >
                                            Yes!
                                        </motion.button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Celebration GIF when Yes is clicked */}
                                <img src='https://media.tenor.com/ocBrDK-xRl4AAAAi/love-it-i-love-it.gif' alt='Love It' className='w-240 h-240 mb-4' />
                                <p className="text-lg font-semibold text-center text-red-500">Yay! I knew you were going to say Yes!❤️ Happy Valentine's Day!</p>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
