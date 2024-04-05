interface Product {
    id: number;
    name: string;
}

export const fetchSingleProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to fetch product');
    }
};
