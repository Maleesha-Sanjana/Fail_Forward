import React, { useEffect, useRef } from 'react';

function RobotBackground() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const robotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate center of screen
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      // Calculate distance from center
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      
      // Calculate rotation angles (max 15 degrees)
      const maxRotation = 15;
      const rotationX = (deltaY / centerY) * maxRotation;
      const rotationY = (deltaX / centerX) * maxRotation;
      
      // Apply rotation to robot head
      if (robotRef.current) {
        robotRef.current.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`;
      }
      
      // Calculate eye movement (max 8px movement)
      const maxEyeMovement = 8;
      const eyeX = (deltaX / centerX) * maxEyeMovement;
      const eyeY = (deltaY / centerY) * maxEyeMovement;
      
      // Apply eye movement
      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
      }
    };

    const handleMouseLeave = () => {
      // Reset robot and eyes to center position
      if (robotRef.current) {
        robotRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = 'translate(0px, 0px)';
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = 'translate(0px, 0px)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '200px',
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Modern Robot Head */}
      <div style={{
        width: '120px',
        height: '120px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        borderRadius: '20px',
        border: '1px solid #333',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }} ref={robotRef}>
        
        {/* Modern LED Eyes */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '15px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, #00ff88 0%, #00cc66 70%, #008844 100%)',
            borderRadius: '50%',
            position: 'relative',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
          }}>
            <div ref={leftEyeRef} style={{
              width: '8px',
              height: '8px',
              background: '#ffffff',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s ease',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}></div>
          </div>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, #00ff88 0%, #00cc66 70%, #008844 100%)',
            borderRadius: '50%',
            position: 'relative',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
          }}>
            <div ref={rightEyeRef} style={{
              width: '8px',
              height: '8px',
              background: '#ffffff',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s ease',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}></div>
          </div>
        </div>
        
        {/* Modern Status Display */}
        <div style={{
          width: '40px',
          height: '8px',
          background: 'linear-gradient(90deg, #00ff88 0%, #00cc66 100%)',
          borderRadius: '4px',
          position: 'relative',
          boxShadow: '0 0 15px rgba(0, 255, 136, 0.4)'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            background: '#ffffff',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
        
        {/* Tech Antenna */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '15px',
          background: 'linear-gradient(180deg, #00ff88 0%, #00cc66 100%)',
          borderRadius: '1px'
        }}>
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '8px',
            height: '8px',
            background: 'radial-gradient(circle, #00ff88 0%, #00cc66 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(0, 255, 136, 0.8)',
            animation: 'pulse 1.5s infinite'
          }}></div>
        </div>
        
        {/* Side Panels */}
        <div style={{
          position: 'absolute',
          left: '-8px',
          top: '20px',
          width: '6px',
          height: '30px',
          background: 'linear-gradient(180deg, #333 0%, #1a1a1a 100%)',
          borderRadius: '3px',
          border: '1px solid #444'
        }}></div>
        <div style={{
          position: 'absolute',
          right: '-8px',
          top: '20px',
          width: '6px',
          height: '30px',
          background: 'linear-gradient(180deg, #333 0%, #1a1a1a 100%)',
          borderRadius: '3px',
          border: '1px solid #444'
        }}></div>
      </div>
    </div>
  );
}

export default RobotBackground;
