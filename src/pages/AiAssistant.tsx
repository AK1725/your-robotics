
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ai-assistant/ChatInterface";
import { SampleQuestions } from "@/components/ai-assistant/SampleQuestions";
import { Message } from "@/components/ai-assistant/types";

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

  return (
    <div className="container-custom py-8 md:py-12 max-w-6xl">
      <div className="flex flex-col space-y-6">
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
          
          <TabsContent value="chat" className="mt-0">
            <ChatInterface 
              messages={messages}
              isLoading={isLoading}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSubmit={handleSubmit}
            />
          </TabsContent>
          
          <TabsContent value="samples" className="mt-0">
            <SampleQuestions 
              setInputMessage={setInputMessage}
              handleSubmit={handleSubmit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AiAssistant;
