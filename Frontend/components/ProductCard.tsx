import React from 'react'
import Link from 'next/link';
interface Product {
    _id: number;
    ProductName: string;
    price: Number;
    rating: number;
    discount:Number;
    availablity: Boolean;
    
  }
interface  Props{
    product:Product,
}
const ProductCard:React.FC<Props> = ({ product }) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
  <div className="card-body">
    <h2 className="card-title">{product.ProductName}</h2>
    <p>Price : {product.price.toString()}</p><br/>
    <p>Price : {product.rating}</p><br/>
    <p>Price : {product.discount.toString()}</p><br/>
    <p>Price : {product.availablity.toString()}</p><br/>
    <div className="card-actions justify-end">
      <Link href={`/product/${product._id}`} className="btn">Buy Now</Link>
    </div>
  </div>
</div>
  )
}

export default ProductCard
