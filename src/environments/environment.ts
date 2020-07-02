// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlLocalHost: 'http://localhost:2000',
  urlBack: 'http://localhost:2000/',
  urlOauth: 'http://localhost:2000/oauth/token',
  urlApiRest: 'http://localhost:2000/api/',
  urlPublicRest: 'http://localhost:2000/public/',
  msg_servicio_no_disponible: 'Servicio no disponible, intentelo más tarde nuevamente.',
  idArrendero:0,
  idArrendatario:0

};

/*
/////////////////// KATRIEL - HEROKU /////////////////////////
export const environment = {
  production: false,
  urlLocalHost: 'https://alquiler-back.herokuapp.com',
  urlBack: 'https://alquiler-back.herokuapp.com/',
  urlOauth:  'https://alquiler-back.herokuapp.com/oauth/token',
  urlApiRest: 'https://alquiler-back.herokuapp.com/api/',
  urlPublicRest: 'https://alquiler-back.herokuapp.com/public/',
  msg_servicio_no_disponible: 'Servicio no disponible, intentelo más tarde nuevamente.'

};*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
