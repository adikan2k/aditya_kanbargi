import { useState } from "react";
import { Card } from "@/components/ui/card";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleSelectSlot = (date: string, time: string) => {
    setSelectedDate(date);
    if (time) setSelectedTime(time);
  };

  const handleSubmit = (data: any) => {
    console.log("Booking confirmed:", { ...data, selectedDate, selectedTime });
    setIsBooked(true);
  };

  const resetBooking = () => {
    setIsBooked(false);
    setSelectedDate("");
    setSelectedTime("");
  };

  if (isBooked) {
    return (
      <section id="booking" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold mb-4">
              Booking Confirmed! 🎉
            </h2>
            <p className="text-muted-foreground mb-2">
              Your appointment has been successfully scheduled for:
            </p>
            <p className="text-xl font-semibold mb-1">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-lg font-mono mb-6">{selectedTime}</p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to your inbox with calendar
              invite and meeting details.
            </p>
            <Button onClick={resetBooking} variant="outline">
              Book Another Meeting
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Book a Meeting
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Let's discuss your project, collaboration opportunity, or just have a
          chat. Select a date and time that works for you.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <BookingCalendar
              onSelectSlot={handleSelectSlot}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-xl mb-6">Your Information</h3>
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleSubmit}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
