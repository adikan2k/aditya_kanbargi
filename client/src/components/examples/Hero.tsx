import Hero from "../Hero";

export default function HeroExample() {
  return (
    <Hero
      onBookMeeting={() => console.log("Book meeting clicked")}
      onViewWork={() => console.log("View work clicked")}
    />
  );
}
