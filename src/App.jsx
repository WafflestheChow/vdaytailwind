import { useState } from "react";
import { motion } from "framer-motion";

// Animation configurations for envelope and letter
const animationConfig = {
    initial: { y: 0, opacity: 1 },
    envelopeHidden: { y: 200, opacity: 0 },
    letterVisible: { y: -50, opacity: 1 },
    transition: { duration: 0.8 }
};

export default function App() {
    const [opened, setOpened] = useState(false);
    const [noClicks, setNoClicks] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [yesButtons, setYesButtons] = useState([]);

    const handleNoClick = () => {
        console.log("No button clicked"); // Debugging line
        setNoClicks((prev) => prev + 1);

        setYesButtons((prev) => {
            if (prev.length >= 250) return prev;
            const newButtons = Array.from({ length: noClicks + 1 }, () => ({
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                zIndex: prev.length + 1,
            }));
            return [...prev, ...newButtons];
        });
    };


    const handleRestart = () => {
        setOpened(false);
        setAccepted(false);
        setNoClicks(0);
        setYesButtons([]);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-200">
            <div className="relative flex flex-col items-center w-full max-w-full h-screen justify-center">
                {/* Envelope */}
                <motion.div
                    role="button"
                    aria-label="Click to open envelope"
                    tabIndex={0}
                    initial={animationConfig.initial}
                    animate={opened ? animationConfig.envelopeHidden : animationConfig.initial}
                    transition={animationConfig.transition}
                    className="relative flex items-center justify-center bg-red-700 rounded-lg shadow-xl cursor-pointer w-full max-w-md md:max-w-lg h-auto min-h-[20vh] md:min-h-[30vh] text-white font-bold text-2xl focus:ring-4 focus:ring-white"
                    onClick={() => setOpened(true)}
                    onKeyDown={(e) => e.key === 'Enter' && setOpened(true)}
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
                                <img src='https://media1.tenor.com/m/YciMs8-7iKAAAAAC/modcheck-confuse.gif' alt='Confused' className='w-240 h-240 mb-4' />
                                <p className="text-lg text-black font-bold text-center">Hi Josie, It's that time of year again. Will you be my Valentine? ❤️</p>
                                <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 mt-6 relative">
                                    {/* Yes button */}
                                    <motion.button
                                        className="bg-red-700 text-white px-4 py-2 rounded relative z-10 focus:ring-4 focus:ring-white"
                                        aria-label="Accept and say Yes"
                                        onClick={() => setAccepted(true)}
                                    >
                                        <strong>Yes!</strong>
                                    </motion.button>
                                    {/* No button */}
                                    <motion.button
                                        className="bg-red-700 text-white px-4 py-2 rounded relative z-0 focus:ring-4 focus:ring-white"
                                        aria-label="Reject and click No"
                                        onClick={handleNoClick}
                                    >
                                        <strong>No!</strong>
                                    </motion.button>
                                    {/* Dynamically generated Yes buttons */}
                                    {yesButtons.map((pos, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setAccepted(true)}
                                            className="absolute bg-red-700 text-white px-4 py-2 rounded focus:ring-4 focus:ring-white"
                                            aria-label="Accept and say Yes"
                                            style={{ top: pos.top, left: pos.left, zIndex: pos.zIndex }}
                                        >
                                            <strong>Yes!</strong>
                                        </motion.button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <img src='https://media.tenor.com/ocBrDK-xRl4AAAAi/love-it-i-love-it.gif' alt='Love It' className='w-240 h-240 mb-4' />
                                <p className="text-lg font-semibold text-center text-red-500">Yay! I knew you were going to say Yes Josie!❤️ Happy Valentine's Day!</p>
                                <button
                                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded focus:ring-4 focus:ring-white"
                                    aria-label="Restart the experience"
                                    onClick={handleRestart}
                                >
                                    Start Over
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
