const $ = s => document.querySelector(s),
      $$ = s => document.querySelectorAll(s);

let cart = 0;


// ==============================
// TOAST
// ==============================

function toast(msg) {
    const t = $('#toast');

    t.textContent = msg;
    t.classList.add('show');

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(
        () => t.classList.remove('show'),
        2600
    );
}


// ==============================
// MENU
// ==============================

$('#menuToggle').addEventListener('click', () =>
    $('#navlinks').classList.toggle('open')
);

$$('#navlinks a').forEach(a =>
    a.addEventListener('click', () =>
        $('#navlinks').classList.remove('open')
    )
);


// ==============================
// CARRINHO
// ==============================

$$('.add-cart').forEach(b =>
    b.addEventListener('click', () => {
        cart++;

        $('#cartCount').textContent = cart;

        toast(
            b.dataset.name +
            ' adicionado ao carrinho!'
        );
    })
);


$('#cartBtn').addEventListener('click', () =>
    toast(
        cart
            ? `Seu carrinho tem ${cart} ${
                  cart === 1 ? 'item' : 'itens'
              }. Para finalizar, fale com a loja pelo WhatsApp.`
            : 'Seu carrinho está vazio.'
    )
);


// ==============================
// ÁREA DO CLIENTE
// ==============================

$('#accountBtn').addEventListener('click', () =>
    toast(
        'Área do cliente: entre em contato pelo WhatsApp para acessar sua conta.'
    )
);


// ==============================
// BUSCA DE PRODUTOS
// ==============================

function filterProducts(term) {
    let found = 0;

    $$('.product').forEach(p => {

        const show = (
            p.textContent +
            ' ' +
            p.dataset.category
        )
            .toLowerCase()
            .includes(term.toLowerCase());

        p.style.display = show
            ? 'flex'
            : 'none';

        if (show) {
            found++;
        }
    });

    if (!found) {
        toast(
            'Nenhum produto encontrado. Tente outra busca.'
        );
    }
}


$('#searchForm').addEventListener('submit', e => {
    e.preventDefault();

    filterProducts(
        $('#searchInput').value.trim()
    );

    $('#produtos').scrollIntoView();
});


// ==============================
// CATEGORIAS
// ==============================

$$('.category').forEach(c =>
    c.addEventListener('click', () =>
        filterProducts(
            c.dataset.filter
        )
    )
);


// ==============================
// LIMPAR FILTRO
// ==============================

$('#clearFilter').addEventListener('click', e => {
    e.preventDefault();

    $$('.product').forEach(
        p => p.style.display = 'flex'
    );

    $('#searchInput').value = '';
});


// ==============================
// MODAL DE AGENDAMENTO
// ==============================

const backdrop = $('#modalBackdrop');


$$('.book-service').forEach(b =>
    b.addEventListener('click', () => {

        $('#serviceSelect').value =
            b.dataset.service;

        $('#modalTitle').textContent =
            b.dataset.service === 'Hotel e Creche'
                ? 'Consulte disponibilidade'
                : 'Agende seu atendimento';

        backdrop.classList.add('open');

        $('#clientName').focus();
    })
);


function closeModal() {
    backdrop.classList.remove('open');
}


$('#modalClose').addEventListener(
    'click',
    closeModal
);


backdrop.addEventListener('click', e => {

    if (e.target === backdrop) {
        closeModal();
    }

});


// ==============================
// MODAL DE CONFIRMAÇÃO
// ==============================

const successModalHTML = `
    <div
        id="successModal"
        class="success-modal"
    >

        <div
            class="success-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="successModalTitle"
        >

            <button
                type="button"
                id="successModalClose"
                class="success-modal-close"
                aria-label="Fechar"
            >
                ×
            </button>


            <div class="success-icon">
                ✓
            </div>


            <h2 id="successModalTitle">
                Solicitação enviada!
            </h2>


            <p id="successModalMessage">
                Recebemos seus dados com sucesso.
            </p>


            <button
                type="button"
                id="successModalOk"
                class="btn btn-purple success-modal-button"
            >
                Entendi
            </button>

        </div>

    </div>
`;


document.body.insertAdjacentHTML(
    'beforeend',
    successModalHTML
);


const successModal = $('#successModal');
const successModalClose = $('#successModalClose');
const successModalOk = $('#successModalOk');
const successModalMessage = $('#successModalMessage');


function openSuccessModal(name, phone) {

    successModalMessage.innerHTML = `
        Olá, <strong>${name}</strong>!<br><br>

        Sua solicitação foi registrada com sucesso.
        Nossa equipe entrará em contato pelo WhatsApp
        <strong>${phone}</strong> para confirmar o atendimento.
        <br><br>

        Obrigado por escolher a PetFeliz! 🐾
    `;

    successModal.classList.add('open');
}


function closeSuccessModal() {
    successModal.classList.remove('open');
}


successModalClose.addEventListener(
    'click',
    closeSuccessModal
);


successModalOk.addEventListener(
    'click',
    closeSuccessModal
);


successModal.addEventListener('click', e => {

    if (e.target === successModal) {
        closeSuccessModal();
    }

});


// ==============================
// ENVIO DA SOLICITAÇÃO
// ==============================

$('#bookingForm').addEventListener('submit', e => {

    e.preventDefault();


    const name = $('#clientName').value.trim();
    const pet = $('#petName').value.trim();
    const service = $('#serviceSelect').value;
    const phone = $('#clientPhone').value.trim();


    console.log({
        nome: name,
        pet: pet,
        servico: service,
        telefone: phone
    });


    // Fecha o modal de agendamento
    closeModal();


    // Limpa o formulário
    e.target.reset();


    // Abre o modal de confirmação
    setTimeout(() => {

        openSuccessModal(
            name,
            phone
        );

    }, 300);

});


// ==============================
// NEWSLETTER
// ==============================

$('#newsletterForm').addEventListener('submit', e => {

    e.preventDefault();

    toast(
        'Obrigado! Seu e-mail foi cadastrado para novidades.'
    );

    e.target.reset();

});