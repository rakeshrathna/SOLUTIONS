import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import introVideo from '../../video/EDIT_THE_PROVIDED_VIDEO_DO_NO.mp4';
import logoImg from '../../assets/logo.png';

interface IntroOverlayProps {
  onComplete: () => void;
  onFadeStart?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete, onFadeStart }) => {
  const [phase, setPhase] = useState<'loading' | 'playing' | 'fading' | 'ended'>('loading');
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Trigger website reveal underneath
    if (onFadeStart) onFadeStart();
    setPhase('fading');

    try {
      sessionStorage.setItem('learnovaIntroSeen', 'true');
    } catch {
      // Ignore storage errors
    }

    // After fade duration, unmount video completely
    setTimeout(() => {
      setPhase('ended');
      onComplete();
    }, 650);
  };

  useEffect(() => {
    // Check if user previously watched intro in this browser session
    try {
      const seen = sessionStorage.getItem('learnovaIntroSeen');
      if (seen) {
        onComplete();
        setPhase('ended');
        return;
      }
    } catch {
      // Ignore
    }

    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleFinish();
      return;
    }

    // Lock scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Safety timeout: If video takes too long to load or play, gracefully skip
    const timer = setTimeout(() => {
      if (!completedRef.current) {
        handleFinish();
      }
    }, 12000);

    // Attempt video playback
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.play().catch(() => {
        // Autoplay might require muted (which it is) or user interaction
        // If autoplay completely fails, we gracefully allow fallback
      });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, []);

  if (phase === 'ended') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Fallback branded loader while video buffer warms up */}
      {phase === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0 transition-opacity duration-300">
          <img src={logoImg} alt="Learnova" className="w-16 h-16 object-contain animate-pulse mb-3" />
          <span className="text-xs font-bold tracking-widest text-[#C0222E] uppercase">
            Learnova
          </span>
        </div>
      )}

      {/* Main Intro Video */}
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlaying={() => setPhase('playing')}
        onEnded={handleFinish}
        onError={handleFinish}
        className="w-full h-full object-cover sm:object-contain relative z-10 select-none pointer-events-none"
      />

      {/* Skip Intro Button */}
      <button
        onClick={handleFinish}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white/90 bg-black/50 hover:bg-black/80 border border-white/20 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-95 hover:border-white/40"
        aria-label="Skip Intro"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
