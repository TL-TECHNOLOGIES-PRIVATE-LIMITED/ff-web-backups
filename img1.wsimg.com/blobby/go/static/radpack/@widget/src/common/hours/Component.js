import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { UX2 } from '@wsb/guac-widget-core';
import getDate from '../utils/getDate';
import { getWeekDayAbbr, toLocaleTimeString } from '../utils/helper-non-bootstrap';
import DataAid from '../constants/data-aids';

class Hours extends Component {
  constructor(props) {
    super(props);
    this.toggleHoursView = this.toggleHoursView.bind(this);
    this.getHourLabel = this.getHourLabel.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleHoursView() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  getHourLabel(hour) {
    const { staticContent, locale } = this.props;
    let label = '';
    if (hour.closed) {
      label = staticContent.closed;
    } else if (hour.byAppointmentOnly) {
      label = staticContent.byAppointment;
    } else {
      label = `${toLocaleTimeString(hour.openTime, locale)} – ${toLocaleTimeString(
        hour.closeTime,
        locale
      )}`;
    }

    return label;
  }

  render() {
    const { structuredHours, staticContent, locale, collapsible } = this.props;
    const today = getDate().getDay(); // zero based index
    const tableStyle = {
      borderSpacing: 0,
      textAlign: 'left',
      display: 'inline-table'
    };
    const arrowWrapperStyle = {
      display: 'flex',
      marginTop: 'xxsmall'
    };
    const arrowBaseStyle = {
      position: 'relative',
      left: 'xxsmall'
    };
    const structuredIndex = today === 0 ? structuredHours.length - 1 : today - 1;
    const { hour: hourObj } = structuredHours[structuredIndex] || {}; // zero based index
    if (hourObj && collapsible && this.state.collapsed) {
      const collapsedLabel =
        hourObj.closed || hourObj.byAppointmentOnly
          ? `${staticContent.today}`
          : `${staticContent.openToday}`;
      return (
        <table style={ tableStyle }>
          <tr
            data-aid={ DataAid.CONTACT_HOURS_COLLAPSED_REND }
            style={{ cursor: 'pointer' }}
            onClick={ this.toggleHoursView }
          >
            <td style={{ paddingRight: 'medium' }}>
              <UX2.Element.Text data-aid={ DataAid.CONTACT_HOURS_COLLAPSED_LABEL }>
                { collapsedLabel }
              </UX2.Element.Text>
            </td>
            <td>
              <UX2.Element.Text style={{ whiteSpace: 'nowrap', paddingLeft: 'xxsmall' }}>
                <UX2.Element.Link data-aid={ DataAid.CONTACT_HOURS_COLLAPSED_HR_LABEL } tag='span'>
                  { this.getHourLabel(hourObj) }
                </UX2.Element.Link>
              </UX2.Element.Text>
            </td>
            <td>
              <UX2.Element.Text data-aid={ DataAid.CONTACT_HOURS_COLLAPSED_ARROW }>
                <UX2.Element.Link group='Group' tag='span' style={ arrowWrapperStyle }>
                  <UX2.Element.Icon
                    icon='chevronDown'
                    size='small'
                    rotate='0'
                    style={ arrowBaseStyle }
                  />
                </UX2.Element.Link>
              </UX2.Element.Text>
            </td>
          </tr>
        </table>
      );
    }

    return (
      <table style={ tableStyle }>
        { structuredHours.map(({ hour }, index) => {
          let clickHandler = noop;
          let toggleCursor = 'auto';
          let arrow = '';
          if (collapsible && index === 0) {
            clickHandler = this.toggleHoursView;
            toggleCursor = 'pointer';
            arrow = (
              <UX2.Element.Text data-aid={ DataAid.CONTACT_HOURS_COLLAPSED_ARROW }>
                <UX2.Element.Link group='Group' tag='span' style={ arrowWrapperStyle }>
                  <UX2.Element.Icon
                    icon='chevronDown'
                    size='small'
                    rotate='180'
                    style={ arrowBaseStyle }
                  />
                </UX2.Element.Link>
              </UX2.Element.Text>
            );
          }
          const label = this.getHourLabel(hour);
          const dayStyle = today === hour.dayOfWeek ? 'bold' : 'normal';
          return (
            <tr
              key={ index }
              data-aid={ `${DataAid.CONTACT_HOURS_DAY_REND}_${hour.dayOfWeek}` }
              onClick={ clickHandler }
              style={{ cursor: toggleCursor }}
            >
              <td style={{ paddingRight: 'medium' }}>
                <UX2.Element.Text style={{ fontWeight: dayStyle, wordBreak: 'normal' }}>
                  { getWeekDayAbbr(hour.dayOfWeek, locale) }
                </UX2.Element.Text>
              </td>
              <td>
                <UX2.Element.Text
                  style={{ fontWeight: dayStyle, whiteSpace: 'nowrap', paddingLeft: 'xxsmall' }}
                >
                  { label }
                </UX2.Element.Text>
              </td>
              <td>{ arrow }</td>
            </tr>
          );
        }) }
      </table>
    );
  }
}

Hours.propTypes = {
  structuredHours: PropTypes.array,
  staticContent: PropTypes.object,
  locale: PropTypes.string,
  collapsible: PropTypes.bool
};

export default Hours;
