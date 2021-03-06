import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22">
            <path
                d="M27.17 0H16.56A3.4 3.4 0 0014 1.172 3.4 3.4 0 0011.441 0H.834a.826.826 0 00-.831.821v17.81a.826.826 0 00.831.822h10.611a1.738 1.738 0 011.715 1.448v.277a.826.826 0 00.83.822h.028a.826.826 0 00.831-.822v-.277a1.736 1.736 0 011.715-1.448h10.609a.826.826 0 00.83-.822V.821A.826.826 0 0027.17 0zM10.882 15.056H3.964a.822.822 0 110-1.643h6.918a.822.822 0 110 1.643zm0-4.447H3.964a.822.822 0 110-1.644h6.918a.822.822 0 110 1.644zm0-4.448H3.964a.822.822 0 110-1.644h6.918a.822.822 0 110 1.644zm13.155 8.895H17.12a.822.822 0 110-1.643h6.914a.822.822 0 110 1.643zm0-4.447H17.12a.822.822 0 110-1.644h6.914a.822.822 0 110 1.644zm0-4.448H17.12a.822.822 0 110-1.644h6.914a.822.822 0 110 1.644z"
                fill={colour || theme.colours.darkGray}
            />
        </svg>
    );
};
