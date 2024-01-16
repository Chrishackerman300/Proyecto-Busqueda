//Variables 
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

const resultado = document.querySelector('#resultado')

//Variables del año
const maxYear = new Date().getFullYear()
const minYear = maxYear - 10

//Objeto
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos)

    showYear()
})

//Almacenar los valores de nuestros select en nuestro objeto
marca.addEventListener('change', e => { //Evento change para saber cuando cambiamos de option
    datosBusqueda.marca = e.target.value

    filtrarAutos()
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value) //Cambiar de valor de string a int

    filtrarAutos()
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value

    filtrarAutos()
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value

    filtrarAutos()
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value)

    filtrarAutos()
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value

    filtrarAutos()
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value

    filtrarAutos()
})
//Funciones

//Función mostrarAutos
function mostrarAutos(autos){

    limpiar()

    //Recorreremos nuestro base de datos
    autos.forEach(auto => {

        //Destructuring de nuestro obje (Base de Datos)
        const {marca, year, precio, puertas, transmision, color} = auto

        const autoHTML = document.createElement('p')
        autoHTML.classList.add('info')
        autoHTML.textContent = `
            ${marca} ${year} - Precio $${precio} - ${puertas} Puertas - Transmision: ${transmision} - Color: ${color}
        `

        //Insertar elemento cerado en el div de resultado
        resultado.appendChild(autoHTML)
    })
}

//Función limpiar
function limpiar(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
//Función showYear
function showYear(){
    //Iterare con el for la fecha maximo con la minima de mayor a menor
    for(let i = maxYear; i >= minYear; i--){
        const fecha = document.createElement('option')
        fecha.textContent = i
        fecha.classList.add('option')

        //Insertaremos las option creadar en el select del año
        year.appendChild(fecha)
    }
}

//Función filtar autos de acuerdo a la búsqueda del usuario
function filtrarAutos(){

    //Función de alto rango
    const resultado = autos.filter(filtarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length){
        mostrarAutos(resultado) 
    }
    else{
        noResultado()
    }
}

//Función filtrarMarca
function filtarMarca(auto){
    const {marca} = datosBusqueda //Destructuring
    if(marca){ //Si tiene contenido la key entra al if, sino muestra todo el catálogo de autos
        return auto.marca === marca
    }
    return auto
}

//Función filtrarYear
function filtrarYear(auto){
    const {year} = datosBusqueda

    if(year){
        return auto.year === year
    }
    else{
        return auto
    }
}

//Función filtrarMinimo
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda

    if(minimo){
        return auto.precio >= minimo
    }
    else{
        return auto
    }
}

//Función filtrarMaximo
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda

    if(maximo){
        return auto.precio <= maximo
    }
    else{
        return auto
    }
}

//Función filtrarPuertas
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda

    if(puertas){
        return auto.puertas === puertas
    }
    else{
        return auto
    }
}

//Función filtrarTransmision
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda

    if(transmision){
        return auto.transmision === transmision
    }
    else{
        return auto
    }
}

//Función que filtra la búsqueda por el color
function filtrarColor(auto){
    const {color} = datosBusqueda

    if(color){
        return auto.color === color
    }
    return auto
}

//Función noResultado
function noResultado(){

    limpiar()

    const alerta = document.createElement('div')
    alerta.classList.add('alerta')
    alerta.textContent = 'No se encontro la busqueda'

    resultado.appendChild(alerta)
}