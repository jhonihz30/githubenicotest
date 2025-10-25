let direccion = null
let prices_table = null
let order = []
let envio_cost = 0
let total_amount = 0

const alert_pedido = document.getElementById('alert-pedido')
const alert_encuentro = document.getElementById('alert-encuentro')


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
            <button class="ped" onclick= "show_order('${postre.ID}','${postre.SubId}')">Pedir</button>`
            container.appendChild(card)
        })
    });

fetch('price_table.txt')
    .then(response => response.text())
    .then(csvText => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(';').map(h => h.replace(/"/g,"").trim());
        prices_table = lines.slice(1).map(line => {
            const values = line.trim().split(';').map(h => h.replace(/"/g,"").trim());
            const obj = {}
            headers.forEach((header, i) => {
                obj[header] = values[i].replace(/}/g, "<br>");
            });
            return obj
        })
    });


const points = document.getElementById('points');

function sel(selection){
    direccion = selection.nextElementSibling.textContent.trim()
    let price = selection.nextElementSibling.nextElementSibling.textContent.trim().replace(/[()]/g,"")
    alert_encuentro.classList.add("hidden")

    let d = document.getElementById('ubi');

    if (d){
        const order_container = document.getElementById('order');
        const new_line = d;
        new_line.classList.add('product');
        new_line.innerHTML = `<div>
        <img class="truck" src="https://cdn-icons-png.flaticon.com/512/171/171257.png" alt="">
        <p>${direccion}</p>
        </div>
        <p class="price">${price}</p>`;
        order_container.prepend(new_line)
        envio_cost = price.replace('$',"")
    }
    else {
        const order_container = document.getElementById('order');
        const new_line = document.createElement('div');
        new_line.id = 'ubi'
        new_line.classList.add('product');
        new_line.innerHTML = `<div>
        <img class="truck" src="https://cdn-icons-png.flaticon.com/512/171/171257.png" alt="">
        <p>${direccion}</p>
        </div>
        <p class="price">${price}</p>`;
        order_container.appendChild(new_line)
        order_container.prepend(new_line)
        envio_cost = price.replace('$',"")
    }
    price_sum()
    show_general_order()
}

function pedir() {
    let list = ""
    order.forEach(item => {
        list += item.Item
        list += ", "
    })

    console.log(alert_pedido)

    if (list === ""){
        alert_pedido.classList.remove("hidden")
        alert_pedido.scrollIntoView()
    }
    else if (direccion == null){
        alert_encuentro.classList.remove("hidden")
        alert_encuentro.scrollIntoView()
    }
    else {
        let mensaje = "¡Hola! Te escribo para hacerte la siguiente orden: " + list + " el punto de encuentro, ¿Podria ser " + direccion + "?."
        window.location.href = "https://wa.me/59895219374?text=" + mensaje
    }


    // direccion = document.getElementById("ger").value

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

const overlay = document.getElementById('overlay')
overlay.addEventListener('click',() => {
    overlay.classList.remove('enabled');
})

const selector = overlay.children[0]
selector.addEventListener('click',(event) => {
    event.stopPropagation();
})

function show_order(id,variant)
{
    overlay.classList.add('enabled')
    const container = document.getElementById('inputsel');
        container.replaceChildren();
        prices_table.forEach(variacion => {
            if (variacion.ID == id)
            {
                const option = document.createElement('option');
                option.innerHTML = `${variacion.Nombre}`
                option.value = `${variacion.SubId}`
                container.appendChild(option)
            }
        });
    container.selectedIndex = variant
    refresh_price()
}

function show_general_order()
{
    overlay.classList.add('enabled')
    const container = document.getElementById('inputsel');
        container.replaceChildren();
        prices_table.forEach(variacion => {
                const option = document.createElement('option');
                option.innerHTML = `${variacion.Nombre}`
                option.value = `${variacion.SubId}`
                container.appendChild(option)
        });
    container.selectedIndex = variant
    refresh_price()
}

const element_selection = document.getElementById('inputsel');
element_selection.addEventListener('change',() => {
    refresh_price()
})

function refresh_price(){
    const price = document.getElementById('pri');
    const element_name = element_selection.options[element_selection.selectedIndex].text
    const element_array = prices_table.find(item => item.Nombre === element_name);

    price.textContent = element_array.Precio

}

function add_to_order(){
    alert_pedido.classList.add("hidden")
    const element_name = element_selection.options[element_selection.selectedIndex].text
    const element_array = prices_table.find(item => item.Nombre === element_name);

    const parent = document.getElementById('sel_info');
    const order_container = document.getElementById('order');
    const new_line = document.createElement('div');
    new_line.classList.add('product');
    new_line.innerHTML = `<p>X1 ${element_name}</p>
    <p class="price">${element_array.Precio}</p>`
    order_container.appendChild(new_line)

    order.push({"Item":element_name,"Price":element_array.Precio})

    price_sum()

    parent.scrollTop = parent.scrollHeight;
}

function price_sum(){
    const total_price = document.getElementById('total');
    total_amount = 0
    order.forEach(item => {
        total_amount += parseFloat(item.Price.replace(/[^0-9.]/g, '')); 
    })
    console.log(envio_cost)
    total_amount += parseFloat(envio_cost)
    total_price.textContent = `Total: $${total_amount}`
}