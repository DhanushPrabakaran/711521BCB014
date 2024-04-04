const express = require("express");
const fetch = require("node-fetch"); // For making HTTP requests
const mongoose = require("mongoose");
const app = express();
const com = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const Categories = [
  "Phone",
  "Computer",
  "TV",
  "Earphone",
  "Tablet",
  "Charger",
  "Mouse",
  "Keypad",
  "Bluetooth",
  "Pendrive",
  "Remote",
  "Speaker",
  "Headset",
  "Laptop",
  "PC",
];

mongoose.connect("mongodb://localhost:27017/magesDB");

const mageSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
  },
  category: {
    type: String,
    required: true,
  },
});

const Mage = mongoose.model("Mage", mageSchema);

app.get("/categories/:categoryName/products", async (req, res) => {
  const { categoryName } = req.params;
  const { sort_by, order, n, page } = req.query;
  // const comind = Math.floor(Math.random() * com.length);
  const comnam = com[1];
  const url = `http://20.244.56.144/test/com/${comnam}/categories/${categoryName}/products?top=${
    n || 10
  }`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMjA4MjQxLCJpYXQiOjE3MTIyMDc5NDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI5ZDE1ZWQ0LWQ2NjItNDNkMC1hMTQ0LTA3NDcyMjVlMDhhMyIsInN1YiI6ImtpdC4yNS4yMWJjYjAxNEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjI5ZDE1ZWQ0LWQ2NjItNDNkMC1hMTQ0LTA3NDcyMjVlMDhhMyIsImNsaWVudFNlY3JldCI6Im9MRGFRb3VZWEZtSWlrWXgiLCJvd25lck5hbWUiOiJEaGFudXNoIFAiLCJvd25lckVtYWlsIjoia2l0LjI1LjIxYmNiMDE0QGdtYWlsLmNvbSIsInJvbGxObyI6IjcxMTUyMUJDQjAxNCJ9.yvgLY9_-X9ncaHPj4axzyexnLbHs7-QHUtr1j0Mvr4Q",
      },
    });
    const products = await response.json();

    if (
      sort_by &&
      ["rating", "price", "company", "discount"].includes(sort_by)
    ) {
      products.sort((a, b) => {
        const aValue = a[sort_by];
        const bValue = b[sort_by];
        return order === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    const pageSize = n && n <= 10 ? parseInt(n) : 10;
    const pageNumber = page ? parseInt(page) : 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);
    await Mage.insertMany(
      paginatedProducts.map((product) => ({
        ...product,
        category: categoryName,
      }))
    );
    res.json(paginatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Mage.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
