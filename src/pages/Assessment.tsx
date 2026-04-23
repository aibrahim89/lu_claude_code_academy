import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { assessmentQuestions as questions } from '../data/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Assessment() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const finalScore = newAnswers.reduce((acc, ans, idx) => {
        return ans === questions[idx].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(finalScore);
      setStep('result');
      if (finalScore === questions.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  const getLevel = () => {
    const ratio = score / questions.length;
    if (ratio === 1) return 'Expert';
    if (ratio > 0.6) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 bg-[#FEF3C7] rounded-3xl flex items-center justify-center mx-auto text-[#D97706]">
              <Award size={40} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Skill Assessment</h1>
              <p className="text-[#475569] text-lg">
                Measure your understanding of Claude Code features and determine your expertise level.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0]">
                <h4 className="font-semibold text-sm mb-1 uppercase tracking-wider text-[#475569]">Questions</h4>
                <p className="text-xl font-bold">{questions.length}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0]">
                <h4 className="font-semibold text-sm mb-1 uppercase tracking-wider text-[#475569]">Time</h4>
                <p className="text-xl font-bold">~3 mins</p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full rounded-xl bg-[#0F172A] hover:bg-black"
              onClick={() => setStep('quiz')}
            >
              Start Assessment
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[#86868B] uppercase tracking-widest">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2 bg-[#F2F2F2]" />
            </div>

            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl font-bold leading-tight">
                  {questions[currentQuestion].text}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-3 pt-6">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-6 rounded-2xl border-2 border-[#E5E5E5] hover:border-[#D97757] hover:bg-white transition-all text-lg font-medium group flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D97757]" size={20} />
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <div className="inline-block p-4 bg-green-50 text-green-600 rounded-full mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h1 className="text-4xl font-bold">Assessment Complete!</h1>
              <p className="text-[#6E6E73] text-lg">Your results are ready.</p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-10 space-y-6">
              <div className="grid grid-cols-2 gap-8 divide-x divide-[#F2F2F2]">
                <div className="space-y-1">
                  <div className="text-4xl font-bold">{score}/{questions.length}</div>
                  <div className="text-sm font-semibold text-[#86868B] uppercase tracking-wider">Correct Answers</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-[#D97757]">{getLevel()}</div>
                  <div className="text-sm font-semibold text-[#86868B] uppercase tracking-wider">Estimated Level</div>
                </div>
              </div>
              <p className="text-sm text-[#86868B]">
                {score === questions.length 
                  ? "Outstanding! You have a comprehensive understanding of Claude Code."
                  : "Good progress! Review our Learn section to master more functionalities."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={reset}
                variant="outline"
                className="w-full rounded-full border-[#1D1D1F] text-[#1D1D1F]"
              >
                <RotateCcw className="mr-2" size={18} />
                Retake Assessment
              </Button>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center w-full rounded-full bg-[#1D1D1F] text-white hover:bg-black h-11 px-8 text-sm font-medium transition-colors"
              >
                Read Latest Tips
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
