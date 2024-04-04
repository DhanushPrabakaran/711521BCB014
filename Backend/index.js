const express = require('express');
const uuid = require('uuid'); // For generating unique identifiers
const fetch = require('node-fetch'); // For making HTTP requests
const url="http://20.244.56.144/test/companies/:companyname/categories/:categoryname/products?top=n&minPrice=p&maxPrice=q"
const app = express();
const PORT = process.env.PORT || 3000;
const companies = ["AMZ","FLP","SNP","MYN","AZO"]
const Categories=[ "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth","Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]
const mongoose = 

// GET endpoint to retrieve products
app.get('/categories/:categoryName/products', async (req, res) => {
    const { categoryName } = req.params;
    const { sort_by, order, n, page } = req.query;
    const companyIndex = 1;
    const companyName = companies[companyIndex];
    const fetchURL = `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products?top=${n || 10}`;

    try {
        const response = await fetch(fetchURL,{
            method: 'post',
            Headers:{
                autho
            }
        });
        const products = await response.json();

       
        const productsWithUniqueIDs = products.map(product => ({
            id: uuid.v4(), 
            ...product
        }));

        if (sort_by && ['rating', 'price', 'company', 'discount'].includes(sort_by)) {
            productsWithUniqueIDs.sort((a, b) => {
                const aValue = a[sort_by];
                const bValue = b[sort_by];
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            });
        }
        const pageSize = n && n <= 10 ? parseInt(n) : 10;
        const pageNumber = page ? parseInt(page) : 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = productsWithUniqueIDs.slice(startIndex, endIndex);

        res.json(paginatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// GET endpoint  product
app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;

    // Find product by ID
    const product = Object.values(productsData).flat().find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
