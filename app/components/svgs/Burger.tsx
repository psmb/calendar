import React from 'react';
import { useTheme } from 'emotion-theming';

const Burger = () => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.695 13.5" width="13.695" height="13.5">
            <g
                fill="none"
                stroke={theme.colours.darkGray}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
            >
                <path d="M.75.75h12.195M.75 6.75h12.195M.75 12.75h12.195" />
            </g>
        </svg>
    );
};

export default Burger;
