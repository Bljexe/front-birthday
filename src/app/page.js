'use client';

import { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import CodeInput from '../components/CodeInput';
import Invitation from '../components/Invitation';
import BackgroundMusic from '../components/BackgroundMusic';
import guestsData from '../data/guests.json';
import { saveCurrentGuest, getCurrentGuest } from '../utils/updateGuestStatus';

export default function Home() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentGuest, setCurrentGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedGuest = getCurrentGuest();
    if (savedGuest) {
      setCurrentGuest(savedGuest);
      setCurrentView('invitation');
    }
  }, []);

  const handleCodeSubmit = async (code) => {
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const guest = guestsData.guests.find(g => g.code === code);

    if (guest) {
      saveCurrentGuest(guest);
      setCurrentGuest(guest);
      setCurrentView('invitation');
    } else {
      setError('Código não encontrado. Verifique se digitou corretamente.');
    }

    setIsLoading(false);
  };

  const handleGuestConfirm = (guestId, confirmed) => {
    console.log(`Convidado ${guestId} confirmou presença!`);
    
    if (currentGuest && currentGuest.id === guestId) {
      setCurrentGuest(prev => ({ ...prev, confirmed }));
    }
  };

  if (currentView === 'invitation' && currentGuest) {
    return (
      <>
        <Invitation 
          guest={currentGuest} 
          party={guestsData.party}
          onConfirm={handleGuestConfirm}
        />
        <BackgroundMusic />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '80px', left: '40px',
          width: '80px', height: '80px',
          backgroundColor: 'rgba(59,130,246,0.05)',
          borderRadius: '9999px'
        }} />
        <div style={{
          position: 'absolute', top: '160px', right: '80px',
          width: '128px', height: '128px',
          backgroundColor: 'rgba(37,99,235,0.05)',
          borderRadius: '9999px'
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'rgba(17, 24, 39, 0.6)',
          borderRadius: '20px',
          padding: '40px 30px',
          boxShadow: '0 0 25px rgba(37,99,235,0.2)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', color: 'white', fontWeight: '500' }}>
              Digite seu código
            </h1>
          </div>

          <CodeInput 
            onCodeSubmit={handleCodeSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div style={{
              marginTop: '20px',
              color: '#f87171',
              fontSize: '16px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}
        </div>
      </div>
      
      <BackgroundMusic />
    </div>
  );
}
