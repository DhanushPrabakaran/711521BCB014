import React from 'react'
interface Product {
    _id: number;
    ProductName: string;
    price: Number;
    rating: number;
    discount: Number;
    availablity: Boolean;
}

const FullProduct: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{product.ProductName}</h2>
                <p>Price: {product.price.toString()}</p>
                <p>Rating: {product.rating}</p>
                <p>Discount: {product.discount.toString()}</p>
                <p>Availability: {product.availablity ? "Available" : "Not available"}</p>
            </div>
        </div>
    )
}

export default FullProduct
