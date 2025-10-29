'use client';
import { forwardRef, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Button = forwardRef(function Button(
  {
    text,
    backgroundColor = '#ffffff',
    textColor = '#151515',
    onClick,
    icon = null,
  },
  ref
) {
  const [isClient, setIsClient] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      y: -4,
      backgroundColor: '#151515',
      color: '#fff',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      y: 0,
      backgroundColor: '#151515',
      color: '#fff',
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  if (!isClient) return null;

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="py-2 px-5 md:py-3 md:px-8 mt-3 uppercase rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <span>{text}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
});

export default Button;
