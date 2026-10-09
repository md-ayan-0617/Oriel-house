import React, { useState, useEffect } from 'react';

const WORDS = [
  'DINNER.',
  'READING.',
  'DRESSING.',
  'WAITING.',
  'TALKING.',
  'STAYING UP LATE.',
  'LIVING.'
];

export const TypingText: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    const isFinalWord = wordIndex === WORDS.length - 1;

    let timer: number;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentWord.length) {
        timer = window.setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 75); // 75ms warm speed
      } else {
        // Word completed
        if (!isFinalWord) {
          timer = window.setTimeout(() => {
            setIsDeleting(true);
          }, 1800);
        }
      }
    } else {
      // Deleting backwards
      if (displayedText.length > 0) {
        timer = window.setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '12px',
        flexWrap: 'wrap'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          fontWeight: 400,
          color: 'var(--text-current)',
          letterSpacing: '-0.01em'
        }}
      >
        LIGHT FOR
      </span>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(28px, 4.5vw, 64px)',
          fontWeight: 500,
          color: 'var(--butter)',
          letterSpacing: '0.02em',
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        {displayedText}
        {/* Warm gold thin cursor */}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.05em',
            backgroundColor: 'var(--butter)',
            marginLeft: '6px',
            animation: 'blinkCursor 1s step-end infinite'
          }}
        />
      </span>

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
