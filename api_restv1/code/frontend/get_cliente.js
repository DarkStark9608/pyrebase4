function getClient(){
var id_cliente= window.location.search.substring(1);
console.log("id cliente: "+id_cliente);

var request = new XMLHttpRequest();
request.open('GET', "https://8000-darkstark9608-apirest-f82exl8n41v.ws-us51.gitpod.io/clientes/"+id_cliente,true);
request.setRequestHeader("Accept", "application/json");
request.setRequestHeader("Authorization", "Basic " + btoa(prompt('Username:') + ":" + prompt('Password:')))
request.setRequestHeader("content-type", "application/json");

request.onload=()=>{
const response = request.responseText;
const json = JSON.parse(response);
const statuss = request.status;

console.log("Response: "+ response);
console.log("JSON: "+ json);
console.log("Status: "+ statuss);

}
if (statuss==200){
let nombre =document.getElementById("nombre");
let email =document.getElementById("email");
nombre.value=json.nombre;
email.value=json.email;

}

};