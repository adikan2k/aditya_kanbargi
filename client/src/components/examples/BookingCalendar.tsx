import { useState } from "react";
import BookingCalendar from "../BookingCalendar";

export default function BookingCalendarExample() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSelectSlot = (date: string, time: string) => {
    setSelectedDate(date);
    if (time) setSelectedTime(time);
    console.log("Selected:", date, time);
  };

  return (
    <div className="p-8">
      <BookingCalendar
        onSelectSlot={handleSelectSlot}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
}
