
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, User, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="container-custom py-12 max-w-5xl">
      <div className="flex flex-col space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-robo-600 to-robo-800 text-transparent bg-clip-text mb-3">AI Assistant</h1>
          <p className="text-robo-600 max-w-2xl mx-auto">
            Chat with our AI assistant for help finding the right parts for your robotics project.
          </p>
        </div>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto mb-6">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="samples">Sample Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0 space-y-4">
            <Card className="flex flex-col h-[calc(100vh-24rem)] shadow-lg border-robo-200 overflow-hidden bg-gradient-to-br from-white to-robo-50 backdrop-blur-sm">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] rounded-2xl p-4 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-robo-500 to-robo-600 text-white"
                          : "bg-white shadow-md border border-robo-100"
                      }`}
                    >
                      <div className={`mr-3 mt-1 ${message.type === "user" ? "order-2 ml-3 mr-0" : ""}`}>
                        <div className={`rounded-full p-1.5 flex items-center justify-center ${
                          message.type === "user" 
                            ? "bg-robo-400" 
                            : "bg-robo-100"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <Bot className="h-3 w-3 text-robo-500" />
                          )}
                        </div>
                      </div>
                      <div className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}>
                        <p className="whitespace-pre-wrap break-words">{message.text}</p>
                        <div
                          className={`text-xs mt-2 ${
                            message.type === "user" ? "text-robo-100" : "text-robo-400"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow-md border border-robo-100 text-robo-900 rounded-2xl p-4">
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
              <div className="border-t border-robo-200 p-4 bg-white">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-robo-50 border-robo-200"
                    disabled={isLoading}
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-robo-500 to-robo-600 hover:from-robo-600 hover:to-robo-700 shadow-md"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="samples" className="mt-0">
            <div className="bg-white shadow-lg border border-robo-200 p-6 rounded-xl">
              <h3 className="font-semibold text-robo-900 mb-4 text-lg">Popular Questions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "What Arduino boards do you recommend for beginners?",
                  "Do you have sensors for a line-following robot?",
                  "What motors would you recommend for a small robot arm?",
                  "What Raspberry Pi accessories do you have?"
                ].map((question, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-50 border-robo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    onClick={() => {
                      setInputMessage(question);
                      setTimeout(() => handleSubmit(), 100);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AiAssistant;
