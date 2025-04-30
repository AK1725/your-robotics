
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput = ({ inputMessage, setInputMessage, handleSubmit, isLoading }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-t border-robo-200 p-4 bg-white backdrop-blur-sm rounded-b-xl">
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
  );
};
