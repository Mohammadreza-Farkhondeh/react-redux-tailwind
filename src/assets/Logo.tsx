import React from 'react';

interface LogoProps {
  size?: string;
  color?: string;
  title?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'w-12 h-12',
  color = 'text-blue-500',
  title = 'My Logo',
}) => {
  return (
    <div
      className={`flex items-center justify-center ${size} ${color}`}
      aria-label={title}
      role="img"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
      >
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm1.414 13.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L12.828 12l1.586 1.586a1 1 0 01-1.414 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Logo;
