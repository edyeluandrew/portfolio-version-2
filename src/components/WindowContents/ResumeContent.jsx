const ResumeContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white mb-2">Your Name</h1>
        <p className="text-[#60cdff] text-lg mb-2">Full Stack Developer</p>
        <div className="flex justify-center gap-4 text-white/60 text-sm">
          <span>📧 your.email@example.com</span>
          <span>📱 +1 (123) 456-7890</span>
          <span>📍 Your City, Country</span>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Professional Summary
        </h2>
        <p className="text-white/80 leading-relaxed">
          Passionate Full Stack Developer with 3+ years of experience building scalable web applications. 
          Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills and a 
          commitment to writing clean, maintainable code. Experienced in Agile methodologies and 
          cross-functional team collaboration.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Work Experience
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold">Senior Software Developer</h3>
                <p className="text-[#60cdff]">Tech Company Inc.</p>
              </div>
              <span className="text-white/50 text-sm">2022 - Present</span>
            </div>
            <ul className="text-white/70 text-sm space-y-1 ml-4 list-disc">
              <li>Led development of microservices architecture serving 1M+ users</li>
              <li>Reduced page load time by 40% through performance optimizations</li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold">Junior Developer</h3>
                <p className="text-[#60cdff]">Startup XYZ</p>
              </div>
              <span className="text-white/50 text-sm">2020 - 2022</span>
            </div>
            <ul className="text-white/70 text-sm space-y-1 ml-4 list-disc">
              <li>Developed responsive web applications using React and Node.js</li>
              <li>Implemented RESTful APIs and database integrations</li>
              <li>Collaborated with design team to improve UX</li>
            </ul>
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
              <p className="text-[#60cdff]">University Name</p>
            </div>
            <span className="text-white/50 text-sm">2016 - 2020</span>
          </div>
          <p className="text-white/60 text-sm mt-2">GPA: 3.8/4.0 | Dean's List | Relevant coursework: Data Structures, Algorithms, Web Development</p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#60cdff] rounded"></span>
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-2">Languages & Frameworks</h4>
            <div className="flex flex-wrap gap-1">
              {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Next.js'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-2">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {['Git', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-[#60cdff]/20 text-[#60cdff] text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Button */}
      <div className="text-center pt-4 border-t border-white/10">
        <button className="px-6 py-2.5 bg-[#60cdff] text-black font-semibold rounded-lg hover:bg-[#60cdff]/90 transition-colors inline-flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumeContent;
