import React, { useState } from "react";

const ThemeGrid = ({ colors, altTexts, onImageClick, selectedTheme }) => (
    <div className="grid grid-cols-4 gap-5">
        {colors.map((color, index) => (
            <div
                key={index}
                className={`relative cursor-pointer flex justify-center ${
                    selectedTheme === color
                        ? "border-2 rounded-lg border-blue-500"
                        : ""
                }`}
                onClick={() => onImageClick(color)}
            >
                {/* <img
                    loading="lazy"
                    src={src}
                    alt={altTexts[index]}
                    className="w-full aspect-square"
                /> */}
                <div
                    className={`w-20 h-20 bg-${color}-500 flex justify-center items-center rounded-full text-gray-700`}
                >
                    {color}
                </div>
                {selectedTheme === color && (
                    <img
                        src="assets/red-tick-select.svg"
                        alt="Selected"
                        className="absolute w-4 h-4 top-2 right-3"
                    />
                )}
            </div>
        ))}
    </div>
);

const ThemeComponent = ({ onSave }) => {
    const [selectedTheme, setSelectedTheme] = useState();

    const colors1 = [
        "blue",
        "green",
        "yellow",
        "cyan",
        "pink",
        "indigo",
        "teal",
        "orange",
        "purple",
        "red",
    ];

    const handleImageClick = (selectedTheme) => {
        setSelectedTheme(() => {
            if (document.documentElement.classList.value) {
                document.documentElement.classList.remove(
                    document.documentElement.classList.value
                );
            }
            document.documentElement.classList.add(`theme-${selectedTheme}`);
        });
    };

    const handleSave = () => {
        onSave(selectedTheme);
    };

    return (
        <section className="flex flex-col px-5 py-8 bg-white rounded-2xl shadow-custom max-w-[700px]">
            <h2 className="text-2xl font-bold text-neutral-800 max-md:max-w-full">
                Customize your theme
            </h2>
            <div className="mt-8">
                <ThemeGrid
                    colors={colors1}
                    onImageClick={handleImageClick}
                    selectedTheme={selectedTheme}
                />
            </div>
            <button
                onClick={handleSave}
                className="px-4 py-2 mt-5 text-white bg-primary-500 rounded hover:bg-primary-700"
            >
                Save
            </button>
        </section>
    );
};

export default ThemeComponent;
