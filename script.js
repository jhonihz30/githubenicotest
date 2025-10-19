let selection = null
let direccion = null

function refreshSel(value) {
    selection = value;
    console.log("Seleccionaste " ,selection)
}

function pedir() {
    direccion = document.getElementById("ger").value
    let mensaje = "¡Hola!, queria pedir " + selection + ", para la dirección: " + direccion + "."
    window.location.href = "https://wa.me/59894850345?text=" + mensaje
}
