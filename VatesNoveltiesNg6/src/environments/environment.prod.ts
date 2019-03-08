export const environment = {
  production: true,
  novApiUrl: 'http://192.168.80.153:8071/', // DEV Environment
  apiUrl: 'http://192.168.80.153:8070/'		// DEV Environment
};
// Enumeración de modos de edición.
export enum ModeEnum {
  Search = 1,
  View,
  New,
  Edit
}

