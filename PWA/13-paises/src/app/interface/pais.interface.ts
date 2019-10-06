export interface PaisInterface {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini?: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: (RegionalBloc | RegionalBlocs2 | RegionalBlocs3 | RegionalBlocs4)[];
  cioc: string;
}

interface RegionalBlocs4 {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

interface RegionalBlocs3 {
  acronym: string;
  name: string;
  otherAcronyms: any[];
  otherNames: any[];
}

interface RegionalBlocs2 {
  acronym: string;
  name: string;
  otherAcronyms: any[];
  otherNames: string[];
}

interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

interface Translations {
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}