import { api } from "./api";

export const shortenUrl =async (url) => {
    try {
        const shortUrl = await api.post("/shorten", {
            url: url,
        });
    
        console.log(shortUrl);
        return shortUrl.data;
    } catch (error) {
        console.log(error);
    }
}
