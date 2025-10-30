import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface BookingCalendarProps {
  onSelectSlot?: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

export default function BookingCalendar({
  onSelectSlot,
  selectedDate,
  selectedTime,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">{monthName}</h3>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={previousMonth}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={nextMonth}
              data-testid="button-next-month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={index}>
              {day ? (
                <Button
                  variant={
                    selectedDate === formatDate(day) ? "default" : "outline"
                  }
                  className="w-full h-10"
                  disabled={isPast(day)}
                  onClick={() => onSelectSlot?.(formatDate(day), "")}
                  data-testid={`button-date-${formatDate(day)}`}
                >
                  <span
                    className={isToday(day) ? "font-bold text-primary" : ""}
                  >
                    {day.getDate()}
                  </span>
                </Button>
              ) : (
                <div className="h-10" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {selectedDate && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Available Time Slots</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className="font-mono"
                onClick={() => onSelectSlot?.(selectedDate, time)}
                data-testid={`button-time-${time.replace(/\s/g, "-")}`}
              >
                {time}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
