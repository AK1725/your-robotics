
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
    <div className="border-t border-robo-200 p-4 bg-white/80 backdrop-blur-sm rounded-b-xl shadow-sm">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <Input
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-robo-50/60 border-robo-200 py-6 text-base"
          disabled={isLoading}
          autoFocus
        />
        <Button 
          type="submit" 
          size="lg"
          className="bg-gradient-to-r from-robo-500 to-robo-600 hover:from-robo-600 hover:to-robo-700 shadow-md text-base px-5"
          disabled={isLoading || !inputMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
