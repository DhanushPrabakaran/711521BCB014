import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
}

const Land: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories/Phone/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="w-full flex flex-col justify-center align-middle">
          <h1 className="text-5xl font-bold">Products</h1>
          {products.map((product) => (
            <div key={product._id} className="card w-96 bg-primary text-primary-content">
              <div className="text-center align-middle items-center flex card-body">
                <h2 className="card-title text-center m-2">{product.productName}</h2>
                <p>Price: {product.price}</p><br/>
                <p>Rating: {product.rating}</p><br/>
                <p>Discount: {product.discount}</p><br/>
                <p>Availability: {product.availability ? "Available" : "Not available"}</p><br/>
                <div className="card-actions justify-end">
                  <Link href={`/product/${product._id}`} className="btn">VIEW</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Land;
