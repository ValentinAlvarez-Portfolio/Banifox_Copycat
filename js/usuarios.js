let usuarios = [];
let usuarioActivo = [];
let usuarioAdmin = {
    emailUsuario: "admin@banifox.com.uy",
    passwordUsuario: "admin123",
}

localStorage.setItem(usuarioAdmin.emailUsuario, JSON.stringify(usuarioAdmin));

function Usuario(emailUsuario, passwordUsuario) {
    this.emailUsuario = emailUsuario;
    this.passwordUsuario = passwordUsuario;


    this.guardarUsuario = function () {
        localStorage.setItem(`${emailUsuario}`, JSON.stringify(this));
    }
}


