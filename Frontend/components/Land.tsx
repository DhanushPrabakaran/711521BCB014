'use client'
import React from "react";
interface Product {
  _id: number;
  ProductName: string;
  price: Number;
  rating: number;
  discount:Number;
  availablity: Boolean;
  
}
const Land = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className=" w-full flex flex-col justify-center align-middle">
          <h1 className="text-5xl font-bold">Products</h1>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
