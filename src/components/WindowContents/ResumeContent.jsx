import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

const ResumeContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white mb-2">Edyelu Andrew</h1>
        <p className="text-[#60cdff] text-lg mb-3">Full Stack Developer & Web3 Engineer</p>
        <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
          <a href="mailto:edyeluandrew1@gmail.com" className="flex items-center gap-1 hover:text-[#60cdff] transition-colors">
            <Mail className="w-4 h-4" /> edyeluandrew1@gmail.com
          </a>
          <a href="tel:+256764331334" className="flex items-center gap-1 hover:text-[#60cdff] transition-colors">
            <Phone className="w-4 h-4" /> +256 764 331 334
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Uganda
          </span>
        </div>
        <div className="flex justify-center gap-4 mt-3">
          <a href="https://github.com/edyeluandrew" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/edyelu-andrew-118992330" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-1.5 text-white/60 hover:text-[#0A66C2] text-sm transition-colors">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Professional Summary
        </h2>
        <p className="text-white/80 leading-relaxed">
          Innovative Full Stack Developer and Web3 Engineer with a strong foundation in Computer Science. 
          Passionate about building end-to-end web applications, decentralized applications (dApps), and 
          smart contracts that solve real-world problems. Experienced in developing comprehensive management 
          systems for schools, restaurants, and research organizations. Committed to writing clean, 
          maintainable code and leveraging modern technologies to create impactful solutions. 
          Strong collaborator who thrives in team environments and continuously seeks to learn and grow.
        </p>
      </section>

      {/* Projects / Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Professional Projects
        </h2>
        
        <div className="space-y-4">
          {/* Project 1 */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#60cdff]/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold">Clevers Origin School System</h3>
                <p className="text-[#60cdff] text-sm">Full Stack Developer</p>
              </div>
              <span className="text-white/50 text-sm bg-blue-500/20 px-2 py-0.5 rounded">In Production</span>
            </div>
            <ul className="text-white/70 text-sm space-y-1.5 ml-4 list-disc">
              <li>Developed a comprehensive school management web system with student enrollment, attendance tracking, and grade management</li>
              <li>Implemented class scheduling, teacher portals, and parent dashboards for seamless communication</li>
              <li>Built automated report generation system for academic performance tracking</li>
              <li>Integrated payment system for school fees management (upcoming feature)</li>
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'REST API'].map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">{tech}</span>
              ))}
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#60cdff]/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold">Numba Restaurant System</h3>
                <p className="text-[#60cdff] text-sm">Full Stack Developer</p>
              </div>
              <span className="text-white/50 text-sm bg-blue-500/20 px-2 py-0.5 rounded">In Production</span>
            </div>
            <ul className="text-white/70 text-sm space-y-1.5 ml-4 list-disc">
              <li>Built a full-featured restaurant management system for Numba Restaurant in Kabale</li>
              <li>Developed order management, table bookings, and menu management modules</li>
              <li>Created real-time kitchen display system for efficient order tracking</li>
              <li>Implemented customer queue management and comprehensive sales reporting</li>
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'REST API'].map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">{tech}</span>
              ))}
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#60cdff]/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold">Beta Tech Labs Website</h3>
                <p className="text-[#60cdff] text-sm">Frontend Developer</p>
              </div>
              <span className="text-white/50 text-sm bg-green-500/20 px-2 py-0.5 rounded text-green-400">Live</span>
            </div>
            <ul className="text-white/70 text-sm space-y-1.5 ml-4 list-disc">
              <li>Designed and developed a modern marketing website for Beta Tech Labs research hub</li>
              <li>Created responsive layouts showcasing projects, team members, and research areas</li>
              <li>Implemented smooth animations and interactive elements for enhanced UX</li>
              <li>Built contact forms and partner collaboration inquiry system</li>
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['React', 'Tailwind CSS', 'Vite', 'Responsive Design'].map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Education
        </h2>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-[#60cdff]">Currently Pursuing</p>
            </div>
            <span className="text-white/50 text-sm">In Progress</span>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Focusing on software engineering, data structures, algorithms, web development, and blockchain technologies.
            Building a strong foundation for innovation and problem-solving in the tech industry.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Frontend Development</h4>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Backend Development</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Node.js', 'Express.js', 'Python', 'Rust', 'Axum', 'REST APIs'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Databases & Storage</h4>
            <div className="flex flex-wrap gap-1.5">
              {['PostgreSQL', 'MongoDB', 'SQL', 'Database Design'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Web3 & Blockchain</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Cairo', 'Smart Contracts', 'dApps', 'Blockchain'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Tools & DevOps</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Git', 'GitHub', 'Docker', 'Linux', 'AWS', 'Vite'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <h4 className="text-white/90 text-sm font-medium mb-2">Other Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Agile/Scrum', 'Problem Solving', 'Figma', 'Team Collaboration'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: 'Full Stack Development', desc: 'End-to-end web application development' },
            { title: 'Web3 Engineering', desc: 'Smart contracts & decentralized apps' },
            { title: 'Problem Solving', desc: 'Analytical thinking & creative solutions' },
            { title: 'System Design', desc: 'Scalable architecture & database design' },
            { title: 'Team Collaboration', desc: 'Effective communication & teamwork' },
            { title: 'Continuous Learning', desc: 'Staying updated with latest technologies' },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
              <h4 className="text-white text-sm font-medium mb-1">{item.title}</h4>
              <p className="text-white/50 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Languages
        </h2>
        <div className="flex gap-4">
          <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <span className="text-white text-sm">English</span>
            <span className="text-white/50 text-xs ml-2">• Fluent</span>
          </div>
        </div>
      </section>

      {/* Download Button */}
      <div className="text-center pt-4 border-t border-white/10">
        <button className="px-6 py-2.5 bg-[#60cdff] text-black font-semibold rounded-lg hover:bg-[#60cdff]/90 transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#60cdff]/20">
          <Download className="w-5 h-5" />
          Download Resume PDF
        </button>
        <p className="text-white/40 text-xs mt-2">Last updated: December 2024</p>
      </div>
    </div>
  );
};

export default ResumeContent;
