let selection = null
let direccion = null

fetch('catalogo.txt')
    .then(response => response.text())
    .then(csvText => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(';').map(h => h.replace(/"/g,"").trim());
        const data = lines.slice(1).map(line => {
            const values = line.trim().split(';').map(h => h.replace(/"/g,"").trim());
            const obj = {}
            headers.forEach((header, i) => {
                obj[header] = values[i].replace(/}/g, "<br>");
            });
            return obj
        })

        data.reverse()
        const container = document.getElementById('section');
        data.forEach(postre => {
            const card = document.createElement('div');
            card.classList.add('element');
            card.innerHTML = `
            <img class="star" src="images/star.png" alt="">
            <a class="name">${postre.Nombre}</a>
            <p class="name detail">${postre.Detalle}</p>
            <button onclick="toggle_info(this)" class="info_button" aria-details="Alternar Descripción">
                <img src="images/elements/eye.png" alt="">
            </button>
            <div class="image_container">
                <img class="picture" src="images/Catalogo/${postre.Imagen}.jpg" alt="">
                <div class="info">
                <p>${postre.Descripcion}</p>
                </div>
            </div>
            <a class="price">${postre.Precio}</a>
            <a class="price subprice">${postre.SubPrecio}</a>
            <button class="ped" onclick= "refreshSel('${postre.MSG}')">Pedir</button>`
            container.appendChild(card)
        })
    });


function refreshSel(value) {
    selection = value;
    console.log("Seleccionaste " ,selection)
}

function pedir() {
    direccion = document.getElementById("ger").value
    let mensaje = "¡Hola!, queria pedir " + selection + ", para la dirección: " + direccion + "."
    window.location.href = "https://wa.me/59895219374?text=" + mensaje
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
