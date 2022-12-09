var idUsuaurio = "";
var idCategoria = "";
var idEmpresaGlobal = "";
var nombreCategoria = "";
var numProductos  = 0;
var productos = [];

document.getElementById('botonCompra').style = "pointer-events:none;"

localStorage.removeItem('orden')

if(localStorage.getItem('usuario') != null){

    let usuario =  JSON.parse(localStorage.getItem('usuario'))    
    idUsuaurio = usuario.idUsuaurio;
    idCategoria = usuario.idCategoria;
    nombreCategoria = usuario.nombreCategoria;

    console.log(idCategoria, idUsuaurio, nombreCategoria)
}


const obtenerEmpresas = async (idCategoria ,nombreCategoria) => {
    const respuesta = await fetch(`http://localhost:3001/api/cliente/obtenerEmpresas/${idCategoria}`, {
        method: "get",
    });
    const empresas = await respuesta.json();

    // renderizarEmpresas(categorias, nombreCategoria);
    // window.location.assign = '../productos/index.html'
    console.log(empresas)

    let tarjetasImagenes = document.getElementById('opciones');
    tarjetasImagenes.innerHTML = ""
    document.getElementById('categoria').innerHTML = nombreCategoria;


    empresas.forEach(function(empresa, index) {
        console.log(empresa)
        tarjetasImagenes.innerHTML += `                    
    <div class="tarjetas" >
        <div class="tarjeta">
            <div id="${empresa._id}" onclick="opcionSeleccionada('${empresa._id}')" class="contenedor-imagen-tj">
                <img  src="${empresa.urlImagen}" class="imagen-negocios" alt="">
            </div>
            <div class="titulo-negocio">
                ${empresa.nombre}
            </div>
        </div>                        
    </div>`;

    setTimeout(function(){
        document.getElementById(empresa._id).style.borderColor = "#262626";
    }, 1000);

    });

};

obtenerEmpresas(idCategoria,nombreCategoria);

const  opcionSeleccionada  = async (idEmpresa)  => {
    const respuesta1 = await fetch(`http://localhost:3001/api/cliente/obtenerUnaEmpresa/${idEmpresa}`, {
        method: "get",
    });
    const empresa = await (respuesta1.json());
    console.log(empresa);

    let empresaSelect = empresa;    //borde de empresa seleccionada
    document.getElementById(idEmpresa).style.borderColor = "#D7F205";
    setTimeout(function(){
        document.getElementById(idEmpresa).style.borderColor = "#262626";
    }, 1000);


    document.getElementById('empresa-seleccionada').innerHTML = `
            
    <div class="imagen-empresa-sl">            
        <div> <div>
            <img src="${empresaSelect.urlImagen}" alt="">
        </div> </div>  
    </div>

<div class="nombre-empresa-sl">
    <span>${empresaSelect.nombre}</span>
</div>
<div class="info-empresa-ls">
    <p>${empresaSelect.informacion}</p>

<div>

`;

    numProductos  = 0;
    ordenes = [];
    productos = [];
    document.getElementById('numProductos').innerHTML = 0;

    // document.getElementById('opciones').style = "pointer-events:none;"
    cargarSubCategorias(idEmpresa);

    
}


const  cargarSubCategorias  = async (idEmpresa)  =>{ //cargar productos
    const respuesta = await fetch(`http://localhost:3001/api/cliente/obtenerProductosSub/${idEmpresa}`, {
        method: "get",
    });
    const subCategorias = await (respuesta.json());

    idEmpresaGlobal = idEmpresa

    document.getElementById("contenidoTarjetas").innerHTML = ``
    let salida = ``

    subCategorias.forEach(function(subCategoria, i) {

         salida += `<div class="titulo-subcategoria"> <!--Inicio-->
        <span>${subCategoria.nombreSubCategoria}</span>
    </div>`

        salida += `<div class="container-fluid pt-2 px-0 m-0 "   ><!--inicio tarjetas-->
        <div class="row  p-0 m-0">`  

        subCategoria.productos.forEach(function(producto, j) {
            console.log(producto)

            salida += `                              
        <div class=" col-12 col-md-6 col-xl-4 m-0 mb-2 p-0" >
            <div class="tarjeta-posicion">
                <div class="tarjetas-subcategorias ">
                    <div class="producto">   
                        <div class="detalles-producto">
                            <div>${producto.nombre}</div>
                            <span class="posicion-detalles m-0 p-0">
                                <span>Precio: ${producto.precio}</span>
                                <span>Subcategoria: ${subCategoria.nombreSubCategoria}</span>
                                <span>${producto.descripcion}</span>
                            
                            </span>
                        </div> 
                        <div class="imagen-producto">
                            <img src="${producto.urlImagen}" alt="">
                        </div>                                        
                    </div>
                    <div class="d-flex"> 
                    <input id="${producto._id}" min="1" max="5" class="boton-carrito me-2"  style="width: 3rem; background-color: darkgrey; color: black; font-size: 1.3rem; text-align: center"  type="number" name="" id="">
                    <button onclick="anadirCarrito('${producto._id}','${producto.nombre}','${producto.precio}')" class="boton-carrito">añadir al cardrito</button>
                    </div>
                </div>
            </div>
        </div>      
                                    
 `
        });

        salida += ` </div> </div> <!--fin tarjetas--> 
        <div class="divisor mt-2 mb-2"><span class=""></span></div>    `

        document.getElementById("contenidoTarjetas").innerHTML = salida
    });

    if(idEmpresaGlobal != ""){
        idEmpresaGlobal = idEmpresa;
    }
}


function anadirCarrito(idProducto,  productoNombre, precio1){
    if(Number(document.getElementById(idProducto).value) != 0){
        console.log(document.getElementById(idProducto).value)
        numProductos += Number(document.getElementById(idProducto).value);
        let cantidad = Number(document.getElementById(idProducto).value);
        document.getElementById('numProductos').innerHTML = numProductos;
        
    
        let precioProductos = Number(precio1)*cantidad;
    
        let producto = {
            cantidad: cantidad,
            id: idProducto,
            nombre:productoNombre,
            precio: precioProductos
        }
    
        productos.push(producto);
        
    
        // ordenes.push({idEmpresa , productos}) //al final
        console.log(productos)
        document.getElementById('botonCompra').style ="pointer-events:auto;"

    }
    
}

function carrito(){
    let subTotal = 0
    productos.forEach(p => {
        subTotal += p.precio;
    });

    let orden = {
        productos,
        subTotal,
        idEmpresa:idEmpresaGlobal
    }

    setTimeout(function(){
        document.getElementById('botonCompra').style.borderColor = "#D7F205";
    }, 1000);
    localStorage.setItem('orden', JSON.stringify(orden))

     window.location.href= "../carrito/carrito.html";
}