'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
// import { fetchSingleProduct } from '@/utils/getSingleProduct';
import CustomSpinner from '@/components/CustomSpinner';
import CustomCarousel from '@/components/CustomCarousel';
import { ProductT } from '@/types/product/type';
import { useParams, useRouter } from 'next/navigation';
import { fetchSingleProduct } from '@/utils/getSingleProduct';


const Page = () => {

  const { id } = useParams<{ id: string }>();

  const router = useRouter()

  const [product, setProduct] = useState<ProductT | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (id === undefined) return;
        const productId = parseInt(id, 10);
        const productData: ProductT = await fetchSingleProduct(productId) as unknown as ProductT;
        setProduct(productData);

      } catch (error) {
        setError('Error fetching product details');
      }
    };
    fetchProductDetails();
    return () => {
    };
  }, [id]);



  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div style={{ padding: "40px 100px" }}>
          {product ? (
            <>
              <div className="w-full max-w-screen-lg mx-auto">
                <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => router.push('/')}
                >
                  Back
                </button>
                <CustomCarousel images={product.images} />
                <Card placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} >
                  <CardBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography variant="h6" className="mb-4 uppercase text-pink-600" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                      {product.category.name}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2 text-pink-500" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                      {product.title}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="gray" className="mb-4 text-pink-500" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                      Price: {product.price}$
                    </Typography>

                  </CardBody>
                </Card>
              </div>

            </>
          ) : (
            <CustomSpinner />
          )}
        </div>
      )
      }
    </div >
  )
}

export default Page