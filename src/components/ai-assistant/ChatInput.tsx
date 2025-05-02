
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
    <div className="border-t border-robo-200 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-b-xl shadow-sm">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <Input
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-robo-50/60 dark:bg-slate-700 border-robo-200 dark:border-slate-600 py-6 text-base text-foreground dark:text-slate-200 dark:placeholder:text-slate-400"
          disabled={isLoading}
          autoFocus
        />
        <Button 
          type="submit" 
          size="lg"
          className="bg-gradient-to-r from-robo-500 to-robo-600 hover:from-robo-600 hover:to-robo-700 dark:hover:from-robo-500 dark:hover:to-robo-600 shadow-md text-base px-5"
          disabled={isLoading || !inputMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
