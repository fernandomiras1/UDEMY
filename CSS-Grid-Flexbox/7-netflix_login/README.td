instalaciones sobre el proyecto 

1 - npm i -D gulp gulp-autoprefixer gulp-sass


---------leciones-----------

margin: 3rem auto 4rem auto; 
(3rem ariba, auto derecha, 4rem abajo, auto izquierda) 

  label {
            // metemos el label dentro del input como un placeholder
            position: absolute;
            top: 1.1rem; // separamos el label en la parte de ariba
            left: 1rem; // separamos del lado izquierdo
            // animacion cuando se sube el label en el click
            transition: font-size .2s ease, top .2s ease;
        }
        input {
            // tome todo el espacio disponible
            flex: 1;
            padding: 1.3rem 1rem .7rem 1rem;
            border: none;
            background-color: $gris;
            border-radius: $radius;
            // cuando se hace click el color de fono cambia a un gris mas claro
            &:focus {
                background-color: $gris3;
                // quitamos la linea azul como activo en google chomre
                outline: none;
                // lo que hace es cuando este focus me valla al selector del label
                + label {
                    font-size: .6rem; // achico la letra
                    top: .5rem;
                }

            }
        }