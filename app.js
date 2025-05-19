async function navegarViaAjax(url, seletor, push = true) {
    if (!url || !seletor) return;

    // Esconde todos os destinos dentro do main
    document.querySelectorAll('main > div').forEach(div => {
        div.style.display = 'none';
    });

    const elemento = document.querySelector(seletor);
    if (!elemento) {
        console.warn(`Elemento com seletor "${seletor}" não encontrado.`);
        return;
    }

    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Erro ao carregar ${url}: ${resp.status}`);

        const html = await resp.text();
        elemento.innerHTML = html;
        elemento.style.display = 'block';

        const introSection = document.getElementById('intro');
        if (introSection) introSection.style.display = 'none';

        if (push) {
            history.pushState({ seletor, url }, "", url);
        }
    } catch (error) {
        console.error(error);
        // Aqui pode adicionar uma mensagem visual para o usuário
    }
}

// Ativa os links apenas uma vez
document.querySelectorAll('[wm-link]').forEach(link => {
    const url = link.getAttribute('wm-link');
    const seletorDestino = link.getAttribute('wm-destino');

    link.addEventListener('click', e => {
        e.preventDefault();
        navegarViaAjax(url, seletorDestino);
    });
});

// Navegação pelo histórico (voltar/avançar)
window.addEventListener('popstate', e => {
    if (e.state && e.state.seletor && e.state.url) {
        navegarViaAjax(e.state.url, e.state.seletor, false);
    }
});
