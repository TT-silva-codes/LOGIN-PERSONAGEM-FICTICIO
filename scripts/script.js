let cadastro = false;

const titulo = document.querySelector("h2");
const botao = document.getElementById("botao-envio");
const toggle = document.getElementById("toggle");
const mensagem = document.getElementById("mensagem");
const form = document.getElementById("form-login");

toggle.onclick = () => {

    cadastro = !cadastro;

    titulo.innerText = cadastro ? "Cadastro" : "Login";
    botao.innerText = cadastro ? "Cadastrar" : "Entrar";
    toggle.innerText = cadastro 
        ? "Já tem conta? Faça login!" 
        : "Não tem conta? Cadastre-se!";

    mensagem.innerHTML = "";
}

form.onsubmit = (e) => {
    e.preventDefault();

    let email = document.getElementById("email");
    let senha = document.getElementById("senha");

    mensagem.innerHTML = "";

   
    email.classList.remove("is-invalid", "is-valid");
    senha.classList.remove("is-invalid", "is-valid");

   
    if (!email.value.includes("@") || !email.value.includes(".")) {
        email.classList.add("is-invalid");

        mensagem.innerHTML = `
            <div class="alert alert-danger mt-3" role="alert">
                Email inválido!
            </div>
        `;
        return;
    } else {
        email.classList.add("is-valid");
    }

    
    if (senha.value.length < 5) {
        senha.classList.add("is-invalid");

        mensagem.innerHTML = `
            <div class="alert alert-warning mt-3" role="alert">
                Senha muito curta!
            </div>
        `;
        return;
    } else {
        senha.classList.add("is-valid");
    }

    if (cadastro) {
        localStorage.setItem(email.value, senha.value);

        mensagem.innerHTML = `
            <div class="alert alert-success mt-3" role="alert">
                Cadastro realizado com sucesso!
            </div>
        `;
    } else {
        let salva = localStorage.getItem(email.value);

        if (salva === senha.value) {
            mensagem.innerHTML = `
                <div class="alert alert-success mt-3" role="alert">
                    Login realizado com sucesso!
                </div>
            `;
        } else {
            mensagem.innerHTML = `
                <div class="alert alert-danger mt-3" role="alert">
                    Dados incorretos!
                </div>
            `;
        }
    }

    form.reset();

    email.classList.remove("is-valid");
    senha.classList.remove("is-valid");
};