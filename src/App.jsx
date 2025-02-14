import { useState } from "react";
import { motion } from "framer-motion";

// Here's my setup for the envelope and letter animations.
// It covers how things start, how they hide, how the letter appears,
// and the duration for all transitions.
const animationConfig = {
    initial: { y: 0, opacity: 1 },
    envelopeHidden: { y: 200, opacity: 0 },
    letterVisible: { y: -50, opacity: 1 },
    transition: { duration: 0.8 },
};

export default function App() {
    const [opened, setOpened] = useState(false);
    const [noClicks, setNoClicks] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [yesButtons, setYesButtons] = useState([]);

    // This variable tracks which mode "No" is in:
    // "click" means clicking it spawns new Yes buttons,
    // "run" means it jumps away when hovered.
    const [noMode, setNoMode] = useState("click");

    // Controls the runaway effect, plus keeps track of where the No button goes.
    const [runAway, setRunAway] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ top: "0%", left: "0%" });

    // If "No" is in click mode, each click spawns multiple Yes buttons.
    // If it's in run mode, we skip that behavior.
    const handleNoClick = () => {
        if (noMode === "click") {
            setNoClicks((prev) => prev + 1);
            setYesButtons((prev) => {
                if (prev.length >= 250) return prev;

                // We're adding 3 new Yes buttons every time someone clicks "No".
                const newButtons = [];
                for (let i = 0; i < 3; i++) {
                    // We'll stop if we ever get to 250.
                    if (prev.length + newButtons.length >= 250) break;
                    newButtons.push({
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        // Giving each Yes button a higher z-index so they can cover "No".
                        zIndex: prev.length + newButtons.length + 2,
                    });
                }
                return [...prev, ...newButtons];
            });
        }
    };

    // If "No" is in run mode, we shuffle its position when the user hovers over it.
    const handleMouseEnterNoButton = () => {
        if (noMode === "run") {
            setNoButtonPosition({
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
            });
            setRunAway(true);
        }
    };

    // This resets everything and toggles the No button between "click" mode and "run" mode.
    const handleRestart = () => {
        setOpened(false);
        setAccepted(false);
        setNoClicks(0);
        setYesButtons([]);

        setNoMode((prev) => (prev === "click" ? "run" : "click"));
        setRunAway(false);
        setNoButtonPosition({ top: "0%", left: "0%" });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-pink-200">
            {/* The main container for everything. */}
            <div className="relative flex flex-col items-center w-full max-w-full h-screen justify-center">
                {/* The clickable "envelope" area. */}
                <motion.div
                    role="button"
                    aria-label="Click to open envelope"
                    tabIndex={0}
                    initial={animationConfig.initial}
                    animate={opened ? animationConfig.envelopeHidden : animationConfig.initial}
                    transition={animationConfig.transition}
                    className="relative flex items-center justify-center bg-red-700 rounded-lg shadow-xl cursor-pointer w-full max-w-md md:max-w-lg h-auto min-h-[20vh] md:min-h-[30vh] text-white font-bold text-2xl focus:ring-4 focus:ring-white"
                    onClick={() => setOpened(true)}
                    onKeyDown={(e) => e.key === "Enter" && setOpened(true)}
                >
                    {/* Little stamp in the corner. */}
                    <img
                        src="https://jerseystamps.com/cdn/shop/collections/Lunar_New_Year_Snake_Stamp.png?v=1735565398"
                        alt="2025 Stamp"
                        className="absolute top-2 right-2 w-16 h-16 object-cover"
                    />
                    <p className="absolute bottom-1 right-2 text-white text-xxs font-bold scale-50">2025</p>
                    <p className="absolute text-white text-3xl font-cursive">For Josie</p>
                </motion.div>

                {/* The actual "letter" content that shows up after opening. */}
                {opened && (
                    <motion.div
                        initial={animationConfig.envelopeHidden}
                        animate={animationConfig.letterVisible}
                        transition={animationConfig.transition}
                        className="relative flex flex-col items-center p-6 bg-blue-200 shadow-lg rounded-lg w-full max-w-2xl h-auto min-h-[50vh] flex-grow"
                    >
                        {!accepted ? (
                            <>
                                <img
                                    src="https://media1.tenor.com/m/YciMs8-7iKAAAAAC/modcheck-confuse.gif"
                                    alt="Confused"
                                    className="w-240 h-240 mb-4"
                                />
                                <p className="text-lg font-semibold text-center text-black font-bold">
                                    Hi Josie,<br />
                                    Will you be my Valentine? ❤️
                                </p>
                                <div
                                    className="w-full h-full flex flex-wrap items-center justify-center gap-4 mt-6 relative"
                                    style={{ minHeight: "200px" }}
                                >
                                    {/* The first Yes button. */}
                                    <motion.button
                                        className="bg-red-500 text-white font-bold px-4 py-2 rounded relative z-10 focus:ring-4 focus:ring-white"
                                        aria-label="Accept and say Yes"
                                        onClick={() => setAccepted(true)}
                                    >
                                        <strong>Yes!</strong>
                                    </motion.button>

                                    {/* Any new Yes buttons that get spawned. */}
                                    {yesButtons.map((pos, index) => (
                                        <motion.button
                                            key={index}
                                            className="bg-red-500 text-white font-bold px-4 py-2 rounded absolute focus:ring-4 focus:ring-white"
                                            style={{
                                                top: pos.top,
                                                left: pos.left,
                                                zIndex: pos.zIndex,
                                            }}
                                            aria-label="Additional Yes button"
                                            onClick={() => setAccepted(true)}
                                        >
                                            <strong>Yes!</strong>
                                        </motion.button>
                                    ))}

                                    {/* The No button with a lower z-index so a Yes can eventually cover it. */}
                                    <motion.button
                                        className="bg-red-500 text-white font-bold px-4 py-2 rounded focus:ring-4 focus:ring-white z-0"
                                        aria-label="Reject and click No"
                                        onClick={handleNoClick}
                                        onMouseEnter={handleMouseEnterNoButton}
                                        style={
                                            runAway && noMode === "run"
                                                ? {
                                                    position: "absolute",
                                                    top: noButtonPosition.top,
                                                    left: noButtonPosition.left,
                                                    zIndex: 0,
                                                }
                                                : { zIndex: 0 }
                                        }
                                    >
                                        <strong>No</strong>
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src="https://media.tenor.com/ocBrDK-xRl4AAAAi/love-it-i-love-it.gif"
                                    alt="Love It"
                                    className="w-240 h-240 mb-4"
                                />
                                <p className="text-lg font-semibold text-center text-red-500">
                                    Yay! I knew you were going to say <strong>Yes!</strong> ❤️ <br /> Happy Valentine's Day!
                                </p>
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
