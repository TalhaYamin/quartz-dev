"use client"

import React, { useState, ChangeEvent } from "react";
import createProduct from "@/utils/createproduct";

export interface FormData {
    title: string;
    price: number | null;
    description: string;
    categoryId: number;
    images: string[];
}

interface CreateItemProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateItem: React.FC<CreateItemProps> = ({ showModal, setShowModal }) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        price: null,
        description: "",
        categoryId: 1,
        images: []
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddImage = () => {
        setFormData({
            ...formData,
            images: [...formData.images, ""]
        });
    };

    const handleClose = () => {
        setFormData({
            title: "",
            price: null,
            description: "",
            categoryId: 1,
            images: []
        });
        setShowModal(false);
    };

    const handleChangeImage = (index: number, value: string) => {
        const updatedImages = [...formData.images];
        updatedImages[index] = value;
        setFormData({
            ...formData,
            images: updatedImages
        });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                title: formData.title,
                price: formData.price,
                description: formData.description,
                categoryId: formData.categoryId,
                images: formData.images.filter((image) => image.trim() !== "")
            };

            const response = await createProduct(payload);
            if (response.success) {
                setFormData({
                    title: "",
                    price: null,
                    description: "",
                    categoryId: 1,
                    images: []
                });
                setShowModal(false);
            }

        } catch (error) {
            console.error("Error creating item:", error);
        }
    };

    const isAnyFieldEmpty =
        formData.title === "" ||
        formData.price === undefined || formData.price === null ||
        formData.description === "" ||
        formData.images.some(imageUrl => imageUrl === "");

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create Item
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mb-3 w-full p-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData?.price !== null ? formData.price.toString() : ''}
                                        onChange={handleChange}
                                        className="mb-3 w-full p-2 border border-gray-300 rounded"
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mb-3 w-full p-2 border border-gray-300 rounded"
                                    ></textarea>
                                    {formData.images.map((imageUrl, index) => (
                                        <div key={index} className="mb-3">
                                            <input
                                                type="text"
                                                placeholder={`Image URL ${index + 1}`}
                                                value={imageUrl}
                                                onChange={(e) => handleChangeImage(index, e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        className="bg-pink-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleAddImage}
                                    >
                                        Add Image
                                    </button>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-pink-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isAnyFieldEmpty}
                                    >
                                        Create Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default CreateItem;
