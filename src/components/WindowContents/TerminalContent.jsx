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
👨‍💻 Your Name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Stack Developer passionate about building
modern web applications and solving complex problems.

📍 Location: Your City, Country
💼 Experience: 3+ years
🎓 Education: Computer Science Degree`,
    
    skills: () => `
Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:  React, JavaScript, TypeScript, HTML/CSS, Tailwind
Backend:   Node.js, Python, Express, PostgreSQL, MongoDB
Tools:     Git, Docker, AWS, Linux, Figma`,
    
    projects: () => `
Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🛒 E-Commerce Platform - React, Node.js, MongoDB
2. 📋 Task Management App - React, Firebase
3. 🌤️ Weather Dashboard - React, OpenWeather API
4. 💼 Portfolio Website - React, Tailwind CSS

Run 'open projects' window for more details.`,
    
    contact: () => `
Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email:    your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub:   github.com/yourusername`,
    
    social: () => `
Social Links:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐙 GitHub:   https://github.com/yourusername
💼 LinkedIn: https://linkedin.com/in/yourprofile
🐦 Twitter:  https://twitter.com/yourhandle`,
    
    whoami: () => 'visitor@portfolio',
    
    date: () => new Date().toString(),
    
    clear: () => {
      setHistory([]);
      return null;
    },
    
    echo: (args) => args.join(' ') || '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

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
