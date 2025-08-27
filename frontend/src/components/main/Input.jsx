"use client";

import PlaceholdersAndVanishInput from "../aceternity-ui/PlaceholdersAndVanishInput";
// import reactElementToJSXString from "react-element-to-jsx-string";
// import { toast, Toaster } from "sonner";

export default function Input({ onSubmit, value, setValue }) {
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    const handleClipboardClick = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log("Text copied to clipboard:", text);
                // toast.success("Copied to clipboard");
            })
            .catch((err) => {
                console.error("Error copying text to clipboard:", err);
                // toast.error("Error copying to clipboard");
            });
    };
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("submitted");
    // };
    return (
        <div 
            className="w-[40%] px-4"
        >
            {/* <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
                URL
            </h2> */}
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
                onClipboardClick={handleClipboardClick}
                value={value}
                setValue={setValue}
            />
        </div>
    );
}
