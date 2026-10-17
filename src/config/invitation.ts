/**
 * Personal engagement invitation.
 * Edit this file only — page components read everything from here.
 * Leave a string empty to hide that line. Square brackets mark placeholders.
 */

export type InvitationConfig = {
  sharing: {
    title: string;
    description: string;
  };
  couple: {
    firstName: string;
    secondName: string;
  };
  family: {
    brideMother: string;
    brideFather: string;
    groomMother: string;
    groomFather: string;
  };
  /**
   * ISO date `YYYY-MM-DD` (formatted in Turkish) or display text such as `[Tarih]`.
   * Empty hides the date line.
   */
  date: string;
  /** 24-hour `HH:mm`, or display text such as `[Saat]`. Empty hides the time. */
  time: string;
  /**
   * Leave empty when `date` is an ISO date to derive the Turkish weekday.
   * A placeholder such as `[Gün]` is also replaced when the date is ISO.
   */
  venueName: string;
  venueAddress: string;
  /** http(s) only. Empty hides the link. */
  mapUrl: string;
  audio: {
    theme: string;
    bookOpen: string;
    pageTurn: string;
  };
};

export const invitation: InvitationConfig = {
  sharing: {
    title: "Nişan törenimizde",
    description: "sizleri de yanımızda görmekten mutluluk duyarız.",
  },
  couple: {
    firstName: "Beste",
    secondName: "Kılıç Kıray",
  },
  family: {
    brideMother: "Ayfer Yelken",
    brideFather: "Nevzat Çeltek",
    groomMother: "Aylin Özveren",
    groomFather: "Kıvanç Kırmacı",
  },
  date: "12 Aralık 2026",
  time: "13:00",
  venueName: "Liv Davet",
  venueAddress: "Denizköşkler, Kemal Sunal Cd. No:88 Avcılar/İstanbul",
  mapUrl: "https://maps.app.goo.gl/mXcDuBhYfxRzt9VZ6?g_st=aw",
  audio: {
    theme: "/audio/storybook-theme.mp3",
    bookOpen: "/audio/book-open.mp3",
    pageTurn: "/audio/page-turn.mp3",
  },
};
