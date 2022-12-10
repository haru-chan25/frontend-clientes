var idUsuaurio = "";
var idEmpresa = "";


const verificarEntrega = async (idOrden) => {
    const respuesta = await fetch(`http://localhost:3001/api/cliente/ordenEntregada/${idOrden}`, {
        method: "get",
    });
    const estadoOrden = await respuesta.json();
    if(estadoOrden.ordenEnDestino){
        console.log('llego orden')
        localStorage.removeItem('tarjeta')
        document.getElementById('mensajeEntrega').innerHTML = 'Estimado cliente su orden esta en la direccion solicitada. Un placer haberle atendido!!'
    }else{
        console.log('no llego orden')
    }
    

};

if(localStorage.getItem('tarjeta') == null){
    localStorage.clear()
    document.getElementById('contenedorMensajes').style.display = "none"
}else{
    cambiarContenido();
    console.log('sigue la sesion')  
    let idOrden =  JSON.parse(localStorage.getItem('idOrden')) 
    verificarEntrega(idOrden);    
}



// verificarEntrega('639181881d101ad57cec12d5')




function ingresar(){
    console.log('ingresar')
    let correo = "";
    correo = document.getElementById('correo').value;

    let contra = "";
    contra = document.getElementById('contra').value;




    if((correo != "") && (contra != "") ){
        verificarUsuario(correo, contra);
    }
}



const verificarUsuario = async (correo, contra) => {
    const respuesta = await fetch("http://127.0.0.1:3001/api/cliente/iniciarSesion", {
        method: "post",
        headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        correo: correo,
                        contrasenia: contra,
                }),
    });
    const login = await respuesta.json();

    if(login.registrado == true){
        console.log('ingresado correctamente')
        idUsuaurio = login.id;
        console.log(idUsuaurio)
        // window.location.href = '../productos/index.html'; //redirigir a la pagina de productos
        cambiarContenido();
    }
    if(login.registrado == false){
        console.log('ingresado incorrectamente')
        //AGREGARFRONT agregar un aviso de usuario ingresado incorrectamente
     
    }

    //console.log(login)
};

function cambiarContenido(){
    document.getElementById('contenedorInicio').style.display = 'none';
    document.getElementById('contenedorMensajes').style.display = "auto"

};



function cargarEmpresas(idCategoria, nombreCategoria){

    
    if(idUsuaurio != ""){
        console.log(idCategoria, nombreCategoria)
        // obtenerEmpresas(idCategoria, nombreCategoria);

        localStorage.setItem("usuario", JSON.stringify({idUsuaurio, idCategoria, nombreCategoria}))
        window.location.href = '../productos.html'
    }
}

