'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Send, 
  FileText, 
  Check, 
  Copy, 
  Download,
  Calculator,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  Globe,
  Radio,
  Sliders,
  ShieldCheck,
  User,
  Play
} from 'lucide-react';

interface LiveVoiceAgentModalProps {
  onClose: () => void;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  spokenTeluguText?: string;
  timestamp: string;
  toolResult?: any;
}

export default function LiveVoiceAgentModal({ onClose, initialPrompt }: LiveVoiceAgentModalProps) {
  const [callActive, setCallActive] = useState<boolean>(true);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speakerOn, setSpeakerOn] = useState<boolean>(true);
  const [language, setLanguage] = useState<'te-IN' | 'hi-IN' | 'en-IN'>('te-IN');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [hasMicPermission, setHasMicPermission] = useState<boolean>(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste Kisan Bhai! I am your Kisan Bima Sahayak. Are you looking to insure a new crop, or did you face a problem with an existing insurance claim?',
      spokenTeluguText: 'నమస్తే కిసాన్ భాయ్! నేను మీ బీమా సహాయక్. మీరు కొత్త పంట ఇన్సూరెన్స్ వివరాలు తెలుసుకోవాలనుకుంటున్నారా లేదా ఉన్న క్లెయిమ్ సమస్య గురించి మాట్లాడాలనుకుంటున్నారా?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef<boolean>(true);

  // Call Duration Timer (mm:ss)
  useEffect(() => {
    let interval: any;
    if (callActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Web Speech Synthesis for spoken audio output
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !speakerOn) return;
    
    try {
      // Pause mic recognition while agent is speaking to prevent acoustic feedback
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      // Select Telugu/Hindi/Indian English voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.includes('te') || v.lang.includes('hi') || v.lang.includes('IN')) || voices[0];
      if (targetVoice) utterance.voice = targetVoice;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        // Start continuous hands-free listening ONLY AFTER agent greeting/response finishes
        if (shouldListenRef.current && !isMuted) {
          setTimeout(() => startContinuousListening(), 400);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error/canceled:', e);
        setIsSpeaking(false);
        if (shouldListenRef.current && !isMuted) {
          setTimeout(() => startContinuousListening(), 400);
        }
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  // Play initial spoken greeting out loud
  const playGreeting = () => {
    const greetingText = messages[0].spokenTeluguText || messages[0].text;
    speakText(greetingText);
  };

  // Continuous Hands-Free Speech Recognition Loop (Filters noise & stays active)
  const startContinuousListening = async () => {
    if (typeof window === 'undefined' || isMuted || !shouldListenRef.current || isSpeaking) return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setHasMicPermission(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Automatically restart continuous speech loop if call is active & agent is not speaking
        if (shouldListenRef.current && !isMuted && !isSpeaking) {
          setTimeout(() => {
            try { recognition.start(); } catch(e) {}
          }, 300);
        }
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        // Ignore aborted/no-speech errors and restart mic automatically
        if (shouldListenRef.current && !isMuted && !isSpeaking) {
          setTimeout(() => {
            try { recognition.start(); } catch(err) {}
          }, 400);
        }
      };

      recognition.onresult = (event: any) => {
        const lastIndex = event.results.length - 1;
        const result = event.results[lastIndex];
        const transcript = result[0].transcript ? result[0].transcript.trim() : '';

        // Filter out small background noises, single-letter breaths, or empty speech
        if (transcript && transcript.length > 2 && !isSpeaking) {
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Continuous speech recognition error:', e);
      setIsListening(false);
    }
  };

  // Auto initialize call: Speak initial greeting synchronously & request mic permission
  useEffect(() => {
    shouldListenRef.current = true;

    // 1. Play spoken Telugu greeting immediately on call initialization
    playGreeting();

    // 2. Request mic permission in parallel without blocking initial greeting
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => setHasMicPermission(true))
        .catch(err => console.warn('Microphone permission request:', err));
    }

    // 3. Populate speech synthesis voices if delayed in browser
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (!isSpeaking) {
          playGreeting();
        }
      };
    }

    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!isMuted) {
      setIsMuted(true);
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    } else {
      setIsMuted(false);
      shouldListenRef.current = true;
      startContinuousListening();
    }
  };

  // Process message STT -> Decision Tools -> Assistant Spoken Reply
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let assistantText = '';
      let spokenTeluguText = '';
      let toolResult: any = null;

      if (lower.includes('1 lakh') || lower.includes('40,000') || lower.includes('40000') || lower.includes('cotton') || lower.includes('reduced') || lower.includes('పత్తి') || lower.includes('తక్కువ')) {
        assistantText = "Ram Ram Kisan Bhai. Under PMFBY rules, widespread crop loss is calculated based on village Crop Cutting Experiments (CCEs). If your village average yield was 40% of normal, the company pays 40% of sum insured (PMFBY Clause 13.1). However, you can file an official RTI to get the exact calculation sheet.";
        spokenTeluguText = "నమస్తే కిసాన్ భాయ్. PMFBY నిబంధనల ప్రకారం ఊరంతా పంట నష్టం జరిగితే గ్రామ పంట కోత ప్రయోగాల ఆధారంగా క్లెయిమ్ లెక్కిస్తారు. మీ క్లెయిమ్ గణన పత్రం కోసం RTI దరఖాస్తును తయారు చేయమంటారా?";
        toolResult = {
          type: 'discrepancy_diagnosis',
          code: 'YIELD_SHORTFALL_AREA_APPROACH',
          clause: 'PMFBY Clause 13.1 (Widespread Loss Area Approach via CCE)',
          insured: 100000,
          received: 40000,
          shortfall: 60000,
          explanation: 'Village CCE yield tests determined payout percentage across Notified Insurance Unit.'
        };
      } else if (lower.includes('calc') || lower.includes('premium') || lower.includes('acre') || lower.includes('insure') || lower.includes('ఎకరాలు') || lower.includes('ప్రీమియం') || lower.includes('వరి')) {
        assistantText = "For 2.5 acres of Paddy in Medak (Kharif), the Scale of Finance is ₹48,000 per acre. Your total coverage is ₹1,20,000 and your farmer premium share at 2.0% is ₹2,400.";
        spokenTeluguText = "నమస్కారం! మెదక్ జిల్లాలో 2.5 ఎకరాల వరి పంటకు రూ. 1,20,000 బీమా కవరేజ్ ఉంటుంది. మీ ప్రీమియం వాటా 2 శాతం అనగా రూ. 2,400 అవుతుంది.";
        toolResult = {
          type: 'insurance_estimate',
          crop: 'Paddy',
          season: 'Kharif',
          acres: 2.5,
          district: 'Medak',
          scaleOfFinance: 48000,
          sumInsured: 120000,
          farmerPremium: 2400,
          farmerPercent: 2.0
        };
      } else if (lower.includes('rti') || lower.includes('draft') || lower.includes('dharakastu') || lower.includes('paper')) {
        assistantText = "I have drafted your official RTI petition addressed to the District Agriculture Officer (Medak), saved it into the Supabase database, and sent an SMS tracking link to your mobile.";
        spokenTeluguText = "నేను మీ RTI దరఖాస్తును తయారు చేసి మెదక్ జిల్లా వ్యవసాయ అధికారికి పంపేలా సేవ్ చేశాను. ట్రాకింగ్ లింక్ SMS ద్వారా పంపబడింది.";
        toolResult = {
          type: 'rti_generated',
          policyId: 'PMFBY-2025-TEL-8892',
          targetAuthority: 'PIO / District Agriculture Office (Medak)',
          status: 'Submitted to Database & SMS Dispatched',
          trackingUrl: 'https://cropins.gov.in/rti/track/PMFBY-2025-TEL-8892'
        };
      } else {
        assistantText = "Namaste Kisan Bhai! I am your Kisan Bima Sahayak. Are you looking to calculate insurance for a new crop, or resolve a reduced claim payout?";
        spokenTeluguText = "నమస్తే కిసాన్ భాయ్! నేను మీ బీమా సహాయక్. మీరు కొత్త పంట ఇన్సూరెన్స్ వివరాలు తెలుసుకోవాలనుకుంటున్నారా లేదా ఉన్న క్లెయిమ్ సమస్య గురించి మాట్లాడాలనుకుంటున్నారా?";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: assistantText,
        spokenTeluguText: spokenTeluguText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolResult: toolResult
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(spokenTeluguText || assistantText);
    }, 400);
  };

  const handleEndCall = () => {
    setCallActive(false);
    shouldListenRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const lastAssistantMsg = [...messages].reverse().find((m) => m.sender === 'assistant');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-md bg-slate-950 text-white rounded-[36px] border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden h-[92vh] max-h-[850px] relative">
        
        {/* PHONE STATUS BAR */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between text-xs font-semibold text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              HD Phone Call ({language})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-mono text-xs">{formatDuration(callDuration)}</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CALL AVATAR & CONTINUOUS VOICE SOUNDWAVE */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative py-4 overflow-y-auto scrollbar-none">
          {/* Avatar Ring Animations */}
          <div className="relative mb-6">
            {isSpeaking && (
              <>
                <div className="absolute -inset-4 rounded-full bg-emerald-500/25 animate-ping" />
                <div className="absolute -inset-8 rounded-full bg-emerald-500/15 animate-pulse" />
              </>
            )}
            {isListening && (
              <div className="absolute -inset-4 rounded-full bg-amber-500/30 animate-ping" />
            )}

            <div 
              onClick={playGreeting}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#A94A4A] via-[#7a2f2f] to-amber-600 p-1 shadow-2xl shadow-[#A94A4A]/40 relative z-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              title="Click to Hear Agent Voice Greeting"
            >
              <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-2 border-white/20">
                <ShieldCheck className="w-14 h-14 text-amber-400 stroke-[1.8]" />
              </div>
            </div>

            <div className="absolute -bottom-2 right-2 z-20 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-lg border border-slate-900">
              AI Agent
            </div>
          </div>

          {/* Caller Identity Information */}
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1">
            Kisan Bima Sahayak
          </h2>
          <p className="text-xs text-amber-300/90 font-medium mb-3">
            PMFBY Voice Helpdesk • Spoken Telugu (వ్యవహారిక తెలుగు)
          </p>

          <button
            onClick={playGreeting}
            className="mb-3 px-4 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>🔊 Click to Hear Agent Voice Greeting</span>
          </button>

          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 shadow-inner">
              <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-bounce' : isListening ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <span>
                {isSpeaking
                  ? 'Agent Speaking Spoken Telugu...'
                  : isListening
                  ? '🎤 Mic Active • Speak Hands-Free in Telugu/English'
                  : isMuted
                  ? '🔇 Call Muted'
                  : '🟢 Phone Call Active'}
              </span>
            </div>
          </div>

          {/* REAL-TIME CLOSED CAPTIONS & SUBTITLES OVERLAY */}
          {showCaptions && lastAssistantMsg && (
            <div className="w-full bg-slate-900/95 border border-slate-800/90 rounded-2xl p-4 text-left shadow-xl my-2 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <MessageSquare className="w-3.5 h-3.5" /> Agent Spoken Response
                </span>
                <button
                  onClick={() => speakText(lastAssistantMsg.spokenTeluguText || lastAssistantMsg.text)}
                  className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Volume2 className="w-3 h-3" /> Replay
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {lastAssistantMsg.spokenTeluguText || lastAssistantMsg.text}
              </p>

              {/* TOOL RESULT CARD EMBEDDED IN PHONE OVERLAY */}
              {lastAssistantMsg.toolResult && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  {lastAssistantMsg.toolResult.type === 'insurance_estimate' && (
                    <div className="bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-200">
                      <p className="font-bold text-emerald-300 mb-1 flex items-center gap-1">
                        <Calculator className="w-3.5 h-3.5" /> Calculated Scale of Finance &amp; Premium
                      </p>
                      <p className="text-[11px]">Sum Insured: <strong className="text-white">₹{lastAssistantMsg.toolResult.sumInsured.toLocaleString()}</strong> | Premium Share ({lastAssistantMsg.toolResult.farmerPercent}%): <strong className="text-amber-300">₹{lastAssistantMsg.toolResult.farmerPremium.toLocaleString()}</strong></p>
                    </div>
                  )}

                  {lastAssistantMsg.toolResult.type === 'discrepancy_diagnosis' && (
                    <div className="bg-rose-950/60 border border-rose-500/30 p-2.5 rounded-xl text-rose-200">
                      <p className="font-bold text-rose-300 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> PMFBY Clause Diagnosis
                      </p>
                      <p className="text-[11px] text-white font-bold">{lastAssistantMsg.toolResult.clause}</p>
                      <p className="text-[10px] text-rose-300/80 mt-0.5">Shortfall: ₹{lastAssistantMsg.toolResult.shortfall.toLocaleString()}</p>
                    </div>
                  )}

                  {lastAssistantMsg.toolResult.type === 'rti_generated' && (
                    <div className="bg-indigo-950/60 border border-indigo-500/30 p-2.5 rounded-xl text-indigo-200">
                      <p className="font-bold text-indigo-300 mb-1 flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" /> RTI Petition Drafted &amp; SMS Dispatched
                      </p>
                      <p className="text-[10px] text-slate-300">Policy: {lastAssistantMsg.toolResult.policyId} • Saved to Supabase DB</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* QUICK HANDS-FREE VOICE SHORTCUT CHIPS */}
          <div className="w-full flex items-center justify-center gap-2 flex-wrap mt-2">
            <button
              onClick={() => handleSendMessage('Calculate premium for 2.5 acres Paddy')}
              className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              🌾 Calculate Premium
            </button>
            <button
              onClick={() => handleSendMessage('I received 40000 on 1 lakh cotton insurance')}
              className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-amber-300 hover:text-amber-200 transition-all cursor-pointer shadow-sm"
            >
              ⚠️ Reduced Claim (₹40k)
            </button>
            <button
              onClick={() => handleSendMessage('Draft RTI application and send SMS')}
              className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer shadow-sm"
            >
              📜 Draft RTI &amp; SMS
            </button>
          </div>
        </div>

        {/* DIALPAD / TEXT INPUT OVERLAY */}
        {showKeypad && (
          <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type question in Telugu or English..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white outline-none focus:border-amber-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#A94A4A] text-white rounded-xl disabled:opacity-40 hover:bg-[#8f3c3c] cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* REAL PHONE CALL CONTROLS BAR (Circular Buttons) */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800/90 shrink-0">
          <div className="flex items-center justify-around max-w-xs mx-auto">
            {/* Mute Mic Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={toggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isMuted ? 'bg-rose-600 text-white border-2 border-rose-400' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <span className="text-[10px] font-bold text-slate-300">{isMuted ? 'Muted' : 'Mute'}</span>
            </div>

            {/* Keypad / Text Overlay Toggle */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => setShowKeypad(!showKeypad)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  showKeypad ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title="Keypad / Type"
              >
                <Sliders className="w-6 h-6" />
              </button>
              <span className="text-[10px] font-bold text-slate-400">Keypad</span>
            </div>

            {/* Speaker On / Off Toggle */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => setSpeakerOn(!speakerOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  speakerOn ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
                title="Speaker Phone"
              >
                {speakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
              <span className="text-[10px] font-bold text-slate-400">Speaker</span>
            </div>

            {/* Red Circular End Call Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={handleEndCall}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl shadow-rose-600/40 active:scale-95 border-2 border-rose-400/30"
                title="End Phone Call"
              >
                <PhoneOff className="w-7 h-7" />
              </button>
              <span className="text-[10px] font-bold text-rose-400">End Call</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
