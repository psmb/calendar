import React from 'react';
import { useTheme } from 'emotion-theming';

const CrossIcon = ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g data-name="Group 715">
                <path
                    data-name="Path 224"
                    d="M23.654 12.007a2.9 2.9 0 00-2.9-2.9h-2.9a2.916 2.916 0 00-2.9-2.919v-2.9a2.905 2.905 0 10-5.81 0v2.9a2.907 2.907 0 00-2.9 2.919h-2.9a2.912 2.912 0 000 5.823h2.9a2.9 2.9 0 002.9 2.9v2.919a2.905 2.905 0 005.81 0V17.83a2.9 2.9 0 002.9-2.9h2.9a2.925 2.925 0 002.9-2.919z"
                    fill={colour || theme.colours.darkGray}
                />
                <path
                    data-name="Path 225"
                    d="M12.007 24a3.282 3.282 0 01-3.278-3.265v-2.573a3.266 3.266 0 01-2.891-2.891H3.265a3.272 3.272 0 010-6.543h2.573a3.266 3.266 0 012.891-2.891V3.278a3.272 3.272 0 116.543 0v2.559a3.266 3.266 0 012.891 2.891h2.573a3.272 3.272 0 010 6.543h-2.559a3.292 3.292 0 01-2.891 2.891v2.573A3.274 3.274 0 0112.007 24zM3.278 9.462a2.546 2.546 0 100 5.091h3.278v.36a2.556 2.556 0 002.545 2.545h.36v3.278a2.546 2.546 0 005.091 0v-3.278h.36a2.539 2.539 0 002.545-2.545v-.36h3.278a2.546 2.546 0 100-5.091h-3.278v-.36a2.547 2.547 0 00-2.545-2.545h-.36V3.292a2.546 2.546 0 10-5.091 0v3.265h-.36a2.547 2.547 0 00-2.545 2.545v.36z"
                    fill={colour || theme.colours.darkGray}
                />
                <path
                    data-name="Path 226"
                    d="M21.065 11.329a.694.694 0 00-.567.3 8.171 8.171 0 01-8.062-7.689v-.443a.7.7 0 00.277-.553.694.694 0 00-.691-.692.685.685 0 00-.691.692.713.713 0 00.249.539v.678a8.127 8.127 0 01-7.9 7.454.681.681 0 00-.553-.277.7.7 0 00-.691.692.686.686 0 001.2.456 8.3 8.3 0 017.938 7.993.675.675 0 00-.277.539.693.693 0 00.691.691.688.688 0 00.443-1.217 8.225 8.225 0 018.131-7.979.712.712 0 00.5.207.7.7 0 000-1.4zm-3.72.387h-3.72a1.677 1.677 0 00-1.189-1.231v-3.54a8.841 8.841 0 004.909 4.771zm-5.338 1.217a.844.844 0 110-1.687.838.838 0 01.844.844.847.847 0 01-.844.843zm-.429-5.947v3.513a1.655 1.655 0 00-1.189 1.231H6.637a8.976 8.976 0 004.941-4.743zm-4.812 5.476h3.637a1.642 1.642 0 001.175 1.217v3.578a9.03 9.03 0 00-4.812-4.794zm5.67 4.785v-3.568a1.642 1.642 0 001.175-1.217h3.651a8.984 8.984 0 00-4.825 4.786z"
                    fill={theme.colours.bgGrayLight}
                />
            </g>
        </svg>
    );
};

export default CrossIcon;
