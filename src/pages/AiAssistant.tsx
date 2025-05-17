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
  const handleSubmit = async (e?: React.FormEvent) => {
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

    try {
      // Call your backend Gemini API route
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });
      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: data.reply || "Sorry, I couldn't generate a reply right now.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
    setIsLoading(false);
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
