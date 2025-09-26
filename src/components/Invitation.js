'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FaGift,
  FaStar,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCheck,
  FaUtensils,
  FaGlassCheers,
  FaMobileAlt,
  FaSpinner
} from 'react-icons/fa';
import { updateGuestStatus, redirectToWhatsApp } from '../utils/updateGuestStatus';

export default function Invitation({ guest, party, onConfirm }) {
  const [isConfirmed, setIsConfirmed] = useState(guest.confirmed || false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRedirecting, setShowRedirecting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleConfirmPresence = () => {
    setIsUpdating(true);

    try {
      const result = updateGuestStatus(guest.id, true);

      if (result.success) {
        setIsConfirmed(true);
        if (onConfirm) {
          onConfirm(guest.id, true);
        }

        setTimeout(() => {
          setIsUpdating(false);
          setShowRedirecting(true);

          setTimeout(() => {
            const message = `Presença confirmada meu patrão! Seu presente será ganho!`;
            redirectToWhatsApp('5541984335936', message);
          }, 1000);

        }, 2000);

      } else {
        console.error('Erro ao confirmar presença:', result.error);
        alert('Erro ao confirmar presença. Tente novamente.');
        setIsUpdating(false);
      }
    } catch (error) {
      console.error('Erro ao confirmar presença:', error);
      alert('Erro ao confirmar presença. Tente novamente.');
      setIsUpdating(false);
    }
  };

  const handleViewMenu = () => {
    const menuUrl = party.menuUrl;
    window.open(menuUrl, '_blank');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #000000 0%, #0f0f23 50%, #1a1a2e 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const animatedBackgroundStyle = {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)
    `,
    animation: isLoaded ? 'backgroundShift 20s ease-in-out infinite' : 'none'
  };

  const particlesStyle = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden'
  };

  const particleStyle = (top, left, size, delay) => ({
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    width: `${size}px`,
    height: `${size}px`,
    background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
    borderRadius: '50%',
    opacity: 0.6,
    animation: isLoaded ? `float ${3 + Math.random() * 4}s ease-in-out infinite ${delay}s` : 'none',
    filter: 'blur(1px)'
  });

  const mainContainerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'clamp(16px, 4vw, 48px)',
    position: 'relative',
    zIndex: 10
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 'clamp(24px, 6vw, 48px)',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const iconContainerStyle = {
    display: 'inline-block',
    padding: 'clamp(16px, 4vw, 24px)',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    borderRadius: '50%',
    marginBottom: 'clamp(16px, 4vw, 32px)',
    boxShadow: '0 20px 40px rgba(30, 64, 175, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: isLoaded ? 'pulse 2s ease-in-out infinite' : 'none'
  };

  const dividerStyle = {
    width: 'clamp(80px, 20vw, 160px)',
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6, #1e40af, #60a5fa)',
    margin: '0 auto',
    borderRadius: '9999px',
    position: 'relative',
    overflow: 'hidden'
  };

  const dividerGlowStyle = {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    animation: isLoaded ? 'shimmer 3s ease-in-out infinite' : 'none'
  };

  const cardStyle = {
    maxWidth: '800px',
    margin: '0 auto clamp(24px, 6vw, 48px) auto',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
  };

  const cardInnerStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: 'clamp(24px, 6vw, 48px)',
    borderRadius: '32px',
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardGlowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
    animation: isLoaded ? 'glow 2s ease-in-out infinite' : 'none'
  };

  const photoSectionStyle = {
    textAlign: 'center',
    marginBottom: 'clamp(24px, 6vw, 40px)'
  };

  const photoContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    marginBottom: 'clamp(16px, 4vw, 24px)'
  };

  const photoStyle = {
    width: 'clamp(120px, 25vw, 200px)',
    height: 'clamp(120px, 25vw, 200px)',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid transparent',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af, #60a5fa) border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 20px 40px rgba(30, 64, 175, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    position: 'relative'
  };

  const photoGlowStyle = {
    position: 'absolute',
    inset: '-3px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af, #60a5fa)',
    zIndex: -1,
    filter: 'blur(8px)',
    opacity: 0.6,
    animation: isLoaded ? 'photoGlow 3s ease-in-out infinite' : 'none'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: 'clamp(32px, 8vw, 48px)',
    height: 'clamp(32px, 8vw, 48px)',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(30, 64, 175, 0.4)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    animation: isLoaded ? 'badgePulse 2s ease-in-out infinite' : 'none'
  };

  const nameStyle = {
    fontSize: 'clamp(24px, 6vw, 40px)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginTop: 'clamp(12px, 3vw, 20px)',
    marginBottom: 'clamp(8px, 2vw, 16px)',
    letterSpacing: '-0.01em'
  };

  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: 'clamp(20px, 5vw, 32px)',
    marginBottom: 'clamp(20px, 5vw, 32px)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(12px, 3vw, 20px)',
    marginBottom: 'clamp(16px, 4vw, 24px)'
  };

  const sectionIconStyle = {
    fontSize: 'clamp(24px, 6vw, 32px)',
    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
  };

  const sectionTitleStyle = {
    fontSize: 'clamp(18px, 4.5vw, 24px)',
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: '-0.01em'
  };

  const textStyle = {
    color: '#e0e7ff',
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    lineHeight: 1.6,
    marginBottom: 'clamp(8px, 2vw, 12px)'
  };

  const highlightTextStyle = {
    color: '#93c5fd',
    fontSize: 'clamp(16px, 4vw, 20px)',
    fontWeight: '600',
    marginBottom: 'clamp(8px, 2vw, 12px)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(16px, 4vw, 24px)',
    marginBottom: 'clamp(20px, 5vw, 32px)'
  };

  const buttonStyle = {
    width: '100%',
    padding: 'clamp(16px, 4vw, 24px)',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    fontWeight: '600',
    fontSize: 'clamp(16px, 4vw, 20px)',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 12px 24px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 16px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    boxShadow: '0 12px 24px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };

  const confirmedStyle = {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '20px',
    padding: 'clamp(20px, 5vw, 32px)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden'
  };

  const confirmedTextStyle = {
    color: '#a7f3d0',
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    lineHeight: 1.5
  };

  return (
    <>
      <style jsx>{`
        @keyframes backgroundShift {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-10px) translateY(-5px); }
          50% { transform: translateX(5px) translateY(-10px); }
          75% { transform: translateX(-5px) translateY(5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes photoGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes footerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 16px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        button[style*="linear-gradient(135deg, #3b82f6"]:hover {
          box-shadow: 0 16px 32px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div style={animatedBackgroundStyle} />

        <div style={particlesStyle}>
          <div style={particleStyle(80, 40, 8, 0)} />
          <div style={particleStyle(160, 80, 4, 1)} />
          <div style={particleStyle(128, 80, 12, 2)} />
          <div style={particleStyle(240, 160, 8, 0.5)} />
          <div style={particleStyle(80, 40, 4, 1.5)} />
          <div style={particleStyle(200, 120, 6, 2.5)} />
          <div style={particleStyle(300, 200, 10, 1.2)} />
          <div style={particleStyle(100, 300, 5, 0.8)} />
        </div>

        <div style={mainContainerStyle}>
          <div style={headerStyle}>
            <div style={iconContainerStyle}>
              <FaGift style={{ fontSize: 'clamp(32px, 8vw, 48px)', color: 'white' }} />
            </div>
            <div style={dividerStyle}>
              <div style={dividerGlowStyle} />
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardInnerStyle}>
              <div style={cardGlowStyle} />

              <div style={photoSectionStyle}>
                <div style={photoContainerStyle}>
                  <div style={photoGlowStyle} />
                  <div style={photoStyle}>
                    <Image
                      src={guest.photo}
                      alt={guest.name}
                      width={200}
                      height={200}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(guest.name)}&background=1e40af&color=fff&size=200`;
                      }}
                    />
                  </div>
                  <div style={badgeStyle}>
                    <FaStar style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: 'whjite' }} />
                  </div>
                </div>
                <h2 style={nameStyle}>
                  Olá, {guest.name}! <FaUser style={{ marginLeft: '8px', color: '#3b82f6' }} />
                </h2>
              </div>

              <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                  <FaEnvelope style={sectionIconStyle} />
                  <h3 style={sectionTitleStyle}>Mensagem Especial</h3>
                </div>
                <p style={textStyle}>{guest.message}</p>
              </div>

              <div style={gridStyle} className="grid-responsive">
                <div style={sectionStyle}>
                  <div style={sectionHeaderStyle}>
                    <FaCalendarAlt style={sectionIconStyle} />
                    <h3 style={sectionTitleStyle}>Data</h3>
                  </div>
                  <p style={textStyle}>{party.date}</p>
                  <p style={highlightTextStyle}>{party.time}</p>
                </div>

                <div style={sectionStyle}>
                  <div style={sectionHeaderStyle}>
                    <FaMapMarkerAlt style={sectionIconStyle} />
                    <h3 style={sectionTitleStyle}>Local</h3>
                  </div>
                  <p style={textStyle}>{party.location}</p>
                  <p style={{ ...textStyle, fontSize: 'clamp(12px, 3vw, 14px)', marginBottom: 'clamp(8px, 2vw, 12px)' }}>{party.address}</p>
                  <a
                    href={party.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#93c5fd',
                      textDecoration: 'none',
                      fontSize: 'clamp(14px, 3.5vw, 16px)',
                      fontWeight: '500',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#ffffff';
                      e.target.style.borderBottomColor = '#93c5fd';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#93c5fd';
                      e.target.style.borderBottomColor = 'transparent';
                    }}
                  >
                    Ver no Instagram <FaMobileAlt style={{ marginLeft: '8px' }} />
                  </a>
                </div>
              </div>

              <div style={{
                ...sectionStyle,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(30, 64, 175, 0.1))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '80px'
              }}>
                <p style={{
                  ...textStyle,
                  fontSize: 'clamp(22px, 5vw, 32px)',
                  fontWeight: 600,
                  margin: 0
                }}>
                  {party.message}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 16px)' }}>
                {isUpdating ? (
                  <button
                    disabled
                    style={{
                      ...buttonStyle,
                      opacity: 0.7,
                      cursor: 'not-allowed'
                    }}
                  >
                    <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                    Confirmando...
                  </button>
                ) : showRedirecting ? (
                  <div style={confirmedStyle}>
                    <FaGlassCheers style={{ marginRight: '8px' }} /> Presença Confirmada!
                    <p style={confirmedTextStyle}>Redirecionando para WhatsApp...</p>
                  </div>
                ) : !isConfirmed ? (
                  <button
                    onClick={handleConfirmPresence}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      Object.assign(e.target.style, buttonHoverStyle);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <FaCheck style={{ marginRight: '8px' }} />
                    Confirmar Presença
                  </button>
                ) : (
                  <div style={confirmedStyle}>
                    <FaGlassCheers style={{ marginRight: '8px' }} /> Presença Confirmada!
                    <p style={confirmedTextStyle}>Obrigado! Estou ansioso para comemorar com você!</p>
                  </div>
                )}

                <button
                  onClick={handleViewMenu}
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 16px 32px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 12px 24px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <FaUtensils style={{ marginRight: '8px' }} /> Ver Cardápio
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
