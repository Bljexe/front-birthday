'use client';

import { useState, useEffect } from 'react';

export default function CodeInput({ onCodeSubmit, isLoading }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Por favor, digite seu código');
      return;
    }

    onCodeSubmit(code.toUpperCase());
  };

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCode(value);
    setError('');
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(16px, 4vw, 24px)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const inputContainerStyle = {
    position: 'relative',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: 'clamp(16px, 4vw, 20px)',
    borderRadius: '20px',
    border: '2px solid rgba(59, 130, 246, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    color: '#ffffff',
    fontSize: 'clamp(16px, 4vw, 20px)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    letterSpacing: '0.1em',
    fontWeight: '500'
  };

  const inputFocusStyle = {
    border: '2px solid rgba(59, 130, 246, 0.8)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)'
  };

  const inputGlowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
    borderRadius: '20px',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  };

  const errorStyle = {
    color: '#f87171',
    fontSize: 'clamp(14px, 3.5vw, 16px)',
    textAlign: 'center',
    fontWeight: '500',
    background: 'rgba(248, 113, 113, 0.1)',
    border: '1px solid rgba(248, 113, 113, 0.3)',
    borderRadius: '12px',
    padding: 'clamp(8px, 2vw, 12px)',
    backdropFilter: 'blur(10px)',
    marginTop: 'clamp(8px, 2vw, 12px)'
  };

  const buttonStyle = {
    width: '100%',
    padding: 'clamp(16px, 4vw, 20px)',
    borderRadius: '20px',
    fontSize: 'clamp(16px, 4vw, 20px)',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    color: 'white',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.6 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 12px 24px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 16px 32px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };

  const buttonDisabledStyle = {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  };

  const loadingSpinnerStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .input-focused .input-glow {
          opacity: 1;
          animation: glow 2s ease-in-out infinite;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 16px 32px rgba(30, 64, 175, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        }
        
        button:disabled:hover {
          transform: none !important;
        }
      `}</style>
      
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <div style={inputGlowStyle} className="input-glow" />
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="Digite seu código"
              style={inputStyle}
              onFocus={(e) => {
                Object.assign(e.target.style, inputFocusStyle);
                e.target.parentElement.classList.add('input-focused');
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(59, 130, 246, 0.3)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.parentElement.classList.remove('input-focused');
              }}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={isLoading ? { ...buttonStyle, ...buttonDisabledStyle } : buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                Object.assign(e.target.style, buttonHoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 24px rgba(30, 64, 175, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {isLoading ? (
              <>
                <span style={loadingSpinnerStyle}></span>
                Verificando...
              </>
            ) : (
              'Confirmar'
            )}
          </button>
        </form>
      </div>
    </>
  );
}
