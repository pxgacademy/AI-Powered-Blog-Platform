function ShortenByWords({
  text,
  wordLimit = 10,
}: {
  text: string;
  wordLimit?: number;
}): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function ShortenByCharacters({
  text,
  charLimit = 80,
}: {
  text: string;
  charLimit?: number;
}): string {
  if (text.length <= charLimit) return text;
  return text.slice(0, charLimit).trimEnd() + "...";
}

function SmartShorten({
  text,
  charLimit = 80,
}: {
  text: string;
  charLimit?: number;
}): string {
  if (text.length <= charLimit) return text;
  const trimmed = text.slice(0, charLimit);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}

export { ShortenByWords, ShortenByCharacters, SmartShorten };
