let topoVisivel = false;


const inputSearch = document.querySelector(".form-control[type='search']");
const btnSearch   = document.getElementById("btn-search");
const navbarForm  = document.querySelector(".d-flex");
const btnTopo     = document.getElementById("btn-topo");
const todosCards  = document.querySelectorAll(".curio-card, .card-obra");
const imgBlocks   = document.querySelectorAll(".img-block");
const sections    = document.querySelectorAll("section");
const dropItems   = document.querySelectorAll(".dropdown-item");


btnSearch.onclick = (e) => {
    e.preventDefault();

    inputSearch.classList.remove("is-invalid", "is-valid");

    if (inputSearch.value.trim() === "" || inputSearch.value.trim().length < 3) {
        inputSearch.classList.add("is-invalid");

        navbarForm.innerHTML += `
            <div class="alert alert-danger mt-2 p-1 px-2 small" id="msg-search" role="alert">
                Mínimo de 3 caracteres.
            </div>
        `;
        return;
    }

    if (inputSearch.value.trim().length > 60) {
        inputSearch.classList.add("is-invalid");

        navbarForm.innerHTML += `
            <div class="alert alert-danger mt-2 p-1 px-2 small" id="msg-search" role="alert">
                Máximo de 60 caracteres.
            </div>
        `;
        return;
    }

    inputSearch.classList.add("is-valid");

    navbarForm.innerHTML += `
        <div class="alert alert-success mt-2 p-1 px-2 small" id="msg-search" role="alert">
            Pesquisando por: "${inputSearch.value.trim()}"
        </div>
    `;
}

inputSearch.oninput = () => {
    inputSearch.classList.remove("is-invalid", "is-valid");

    let msgAnterior = document.getElementById("msg-search");
    if (msgAnterior) msgAnterior.remove();
}


dropItems.forEach((item) => {
    item.onclick = (e) => {
        const href = item.getAttribute("href");

        if (href && href.startsWith("#") && href !== "#") {
            e.preventDefault();

            const alvo = document.querySelector(href);
            if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
});


const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = "1";
            entry.target.style.transform = "translateY(0)";
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach((section) => {
    section.style.opacity    = "0";
    section.style.transform  = "translateY(24px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(section);
});


window.onscroll = () => {
    topoVisivel = window.scrollY > 300;
    btnTopo.style.display = topoVisivel ? "block" : "none";
}

btnTopo.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}


imgBlocks.forEach((bloco) => {
    bloco.onclick = () => {
        bloco.style.borderColor     = "#c0392b";
        bloco.style.backgroundColor = "#1a0000";
        bloco.textContent           = "Clique aqui para adicionar uma imagem";

        setTimeout(() => {
            bloco.style.borderColor     = "#8b0000";
            bloco.style.backgroundColor = "#0d0000";
        }, 1500);
    }
})


todosCards.forEach((card) => {
    card.style.transition = "transform 0.2s, border-color 0.2s";

    card.onmouseenter = () => {
        card.style.transform   = "translateY(-4px)";
        card.style.borderColor = "#c0392b";
    }

    card.onmouseleave = () => {
        card.style.transform   = "translateY(0)";
        card.style.borderColor = "#5a1010";
    }
});