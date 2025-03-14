
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import json
import os
import re

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt_tab')

app = Flask(__name__)
CORS(app)

# Load product data from the JSON file
def load_products():
    """Load product data from the parent directory's data.js file"""
    try:
        # Read products from the data/index.js file
        with open('../data/index.js', 'r') as f:
            content = f.read()
            # Extract the products array from the JavaScript file
            products_str = re.search(r'const products = (\[.*?\]);', content, re.DOTALL).group(1)

            # Sửa lỗi JSON
            products_str = products_str.replace("'", '"')  # Chuyển dấu nháy đơn thành nháy kép
            products_str = re.sub(r'(\w+):', r'"\1":', products_str)  # Đảm bảo key có dấu nháy kép

            products = json.loads(products_str)
            return products
    except Exception as e:
        print(f"Error loading products: {e}")
        # Return sample data if file loading fails
        return []

# Initialize product data and build search index
products = [
    {
      "id": "1",
      "name": "Classic White T-Shirt",
      "description": "A comfortable white t-shirt made from 100% cotton.",
      "price": 19.99,
      "category": "T-Shirts",
      "subcategory": "Basics",
      "stock": 100,
      "images": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww"
      ],
      "colors": ["White", "Black", "Gray"],
      "sizes": ["S", "M", "L", "XL"],
      "tag": "New",
      "created_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": "2",
      "name": "Slim Fit Jeans",
      "description": "Stylish slim fit jeans that look great with any outfit.",
      "price": 49.99,
      "category": "Jeans",
      "subcategory": "Slim Fit",
      "stock": 50,
      "images": [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGplYW5zfGVufDB8fDB8fHww"
      ],
      "colors": ["Blue", "Black"],
      "sizes": ["30", "32", "34", "36"],
      "tag": "Bestseller",
      "created_at": "2023-01-02T00:00:00Z"
    },
    {
      "id": "3",
      "name": "Casual Hoodie",
      "description": "A warm and comfortable hoodie for everyday wear.",
      "price": 39.99,
      "category": "Hoodies",
      "subcategory": "Casual",
      "stock": 75,
      "images": [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllfGVufDB8fDB8fHww"
      ],
      "colors": ["Gray", "Black", "Navy"],
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "tag": "Sale",
      "created_at": "2023-01-03T00:00:00Z"
    }
  ]
print("Loaded products:", products)

# Preprocess text for NLP
def preprocess_text(text):
    """Process text for better search matching"""
    if not text:
        return ""
    # Convert to lowercase
    text = text.lower()
    # Tokenize
    tokens = nltk.word_tokenize(text)
    # Remove stopwords
    stop_words = set(nltk.corpus.stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    # Lemmatize
    lemmatizer = nltk.stem.WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return " ".join(tokens)

# Create search index
def create_search_index():
    """Create a TF-IDF search index from product data"""
    product_texts = []
    for product in products:
        # Combine relevant product fields for searching
        text = f"{product['name']} {product['description']} {product['category']} {product['subcategory']} {' '.join(product.get('colors', []))} {' '.join(product.get('sizes', []))}"
        product_texts.append(preprocess_text(text))
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(product_texts)
    
    return vectorizer, tfidf_matrix

# Build search index
vectorizer, tfidf_matrix = create_search_index()

# User history storage (in production, this would be a database)
user_history = {}

@app.route('/api/search', methods=['POST'])
def search_products():
    """Search products based on natural language query"""
    data = request.get_json()
    query = data.get('query', '')
    user_id = data.get('userId', 'anonymous')
    
    if not query:
        return jsonify({"error": "Query is required"}), 400
        
    # Preprocess query
    processed_query = preprocess_text(query)
    
    # Transform query using vectorizer
    query_vector = vectorizer.transform([processed_query])
    
    # Calculate similarity scores
    similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()
    
    # Get top matches
    top_indices = similarity_scores.argsort()[-5:][::-1]
    
    # Extract matching products
    results = []
    for idx in top_indices:
        if similarity_scores[idx] > 0.1:  # Only include if there's some relevance
            results.append({
                "id": products[idx]['id'],
                "name": products[idx]['name'],
                "relevanceScore": float(similarity_scores[idx]),
                "price": products[idx]['price'],
                "image": products[idx]['images'][0] if products[idx]['images'] else None,
                "category": products[idx]['category']
            })
    
    # Store search in user history
    if user_id not in user_history:
        user_history[user_id] = []
    user_history[user_id].append({
        "type": "search",
        "query": query,
        "timestamp": pd.Timestamp.now().isoformat()
    })
    
    return jsonify({"results": results})

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """Get product recommendations based on user browsing/purchase history"""
    data = request.get_json()
    user_id = data.get('userId', 'anonymous')
    product_id = data.get('productId')  # Current product being viewed (optional)
    
    recommendations = []
    
    if product_id:
        # Content-based recommendation - find similar products to current one
        try:
            current_product_idx = next(i for i, p in enumerate(products) if p['id'] == product_id)
            current_product = products[current_product_idx]
            
            # Get product text for similarity comparison
            product_text = f"{current_product['name']} {current_product['description']} {current_product['category']}"
            processed_text = preprocess_text(product_text)
            
            # Find similar products
            product_vector = vectorizer.transform([processed_text])
            similarity_scores = cosine_similarity(product_vector, tfidf_matrix).flatten()
            
            # Get top similar products (excluding the current one)
            similar_indices = similarity_scores.argsort()[-6:][::-1]
            similar_indices = [idx for idx in similar_indices if idx != current_product_idx][:5]
            
            # Add to recommendations
            for idx in similar_indices:
                if similarity_scores[idx] > 0.2:
                    recommendations.append({
                        "id": products[idx]['id'],
                        "name": products[idx]['name'],
                        "price": products[idx]['price'],
                        "image": products[idx]['images'][0] if products[idx]['images'] else None,
                        "category": products[idx]['category'],
                        "reason": "Similar to what you're viewing"
                    })
        except (StopIteration, ValueError) as e:
            print(f"Error finding product {product_id}: {e}")
    
    # User history based recommendations
    if user_id in user_history and len(user_history[user_id]) > 0:
        # Extract categories from user history
        categories = []
        for interaction in user_history[user_id]:
            if interaction['type'] == 'view' or interaction['type'] == 'purchase':
                prod_idx = next((i for i, p in enumerate(products) if p['id'] == interaction['productId']), None)
                if prod_idx is not None:
                    categories.append(products[prod_idx]['category'])
        
        if categories:
            # Find most frequent category
            from collections import Counter
            top_category = Counter(categories).most_common(1)[0][0]
            
            # Recommend products from that category
            category_recs = [p for p in products if p['category'] == top_category and (not product_id or p['id'] != product_id)]
            
            # Take up to 3 products from preferred category
            for i, rec in enumerate(category_recs[:3]):
                # Check if already recommended
                if not any(r['id'] == rec['id'] for r in recommendations):
                    recommendations.append({
                        "id": rec['id'],
                        "name": rec['name'],
                        "price": rec['price'],
                        "image": rec['images'][0] if rec['images'] else None,
                        "category": rec['category'],
                        "reason": f"Based on your interest in {top_category}"
                    })
    
    # Fill remaining slots with popular products if needed
    if len(recommendations) < 5:
        # In a real system, these would be based on overall popularity
        remaining_needed = 5 - len(recommendations)
        for i, product in enumerate(products[:remaining_needed]):
            # Check if already recommended
            if not any(r['id'] == product['id'] for r in recommendations) and product['id'] != product_id:
                recommendations.append({
                    "id": product['id'],
                    "name": product['name'],
                    "price": product['price'],
                    "image": product['images'][0] if product['images'] else None,
                    "category": product['category'],
                    "reason": "Popular choice"
                })
    
    return jsonify({"recommendations": recommendations})

@app.route('/api/track', methods=['POST'])
def track_user_activity():
    """Track user activity for better recommendations"""
    data = request.get_json()
    user_id = data.get('userId', 'anonymous')
    activity_type = data.get('type')  # view, purchase, cart
    product_id = data.get('productId')
    
    if not activity_type or not product_id:
        return jsonify({"error": "Activity type and product ID are required"}), 400
    
    # Initialize user history if needed
    if user_id not in user_history:
        user_history[user_id] = []
    
    # Add to user history
    user_history[user_id].append({
        "type": activity_type,
        "productId": product_id,
        "timestamp": pd.Timestamp.now().isoformat()
    })
    
    return jsonify({"success": True, "message": "Activity tracked"})

@app.route('/api/chatbot', methods=['POST'])
def chatbot_query():
    """Handle chatbot product queries"""
    data = request.get_json()
    query = data.get('query', '')
    user_id = data.get('userId', 'anonymous')
    
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    # Parse user intent - in a real system, this would use a more sophisticated NLP model
    color_pattern = re.compile(r'\b(red|blue|green|black|white|yellow|purple|pink|orange|brown|gray|grey)\b', re.IGNORECASE)
    category_pattern = re.compile(r'\b(shirt|t-shirt|tee|pants|jeans|dress|skirt|jacket|hoodie|sweater|accessories)\b', re.IGNORECASE)
    
    # Extract potential attributes
    colors = color_pattern.findall(query.lower())
    categories = category_pattern.findall(query.lower())
    
    # Preprocess query for general search
    processed_query = preprocess_text(query)
    query_vector = vectorizer.transform([processed_query])
    similarity_scores = cosine_similarity(query_vector, tfidf_matrix).flatten()
    
    # Apply filters based on extracted attributes
    filtered_scores = similarity_scores.copy()
    
    for i, product in enumerate(products):
        # Filter by color if specified
        if colors and not any(color.lower() in [c.lower() for c in product.get('colors', [])] for color in colors):
            filtered_scores[i] *= 0.3  # Reduce score for non-matching colors
        
        # Filter by category if specified
        product_category = product.get('category', '').lower() + ' ' + product.get('subcategory', '').lower()
        if categories and not any(category.lower() in product_category for category in categories):
            filtered_scores[i] *= 0.3  # Reduce score for non-matching categories
    
    # Get top matches after filtering
    top_indices = filtered_scores.argsort()[-5:][::-1]
    
    results = []
    for idx in top_indices:
        if filtered_scores[idx] > 0.1:  # Only include if there's some relevance
            results.append({
                "id": products[idx]['id'],
                "name": products[idx]['name'],
                "relevanceScore": float(filtered_scores[idx]),
                "price": products[idx]['price'],
                "image": products[idx]['images'][0] if products[idx]['images'] else None,
                "category": products[idx]['category'],
                "colors": products[idx].get('colors', []),
                "sizes": products[idx].get('sizes', [])
            })
    
    # Generate response message
    response_message = "Here are some items you might like:"
    if not results:
        response_message = "I couldn't find any products matching your request. Could you try different keywords?"
    elif colors and categories:
        color_str = colors[0]
        category_str = categories[0]
        response_message = f"I found these {color_str} {category_str} options for you:"
    elif colors:
        color_str = colors[0]
        response_message = f"Here are some {color_str} items you might like:"
    elif categories:
        category_str = categories[0]
        response_message = f"Here are some {category_str} options for you:"
    
    # Track this interaction for future recommendations
    if user_id not in user_history:
        user_history[user_id] = []
    user_history[user_id].append({
        "type": "chatbot",
        "query": query,
        "timestamp": pd.Timestamp.now().isoformat()
    })
    
    return jsonify({
        "message": response_message,
        "products": results
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
