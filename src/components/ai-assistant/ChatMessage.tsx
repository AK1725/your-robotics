
import { User, Bot } from "lucide-react";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      } animate-fade-in`}
    >
      <div
        className={`flex max-w-[85%] rounded-2xl p-4 shadow-sm transition-all ${
          message.type === "user"
            ? "bg-gradient-to-r from-robo-500 to-robo-600 text-white"
            : "bg-white dark:bg-slate-800 shadow-md border border-robo-100 dark:border-slate-700"
        }`}
      >
        <div className={`mr-3 mt-1 ${message.type === "user" ? "order-2 ml-3 mr-0" : ""}`}>
          <div className={`rounded-full p-1.5 flex items-center justify-center ${
            message.type === "user" 
              ? "bg-robo-400" 
              : "bg-robo-100 dark:bg-slate-700"
            }`}
          >
            {message.type === "user" ? (
              <User className="h-4 w-4 text-white" />
            ) : (
              <Bot className="h-4 w-4 text-robo-500 dark:text-robo-300" />
            )}
          </div>
        </div>
        <div className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}>
          <p className={`whitespace-pre-wrap break-words text-base ${
            message.type === "bot" ? "text-foreground dark:text-slate-200" : ""
          }`}>{message.text}</p>
          <div
            className={`text-xs mt-2 ${
              message.type === "user" ? "text-robo-100" : "text-robo-400 dark:text-slate-400"
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};
