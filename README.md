[![Build Status](https://travis-ci.org/ngrome/game-platform.svg?branch=master)](https://travis-ci.org/ngrome/game-platform)

# GamePlatform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Guards

## CanActivate

CanActivate: richiede l'autenticazione
Le applicazioni spesso restringono l'accesso a determinate funzionalità in base ai privilegi degli utenti che visitano l'applicazione.
È possibile consentire l'accesso solo agli utenti autenticati o agli utenti con un ruolo specifico.
Potresti bloccare o semplicemente limitare l'utente finchè l'account non è attivato.

CanActivate guard è lo strumento per gestire esattamente queste regole.

```
import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
 canActivate() {
   console.log('AuthGuard#canActivate called');
   return true;
 }
}
```

## CanActivateChild

You can also protect child routes with the CanActivateChild guard. The CanActivateChild guard is similar to the CanActivate guard. The key difference is that it runs before any child route is activated.

You protected the admin feature module from unauthorized access. You should also protect child routes within the feature module.

Extend the AuthGuard to protect when navigating between the admin routes. Open auth-guard.service.ts and add the CanActivateChild interface to the imported tokens from the router package.

## CanLoad Guard

CanLoad Guard: protegge i moduli richiesti da caricamenti non autorizzati
TU stai già proteggendo AdminModule con CanActivate che previene utenti non autorizzati ad accedere alle funzionalità dell'area admin.
Questo fa il redirect alla pagina di login se l'utente non è autorizzato.

Ma il router sta ancora caricando AdminModule anche se l'utente non può accedere a nessuno dei suo componenti.
Dovresti caricare AdminModule solo se l'utente è loggato

Aggiungendo la protezione CanLoad
questa semplicemente carica AdminModule quando l'utente è loggato e prova ad accedere alle funzionalità di amministratore.

L'attuale AuthGuard con (canActivate) ha la logica base nel suo metodo checkLogin() per implementare anche la protezione CanLoad.

Open auth-guard.service.ts. Import the CanLoad interface from @angular/router. Add it to the AuthGuard class's implements list. Then implement canLoad() as follows:

```
canLoad(route: Route): boolean {
  let url = `/${route.path}`;

  return this.checkLogin(url);
}
```
