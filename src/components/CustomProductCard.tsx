import React, { useReducer } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { useRouter } from 'next/navigation';


interface ProductCardProps {
    img: string
    title: string
    price: number
    productId: number
}

const ProductCard: React.FC<ProductCardProps> = ({ img, title, price, productId }) => {

    const router = useRouter()


    const handleSeeMoreClick = () => {
        router.push(`/allItems/${productId}`);
    };

    return (
        <Card
            className="w-60 h-full border border-grey-600"
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}>
            <CardHeader floated={false} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <img src={img} />
            </CardHeader>
            <CardBody className="text-center" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <Typography variant="h6" color="blue-gray" className="mb-1" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {title}
                </Typography>
                <Typography color="blue-gray" className="font-medium pb-1" textGradient placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {price}$
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 " placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <button className="bg-pink-500 font-extrabold p-2 px-6 rounded-xl text-white hover:bg-pink-400 transition-colors" onClick={handleSeeMoreClick}>See Details</button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
