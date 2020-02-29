import { useQuery } from 'react-query';
import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';

export function fetchDay({ date }) {
    return fetch(`/api/day/${date}`)
        .then(response => {
            if (response.status > 400) throw new Error('Error on fetch day.');

            return response.json();
        })
        .then(res => {
            let day = {};
            if (res) {
                const { comment, prayers, readings, bReadings, saints, seromns, title, glas, week } = res;

                const { colour: feastColour, icon: feastIcon } = getFeastInfo(new Date(date));
                const { fastName, fastingLevelName, colour: lentColour, icon: lentIcon } = getLentInfo(new Date(date));

                day = {
                    comment,
                    fastName,
                    fastingLevelName,
                    prayers,
                    readings,
                    bReadings,
                    saints,
                    seromns,
                    title,
                    glas,
                    week,
                    colour: feastColour || lentColour,
                    icon: feastIcon || lentIcon || 'default.jpg',
                };
            }

            return day;
        });
}

const useDay = date => useQuery(['day', { date }], fetchDay);

export default useDay;
