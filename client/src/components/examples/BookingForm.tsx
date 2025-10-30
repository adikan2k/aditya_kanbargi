import BookingForm from "../BookingForm";

export default function BookingFormExample() {
  return (
    <div className="p-8 max-w-2xl">
      <BookingForm
        selectedDate="2025-11-15"
        selectedTime="10:00 AM"
        onSubmit={(data) => console.log("Booking submitted:", data)}
      />
    </div>
  );
}
