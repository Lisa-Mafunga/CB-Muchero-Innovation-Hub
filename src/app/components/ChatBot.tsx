import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ScrollArea } from '@/app/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CB Muchero Innovation Hub. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('mentorship') || input.includes('mentor')) {
      return 'We offer comprehensive mentorship programs for women in technology. You can sign up as a mentor or mentee on our Mentorship page. Would you like to know more about our programs?';
    } else if (input.includes('podcast')) {
      return 'Our podcasts are released twice a month and cover various topics related to digital empowerment and technology. Visit our Podcasts page to listen and leave reviews!';
    } else if (input.includes('training') || input.includes('course')) {
      return 'We provide training in Basic Computer & Smartphone Literacy, Advanced Digital Skills including Digital Marketing, Robotics & AI, and Cybersecurity. Check out our Services page for more details!';
    } else if (input.includes('event')) {
      return 'We regularly host training sessions and empowerment events. Visit our Events page to see upcoming events and RSVP!';
    } else if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
      return 'You can reach us at cbmucheroinnovationhub@gmail.com or call +263 717 988 630. We\'d love to hear from you!';
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! How can I assist you today? I can help you with information about our mentorship programs, podcasts, training courses, events, or contact details.';
    } else if (input.includes('sign up') || input.includes('register')) {
      return 'To sign up for our programs, click the "Sign Up" button in the top navigation. You can register as a mentor or mentee to access our full platform!';
    } else {
      return 'Thank you for your message! For specific inquiries, please contact us at cbmucheroinnovationhub@gmail.com or explore our website to learn more about our services, mentorship programs, podcasts, and upcoming events.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 shadow-lg"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Chat with us</h3>
              <p className="text-xs opacity-90">We're here to help!</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-purple-700 rounded p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="bg-purple-600 hover:bg-purple-700">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
