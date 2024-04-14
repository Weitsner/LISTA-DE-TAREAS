const fecha = document.querySelector("#fecha")
const tareas = document.querySelector("#tareas")
const enter = document.querySelector("#enter")
const lista = document.querySelector("#lista")
const check ="fa-circle-check"
const uncheck ="fa-circle"
const lineThrough = "subrayado"
let id
let LIST = []

//fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString("es-CO", {weekday:"long", month:"long",day:"numeric"})

//funcion agregar tareras

function AgregarTarea(tarea,id,realizado,eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :""

    const elemento = `<li id="elemento">
                     <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                     <p class="text ${LINE}">${tarea}</p>
                     <i class="fas fa-trash-can" data="eliminado" id="${id}"></i>
                     </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
}

//funcion tarea realizada

function tareaRealizada(element){

    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
   LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}   

//funcion tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
   LIST[element.id].eliminado = true
}


enter.addEventListener("click", ()=>{
    const tarea = tareas.value
    if(tarea){
        AgregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false,
        })
    }
   localStorage.setItem("TODOS", JSON.stringify(LIST))
    tareas.value=""
    id++
})

document.addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        const tarea = tareas.value
        if(tarea){
        AgregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false,
        })
        }
        localStorage.setItem("TODOS", JSON.stringify(LIST))
        tareas.value=""
        id++
        }
} )

lista.addEventListener("click", function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData==="realizado"){
        tareaRealizada(element)
    }
    else if(elementData==="eliminado"){
        tareaEliminada(element)
    }
    localStorage.setItem("TODOS", JSON.stringify(LIST))
})

//local storage

let data = localStorage.getItem("TODOS")
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        AgregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
    
}