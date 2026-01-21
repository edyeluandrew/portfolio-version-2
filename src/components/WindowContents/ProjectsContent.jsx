import { useState } from 'react';
import { 
  GraduationCap, 
  FlaskConical, 
  UtensilsCrossed, 
  ExternalLink, 
  Github,
  X,
  Users,
  CreditCard,
  BarChart3
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Clevers Origin School System",
    description: "A comprehensive school management web system for Clevers Origin. Features student enrollment, attendance tracking, grade management, class scheduling, teacher portals, parent dashboards, and report generation. Payment integration coming soon.",
    image: "/projects/school.jpg",
    icon: <GraduationCap className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    features: ['Student Management', 'Attendance Tracking', 'Grade Reports', 'Class Scheduling', 'Teacher Portal', 'Parent Dashboard'],
    link: '#',
    github: 'https://github.com/edyeluandrew/clevers-origin',
    status: 'In Production',
  },
  {
    id: 2,
    title: "Beta Tech Labs",
    description: "A modern marketing website for Beta Tech Labs - a research and innovation hub. Showcases the lab's projects, team, research areas, and provides information for potential collaborators and partners.",
    image: "/projects/beta-tech-labs.png",
    icon: <FlaskConical className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Tailwind CSS', 'Vite'],
    features: ['Responsive Design', 'Team Showcase', 'Research Portfolio', 'Contact Forms', 'Animations'],
    link: 'https://www.beta-techlabs.com/',
    github: 'https://github.com/edyeluandrew/beta-tech-labs',
    status: 'Live',
  },
  {
    id: 3,
    title: "Numba Restaurant System",
    description: "A full-featured restaurant management system for Numba Restaurant in Kabale. Handles order management, table bookings, menu management, customer service, and real-time order tracking for kitchen staff.",
    image: "/projects/numba-restaurant.png",
    icon: <UtensilsCrossed className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    features: ['Order Management', 'Table Bookings', 'Menu Management', 'Kitchen Display', 'Customer Queue', 'Sales Reports'],
    link: 'https://numba-hotel.vercel.app/',
    github: 'https://github.com/edyeluandrew/numba-restaurant',
    status: 'In Production',
  },
  {
    id: 4,
    title: "Orrbit Platform",
    description: "A comprehensive business management platform featuring task tracking, analytics dashboards, team collaboration tools, and project management capabilities. Built for modern teams to streamline workflows.",
    image: "/projects/orbit.jpg",
    icon: <BarChart3 className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    features: ['Task Management', 'Analytics Dashboard', 'Team Collaboration', 'Real-time Updates', 'Project Tracking', 'Reports'],
    link: 'https://orrbit-sand.vercel.app',
    github: 'https://github.com/edyeluandrew/Orrbit.git',
    status: 'Live',
  },
  {
    id: 5,
    title: "IndabaX Voting System",
    description: "A secure online voting platform for IndabaX events. Features real-time vote counting, voter authentication, multiple ballot support, results visualization, and comprehensive admin controls.",
    image: "/projects/vote.jpg",
    icon: <Users className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Authentication'],
    features: ['Secure Voting', 'Real-time Results', 'Voter Authentication', 'Multiple Ballots', 'Admin Dashboard', 'Results Analytics'],
    link: 'https://indabaxvoting.web.app',
    github: 'https://github.com/edyeluandrew/indabax-voting.git',
    status: 'Live',
  },
  {
    id: 6,
    title: "Numba Hotel Management",
    description: "A complete hotel management system for Numba Hotel. Manages room bookings, guest check-ins/outs, housekeeping schedules, billing, and provides insights through analytics for better hotel operations.",
    image: "/projects/numba-restaurant.png",
    icon: <CreditCard className="w-12 h-12 text-[#60cdff]" />,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    features: ['Room Booking', 'Guest Management', 'Housekeeping', 'Billing System', 'Reports', 'Occupancy Tracking'],
    link: 'https://numba-hotel.vercel.app/',
    github: 'https://github.com/edyeluandrew/numba.git',
    status: 'Live',
  },
];

const ProjectsContent = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Production': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'In Development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-white/10 text-white/60';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-7 bg-[#60cdff] rounded"></span>
        My Projects
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/[0.08] hover:border-[#60cdff]/50 group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex">
              {/* Project Image/Icon Section */}
              <div className="w-48 h-48 bg-gradient-to-br from-[#0078d4]/20 to-[#00bcf2]/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.icon}
                </div>
                {/* Status Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 flex-1">
                <h3 className="text-xl text-white font-semibold mb-2 group-hover:text-[#60cdff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded-md border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  {project.github !== '#' && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/80 text-sm rounded-lg hover:bg-white/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" /> View Code
                    </a>
                  )}
                  {project.link !== '#' && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#60cdff] text-black text-sm rounded-lg hover:bg-[#60cdff]/90 transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" /> Visit Site
                    </a>
                  )}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/80 text-sm rounded-lg hover:bg-white/10 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[rgba(32,32,32,0.98)] backdrop-blur-xl rounded-xl border border-white/10 max-w-2xl w-full mx-4 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="h-48 bg-gradient-to-br from-[#0078d4]/30 to-[#00bcf2]/30 flex items-center justify-center relative">
              {selectedProject.image && selectedProject.image !== '#' ? (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0078d4]/30 to-[#00bcf2]/30">
                {selectedProject.icon}
              </div>
              {/* Status Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedProject.status)}`}>
                {selectedProject.status}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">{selectedProject.title}</h2>
              <p className="text-white/70 mb-5 leading-relaxed">{selectedProject.description}</p>
              
              {/* Tech Stack */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-[#60cdff]/10 text-[#60cdff] text-sm rounded-lg border border-[#60cdff]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#60cdff] rounded-full"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedProject.github !== '#' && (
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-white/10 text-white font-medium rounded-lg text-center hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" /> View on GitHub
                  </a>
                )}
                {selectedProject.link !== '#' && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-[#60cdff] text-black font-medium rounded-lg text-center hover:bg-[#60cdff]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;