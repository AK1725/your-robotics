
export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white shadow-md border border-robo-100 text-robo-900 rounded-2xl p-4">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "0ms"}}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "200ms"}}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-robo-500 animate-bounce" style={{animationDelay: "400ms"}}></div>
        </div>
      </div>
    </div>
  );
};
