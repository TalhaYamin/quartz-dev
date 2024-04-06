"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/CustomProductCard";
import getAllProducts from "@/utils/getProducts";
import "tailwindcss/tailwind.css";
import CustomSpinner from "@/components/CustomSpinner";
import { ProductT } from "@/types/product/type";
import CreateItem from "../CreateItem/Page";

const AllItems = () => {
    const [allProducts, setProducts] = useState<ProductT[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);

    const productsPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    return (
        <div className="w-full max-w-screen-lg mx-auto">
            <div className="flex items-center justify-center h-24 text-4xl font-bold border-dark">
                Quartz Dev Store
            </div>
            {allProducts.length > 0 ? (
                <>
                    <div className="flex justify-end">
                        <button
                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => setShowModal(true)}
                        >
                            Create Product
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {currentProducts?.map((product: ProductT, index: number) => (
                            <div key={index}>
                                <ProductCard
                                    img={product.images[0]}
                                    title={product.title}
                                    price={product.price}
                                    productId={product.id}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4 mb-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`mx-1 px-4 py-2 bg-gray-200 rounded-full ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
                                }`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`mx-1 px-4 py-2 bg-gray-200 rounded-full ${currentPage === i + 1 ? "bg-gray-400" : "hover:bg-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`mx-1 px-4 py-2 bg-gray-200 rounded-full ${currentPage === totalPages
                                ? "cursor-not-allowed"
                                : "hover:bg-gray-300"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <CustomSpinner />
            )}
            <CreateItem showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default AllItems;
