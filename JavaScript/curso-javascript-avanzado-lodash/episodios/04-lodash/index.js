'use strict';

const {
    upperFirst,
    upperCase,
    truncate,
    startCase,
    lowerFirst,
    snakeCase,
    camelCase,
    kebabCase,
    capitalize,
    escape,
    unescape,
    repeat,
    lowerCase,
    escapeRegex,
} = require('lodash');

const frase = 'Hola amigazo que tal';
const nombre = 'manolo'
const regex = '/[0-9]+\w+/i'
const variable = 'unaVariable'
const larga = 'este es un trozo de texto potencialmente largo, pero tampoco me quiero enrollar demasiado'
const upper = 'TODO MAYÚSCULAS'
const html = '<span>Some html text<b> in a string</b></span>'
const snake = 'this_is_snake_case'
const kebab = 'this-is-kebab-case'
const camel = 'thisIsCamelCase'

// -_-_-_-_- REPL SESSION STARTS HERE -_-_-_-_-
const all = [ frase, nombre, regex, variable, larga, upper, html, snake, kebab, camel ];
'String aleatoria'.toUpperCase(); /* 'STRING ALEATORIA' */
upperFirst(frase); /* 'Hola amigazo que tal' */
upperFirst(nombre); /* 'Manolo' */
upperFirst(upper); /* 'TODO MAYÚSCULAS' */
upperFirst(camel); /* 'ThisIsCamelCase' */
upperCase(frase); /* 'HOLA AMIGAZO QUE TAL' */
upperCase(snake); /* 'THIS IS SNAKE CASE' */
upperCase(variable); /* 'UNA VARIABLE' */
upperCase(html); /* 'SPAN SOME HTML TEXT B IN A STRING B SPAN' */
truncate(frase); /* 'Hola amigazo que tal' */
truncate(variable); /* 'unaVariable' */
truncate(larga); /* 'este es un trozo de texto ...' */
truncate(larga, { length: 6 }); /* 'est...' */
truncate(larga, { length: 9 }); /* 'este e...' */
truncate(larga, { length: 9, separator: ' ' }); /* 'este...' */
truncate(larga, { length: 12, separator: ' ' }); /* 'este es...' */
8; /* 8 */
truncate(larga, { length: 18, separator: ' ' }); /* 'este es un...' */
truncate(larga, {
  length: 18,
  separator: ' ',
  omision: '...etc'
}); /* 'este es un...' */
truncate(larga, {
  length: 18,
  separator: ' ',
  omission: '...etc'
}); /* 'este es un...etc' */
startCase(frase); /* 'Hola Amigazo Que Tal' */
startCase(kebab); /* 'This Is Kebab Case' */
startCase(snake); /* 'This Is Snake Case' */
capitalize(camel); /* 'Thisiscamelcase' */
capitalize(nombre); /* 'Manolo' */
capitalize(frase); /* 'Hola amigazo que tal' */
capitalize(
  larga
); /* 'Este es un trozo de texto potencialmente largo, pero tampoco me quiero enrollar demasiado' */
escape(
  html
); /* '&lt;span&gt;Some html text&lt;b&gt; in a string&lt;/b&gt;&lt;/span&gt;' */
escape(regex); /* '/[0-9]+w+/i' */
escapeRegex(regex); /* '/\\[0-9\\]\\+w\\+/i' */
unescape(escape(html)); /* '<span>Some html text<b> in a string</b></span>' */
const escapedHtml = escape(html);
escapedHtml; /* '&lt;span&gt;Some html text&lt;b&gt; in a string&lt;/b&gt;&lt;/span&gt;' */
unescape(escapedHtml); /* '<span>Some html text<b> in a string</b></span>' */
all.map(x =>
  upperFirst(x)
); /* [ 'Hola amigazo que tal',
  'Manolo',
  '/[0-9]+w+/i',
  'UnaVariable',
  'Este es un trozo de texto potencialmente largo, pero tampoco me quiero enrollar demasiado',
  'TODO MAYÚSCULAS',
  '<span>Some html text<b> in a string</b></span>',
  'This_is_snake_case',
  'This-is-kebab-case',
  'ThisIsCamelCase' ] */
const { lowerCase } = require('lodash');
all.map( lowerCase ); /* [ 'hola amigazo que tal',
  'manolo',
  '0 9 w i',
  'una variable',
  'este es un trozo de texto potencialmente largo pero tampoco me quiero enrollar demasiado',
  'todo mayusculas',
  'span some html text b in a string b span',
  'this is snake case',
  'this is kebab case',
  'this is camel case' ] */
all
  .map(lowerCase)
  .map( upperFirst ); /* [ 'Hola amigazo que tal',
  'Manolo',
  '0 9 w i',
  'Una variable',
  'Este es un trozo de texto potencialmente largo pero tampoco me quiero enrollar demasiado',
  'Todo mayusculas',
  'Span some html text b in a string b span',
  'This is snake case',
  'This is kebab case',
  'This is camel case' ] */
all.map( truncate ); /* [ 'Hola amigazo que tal',
  'manolo',
  '/[0-9]+w+/i',
  'unaVariable',
  'este es un trozo de texto ...',
  'TODO MAYÚSCULAS',
  '<span>Some html text<b> in ...',
  'this_is_snake_case',
  'this-is-kebab-case',
  'thisIsCamelCase' ] */
all.map( kebabCase ); /* [ 'hola-amigazo-que-tal',
  'manolo',
  '0-9-w-i',
  'una-variable',
  'este-es-un-trozo-de-texto-potencialmente-largo-pero-tampoco-me-quiero-enrollar-demasiado',
  'todo-mayusculas',
  'span-some-html-text-b-in-a-string-b-span',
  'this-is-snake-case',
  'this-is-kebab-case',
  'this-is-camel-case' ] */
all.map(snake); /* null */
all.map( snakeCase ); /* [ 'hola_amigazo_que_tal',
  'manolo',
  '0_9_w_i',
  'una_variable',
  'este_es_un_trozo_de_texto_potencialmente_largo_pero_tampoco_me_quiero_enrollar_demasiado',
  'todo_mayusculas',
  'span_some_html_text_b_in_a_string_b_span',
  'this_is_snake_case',
  'this_is_kebab_case',
  'this_is_camel_case' ] */

repeat('*', 5); /* '*****' */
repeat('-_-', 5); /* '-_--_--_--_--_-' */
repeat('-_', 5); /* '-_-_-_-_-_' */
repeat('||', 5); /* '||||||||||' */
repeat( '||', 55 ); /* '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||' */
