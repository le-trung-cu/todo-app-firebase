import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

import './header-date.styles.scss';

const HeaderDate = ({handleChangeDateQuery}) => {

    const [date, setDate] = useState(new Date());

    const handleChangeDate = date => {
        setDate(date);
    }

    useEffect( () => {
        //Mon May 11 2020 10:31:29 GMT+0700 (Indochina Time)
        let dateStrs = date.toString().split(' ');
        handleChangeDateQuery(`${dateStrs[0]} ${dateStrs[1]} ${dateStrs[2]} ${dateStrs[3]}`);

    }, [date]);

    const getHumanDate = data => {
        //Mon May 11 2020 10:31:29 GMT+0700 (Indochina Time)
        let dateStrs = date.toString().split(' ');

        switch(data){
            case 'day': // day of week
                return dateStrs[0];
            case 'month':
                return dateStrs[1];
            case 'date': // day of month
                return dateStrs[2];
            case 'year':
                return dateStrs[3];
        }
    }

    return (
        <div className="header-date">
            <div className="header-date__content">
                <h3 className="header-date__main">{getHumanDate('day')}</h3>
                <p className="header-date__sub">{`${getHumanDate('month')} ${getHumanDate('date')}, ${getHumanDate('year')}`}</p>
                <DatePicker onChange={handleChangeDate}
                    value={date} />
            </div>
            <i className="flaticon-left-arrow header-date__next-day"></i>
            <i className="flaticon-next header-date__prev-day"></i>

        </div>
    );
};

export default HeaderDate;