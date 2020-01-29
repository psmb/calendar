import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import DayPicker from 'components/DayPicker/DayPicker';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DatePickerCalendar } from 'react-nice-dates';
import { ru } from 'date-fns/locale';
import './NiceDates.scss';
import dateFormat from 'dateformat';
import LocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import { isEmpty, pathOr } from 'ramda';
import ReadingList from './ReadingList';
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader/Loader';
import theme from 'styles/theme';
import { lent, highlightDays } from './calendar';

import getDay from 'redux/actions/getDay';

const Heading = ({ children }) => (
    <h2
        className={css`
            font-size: 21px;
            line-height: 1;
            font-weight: bold;
            color: ${theme.colors.darkGray};
            margin-top: 24px;
            margin-bottom: 12px;
        `}
    >
        {children}
    </h2>
);

class Main extends Component {
    static propTypes = {
        params: PropTypes.object,
    };

    state = {
        calendarShown: false,
        direction: 'mount',
    };

    componentWillReceiveProps(newProps) {
        if (newProps.days !== this.props.days) {
            const day = pathOr(null, ['days', this.getDate(newProps)], newProps);
            if (isEmpty(this.state.day) && day) {
                this.setState({ day });
            }
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.day)) {
            this.props.getDay(this.getDate(this.props));
        }
    }

    getDate(props) {
        return props.match.params.date;
    }

    setNewDate(dateString) {
        this.props.history.push(`/date/${dateString}`);
        this.props.getDay(dateString);
    }

    handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');
        const direction = dateString > this.props.date ? 'right' : 'left';

        this.setNewDate(dateString);
        this.setState({
            calendarShown: false,
            direction,
        });
    };

    handleToggleClick = () => {
        this.setState(prevProps => ({
            calendarShown: !prevProps.calendarShown,
        }));
    };

    handleClickShift = direction => () => {
        const date = this.getDate(this.props);
        switch (direction) {
            case 'left':
                this.setNewDate(dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd'));
                break;
            case 'right':
                this.setNewDate(dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd'));
                break;
        }
        this.setState({ direction });
    };

    renderCalendar = () => {};

    render() {
        let { day } = this.props;
        const date = this.getDate(this.props);
        console.log(lent(new Date(date)), highlightDays(new Date(date)));

        const InnerContent = () =>
            Boolean(day) ? (
                <div>
                    <HeadingBar title={day.title} glas={day.glas} lent={day.lent} />
                    <div
                        className={css`
                            padding: 0 18px;
                        `}
                    >
                        <Heading>Чтение дня</Heading>
                        <ReadingList readings={day.readings || {}} />
                        <Heading>Святые дня</Heading>
                        <div
                            dangerouslySetInnerHTML={{ __html: day.saints }}
                            className={css`
                                font-size: 16px;
                                line-height: 1.5;
                                color: ${theme.colors.darkGray};

                                & a {
                                    color: ${theme.colors.primary};
                                }

                                & img {
                                    margin-right: 12px;
                                }
                            `}
                        />
                    </div>
                </div>
            ) : (
                <Loader />
            );

        const modifiers = {
            h12: date => {
                const [className] = highlightDays(date);
                return className === 'highlight-12';
            },
            hGreat: date => {
                const [className] = highlightDays(date);
                return className === 'highlight-great';
            },
            p123: date => {
                const [className] = highlightDays(date);
                return className === 'highlight-post123';
            },
            p7: date => {
                const [className] = highlightDays(date);
                return className === 'highlight-post7';
            },
            p: date => {
                const [className] = highlightDays(date);
                return className === 'highlight-post';
            },
        };
        const baseStyle = css`
            border-radius: 50%;
            padding-top: 5px;
            width: calc(100% - 22px);
            height: 100%;
            margin: 10px;
            border: 1px solid white;
        `;
        const modifiersClassNames = {
            selected: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    background-color: ${theme.colors.primary};
                    color: white;
                }
            `,
            h12: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    background-color: #dc143c;
                    color: white;
                }
            `,
            hGreat: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    border-color: #dc143c;
                }
            `,
            p: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    border-color: #7b68ee;
                }
            `,
            p7: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    border-color: ${theme.colors.primary};
                }
            `,
            p123: css`
                & .nice-dates-day_date {
                    ${baseStyle}
                    background-color: #7b68ee;
                    color: white;
                }
            `,
        };
        return (
            <div>
                <Header handleToggleClick={this.handleToggleClick} calendarShown={this.state.calendarShown} />
                <div>
                    {this.state.calendarShown && (
                        <div
                            className={css`
                                border-bottom: 1px solid #ccc;
                            `}
                        >
                            <DatePickerCalendar
                                date={new Date(date)}
                                onDateChange={this.handleDayClick}
                                locale={ru}
                                modifiers={modifiers}
                                modifiersClassNames={modifiersClassNames}
                            />
                        </div>
                    )}
                    <Nav
                        date={date}
                        handleToggleClick={this.handleToggleClick}
                        handleClickShift={this.handleClickShift}
                    />
                    <div className="slide-wrap">
                        <ReactCSSTransitionGroup
                            className="slide-transition-group"
                            transitionName={`slide-${this.state.direction}`}
                            transitionEnterTimeout={400}
                            transitionLeaveTimeout={400}
                        >
                            <div className="slide" key={date}>
                                <InnerContent />
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state.days;

function mapDispatchToProps(dispatch) {
    return {
        getDay: bindActionCreators(getDay, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
