
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hello! I'm RoboHelper, your AI assistant for robotics parts and projects. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Handle submit of message
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Focus input after sending
    inputRef.current?.focus();
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        arduino: "Arduino is a great platform for beginners! Our most popular Arduino boards include the Uno, Mega, and Nano. Would you like to see our Arduino collection?",
        raspberry: "Raspberry Pi is perfect for more advanced projects. We have the Raspberry Pi 4 in various RAM configurations, as well as the Raspberry Pi Zero for smaller projects.",
        sensor: "We have a wide range of sensors including ultrasonic, infrared, temperature, humidity, and motion sensors. What type of sensor are you looking for?",
        motor: "We carry DC motors, servo motors, stepper motors, and motor drivers. What kind of project are you working on?",
        robot: "Building a robot? That's exciting! We have complete robot kits for beginners, or you can choose individual components if you have a specific design in mind.",
      };
      
      // Determine response based on keywords in user message
      const userMessageLower = inputMessage.toLowerCase();
      let botResponseText = "I'm not sure I understand. Could you provide more details about what you're looking for?";
      
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (userMessageLower.includes(keyword)) {
          botResponseText = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: botResponseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container-custom py-8 max-w-4xl">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-robo-900 mb-2">AI Assistant</h1>
          <p className="text-robo-600">
            Chat with our AI assistant for help finding the right parts for your robotics project.
          </p>
        </div>
        
        <Card className="flex flex-col h-[calc(100vh-16rem)]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === "user"
                      ? "bg-robo-600 text-white"
                      : "bg-robo-100 text-robo-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === "user" ? "text-robo-100" : "text-robo-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-robo-100 text-robo-900 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "0ms"}}></div>
                    <div className="w-2 h-2 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "200ms"}}></div>
                    <div className="w-2 h-2 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "400ms"}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
                autoFocus
              />
              <Button 
                type="submit" 
                className="bg-robo-600 hover:bg-robo-700"
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
        
        <div className="bg-robo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-robo-900 mb-2">Popular Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button 
              variant="ghost" 
              className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-100"
              onClick={() => {
                setInputMessage("What Arduino boards do you recommend for beginners?");
                setTimeout(() => handleSubmit(), 100);
              }}
            >
              What Arduino boards do you recommend for beginners?
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-100"
              onClick={() => {
                setInputMessage("Do you have sensors for a line-following robot?");
                setTimeout(() => handleSubmit(), 100);
              }}
            >
              Do you have sensors for a line-following robot?
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-100"
              onClick={() => {
                setInputMessage("What motors would you recommend for a small robot arm?");
                setTimeout(() => handleSubmit(), 100);
              }}
            >
              What motors would you recommend for a small robot arm?
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-100"
              onClick={() => {
                setInputMessage("What Raspberry Pi accessories do you have?");
                setTimeout(() => handleSubmit(), 100);
              }}
            >
              What Raspberry Pi accessories do you have?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
