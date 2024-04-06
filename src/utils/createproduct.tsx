import { ProductT } from "@/types/product/type";


interface ApiResponse {
    success: boolean;
    data?: ProductT;
    error?: string;
}

interface FormData {
    title: string;
    price: number | null;
    description: string;
    categoryId: number;
    images: string[];
}

const createProduct = async (payload: FormData): Promise<ApiResponse> => {
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to create product");
        }

        const data: ProductT = await response.json();

        return { success: true, data };
    } catch (error) {
        const errorMessage = (error as Error).message;
        return { success: false, error: errorMessage };
    }
};


export default createProduct;
