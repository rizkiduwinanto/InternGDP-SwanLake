import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export const DatePicker = (props) => {
  return (
    <div className="text-center py-3">
          <div className="d-block">
            <span className="d-inline-block pr-3">{props.label}</span>
            <span className="text-center">
            <DayPickerInput onDayChange={props.handleChange} value={props.date}/>
            </span>
            <span style={{fontSize: '25px'}} className="d-inline-block pl-3"> 📅 </span>
          </div>
        </div>
  );
}

export default DatePicker;