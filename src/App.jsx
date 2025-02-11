import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
    const [opened, setOpened] = useState(false);
    const [noClicks, setNoClicks] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [yesButtons, setYesButtons] = useState([]);

    const handleNoClick = () => {
        setNoClicks((prev) => prev + 1);
        setYesButtons((prev) => {
            if (prev.length > 15) return prev; // Limit Yes buttons to eventually cover No
            return [
                ...prev,
                ...Array(prev.length + 1).fill(null).map((_, i) => ({
                    top: `${Math.random() * 40 + 30}%`,
                    left: `${Math.random() * 40 + 30}%`,
                    zIndex: prev.length + i, // Ensuring overlap
                })),
            ];
        });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-200">
            <div className="relative flex flex-col items-center w-full max-w-full h-screen justify-center">
                <motion.div
                    initial={{ y: 0, opacity: 1 }}
                    animate={opened ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex items-center justify-center bg-red-600 rounded-lg shadow-xl cursor-pointer w-full max-w-md md:max-w-lg h-auto min-h-[20vh] md:min-h-[30vh] text-white font-bold text-2xl"
                    onClick={() => setOpened(true)}
                >
                    <img src="https://jerseystamps.com/cdn/shop/collections/Lunar_New_Year_Snake_Stamp.png?v=1735565398"
                         alt="2025 Stamp"
                         className="absolute top-2 right-2 w-16 h-16 object-cover" />
                    <p className="absolute bottom-1 right-2 text-white text-xxs font-bold scale-50">2025</p>
                    <p className="absolute text-white text-3xl font-cursive">For Azizur</p>
                </motion.div>
                {opened && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: -50, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex flex-col items-center p-6 bg-blue-200 shadow-lg rounded-lg w-full max-w-2xl h-auto min-h-[50vh] flex-grow"
                    >
                        {!accepted ? (
                            <>
                                <img src='https://media1.tenor.com/m/YciMs8-7iKAAAAAC/modcheck-confuse.gif' alt='Confused' className='w-240 h-240 mb-4' />
                                <p className="text-lg font-semibold text-center">Hi Azizur, Will you be my Valentine? ❤️</p>
                                <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-6 relative">
                                    <motion.button
                                        className="bg-red-500 text-white px-4 py-2 rounded relative z-10"
                                        onClick={() => setAccepted(true)}
                                    >
                                        Yes
                                    </motion.button>
                                    <motion.button
                                        className="bg-red-500 text-white px-4 py-2 rounded relative z-0"
                                        onClick={handleNoClick}
                                    >
                                        No
                                    </motion.button>
                                    {yesButtons.map((pos, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setAccepted(true)}
                                            className="absolute bg-red-500 text-white px-4 py-2 rounded"
                                            style={{ top: `calc(${pos.top} - 10%)`, left: `calc(${pos.left} - 10%)`, zIndex: pos.zIndex, maxWidth: '100px' }}
                                        >
                                            Yes
                                        </motion.button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <img src='https://media.tenor.com/ocBrDK-xRl4AAAAi/love-it-i-love-it.gif' alt='Love It' className='w-240 h-240 mb-4' />
                                <p className="text-lg font-semibold text-center text-red-500">Yay! I knew you'd click Yes!❤️ Happy Valentine's Day!</p>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
