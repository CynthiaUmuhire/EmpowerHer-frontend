import { BACKEND_URL } from "@/config";

export default function generateImageUrl(imagePath: string | null) {
    if (!imagePath) {
        return null;
    }
    return `${BACKEND_URL}${imagePath}`;
}