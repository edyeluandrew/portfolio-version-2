import { useState, useRef, useEffect } from 'react';

const TerminalContent = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: () => `Available commands:
  help      - Show this help message
  about     - Learn about me
  skills    - List my technical skills
  projects  - View my projects
  contact   - Get my contact information
  social    - Social media links
  clear     - Clear the terminal
  whoami    - Display current user
  date      - Show current date and time
  echo      - Echo a message`,
    
    about: () => `
👨‍💻 Edyelu Andrew
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Stack Developer & Web3 Engineer passionate about
building modern web applications and blockchain solutions.

📍 Location: Uganda
💼 Focus: Full Stack Development, Web3, Smart Contracts
🎓 Education: Computer Science Student

I thrive on problem-solving and transforming complex
challenges into elegant, efficient solutions.`,
    
    skills: () => `
Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:  React, JavaScript, TypeScript, HTML/CSS, Tailwind, Next.js
Backend:   Node.js, Python, Rust, Axum, Cairo, Express.js, PostgreSQL, MongoDB
Web3:      Smart Contracts, dApps, Blockchain Development
Tools:     Git, Docker, AWS, CDN, Linux, Figma, Agile/Scrum`,
    
    projects: () => `
Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🎓 Clevers Origin School System - React, Node.js, PostgreSQL
   └─ Comprehensive school management web system (In Production)

2. 🔬 Beta Tech Labs - React, Tailwind CSS, Vite
   └─ Marketing website for research & innovation hub (Live)

3. 🍽️ Numba Restaurant System - React, Node.js, PostgreSQL
   └─ Full-featured restaurant management system (In Production)

Type 'open projects' or click the Projects icon for more details.`,
    
    contact: () => `
Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email:    edyeluandrew1@gmail.com
📱 Phone:    +256 764 331 334
💼 LinkedIn: linkedin.com/in/edyelu-andrew-118992330
🐙 GitHub:   github.com/edyeluandrew`,
    
    social: () => `
Social Links:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐙 GitHub:   https://github.com/edyeluandrew
💼 LinkedIn: https://linkedin.com/in/edyelu-andrew-118992330
🐦 X:        https://x.com/edyeluandrew1`,
    
    whoami: () => 'visitor@edyelu-portfolio',
    
    date: () => new Date().toString(),
    
    clear: () => {
      setHistory([]);
      return null;
    },
    
    echo: (args) => args.length > 0 ? args.join(' ') : '(empty)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle clear command separately
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const newHistory = [...history, { type: 'input', content: `$ ${input}` }];

    if (commands[cmd]) {
      const output = commands[cmd](args);
      if (output !== null) {
        newHistory.push({ type: 'output', content: output });
      }
    } else {
      newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type 'help' for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="h-full bg-[#1e1e1e] rounded-lg font-mono text-sm overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#323233] border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="text-white/60 text-xs ml-2">visitor@portfolio: ~</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-auto"
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`whitespace-pre-wrap mb-1 ${
              item.type === 'input' ? 'text-[#60cdff]' : 
              item.type === 'error' ? 'text-red-400' : 
              'text-green-400'
            }`}
          >
            {item.content}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-[#60cdff]">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white ml-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalContent;
