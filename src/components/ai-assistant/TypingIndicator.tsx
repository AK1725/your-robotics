
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-background shadow-md border border-input text-foreground rounded-2xl p-4">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "0ms"}}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "200ms"}}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{animationDelay: "400ms"}}></div>
        </div>
      </div>
    </div>
  );
};
