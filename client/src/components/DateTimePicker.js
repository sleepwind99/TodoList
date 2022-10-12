import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({dateTimeValue, setValue, disable=true}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="날짜&시간"
        value={dateTimeValue}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        disabled={disable}
      />
    </LocalizationProvider>
  );
}