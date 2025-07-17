import { BACKEND_URL } from "@/config";

export default function generateImageUrl(imagePath: string | null) {
    if (!imagePath) {
        return null;
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }
    return `${BACKEND_URL}${imagePath}`;
}