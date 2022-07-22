function getClients(){
    var request = new XMLHttpRequest();
/*    //login 
    username = prompt('Username:')
    password = prompt('Password:')

   login desde el inspector
    username = sessionStorage.getItem('Username:')
    password = sessionStorage.getItem('Password:')
   
    login por defecto
    username = "user"
    password = "user"
*/
    //Conexion request tipo como la de googlemaps 
    request.open('GET', "https://8000-darkstark9608-apirest-f82exl8n41v.ws-us51.gitpod.io/clientes/");
    request.setRequestHeader("Accept", "application/json");

    //cambiar// request.setRequestHeader("Authorization", "Basic " + btoa(prompt('Username:') + ":" + prompt('Password:')))
    request.setRequestHeader("Authorization", "Basic " + btoa(prompt('Username:') + ":" + prompt('Password:')))
    request.setRequestHeader("content-type", "application/json");
    
    const  table   = document.getElementById("idtable");

    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
        </tr>`;

    request.send();

 
    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);
        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }
        else if (request.status == 202){
            const response = request.responseText;
            const response_json = JSON.parse(response);
            for (let i = 0; i < response_json.length; i++) {
                var tr = document.createElement('tr');
                var id_cliente = document.createElement('td');
                var nombre = document.createElement('td');
                var email = document.createElement('td');

                id_cliente.innerHTML = response_json[i].id_cliente;
                nombre.innerHTML = response_json[i].nombre;
                email.innerHTML = response_json[i].email;

                tr.appendChild(id_cliente);
                tr.appendChild(nombre);
                tr.appendChild(email);
                
                tbody.appendChild(tr);
            }
            table.appendChild(thead);
            table.appendChild(tbody);
        }
    };
    
}