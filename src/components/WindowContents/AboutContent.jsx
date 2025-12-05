import { 
  Code2, 
  Blocks, 
  Puzzle, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Target, 
  UserCheck,
  MapPin,
  GraduationCap,
  Rocket
} from 'lucide-react';

const AboutContent = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0078d4] to-[#00bcf2] p-1 shadow-lg">
          <img 
            src="/profile.jpg" 
            alt="Edyelu Andrew" 
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-[#0078d4] to-[#00bcf2] flex items-center justify-center text-4xl">👨‍💻</div>';
            }}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edyelu Andrew</h1>
          <p className="text-[#60cdff] text-lg mb-1">Full Stack Developer & Web3 Engineer</p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Uganda
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#60cdff] rounded"></span>
          About Me
        </h2>
        <p className="text-white/80 leading-relaxed mb-4">
          I'm a Computer Science student with a passion for building full-stack web applications and software solutions that make a difference. My expertise spans across modern web technologies, and I'm deeply invested in the Web3 ecosystem, developing decentralized applications and smart contracts.
        </p>
        <p className="text-white/80 leading-relaxed mb-4">
          What drives me is problem-solving — taking complex challenges and transforming them into elegant, efficient solutions. I thrive in collaborative environments where teamwork and diverse perspectives come together to create something greater than the sum of its parts.
        </p>
        <p className="text-white/80 leading-relaxed flex items-center gap-2">
          I believe in leveraging technology to build impactful solutions, whether it's a seamless user experience on the web or a trustless application on the blockchain. Always learning, always building, always pushing the boundaries of what's possible.
          <Rocket className="w-5 h-5 text-[#60cdff] inline" />
        </p>
      </div>

      {/* What I Do */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#60cdff] rounded"></span>
          What I Do
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#60cdff]/50 transition-colors">
            <Code2 className="w-8 h-8 text-[#60cdff] mb-2" />
            <h3 className="text-white font-medium mb-1">Full Stack Development</h3>
            <p className="text-white/60 text-sm">Building end-to-end web applications with modern frameworks and technologies</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#60cdff]/50 transition-colors">
            <Blocks className="w-8 h-8 text-[#60cdff] mb-2" />
            <h3 className="text-white font-medium mb-1">Web3 Development</h3>
            <p className="text-white/60 text-sm">Creating decentralized applications, smart contracts, and blockchain solutions</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#60cdff]/50 transition-colors">
            <Puzzle className="w-8 h-8 text-[#60cdff] mb-2" />
            <h3 className="text-white font-medium mb-1">Problem Solving</h3>
            <p className="text-white/60 text-sm">Analyzing complex challenges and crafting innovative, efficient solutions</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#60cdff] rounded"></span>
          Core Values
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/20 text-white rounded-full border border-[#60cdff]/30 text-sm flex items-center gap-2">
            <Users className="w-4 h-4" /> Collaboration
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/20 text-white rounded-full border border-[#60cdff]/30 text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Innovation
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/20 text-white rounded-full border border-[#60cdff]/30 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Continuous Learning
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/20 text-white rounded-full border border-[#60cdff]/30 text-sm flex items-center gap-2">
            <Target className="w-4 h-4" /> Results-Driven
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/20 text-white rounded-full border border-[#60cdff]/30 text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> Teamwork
          </span>
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#60cdff] rounded"></span>
          Education
        </h2>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0078d4] to-[#00bcf2] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Bachelor of Science in Computer Science</h3>
              <p className="text-[#60cdff] text-sm">Currently Pursuing</p>
              <p className="text-white/50 text-xs">Building the foundation for tomorrow's innovations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
