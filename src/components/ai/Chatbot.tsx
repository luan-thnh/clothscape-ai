
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotQuery } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  products?: any[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      text: 'Hello! I\'m your shopping assistant. Ask me to find clothing items for you, like "find me a red t-shirt" or "show me party dresses".',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      type: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send query to chatbot API
      const userId = localStorage.getItem('userId');
      const response = await chatbotQuery(input, userId || undefined);
      
      // Add bot response
      const botMessage: ChatMessage = {
        type: 'bot',
        text: response.data.message,
        timestamp: new Date(),
        products: response.data.products,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error querying chatbot:', error);
      toast({
        title: 'Error',
        description: 'Sorry, I had trouble processing your request. Please try again.',
        variant: 'destructive',
      });
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: 'Sorry, I had trouble processing your request. Please try again.',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg z-50 hover:bg-primary/90 transition-all"
        aria-label="Chat with AI assistant"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
      
      {/* Chatbot Interface */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-background border border-border rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b bg-muted">
            <h3 className="font-medium">Shopping Assistant</h3>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  } max-w-[80%]`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Product recommendations */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {msg.products.map((product, idx) => (
                        <div 
                          key={idx} 
                          className="bg-background border border-border rounded p-2 cursor-pointer hover:border-primary transition-colors"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <div className="aspect-square overflow-hidden bg-muted/30 rounded mb-1">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="text-xs font-medium truncate">{product.name}</div>
                          <div className="text-xs">${product.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
