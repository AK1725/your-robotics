
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Message } from "./types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
}

export const ChatInterface = ({ 
  messages, 
  isLoading, 
  inputMessage, 
  setInputMessage, 
  handleSubmit 
}: ChatInterfaceProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="flex flex-col h-[calc(100vh-24rem)] shadow-lg border-robo-200 overflow-hidden bg-gradient-to-br from-white to-robo-50 backdrop-blur-sm rounded-xl">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Input Area */}
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
};
