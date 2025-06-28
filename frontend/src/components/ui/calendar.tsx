import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={className}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border p-2 rounded-md w-full"
        placeholderText="Select a date"
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
};
