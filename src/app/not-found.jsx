'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EnhancedAnimatedNotFound = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [hoverGlow, setHoverGlow] = useState(false);
  const [stars, setStars] = useState([]);
  const [galaxies, setGalaxies] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);

    // Generate more stars for denser effect
    const starCount = 200;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      animationDuration: `${Math.random() * 4 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setStars(newStars);

    // Generate more vibrant galaxies
    const galaxyCount = 8;
    const newGalaxies = Array.from({ length: galaxyCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.8 + 0.5,
      rotation: Math.random() * 360,
      animationDuration: `${Math.random() * 15 + 25}s`,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
    setGalaxies(newGalaxies);

    return () => clearTimeout(timer);
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: '"Inter", system-ui, sans-serif',
      backgroundColor: '#0a0a1a',
      color: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle, #0f0f2d 0%, #060614 100%)',
      opacity: 0.9,
    },
    galaxy: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      filter: 'blur(30px)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      textAlign: 'center',
      padding: '2rem',
    },
    title: {
      fontSize: 'clamp(8rem, 20vw, 15rem)',
      fontWeight: '800',
      background: 'linear-gradient(45deg, #ff3366, #33ccff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'float 4s ease-in-out infinite',
      textShadow: hoverGlow ? '0 0 30px rgba(255, 51, 102, 0.8)' : 'none',
      transition: 'all 0.4s ease',
      marginBottom: '1rem',
    },
    message: {
      fontSize: 'clamp(1.8rem, 5vw, 3rem)',
      color: '#f0f0f0',
      marginTop: '1rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1.5rem',
      marginTop: '4rem',
    },
    button: {
      padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 2.5rem)',
      fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: '1px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      },
    },
    primaryButton: {
      backgroundColor: '#ff3366',
      border: 'none',
      '&:hover': {
        backgroundColor: '#ff4d7d',
      },
    },
    stars: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
    star: {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      boxShadow: '0 0 4px rgba(255,255,255,0.8)',
    },
  };

  if (!visible) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.background} />
      {galaxies.map((galaxy) => (
        <div
          key={galaxy.id}
          style={{
            ...styles.galaxy,
            left: galaxy.left,
            top: galaxy.top,
            transform: `scale(${galaxy.scale}) rotate(${galaxy.rotation}deg)`,
            background: `radial-gradient(circle at 30% 30%, ${galaxy.color}, transparent 70%)`,
            animation: `moveGalaxy ${galaxy.animationDuration} linear infinite`,
          }}
        />
      ))}
      <div style={styles.stars}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              ...styles.star,
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.animationDuration} infinite ${star.animationDelay}`,
            }}
          />
        ))}
      </div>
      <div style={styles.content}>
        <h1
          style={styles.title}
          onMouseEnter={() => setHoverGlow(true)}
          onMouseLeave={() => setHoverGlow(false)}
        >
          404
        </h1>
        <p style={styles.message}>Lost in the Digital Cosmos</p>
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={() => router.push('/')}
          >
            Return Home
          </button>
          <button style={styles.button} onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-25px) rotate(2deg); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.8); }
          }
          @keyframes moveGalaxy {
            0% { transform: translate(0, 0) scale(var(--scale)) rotate(0deg); }
            50% { transform: translate(100px, 100px) scale(var(--scale)) rotate(180deg); }
            100% { transform: translate(0, 0) scale(var(--scale)) rotate(360deg); }
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
          button:active {
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedAnimatedNotFound;
