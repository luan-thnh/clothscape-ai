
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  tag?: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export const allProducts: Product[] = [
  {
    id: "p1",
    name: "Premium Cotton T-Shirt",
    description: "Crafted from the finest organic cotton, this essential t-shirt offers unparalleled comfort and durability. With its clean lines and perfect fit, it's a versatile addition to any wardrobe. The breathable fabric ensures all-day comfort, while the minimal design allows for effortless styling.",
    price: 49.99,
    category: "Men",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1618354691779-22d11dbc3a5c?q=80&w=1508&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestseller: true
  },
  {
    id: "p2",
    name: "Slim Fit Jeans",
    description: "These premium slim-fit jeans combine contemporary style with extraordinary comfort. Made from high-quality denim with a touch of stretch, they maintain their shape while allowing freedom of movement. The classic five-pocket design and refined finish make them perfect for both casual and smart-casual occasions.",
    price: 89.99,
    category: "Men",
    subcategory: "Pants",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["30", "32", "34", "36"],
    featured: true
  },
  {
    id: "p3",
    name: "Minimal Wool Coat",
    description: "This luxurious wool coat embodies timeless elegance with its clean lines and impeccable tailoring. Crafted from premium Italian wool, it provides exceptional warmth without bulk. The minimalist design features subtle details that highlight its superior craftsmanship, making it a sophisticated investment piece that transcends seasons.",
    price: 299.99,
    category: "Women",
    subcategory: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c75e4b7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1535730673291-ee93a669a98a?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Camel", "Black", "Gray"],
    sizes: ["S", "M", "L"],
    featured: true,
    new: true
  },
  {
    id: "p4",
    name: "Silk Blouse",
    description: "Elevate your wardrobe with this exquisite silk blouse. Made from 100% natural silk, it drapes beautifully and offers a luxurious feel against the skin. The relaxed silhouette is both feminine and contemporary, while the subtle sheen adds an elegant touch. Perfect for transitioning from day to evening with effortless sophistication.",
    price: 129.99,
    compareAtPrice: 159.99,
    category: "Women",
    subcategory: "Tops",
    tag: "Sale",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1599839575338-31b11ae2cd16?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Ivory", "Black", "Blush"],
    sizes: ["XS", "S", "M", "L"],
    bestseller: true
  },
  {
    id: "p5",
    name: "Cashmere Sweater",
    description: "Indulge in the ultimate luxury with our pure cashmere sweater. Sourced from the finest Mongolian goats, this exceptionally soft piece offers unparalleled warmth and comfort. The timeless design features ribbed detailing at the cuffs and hem, while the relaxed fit ensures versatile styling options for both casual and refined looks.",
    price: 199.99,
    category: "Unisex",
    subcategory: "Knitwear",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Cream", "Gray", "Navy", "Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true
  },
  {
    id: "p6",
    name: "Leather Minimalist Sneakers",
    description: "These handcrafted leather sneakers represent the perfect balance of luxury and casual style. Made from full-grain Italian leather that develops a beautiful patina over time, they feature a sleek silhouette and exceptional comfort. The understated design is complemented by discreet branding and a durable rubber sole, offering versatility for countless occasions.",
    price: 179.99,
    category: "Unisex",
    subcategory: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1464&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1608919371843-2c5ca293e681?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["White", "Black", "Brown"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    bestseller: true,
    new: true
  },
  {
    id: "p7",
    name: "Structured Tote Bag",
    description: "This architectural tote combines functionality with sophisticated design. Crafted from premium leather with a structured silhouette, it maintains its elegant shape while providing ample space for your essentials. The minimal hardware and clean lines reflect contemporary luxury, while the detachable shoulder strap offers versatile carrying options.",
    price: 149.99,
    compareAtPrice: 189.99,
    category: "Accessories",
    subcategory: "Bags",
    tag: "Sale",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["Black", "Tan", "Navy"],
    featured: true
  },
  {
    id: "p8",
    name: "Linen Button-Down Shirt",
    description: "Embrace refined casual style with this premium linen shirt. The breathable, natural fabric ensures comfort in any climate, while the relaxed fit provides an effortlessly sophisticated look. Subtle details like mother-of-pearl buttons and precise stitching highlight the quality craftsmanship, making it a versatile piece for both relaxed and smart-casual occasions.",
    price: 89.99,
    category: "Men",
    subcategory: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    colors: ["White", "Blue", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    new: true
  }
];

export const featuredProducts = allProducts.filter(product => product.featured);
export const bestsellerProducts = allProducts.filter(product => product.bestseller);
export const newProducts = allProducts.filter(product => product.new);
export const saleProducts = allProducts.filter(product => product.tag === "Sale");
