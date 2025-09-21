import { Match } from "@/types/ttApiTypes";

export const getUpcomingMatches = (matches: Match[]) =>
  matches.filter(
    (m) => new Date(m.datetime) >= new Date(new Date().setHours(0, 0, 0, 0))
  );
