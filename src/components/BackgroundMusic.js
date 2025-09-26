'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaSpinner, FaMinus, FaMusic } from 'react-icons/fa';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    setIsLoading(false);
  }, [volume, isMuted]);


  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMouseDown = (e) => {
    if (!isMinimized) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isMinimized) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!isMinimized) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMinimized) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const containerStyle = {
    position: 'fixed',
    bottom: isMinimized ? 'auto' : '20px',
    left: isMinimized ? `${position.x}px` : '20px',
    top: isMinimized ? `${position.y}px` : 'auto',
    zIndex: 1000,
    opacity: showControls ? 1 : 0.8,
    transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: isMinimized ? '60px' : '260px',
    width: 'auto',
    cursor: isMinimized ? (isDragging ? 'grabbing' : 'grab') : 'default'
  };

  const controlsStyle = {
    background: isDragging ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(20px)',
    border: isDragging ? '2px solid rgba(59, 130, 246, 0.6)' : '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '16px',
    padding: isMinimized ? 'clamp(8px, 2vw, 12px)' : 'clamp(10px, 2.5vw, 14px)',
    boxShadow: isDragging ? '0 16px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 12px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: isMinimized ? '0' : 'clamp(8px, 2vw, 12px)',
    minWidth: isMinimized ? '60px' : '200px',
    maxWidth: isMinimized ? '60px' : '260px',
    justifyContent: isMinimized ? 'center' : 'space-between',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    border: 'none',
    borderRadius: '50%',
    width: 'clamp(32px, 8vw, 40px)',
    height: 'clamp(32px, 8vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };

  const volumeContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: 1,
    minWidth: 0
  };

  const volumeSliderStyle = {
    flex: 1,
    height: '4px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer'
  };

  const volumeSliderThumbStyle = {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(30, 64, 175, 0.3)'
  };

  const volumeIconStyle = {
    fontSize: 'clamp(12px, 3vw, 16px)',
    color: '#3b82f6',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    flexShrink: 0
  };

  const controlButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: 'clamp(24px, 6vw, 28px)',
    height: 'clamp(24px, 6vw, 28px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginLeft: '4px'
  };

  const controlIconStyle = {
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    color: '#ffffff',
    transition: 'color 0.3s ease'
  };

  const iconStyle = {
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    color: '#ffffff',
    filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))'
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .music-player {
            bottom: auto !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            max-width: 90vw !important;
          }
          
          .music-player.minimized {
            max-width: 60px !important;
            width: 60px !important;
            transform: none !important;
            left: auto !important;
            top: auto !important;
            bottom: 20px !important;
            right: 20px !important;
          }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
        }
        
        button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
      
      <div 
        className={`music-player ${isMinimized ? 'minimized' : ''}`}
        style={containerStyle}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div style={controlsStyle}>
          {!isMinimized ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)' }}>
                <button
                  style={buttonStyle}
                  onClick={togglePlayPause}
                  onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <span style={iconStyle}>
                    {isLoading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : isPlaying ? <FaPause /> : <FaPlay />}
                  </span>
                </button>

                <button
                  style={buttonStyle}
                  onClick={toggleMute}
                  onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <span style={volumeIconStyle}>
                    {isMuted ? <FaVolumeMute color='white'/> : <FaVolumeUp color='white'/>}
                  </span>
                </button>

                <div style={volumeContainerStyle}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={volumeSliderStyle}
                    disabled={isMuted}
                  />
                </div>
              </div>

              <button
                style={controlButtonStyle}
                onClick={toggleMinimize}
                title="Minimizar"
              >
                <span style={controlIconStyle}>
                  <FaMinus />
                </span>
              </button>
            </>
          ) : (
            <button
              style={buttonStyle}
              onClick={toggleMinimize}
              title="Expandir"
            >
              <span style={iconStyle}>
                <FaMusic />
              </span>
            </button>
          )}
        </div>

        <audio
          ref={audioRef}
          loop
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src="/music/vampiro_matue.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}
