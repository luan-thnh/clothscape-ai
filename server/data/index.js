
// Simulated database with sample data
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$XGv1iJwtzj0KpyuVUb.xK.wbq9rqHBm9rCJu5lbDV9g1XwEUv/ZXO", // "password"
    role: "admin",
    created_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$XGv1iJwtzj0KpyuVUb.xK.wbq9rqHBm9rCJu5lbDV9g1XwEUv/ZXO", // "password"
    role: "user",
    created_at: "2023-01-02T00:00:00Z"
  }
];

const products = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable white t-shirt made from 100% cotton.",
    price: 19.99,
    category: "T-Shirts",
    subcategory: "Basics",
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww"
    ],
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    tag: "New",
    created_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Stylish slim fit jeans that look great with any outfit.",
    price: 49.99,
    category: "Jeans",
    subcategory: "Slim Fit",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGplYW5zfGVufDB8fDB8fHww"
    ],
    colors: ["Blue", "Black"],
    sizes: ["30", "32", "34", "36"],
    tag: "Bestseller",
    created_at: "2023-01-02T00:00:00Z"
  },
  {
    id: "3",
    name: "Casual Hoodie",
    description: "A warm and comfortable hoodie for everyday wear.",
    price: 39.99,
    category: "Hoodies",
    subcategory: "Casual",
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllfGVufDB8fDB8fHww"
    ],
    colors: ["Gray", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "Sale",
    created_at: "2023-01-03T00:00:00Z"
  }
];

const orders = [
  {
    id: "1",
    user_id: "2",
    items: [
      { product_id: "1", quantity: 2, price: 19.99 },
      { product_id: "3", quantity: 1, price: 39.99 }
    ],
    total: 79.97,
    status: "delivered",
    created_at: "2023-01-05T00:00:00Z"
  }
];

module.exports = {
  users,
  products,
  orders
};
