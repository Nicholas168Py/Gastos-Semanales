// Variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

//Clases

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}

class UI{
    insertarPresupuesto( cantidad){
        //Extraemos los valores
        const {presupuesto, restante} = cantidad;

        // Agregar a HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        // crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success')
        }

        //Mensaje de error

        divMensaje.textContent = mensaje;

        //Insertar en el HTML

        document.querySelector('.primario').insertBefore( divMensaje, formulario );

        // Quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        
        //Iterar sobre los gastos
        gastos.forEach(gasto => {
            console.log(gasto);
        });
    }
}

//Instanciar
const ui = new UI();
let presupuesto;

// Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?');

    // console.log(Number( presupuestoUsuario ));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ){
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto( presupuesto )

}

// Añade Gastos
function agregarGasto(e){
    e.preventDefault();

    // Leer los datos del formulario

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    } else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no Valida', 'error');

        return;
    }

    // Generar un objeto con el gasto

    const gasto = {nombre, cantidad, id: Date.now()};

    // Añade un nuevo gasto

    presupuesto.nuevoGasto( gasto );

    //Mensaje de todo bien 
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos
    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos);

    //Reinicia el formulario
    formulario.reset()

}