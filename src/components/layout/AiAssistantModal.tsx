import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Sparkles, Send, Bot, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hi Alex! I\'m Campus AI. How can I help you today? You can ask me about your attendance status, upcoming assignments, timetable, or placement eligibility.',
      timestamp: 'Just now',
      suggestions: [
        'How many classes can I skip in DBMS Lab?',
        'What is my next class today?',
        'Am I eligible for Google SDE-1 placement?',
        'Summarize CS602 Raft assignment'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    // Simulate AI intelligent answer
    setTimeout(() => {
      let responseText = 'I checked your student profile and academic record. ';
      if (textToSend.toLowerCase().includes('dbms') || textToSend.toLowerCase().includes('skip')) {
        responseText = '⚠️ Your current DBMS Lab attendance is **63.6%** (14/22 classes). You are below the 75% threshold! You CANNOT miss any more classes without receiving an N-Grade warning.';
      } else if (textToSend.toLowerCase().includes('next class') || textToSend.toLowerCase().includes('timetable')) {
        responseText = '📅 Your next class today is **CS602: Distributed Systems** at **10:15 AM** in **Room LH-301** with Prof. Sarah Jenkins.';
      } else if (textToSend.toLowerCase().includes('google') || textToSend.toLowerCase().includes('placement')) {
        responseText = '🎉 Yes! You meet Google\'s eligibility criteria (CGPA: 8.92 vs required 8.5, Department: CSE). Your application is currently submitted and under review!';
      } else {
        responseText = `I have logged your request: "${textToSend}". Your overall GPA is 8.92 across 6 semesters with 0 backlogs. You have 2 pending assignments due this week.`;
      }

      setMessages(prev => [...prev, {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="flex flex-col h-[520px]">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">
              Campus AI Smart Copilot
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Powered by LLM & Campus Database Integration
            </p>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-primary-100 dark:bg-primary-950 text-primary-600'
                }`}
              >
                {m.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-ch text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {m.text}
                </div>
                {m.suggestions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 transition-colors text-left"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>Campus AI is computing response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="Ask Campus AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 min-h-[44px] px-4 text-xs rounded-ch bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-slate-100"
          />
          <Button onClick={() => handleSend()} size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};
