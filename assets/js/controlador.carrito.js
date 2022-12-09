var orden = JSON.parse(localStorage.getItem('orden'));
var usuario = JSON.parse(localStorage.getItem('usuario'));
var impuestos = orden.subTotal * 0.12;
var total = orden.subTotal +  impuestos + 20; 
var direccionCliente = "";
var zonaCliente = ""
var idOrden = "";
 
function cargarProductos(productos){
    console.log(productos)
    let contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = `<div>
    <span>Articulos</span>  <span>unidades</span>  <span>precio</span>
</div><div class="divisor divisor2 mt-2" style="width: 100%;"><span ></span></div>`;

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `<div class="mb-1">
        <span>${producto.nombre}</span>  <span>${producto.cantidad}</span>  <span>$$. ${producto.precio}</span>
    </div>`;
    });
}

cargarProductos(orden.productos);

function cargarDetallesPrecio(){
    document.getElementById('subTotal').innerHTML = `$$. ${orden.subTotal}`;
    document.getElementById('envio').innerHTML = `$$. 20`;
    document.getElementById('impuestos').innerHTML = `$$. ${impuestos}`;
    document.getElementById('total').innerHTML = `$$. ${total}`;

}


cargarDetallesPrecio();

function realizarCompra(){
    direccionCliente = document.getElementById('direccion').value;
    zonaCliente = document.getElementById('zona').value;
    // console.log(direccion == "")
    // console.log(zonaCliente)
    console.log(orden)

    enviarOrden();
    ingresarTarjeta();
}


const enviarOrden = async () => {
    

    const respuesta = await fetch("http://127.0.0.1:3001/api/cliente/crearOrden", {
        method: "post",
        headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        productos : orden.productos,
                        idUsuario: usuario.idUsuaurio,
                        subTotal:orden.subTotal,
                        idEmpresa:orden.idEmpresa,
                        zona:zonaCliente,
                        direccionCliente: direccionCliente
                }),
    });
    const ordenRes = await respuesta.json();
    
    if(ordenRes[0].guardada){
        console.log('orden res ',ordenRes)
        idOrden = ordenRes[0].idOrden;
        localStorage.setItem('idOrden', JSON.stringify(idOrden) )
        
    }else{
        console.log('orden res fallo ',ordenRes)
    } 

    
};

function ingresarTarjeta(){
    console.log(idOrden)
    window.location.href= "../carrito/carrito2.html";
}