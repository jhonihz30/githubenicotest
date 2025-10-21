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

function toggle_info(button) {
    image_container = button.nextElementSibling;
    if (image_container.classList.contains('active')) 
    {
        image_container.classList.remove('active');
        button.classList.remove("button_out")
    }
    else {
        document.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active')
            element.previousElementSibling.classList.remove('button_out')
        });
        image_container.classList.add('active');
        button.classList.add("button_out")
    }

    
}
