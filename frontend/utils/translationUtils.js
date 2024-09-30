const leagueTranslations = {
  "KKP H": { league: "Herren Kreisklassenpokal", kind: "Herren" },
  HKKA: { league: "Herren Kreisklasse A", kind: "Herren" },
  HKKB: { league: "Herren Kreisklasse B", kind: "Herren" },
  HBK: { league: "Herren Bezirksklasse", kind: "Herren" },
  wJU15BL: { league: "Mädchen U15 Bezirksliga", kind: "Mädchen U15" },
  mJU12BL: { league: "Jungen U12 Bezirksliga", kind: "Jungen U12" },
  mJU19BL: { league: "Jungen U19 Bezirksliga", kind: "Jungen U19" },
  mJU15BK: { league: "Jungen U15 Bezirksklasse", kind: "Jungen U15" },
  "1. PL D": { league: "Damen 1. Pfalzliga", kind: "Damen" },
  BOL: { league: "Herren Bezirksoberliga", kind: "Herren" },
  HKL: { league: "Herren Kreisliga", kind: "Herren" },
  "PL mJU18": { league: "Jungen U19 Pfalzliga", kind: "Jungen U19" },
  "PL mJU15": { league: "Jungen U15 Pfalzliga", kind: "Jungen U15" },
  "BP H": { league: "Herren Bezirkspokal", kind: "Herren" },
};

export const translateLeagues = (abbreviation) => {
  return leagueTranslations[abbreviation]?.league || abbreviation;
};

export const getTeamNameFromLeague = (league, name) => {
  if (!league || !name) return "";
  const leagueName = leagueTranslations[league];
  if (!leagueName) return name;
  let result;
  if (
    leagueName?.league?.includes("Herren") ||
    leagueName?.league?.includes("Jungen") ||
    leagueName?.league?.includes("Damen") ||
    leagueName?.league?.includes("Mädchen")
  ) {
    result = name.replace("TTC Klingenmünster", leagueName.kind);
  } else {
    console.log(leagueName, result);
  }
  return result || name;
};
