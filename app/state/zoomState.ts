import { atom } from 'recoil';

const zoomState = atom({
    key: 'zoomState',
    default: 1,
    persistence_UNSTABLE: {
        type: 'zoomState',
    },
});

export default zoomState;
