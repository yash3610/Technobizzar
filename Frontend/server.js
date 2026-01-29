import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
let products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", inStock: true },
  { id: 2, name: "Ergonomic Office Chair", price: 199.50, category: "Furniture", inStock: true },
  { id: 3, name: "Mechanical Keyboard", price: 120.00, category: "Electronics", inStock: false },
  { id: 4, name: "Ceramic Coffee Mug", price: 12.99, category: "Kitchen", inStock: true },
];

// GET /products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products
app.post('/products', (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body,
    price: parseFloat(req.body.price) // Ensure price is a number
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id == id);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body, id: parseInt(id), price: parseFloat(req.body.price) };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id != id);
  res.status(200).json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
