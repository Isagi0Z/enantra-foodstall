import { useEffect, useState } from "react";

export default function ParallaxTilt({ children, intensity = 20 }) {
  const [tiltStyle, setTiltStyle] = useState({});

  // Gyroscope movement (for mobile) and mouse movement (for desktop)
  useEffect(() => {
    // Mouse movement (for desktop)
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / intensity;
      const y = (window.innerHeight / 2 - e.clientY) / intensity;
      setTiltStyle({
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
      });
    };

    // Gyroscope movement (for mobile)
    const handleOrientation = (event) => {
      const x = event.gamma / 2; // left-right tilt
      const y = event.beta / 4;  // forward-back tilt
      setTiltStyle({
        transform: `rotateX(${y}deg) rotateY(${x}deg)`,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return (
    <div
      className="transition-transform duration-150 ease-out"
      style={tiltStyle}
    >
      {children}
    </div>
  );
}
