
// Validar Formulario

const inputs = document.querySelectorAll('form .campo input');

console.log(inputs);

// Listen a los input 

inputs.forEach(input =>{
    input.addEventListener('blur', validarInput);
    input.addEventListener('input', validarInput);
});

function validarInput(e) {
    const estados = ['valido', 'no-valido'];
    let clase;
    if (e.target.value.length === 0) {
        clase = estados[1];
    } else {
        clase = estados[0];
    }
    e.target.classList.remove(...estados);
    e.target.nextElementSibling.classList.remove(...estados);
    e.target.classList.add(clase);
    e.target.nextElementSibling.classList.add(clase);

    if ( clase === 'no-valido') {
        if (e.target.parentElement.nextElementSibling.classList[0] !== 'alerta') {
            const errorDiv = document.createElement('div');
            errorDiv.appendChild(document.createTextNode('Este campo es obligatorio'));
            errorDiv.classList.add('alerta');
            // insertar el error
            e.target.parentElement.parentElement.insertBefore(errorDiv,
                e.target.parentElement.nextElementSibling);
        }
    } else {
        if (e.target.parentElement.nextElementSibling.classList[0] === 'alerta') {
            e.target.parentElement.nextElementSibling.remove();
        }

    }
}

// Mostrar y ocultar password 

const mostrarPasswordBtn = document.querySelector('form .campo span');

mostrarPasswordBtn.addEventListener('click', e => {
    const passwordInput = document.querySelector('#password');

    if (e.target.classList.contains('mostrar')) {
        // va a mostar el texto
        e.target.classList.remove('mostrar');
        e.target.textContent= 'Ocultar';
        // cambiamos a password
        passwordInput.type = 'text';
    } else {
        // mostarr el password
        e.target.classList.add('mostrar');
        // cambiar el texto
        e.target.textContent= 'Mostrar';
        // cambiamos a password
        passwordInput.type = 'password';
    }
});