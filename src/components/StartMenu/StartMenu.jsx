import { useState } from 'react';

const StartMenu = ({ isOpen, onClose, onOpenApp, apps }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="fixed bottom-[56px] left-1/2 -translate-x-1/2 w-[640px] bg-[rgba(32,32,32,0.88)] backdrop-blur-2xl rounded-lg border border-white/[0.06] shadow-[0_32px_64px_rgba(0,0,0,0.5)] z-[1001] overflow-hidden animate-startMenuOpen"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none h-40" />
      
      <div className="p-6 pt-8 relative">
        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search for apps, settings, and documents"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 px-4 pl-11 bg-[rgba(255,255,255,0.05)] border border-white/[0.06] rounded-md text-white text-sm outline-none transition-all focus:bg-[rgba(255,255,255,0.08)] focus:border-[#60cdff] placeholder:text-white/40"
          />
        </div>

        {/* Pinned Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-sm font-semibold">Pinned</span>
            <button className="flex items-center gap-1 px-2.5 py-1 bg-white/[0.05] border-none rounded text-white/70 text-xs cursor-pointer hover:bg-white/[0.08] transition-colors">
              All apps
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-6 gap-0.5">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                className="flex flex-col items-center py-3 px-2 bg-transparent border-none rounded cursor-pointer hover:bg-white/[0.05] active:bg-white/[0.08] transition-colors"
                onClick={() => {
                  onOpenApp(app);
                  onClose();
                }}
              >
                <img src={app.icon} alt={app.title} className="w-9 h-9 mb-1.5" />
                <span className="text-white/90 text-[11px] text-center leading-tight">{app.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="border-t border-white/[0.06] pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-sm font-semibold">Recommended</span>
            <button className="px-2.5 py-1 bg-white/[0.05] border-none rounded text-white/70 text-xs cursor-pointer hover:bg-white/[0.08] transition-colors">
              More
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex items-center gap-3 p-2.5 rounded cursor-pointer hover:bg-white/[0.05] transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center text-xl">
                📄
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[13px]">Welcome.md</span>
                <span className="text-white/40 text-[11px]">Recently added</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded cursor-pointer hover:bg-white/[0.05] transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded flex items-center justify-center text-xl">
                💻
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[13px]">View Projects</span>
                <span className="text-white/40 text-[11px]">Check out my work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t border-white/[0.06] pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-sm font-semibold">Connect With Me</span>
          </div>
          <div className="flex gap-3 justify-center">
            <a
              href="https://github.com/edyeluandrew"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/[0.08] transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white group-hover:text-[#fff] group-hover:scale-110 transition-all" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-white/70 text-[11px] mt-1.5 group-hover:text-white">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/edyelu-andrew-118992330"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/[0.08] transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0A66C2] group-hover:scale-110 transition-all" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white/70 text-[11px] mt-1.5 group-hover:text-white">LinkedIn</span>
            </a>
            <a
              href="https://x.com/edyeluandrew1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/[0.08] transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white group-hover:scale-110 transition-all" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
              <span className="text-white/70 text-[11px] mt-1.5 group-hover:text-white">X</span>
            </a>
            <a
              href="mailto:edyeluandrew1@gmail.com"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/[0.08] transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#EA4335] group-hover:scale-110 transition-all" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
              </svg>
              <span className="text-white/70 text-[11px] mt-1.5 group-hover:text-white">Email</span>
            </a>
            <a
              href="tel:+256764331334"
              className="flex flex-col items-center p-3 rounded-lg hover:bg-white/[0.08] transition-all group"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#25D366] group-hover:scale-110 transition-all" fill="currentColor">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
              </svg>
              <span className="text-white/70 text-[11px] mt-1.5 group-hover:text-white">Phone</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-3 bg-black/20 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded cursor-pointer hover:bg-white/[0.05] transition-colors">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#0078d4] to-[#00bcf2]">
            <img 
              src="/profile.jpg" 
              alt="Edyelu Andrew" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '👨‍💻';
                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'text-sm');
              }}
            />
          </div>
          <span className="text-white text-[13px]">Edyelu Andrew</span>
        </div>
        <button className="w-9 h-9 bg-transparent border-none rounded text-white/70 cursor-pointer flex items-center justify-center hover:bg-white/[0.05] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes startMenuOpen {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        .animate-startMenuOpen {
          animation: startMenuOpen 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default StartMenu;
