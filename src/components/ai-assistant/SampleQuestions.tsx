
import { Button } from "@/components/ui/button";

interface SampleQuestionsProps {
  setInputMessage: (message: string) => void;
  handleSubmit: () => void;
}

export const SampleQuestions = ({ setInputMessage, handleSubmit }: SampleQuestionsProps) => {
  const sampleQuestions = [
    "What Arduino boards do you recommend for beginners?",
    "Do you have sensors for a line-following robot?",
    "What motors would you recommend for a small robot arm?",
    "What Raspberry Pi accessories do you have?"
  ];

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSubmit(), 100);
  };

  return (
    <div className="bg-white shadow-lg border border-robo-200 p-6 rounded-xl">
      <h3 className="font-semibold text-robo-900 mb-4 text-lg">Popular Questions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sampleQuestions.map((question, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="justify-start text-robo-700 hover:text-robo-900 hover:bg-robo-50 border-robo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => handleQuestionClick(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};
