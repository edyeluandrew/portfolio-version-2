import { useState, useEffect, useCallback } from 'react';

const ContextMenu = ({ x, y, onClose, items, onAction }) => {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleScroll = () => onClose();
    
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [onClose]);

  // Adjust position if menu would go off screen
  const menuWidth = 200;
  const menuHeight = items.length * 36 + 16;
  const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
  const adjustedY = y + menuHeight > window.innerHeight - 48 ? y - menuHeight : y;

  return (
    <div 
      className="fixed bg-[rgba(44,44,44,0.95)] backdrop-blur-xl rounded-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2 z-[2000] min-w-[200px] animate-contextMenuOpen"
      style={{ left: adjustedX, top: adjustedY }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => (
        item.separator ? (
          <div key={index} className="h-px bg-white/10 my-1 mx-3"></div>
        ) : (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
              item.disabled 
                ? 'text-white/30 cursor-not-allowed' 
                : 'text-white/90 hover:bg-white/[0.08] cursor-pointer'
            }`}
            onClick={() => {
              if (!item.disabled) {
                onAction(item.action);
                onClose();
              }
            }}
            disabled={item.disabled}
          >
            {item.icon && <span className="w-5 h-5 flex items-center justify-center text-white/60">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.shortcut && <span className="text-white/40 text-xs">{item.shortcut}</span>}
          </button>
        )
      ))}

      <style>{`
        @keyframes contextMenuOpen {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-contextMenuOpen {
          animation: contextMenuOpen 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

// Hook for using context menu
export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const showContextMenu = useCallback((e, items, onAction) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items,
      onAction: onAction || (() => {}),
    });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const ContextMenuComponent = contextMenu ? (
    <ContextMenu 
      x={contextMenu.x}
      y={contextMenu.y}
      items={contextMenu.items}
      onAction={contextMenu.onAction}
      onClose={hideContextMenu}
    />
  ) : null;

  return { showContextMenu, hideContextMenu, ContextMenuComponent };
};

export default ContextMenu;
