import { interval, of } from 'rxjs';
import { take } from 'rxjs/operators';
 
//take: El operador take es sumamente útil cuando ustedes quieren limitar la cantidad de emisiones 
// que un observador puede tener.

const numeros$ = of(1,2,3,4,5);
numeros$.pipe(
    take(3)
).subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
})
// Logs:
// next: 1
// next: 2
// next: 3