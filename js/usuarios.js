let usuarios = [];
let usuarioActivo = [];
let usuarioAdmin = {
    emailUsuario: "admin@banifox.com.uy",
    passwordUsuario: "admin123",
}

fetch('../usuarios.json')
    .then(response => response.json())
    .then(data => {
        // data contiene el objeto JSON con el arreglo de usuarios
    })
    .catch(error => console.error(error));

localStorage.setItem(usuarioAdmin.emailUsuario, JSON.stringify(usuarioAdmin));

function Usuario(emailUsuario, passwordUsuario) {
    this.emailUsuario = emailUsuario;
    this.passwordUsuario = passwordUsuario;


    this.guardarUsuario = function () {
        localStorage.setItem(`${emailUsuario}`, JSON.stringify(this));
    }
}


