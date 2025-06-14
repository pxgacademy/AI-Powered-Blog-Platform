export default function DateTimeFormate({ isoString }: { isoString: string }) {
  const dateObj = new Date(isoString);

  const date = dateObj.toLocaleDateString("en-GB"); // format: DD/MM/YYYY
  const time = dateObj.toLocaleTimeString("en-GB"); // format: HH:MM:SS

  return (
    <span>
      {date}, {time}
    </span>
  );
}
