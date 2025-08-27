import Button from "../main/Button";
import Input from "../main/Input";
import { shortenUrl } from "../../services/backendEndpts";
import { useState } from "react";

export default function MainContainer() {
    // State for the user's input URL
    const [longUrl, setLongUrl] = useState("");
    // State to store the final shortened URL
    const [shortenedResult, setShortenedResult] = useState("");
    // Optional: Add loading and error states for better UX
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        setShortenedResult("");
        setError("");

        try {
            // Pass the user's input to your service function
            const result = await shortenUrl(longUrl); 
            if (result && result.shortenedUrl) {
                setShortenedResult(result.shortenedUrl);
            } else {
                // Handle cases where the response might be unexpected
                throw new Error("Invalid response from server.");
            }
        } catch (err) {
            setError("Failed to shorten URL. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center space-y-12 mt-[2rem]">
                <h1 className="text-white text-3xl font-bold">
                    URL SHORTENER
                </h1>
                <div className="w-[100%]">
                    <form onSubmit={handleSubmit} className="flex justify-center gap-4 w-full">
                        {/* This Input should control the `longUrl` state */}
                        <Input value={longUrl} setValue={setLongUrl}/>
                        <Button onSubmit={handleSubmit} disabled={isLoading}/>
                    </form>
                </div>

                {/* --- DIV TO SHOW THE RESULT --- */}
                {/* This block will only render if `shortenedResult` has a value */}
                {isLoading && <p className="text-gray-400 mt-8">Shortening...</p>}

                {error && <p className="text-red-400 mt-8">{error}</p>}

                {shortenedResult && (
                    <div className="mt-8 p-4 bg-gray-800 rounded-lg w-full max-w-xl text-center shadow-lg">
                        <p className="text-gray-400 mb-2">Your shortened URL is ready:</p>
                        <a 
                            href={shortenedResult} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-blue-400 hover:text-blue-300 break-all"
                        >
                            {shortenedResult}
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};