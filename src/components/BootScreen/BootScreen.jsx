import { useState, useEffect } from 'react';

const BootScreen = ({ onBootComplete }) => {
  const [phase, setPhase] = useState('logo'); // 'logo', 'loading', 'welcome'
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    // Logo phase - 1.5 seconds
    const logoTimer = setTimeout(() => {
      setPhase('loading');
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(logoTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'loading') {
      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setPhase('welcome');
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'welcome') {
      const welcomeTimer = setTimeout(() => {
        onBootComplete();
      }, 1500);
      return () => clearTimeout(welcomeTimer);
    }
  }, [phase, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center">
      {phase === 'logo' && (
        <div className="animate-fadeIn flex flex-col items-center">
          {/* Windows-style logo */}
          <div className="grid grid-cols-2 gap-1 mb-8">
            <div className="w-12 h-12 bg-[#f25022] animate-pulse"></div>
            <div className="w-12 h-12 bg-[#7fba00] animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-12 h-12 bg-[#00a4ef] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-12 h-12 bg-[#ffb900] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      )}

      {phase === 'loading' && (
        <div className="animate-fadeIn flex flex-col items-center">
          {/* Spinning loader */}
          <div className="relative w-16 h-16 mb-8">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#0078d4] rounded-full animate-spin"></div>
          </div>
          <div className="text-white/70 text-lg">Starting{dots}</div>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
            <div 
              className="h-full bg-[#0078d4] transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {phase === 'welcome' && (
        <div className="animate-fadeIn flex flex-col items-center">
          <div className="text-white text-3xl font-light mb-4">Welcome</div>
          <div className="text-[#60cdff] text-xl">Edyelu Andrew</div>
          <div className="text-white/50 text-sm mt-2">Full Stack Developer & Web3 Engineer</div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
