import { useState } from 'react';
import { Bot, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const SYDAVET_RESPONSES: Record<string, string[]> = {
  hello: [
    "Hello! I'm SY-DAVET Assistant, created by JJ Void Assistant. How can I help you with PDS Agri-Hub today?",
    "Greetings! I'm here to assist you with our Pi Network agricultural marketplace. What do you need help with?",
    "Hi there! SY-DAVET at your service. Ask me anything about our marketplace, products, or Pi Network!"
  ],
  help: [
    "I can help you with: browsing products, understanding categories, checking your cart, learning about Pi Network payments, and navigating our marketplace.",
    "Sure! I assist with product searches, category explanations, cart help, checkout process, and general marketplace questions.",
    "I'm here to help you navigate PDS Agri-Hub! Whether you need help finding products, understanding how to buy with Pi, or learning about our categories - just ask!"
  ],
  pi: [
    "Pi Network is a cryptocurrency that allows for feeless transactions. On PDS Agri-Hub, you can use Pi to buy agricultural products directly from farmers.",
    "Yes! We integrate with Pi Network for secure, low-fee transactions. You'll need a Pi Network wallet to make purchases.",
    "Pi Network payments are processed through the Pi SDK. Look for the Pi logo during checkout to pay with your Pi balance."
  ],
  categories: [
    "We have 16 main categories: Crops, Rice, Beans, Yam, Cassava, Maize, Vegetables, Fruits, Livestock, Poultry, Fishery, Dairy, Honey, Farm Tools, Fertilizers, Seeds, and Pets.",
    "Our categories cover everything you might need for farming, from seeds and tools to livestock and harvested produce.",
    "Browse our categories page to see all available agricultural products organized by type for easy shopping."
  ],
  search: [
    "Our smart search suggests products as you type! Try typing 'ri' for rice suggestions, or 'be' for beans.",
    "The search bar gives you real-time suggestions based on popular products and categories. It's like Google but for our marketplace!",
    "Just start typing in the search box and you'll see instant suggestions for products, categories, and related terms."
  ],
  cart: [
    "Your cart holds the products you want to buy. You can adjust quantities, remove items, and see your total before checkout.",
    "Look for the cart icon in the navbar to view your selected items. From there, you can proceed to checkout when ready.",
    "The cart shows product names, quantities, prices, and lets you update quantities or remove items before proceeding to payment."
  ],
  checkout: [
    "Our checkout process has three steps: shipping information, payment details, and order confirmation. We accept Pi Network payments!",
    "During checkout, you'll enter your shipping address, then your payment information (Pi Network), and finally review and confirm your order.",
    "We prioritize security and simplicity in our checkout. Your information is encrypted and we never store payment details."
  ],
  default: [
    "I'm SY-DAVET Assistant, created by JJ Void Assistant. I specialize in helping with PDS Agri-Hub - our Pi Network agricultural marketplace. Ask me about products, categories, buying with Pi, or navigating the site!",
    "Hello! I'm here to help you navigate our agricultural marketplace. Whether you have questions about products, need help with search, or want to know about Pi Network payments - just ask!",
    "SY-DAVET reporting for duty! I can help you with marketplace navigation, product information, category explanations, and assistance with buying agricultural products using Pi Network."
  ]
};

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add welcome message when component mounts
  // useEffect(() => {
  //   addMessage("Hello! I'm SY-DAVET Assistant, created by JJ Void Assistant. How can I help you with PDS Agri-Hub today?", false);
  // }, []);

  const addMessage = (text: string, isUser: boolean) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, message]);
    // Scroll to bottom
    setTimeout(() => {
      const chatContainer = document.getElementById('ai-chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, true);
    setIsLoading(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get bot response
    const botResponse = getBotResponse(userMessage);
    addMessage(botResponse, false);
    setIsLoading(false);
  };

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return getRandomResponse(SYDAVET_RESPONSES.hello);
    }
    
    if (lowerMsg.includes('help') || lowerMsg.includes('assist') || lowerMsg.includes('support')) {
      return getRandomResponse(SYDAVET_RESPONSES.help);
    }
    
    if (lowerMsg.includes('pi') || lowerMsg.includes('payment') || lowerMsg.includes('cryptocurrency')) {
      return getRandomResponse(SYDAVET_RESPONSES.pi);
    }
    
    if (lowerMsg.includes('category') || lowerMsg.includes('categories')) {
      return getRandomResponse(SYDAVET_RESPONSES.categories);
    }
    
    if (lowerMsg.includes('search') || lowerMsg.includes('find') || lowerMsg.includes('look for')) {
      return getRandomResponse(SYDAVET_RESPONSES.search);
    }
    
    if (lowerMsg.includes('cart') || lowerMsg.includes('basket')) {
      return getRandomResponse(SYDAVET_RESPONSES.cart);
    }
    
    if (lowerMsg.includes('checkout') || lowerMsg.includes('buy') || lowerMsg.includes('purchase')) {
      return getRandomResponse(SYDAVET_RESPONSES.checkout);
    }
    
    return getRandomResponse(SYDAVET_RESPONSES.default);
  };

  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-pi-pulse rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6 text-white" />
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="mt-4 w-96 bg-white/95 backdrop-blur-md border border-border/200 rounded-xl shadow-2xl">
          <div className="flex flex-col h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-br from-pi-purple to-pi-dark">
              <div className="flex items-center space-x-3">
                <Bot className="h-5 w-5 text-white" />
                <div className="space-y-1">
                  <p className="text-white font-semibold">SY-DAVET Assistant</p>
                  <p className="text-white/80 text-xs">Created by JJ Void Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="italic">Start the conversation by saying hello!</p>
                </div>
              )}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} max-w-[80%]`}
                >
                  <div className={`flex flex-col max-w-full ${msg.isUser ? 'ml-4' : 'mr-4'}`}>
                    {msg.isUser && (
                      <div className="bg-pi-purple/20 text-pi-purple px-3 py-1 rounded-b-lg rounded-tl rounded-tr text-xs mb-1">
                        You
                      </div>
                    )}
                    {!msg.isUser && (
                      <div className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-b-lg rounded-tr rounded-tl text-xs mb-1">
                        SY-DAVET
                      </div>
                    )}
                    <div className={`max-w-xs rounded-xl py-2 px-3 ${msg.isUser ? 'bg-pi-purple text-white' : 'bg-white border border-border/200'}`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs text-opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start max-w-[80%]">
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-pi-pulse rounded-full animate-pulse" />
                      <div className="h-3 w-3 bg-pi-pulse rounded-full animate-pulse" />
                      <div className="h-3 w-3 bg-pi-pulse rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">typing...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-border/200">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about PDS Agri-Hub..."
                  className="flex-1 px-4 py-3 bg-muted/50 border border-muted/200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pi-purple/20 text-sm"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 bg-pi-purple hover:bg-pi-purple/90 text-white font-medium rounded-lg transition-colors duration-300 hover:-translate-y-1"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-pulse bg-white" />
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}