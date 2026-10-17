const PLACEHOLDER = /^\s*\[.*\]\s*$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const CLOCK = /^(\d{1,2})[:.](\d{2})$/;

export type ScheduleLines = {
  date: string;
  time: string;
};

function capitalizeTr(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);
}

export function formatClock(time: string): string {
  const trimmed = time.trim();
  const match = CLOCK.exec(trimmed);
  if (!match) return trimmed;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return trimmed;
  return `${hours.toString().padStart(2, "0")}.${minutes.toString().padStart(2, "0")}`;
}

export function formatSchedule(input: {
  date: string;
  time: string;
}): ScheduleLines {
  const date = input.date.trim();
  const time = formatClock(input.time);
  const iso = ISO_DATE.exec(date);

  if (!iso) {
    return { date, time };
  }

  const stamp = new Date(
    Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]), 12),
  );
  const dateText = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(stamp);

  return { date: dateText, time };
}

export function safeHttpUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}
