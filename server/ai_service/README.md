
# AI Service for Clothing Store

This service provides AI-powered product search and recommendations for the clothing store e-commerce application.

## Features

- Natural language product search
- Personalized product recommendations
- Chatbot functionality for product queries
- User activity tracking for improved recommendations

## Setup

1. Install Python 3.8+ and pip
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the service:
   ```
   python app.py
   ```

The service will run on port 5001 by default.

## API Endpoints

- `/api/search` - Search products with natural language queries
- `/api/recommendations` - Get personalized product recommendations
- `/api/track` - Track user activity for better recommendations
- `/api/chatbot` - Chat-based product search

## Integration with Express Backend

This service is designed to be called from the main Express.js backend. 
Add proxy endpoints in the Express server to forward requests to this AI service.
