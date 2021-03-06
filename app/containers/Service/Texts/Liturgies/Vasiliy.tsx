import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';
import Loader from 'components/Loader/Loader';
import ReadingsForService from 'containers/Readings/ReadingsForService';
import dateFormat from 'dateformat';
import { css } from 'emotion';

import useLiturgy from './Vernie/useLiturgy';
import VasiliyMdx from './Vasiliy.mdx';
import VespersWithVasilyPassionThursdayMdx from './VespersWithVasilyPassionThursday.mdx';
import VespersWithVasilyPassionSaturdayMdx from './VespersWithVasilyPassionSaturday.mdx';
import 'containers/Service/Texts/Shared.css';
import { getKatekhumenReadings } from './Katekhumen/Katekhumen';

const Vasiliy = ({ lang, date }) => {
    const { katekhumen, saints, prichasten, otpust, zadastoinik } = useLiturgy(lang, 'vasiliy');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);

    const { apostol, gospel } = getKatekhumenReadings(day);
    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');

    const readingsForService = day?.readings?.['Вечерня'];
    const vespersReadings = readingsForService ? (
        Boolean(day) ? (
            <div
                className={css`
                    padding: 0 18px;
                `}
            >
                <ReadingsForService readingsForService={readingsForService} />
            </div>
        ) : (
            <Loader />
        )
    ) : null;

    const props = {
        lang,
        date,
        tomorrowDate,
        katekhumen,
        otpust,
        prichasten,
        saints,
        dayOfWeek,
        zadastoinik,
        apostol,
        gospel,
        isEasterOffsetRange,
    };
    if (isEasterOffsetRange(-3)) {
        return (
            <>
                <VespersWithVasilyPassionThursdayMdx {...props} readings={vespersReadings} />
                <VasiliyMdx {...props} onlyVernie />
            </>
        );
    }
    if (isEasterOffsetRange(-1)) {
        return (
            <>
                <VespersWithVasilyPassionSaturdayMdx {...props} readings={vespersReadings} />
                <VasiliyMdx {...props} onlyVernie />
            </>
        );
    }

    return <VasiliyMdx {...props} />;
};

export default Vasiliy;
