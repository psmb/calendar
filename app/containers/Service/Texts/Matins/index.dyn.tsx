import { makeIsEasterOffsetRange, getFeastInfo } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';
import ReadingsForService from 'containers/Readings/ReadingsForService';
import Loader from 'components/Loader/Loader';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import SectionHeading from 'containers/Main/SectionHeading';
import Saints from 'containers/Main/Saints';
import Parts from 'components/Parts/Parts';

import Ending from '../Shared/Ending/Ending';

import Prazdnichnaja from './Prazdnichnaja.mdx';
import PassionFriday from './PassionFriday.mdx';
import PassionSaturday from './PassionSaturday.mdx';
import Lent from './Lent.mdx';

const Readings = ({ readingsForService, day }) =>
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
    );

const SectionLayout = ({ children }) => (
    <SolidSection marginTop={24} marginBottom={24} paddingTop={12} marginHorizontal={-12}>
        {children}
    </SolidSection>
);

const Matins = ({ date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);

    const troparions = <Parts date={date} partNames={['shared.Тропари']} Layout={SectionLayout} />;

    const endHymns = <Parts date={date} partNames={['shared.Кондаки', 'shared.Величания']} Layout={SectionLayout} />;

    const readingsForService = day?.bReadings?.['Утром'] || day?.readings?.['Утреня'];
    const readings = (
        <>
            <Readings readingsForService={readingsForService} day={day} />
        </>
    );

    const saints = day?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    const otpust = <Ending date={date} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterOtdanie = isEasterOffsetRange(38);
    const brightOrOtdanie = brightWeek || easterOtdanie;

    const { feastType } = getFeastInfo(dateObj);

    const isHoliday = dayOfWeek === 0 || feastType === 'great' || feastType === '12';

    const sirnajaSedmitza = isEasterOffsetRange(-8 * 7 + 1, -8 * 7 + 5);
    const vselenskayaRoditelskayaSubbota = isEasterOffsetRange(-8 * 7 - 1);
    const lentSubbota2 = isEasterOffsetRange(-5 * 7 - 1);
    const lentSubbota3 = isEasterOffsetRange(-4 * 7 - 1);
    const lentSubbota4 = isEasterOffsetRange(-3 * 7 - 1);
    const lentSubbotas = lentSubbota2 || lentSubbota3 || lentSubbota4;
    const lentSubbota5 = isEasterOffsetRange(-2 * 7 - 1);
    const lazarevaSubbota = isEasterOffsetRange(-1 * 7 - 1);
    const vospominanijaUsopshih = vselenskayaRoditelskayaSubbota || lentSubbotas;
    const greatLent = day?.fastName === 'Великий пост';
    const isFast =
        !lazarevaSubbota &&
        !lentSubbota5 &&
        !isHoliday &&
        (day?.fastName === 'Петров пост' ||
            day?.fastName === 'Успенский пост' ||
            day?.fastName === 'Рождественский пост' ||
            greatLent ||
            vospominanijaUsopshih ||
            sirnajaSedmitza);

    const props = {
        dayOfWeek,
        troparions,
        endHymns,
        readings,
        saints,
        easterSeason,
        brightOrOtdanie,
        brightWeek,
        otpust,
        day,
        date,
        isEasterOffsetRange,
        SectionLayout,
        isHoliday,
    };
    if (isEasterOffsetRange(-2)) {
        return <PassionFriday {...props} />;
    }
    if (isEasterOffsetRange(-1)) {
        return <PassionSaturday {...props} />;
    }
    if (isFast) {
        return (
            <Lent
                {...props}
                greatLent={greatLent}
                vospominanijaUsopshih={vospominanijaUsopshih}
                vselenskayaRoditelskayaSubbota={vselenskayaRoditelskayaSubbota}
                lentSubbotas={lentSubbotas}
                sirnajaSedmitza={sirnajaSedmitza}
            />
        );
    }

    return <Prazdnichnaja {...props} />;
};

export default Matins;
