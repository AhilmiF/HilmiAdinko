import React from 'react';

export const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const YouTubeIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export const WhatsAppIcon = ({ size = 20, color = "currentColor", className = "", style = {} }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className} 
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.2 4.488L3 21l4.704-1.233a8.919 8.919 0 0 0 4.348 1.127h.004c4.947 0 8.976-4.027 8.978-8.977 0-2.398-.934-4.653-2.631-6.284zM12.053 19.39h-.003a7.424 7.424 0 0 1-3.784-1.036l-.271-.161-2.812.737.75-2.74-.177-.282a7.433 7.433 0 0 1-1.141-3.931c0-4.103 3.338-7.442 7.443-7.442 1.989 0 3.859.775 5.265 2.181a7.402 7.402 0 0 1 2.179 5.263c0 4.104-3.339 7.442-7.449 7.442zm4.084-5.576c-.224-.112-1.326-.654-1.531-.729-.205-.075-.354-.112-.504.112-.149.224-.579.729-.709.878-.13.149-.26.168-.485.056-.224-.112-.948-.349-1.806-1.113-.668-.596-1.119-1.332-1.25-1.556-.13-.224-.014-.346.098-.458.101-.101.224-.261.336-.392.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.392-.056-.112-.504-1.214-.69-1.661-.182-.436-.367-.377-.504-.384l-.429-.008c-.149 0-.392.056-.597.28-.205.224-.784.766-.784 1.868 0 1.102.802 2.167.914 2.316.112.149 1.58 2.413 3.828 3.384.535.231.953.369 1.279.473.537.171 1.026.147 1.413.089.431-.064 1.326-.542 1.512-1.065.186-.523.186-.971.13-1.065-.056-.094-.205-.149-.429-.261z" 
    />
  </svg>
);
