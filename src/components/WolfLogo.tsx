import React from 'react';

interface WolfLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const WolfLogo: React.FC<WolfLogoProps> = ({
  className = '',
  theme = 'light',
  showTagline = true,
  size = 'md',
}) => {
  const isDarkSurface = theme === 'dark';
  const fillPrimary = isDarkSurface ? '#FFFFFF' : '#111111';
  const fillSecondary = isDarkSurface ? '#F5F0EB' : '#27272A';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Wolf Silhouette Icon */}
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClasses} w-auto aspect-square shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="WOLF RF Logo"
      >
        {/* Stylized Wolf Profile corresponding to WOLF RF official mark */}
        <path
          d="M 50 14
             C 52 17, 56 24, 57 28
             C 59 25, 60 21, 62 18
             C 63 22, 65 29, 64 34
             C 69 36, 73 40, 75 46
             C 77 48, 83 49, 87 50
             C 89 51, 89 53, 87 54
             C 83 55, 78 57, 76 60
             C 73 63, 67 65, 63 65
             C 59 66, 56 70, 52 75
             C 51 77, 49 76, 48 74
             C 50 67, 49 61, 45 56
             C 41 51, 37 46, 38 41
             C 38 38, 41 38, 43 40
             C 41 36, 39 33, 40 29
             C 42 30, 44 32, 45 34
             C 46 29, 47 22, 50 14 Z"
          fill={fillPrimary}
        />
        {/* Eye slit cutout or highlight */}
        <polygon
          points="62,40 68,42 63,44"
          fill={isDarkSurface ? '#111111' : '#FFFFFF'}
        />
        {/* Neck / base modern stroke */}
        <path
          d="M 38 78 C 42 77, 47 77, 52 79"
          stroke={fillPrimary}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Name & Tagline Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className="font-bold tracking-widest uppercase transition-colors"
          style={{
            color: fillPrimary,
            fontSize: size === 'sm' ? '1.1rem' : size === 'md' ? '1.35rem' : size === 'lg' ? '1.75rem' : '2.2rem',
            letterSpacing: '0.08em',
            fontWeight: 800,
          }}
        >
          WOLF <span className="font-light tracking-normal opacity-90">RF</span>
        </span>
        {showTagline && (
          <span
            className="font-editorial italic tracking-normal transition-colors"
            style={{
              color: fillSecondary,
              fontSize: size === 'sm' ? '0.72rem' : size === 'md' ? '0.85rem' : size === 'lg' ? '1.05rem' : '1.3rem',
              marginTop: size === 'sm' ? '1px' : '2px',
              fontStyle: 'italic',
            }}
          >
            Ideas que se imprimen
          </span>
        )}
      </div>
    </div>
  );
};
