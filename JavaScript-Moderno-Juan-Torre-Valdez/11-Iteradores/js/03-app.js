// Fizz Buzz... 100 numeros.

// 3 6 9 12 15 ...  FIZZ ( multiplo de 3)
// 5 10 15 20 25 ... BUZZ ( multiplo de 5)
// 15 30 45 ... Fizz Buzz ( multiplo de ambos.)

for(let i = 1; i < 100; i++  ) {
  if(i % 15 === 0) {
      console.log(`${i} FIZZ BUZZ`)
  } else if(i % 3 === 0) {
      console.log(`${i} fizz`);
  } else if ( i % 5 === 0 ) {
      console.log(`${i} buzz`)
  } 
}