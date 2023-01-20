let usuarios = [];
let usuarioActivo = [];

// Se crea un usuario administrador
let usuarioAdmin = {
    emailUsuario: "admin@banifox.com.uy",
    passwordUsuario: "admin123",
}

localStorage.setItem(usuarioAdmin.emailUsuario, JSON.stringify(usuarioAdmin));

// Se crea una función constructora para crear usuarios
function Usuario(emailUsuario, passwordUsuario) {

    this.emailUsuario = emailUsuario;
    this.passwordUsuario = passwordUsuario;

    // Se crea un método para guardar los usuarios en el localStorage
    this.guardarUsuario = function () {
        localStorage.setItem(`${emailUsuario}`, JSON.stringify(this));
    }

}


