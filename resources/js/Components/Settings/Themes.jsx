import React, { useState } from "react";

const ThemeGrid = ({ colors, altTexts, onImageClick, selectedTheme }) => (
    <div className="grid grid-cols-4 gap-4 p-4">
        {colors.map((combo, index) => (
            <div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-lg p-4 "
                onClick={() => onImageClick(combo.code)}
            >
                {selectedTheme == combo.code ? (
                <img
                    src="assets/red-tick-select.svg"
                    alt="Selected"
                    className="absolute w-4 h-4 top-2 right-3"
                />
                ) : null}
                <div className="w-full h-full rounded-full overflow-hidden transform hover:scale-105 transition-transform duration-200">
                    <div className="flex flex-col h-full min-h-28">
                        {/* Top half - Primary color */}
                        <div
                            className={`h-1/2 ${combo.primary} text-center font-bold pt-3 text-white`}
                        >
                            {combo.code}
                        </div>
                        {/* Bottom half - Split between secondary and tertiary */}
                        <div className="h-1/2 flex">
                            <div className={`w-1/2 ${combo.secondary}`}></div>
                            <div className={`w-1/2 ${combo.tertiary}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const ThemeComponent = ({ onSave }) => {
    const [selectedTheme, setSelectedTheme] = useState();

    const combinations = [
        {
            code: "blue",
            primary: "bg-blue-500",
            secondary: "bg-green-800",
            tertiary: "bg-yellow-200",
        },
        {
            code: "red",
            primary: "bg-red-500",
            secondary: "bg-cyan-800",
            tertiary: "bg-pink-200",
        },
        {
            code: "teal",
            primary: "bg-teal-500",
            secondary: "bg-orange-800",
            tertiary: "bg-blue-200",
        },
        {
            code: "purple",
            primary: "bg-purple-500",
            secondary: "bg-yellow-800",
            tertiary: "bg-indigo-200",
        },
        {
            code: "pink",
            primary: "bg-pink-500",
            secondary: "bg-teal-800",
            tertiary: "bg-red-200",
        },
        {
            code: "orange",
            primary: "bg-orange-500",
            secondary: "bg-purple-800",
            tertiary: "bg-green-200",
        },
        {
            code: "yellow",
            primary: "bg-yellow-500",
            secondary: "bg-pink-800",
            tertiary: "bg-cyan-200",
        },
        {
            code: "green",
            primary: "bg-green-500",
            secondary: "bg-indigo-800",
            tertiary: "bg-teal-200",
        },
        {
            code: "cyan",
            primary: "bg-cyan-500",
            secondary: "bg-blue-800",
            tertiary: "bg-orange-200",
        },
        {
            code: "indigo",
            primary: "bg-indigo-500",
            secondary: "bg-red-800",
            tertiary: "bg-purple-200",
        },
    ];

    const handleImageClick = (selectedTheme) => {
        setSelectedTheme(() => {
            if (document.documentElement.classList.value) {
                document.documentElement.classList.remove(
                    document.documentElement.classList.value
                );
            }
            document.documentElement.classList.add(`theme-${selectedTheme}`);
            localStorage.setItem("theme", `theme-${selectedTheme}`);
            return selectedTheme
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
                    colors={combinations}
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
