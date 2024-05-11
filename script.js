document.addEventListener('DOMContentLoaded', function() {

    const formulario = {
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "" //Si hace falta colocar ,
    }

    const inputNombre = document.querySelector('#datosNombre');
    const inputEmail = document.querySelector('#datosEmail');
    const inputAsunto = document.querySelector('#datosAsunto');
    const inputMensaje = document.querySelector('#datosMensaje');
    const form = document.querySelector('#formulario');
    const botonSubmit = document.querySelector('#formulario button[type="submit"]');
    const spinner = document.querySelector('#spinner');

    // Validación de datos
    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    form.addEventListener('submit', enviar);

    function enviar(e) {
        e.preventDefault();

        // spinner.classList.add("flex");
        spinner.hidden = false;

        setTimeout(()=>{
            spinner.hidden = true;

            formulario.nombre = ''
            formulario.email = ''
            formulario.asunto = ''
            formulario.mensaje = ''

            form.reset();
            comprobarFormulario();

            // enviar.remove();

            const alertaEnviado = document.createElement('P');
            alertaEnviado.classList.add('alerta2');
            alertaEnviado.textContent = 'El mensaje fue enviado';

            form.appendChild(alertaEnviado);

            setTimeout(() => {
                alertaEnviado.remove();
            }, 1500);

        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() ==="") {
            mostrarAlerta(`El ${e.target.placeholder} es obligatorio`, e.target.parentElement); //Se cambio el e.target.id por e.target.placeholder
            formulario[e.target.name] = '';
            comprobarFormulario();
            return //Si es necesario colocarle ;
        }

        if(e.target.id === 'datosEmail' && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido, el formato aceptado es ejemplo@jemplo.com", e.target.parentElement);
            formulario[e.target.name] = '';
            comprobarFormulario();
            return //Si es necesario colocarle ;
        }

        if(e.target.id === 'datosNombre' && inputNombre.value.length > 50) {
            mostrarAlerta("El número máximo de caracteres es 50", e.target.parentElement);
            formulario[e.target.name] = '';
            comprobarFormulario();
            return
        }

        if(e.target.id === 'datosAsunto' && inputAsunto.value.length > 50) {
            mostrarAlerta("El número máximo de caracteres es 50", e.target.parentElement);
            formulario[e.target.name] = '';
            comprobarFormulario();
            return
        }

        if(e.target.id === 'datosMensaje' && inputMensaje.value.length > 300) {
            mostrarAlerta("El número máximo de caracteres es 300", e.target.parentElement);
            formulario[e.target.name] = '';
            comprobarFormulario();
            return
        }

        limpiarAlerta(e.target.parentElement);

        formulario[e.target.name] = e.target.value.trim();
        
        comprobarFormulario();

    }

    // Función para la alerta
    function mostrarAlerta(mensaje, referencia) {

        // const alerta = referencia.querySelector(".alerta");
        // if(alerta) {
        //     alerta.remove();
        // }

        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;

        error.classList.add('alerta');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        //Comprobando si ya existe una alerta
        const alerta = referencia.querySelector(".alerta");
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const val = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado = val.test(email);
        return resultado //Si es necesario colocarle ;
    }

    function comprobarFormulario() {
        
        if(Object.values(formulario).includes('')) {
            botonSubmit.classList.add('opacidad');
            botonSubmit.disabled = true;

        } else {
            botonSubmit.classList.remove('opacidad');
            botonSubmit.disabled = false;
        }
    }

});