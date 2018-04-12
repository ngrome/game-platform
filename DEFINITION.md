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

## Resolve

Nel mondo reale, ci potrebbero essere ritardi nella risposta dei servizi, questo vuol dire "nessun dato da visualizzare" senza la risposta del server.
Quindi, meglio non mostrare un componente vuoto fino a che non avremo dati dal server.

La cosa migliore sarebbe utilizzare il pre caricamento dei dati dal server e quindi solo quando abbiamo i dati il nostro routing potrebbe attivare la nostra route.
Inoltre, questo ci permette di gestire errori prima del routing verso il componente.
In casi simili, se vogliamo passare da una lista all'altra, ma la nuova lista non è disponibile per l'utente, potremmo gestire questa cosa ed evitare di portare l'utente ad una lista vuota.

In poche parole, se vogliamo ritardare la visualizzazione del componente fino a che non abbiamo i dati, in questo modo (con i resolver) lo possiamo fare.

## Reactive Forms

I Reactive Forms hanno un diverso approccio comparato ai template forms.

FormControls e FormGroup espongono degli observable chiamati valuesChanged.
Sottoscrivendo questi observable possiamo reagire in tempo reale all cambiamento dei valori del nostro input o gruppi di input.

Template Driven è il modo tradizionale per gestire i form in angular invocando una funzione al submit del form.

Ma in Angular, abbiamo come alternativa la possibilità di utilizzare observable con i Reactive Form e sottoscrivere funzioni al cambiamento di ogni singolo elemento.

Usando i Reactive Forms e qualche operatore RxJS possiamo implementare funzionalità comode ed avanzate in poche righe di codice.

Non è meglio usare reactive forms al posto dei Template Driven, i reactive forms sono migliori nel momento in cui c'è bisogno di gestire processi in tempo reale sul form in base ai cambiamenti fatti dall'utente.

L'utilizzo di una soluzione o l'altra non sono del tutto esclusive, è possibile anche con i reactive form invocare funzioni al submit del form ed alcune operazioni sottoscrivendo gli observable messi a disposizione.

In conclusione, non c'è un approccio mmigliore ma i reactive form sono decisamente utili e comodi da utilizzare all'interno delle nostre applicazioni.

// TODO: as best practice is better to avoid directly subscribe inside component
// https://medium.com/@stephenfluin/angular-best-practices-august-2017-edition-690b75cf8232
