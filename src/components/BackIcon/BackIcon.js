import React from 'react';
import {
  SvgXml
} from 'react-native-svg';

const componentSvg = props => `
<svg 
    width="40" 
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="20" cy="20" r="19" fill="white" stroke="${props.color}" stroke-width="2"/>
        <path d="M28.3333 20.5H9.66663" stroke="${props.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.3333 29.0833L10 20.0417L19.3333 11" stroke="${props.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const ExperienceClubLogo = props => (
  <SvgXml
    xml={componentSvg(props)}
  />
);
