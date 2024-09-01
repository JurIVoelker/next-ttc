export const translateLeagues = (abbreviation) => {
  const translations = {
    "KKP H": "Herren Kreisklassenpokal",
    HKKA: "Herren Kreisklasse A",
    HKKB: "Herren Kreisklasse B",
    HBK: "Herren Bezirksklasse",
    wJU15BL: "Mädchen U15 Bezirksliga",
    mJU12BL: "Jungen U12 Bezirksliga",
    mJU19BL: "Jungen U19 Bezirksliga",
    mJU15BK: "Jungen U15 Bezirksklasse",
    "1. PL D": "Damen 1. Pfalzliga",
    BOL: "Herren Bezirksoberliga",
    HKL: "Herren Kreisliga",
    "PL mJU18": "Jungen U19 Pfalzliga",
    "PL mJU15": "Jungen U15 Pfalzliga",
    "BP H": "Herren Bezirkspokal",
  };
  return translations[abbreviation] || abbreviation;
};
