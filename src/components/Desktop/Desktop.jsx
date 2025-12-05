import { useState } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import StartMenu from '../StartMenu/StartMenu';

// Import icons
import folderIcon from '../../assets/icons/folder.svg';
import userIcon from '../../assets/icons/user.svg';
import codeIcon from '../../assets/icons/code.svg';
import mailIcon from '../../assets/icons/mail.svg';
import terminalIcon from '../../assets/icons/terminal.svg';
import browserIcon from '../../assets/icons/browser.svg';

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [windowOrder, setWindowOrder] = useState([]);

  const desktopIcons = [
    { id: 'about', title: 'About Me', icon: userIcon, component: 'about' },
    { id: 'projects', title: 'Projects', icon: folderIcon, component: 'projects' },
    { id: 'skills', title: 'Skills', icon: codeIcon, component: 'skills' },
    { id: 'contact', title: 'Contact', icon: mailIcon, component: 'contact' },
    { id: 'terminal', title: 'Terminal', icon: terminalIcon, component: 'terminal' },
    { id: 'resume', title: 'Resume', icon: browserIcon, component: 'resume' },
  ];

  const openWindow = (iconData) => {
    const existingWindow = windows.find(w => w.id === iconData.id);
    
    if (existingWindow) {
      bringToFront(iconData.id);
      if (existingWindow.minimized) {
        setWindows(prev => prev.map(w => 
          w.id === iconData.id ? { ...w, minimized: false } : w
        ));
      }
      return;
    }

    const newWindow = {
      id: iconData.id,
      title: iconData.title,
      icon: iconData.icon,
      component: iconData.component,
      position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
      size: { width: 800, height: 500 },
      minimized: false,
      maximized: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setWindowOrder(prev => [...prev, iconData.id]);
    setActiveWindowId(iconData.id);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setWindowOrder(prev => prev.filter(wId => wId !== id));
    if (activeWindowId === id) {
      const remaining = windowOrder.filter(wId => wId !== id);
      setActiveWindowId(remaining[remaining.length - 1] || null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
    const remaining = windowOrder.filter(wId => {
      const win = windows.find(w => w.id === wId);
      return wId !== id && win && !win.minimized;
    });
    setActiveWindowId(remaining[remaining.length - 1] || null);
  };

  const maximizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, maximized: !w.maximized } : w
    ));
  };

  const bringToFront = (id) => {
    setWindowOrder(prev => [...prev.filter(wId => wId !== id), id]);
    setActiveWindowId(id);
  };

  const updateWindowPosition = (id, position) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (id, size) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, size } : w
    ));
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prev => !prev);
  };

  const handleDesktopClick = () => {
    setStartMenuOpen(false);
  };

  return (
    <div 
      className="w-screen h-screen bg-cover bg-center relative overflow-hidden select-none"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/profile.jpg')`,
        backgroundColor: '#0c0c0c',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
      <div className="flex flex-col flex-wrap content-start gap-2 p-4 h-[calc(100vh-48px)]">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            onDoubleClick={() => openWindow(icon)}
            index={index}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          windowData={window}
          isActive={activeWindowId === window.id}
          zIndex={windowOrder.indexOf(window.id)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
          onSizeChange={(size) => updateWindowSize(window.id, size)}
        />
      ))}

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen} 
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openWindow}
        apps={desktopIcons}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.minimized) {
            setWindows(prev => prev.map(w => 
              w.id === id ? { ...w, minimized: false } : w
            ));
          }
          bringToFront(id);
        }}
        onStartClick={(e) => {
          e.stopPropagation();
          toggleStartMenu();
        }}
        startMenuOpen={startMenuOpen}
      />
    </div>
  );
};

export default Desktop;
