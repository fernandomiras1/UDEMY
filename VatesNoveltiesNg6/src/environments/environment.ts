// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // novApiUrl: 'http://192.168.80.153:8091/', 	// DEV Environment
  apiUrl: 'http://192.168.80.153:8090/', 		// DEV Environment
  // novApiUrl: 'http://192.168.50.31:8091/', 	// QA Environment
  // apiUrl: 'http://192.168.50.31:8090/' 		// QA Environment
  novApiUrl: 'http://localhost:50514/',
  // apiUrl: 'http://localhost:50515/'
};
// Enumeración de modos de edición.
export enum ModeEnum {
  Search = 1,
  View,
  New,
  Edit
}
