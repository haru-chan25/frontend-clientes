if(localStorage.getItem('usuario') != null && localStorage.getItem('orden') != null){
    localStorage.setItem('tarjeta',JSON.stringify({tarjetaIngresa:true}))
}

function aceptar(){
    if(localStorage.getItem('usuario') != null){
        window.location.href = '../inicio-sesion.html';
    }
}