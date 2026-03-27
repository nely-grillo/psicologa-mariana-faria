const NAV_ITEMS = [
    { key: 'home', label: 'Início', href: 'index.html' },
    { key: 'about', label: 'Sobre Mim', href: 'sobre_mim.html' },
    { key: 'care', label: 'Atendimento', href: 'atendimento.html' },
    { key: 'blog', label: 'Blog', href: 'blog.html' }
];

function getPrefix() {
    const root = document.body?.dataset.root || '.';
    return root === '.' ? '' : `${root.replace(/\/$/, '')}/`;
}

function renderNavLinks(prefix, currentPage) {
    return NAV_ITEMS.map(item => {
        const isActive = item.key === currentPage;
        const activeClass = isActive ? ' nav__link active' : ' nav__link';
        const ariaCurrent = isActive ? ' aria-current="page"' : '';

        return `<a href="${prefix}${item.href}" class="${activeClass.trim()}"${ariaCurrent}>${item.label}</a>`;
    }).join('');
}

export function renderSiteShell() {
    const headerSlot = document.querySelector('[data-site-header]');
    const footerSlot = document.querySelector('[data-site-footer]');
    const prefix = getPrefix();
    const currentPage = document.body?.dataset.page || '';
    const navLinks = renderNavLinks(prefix, currentPage);

    if (headerSlot) {
        headerSlot.outerHTML = `
    <header class="cabecalho">
        <div class="cabecalho__container">
            <div>
                <a href="${prefix}index.html" class="site-brand">Mariana Faria <span class="site-brand-sub">| Psicóloga</span></a>
            </div>
            <div>
                <nav class="cabecalho__container__nav">
                    ${navLinks}
                </nav>
            </div>
            <button id="mobile-menu-button" class="cabecalho__container__botao" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menu">
                <svg class="botao__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <nav id="mobile-menu" class="botao__mobile" aria-hidden="true">
            ${navLinks}
        </nav>
    </header>`;
    }

    if (footerSlot) {
        footerSlot.outerHTML = `
    <footer class="site-rodape">
        <div class="site-rodape__container">
            <div class="site-rodape__grade">
                <div>
                    <h4 class="site-rodape__titulo">Psicóloga Mariana Faria</h4>
                    <p class="site-rodape__texto">CRP-05-58738</p>
                    <p class="site-rodape__texto">Atendimento Online.</p>
                </div>
                <div>
                    <h4 class="site-rodape__titulo">Navegação</h4>
                    <ul class="site-rodape__lista">
                        <li><a href="${prefix}index.html" class="site-rodape__link">Início</a></li>
                        <li><a href="${prefix}sobre_mim.html" class="site-rodape__link">Sobre Mim</a></li>
                        <li><a href="${prefix}atendimento.html" class="site-rodape__link">Atendimento</a></li>
                        <li><a href="${prefix}blog.html" class="site-rodape__link">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="site-rodape__titulo">Fale Conosco</h4>
                    <ul class="site-rodape__lista">
                        <li><a href="tel:+5511992179781" class="site-rodape__link">(11) 99217-9781</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="site-rodape__titulo">Mídias Sociais</h4>
                    <div class="site-rodape__midias">
                        <a href="https://www.instagram.com/marianafaria.psi/" aria-label="Instagram" class="site-rodape__midia-botao site-rodape__midia-botao--instagram" target="_blank" rel="noopener noreferrer">
                            <img src="/images/icons8-instagram-48.png" alt="Instagram" class="site-rodape__midia-icone--instagram" aria-hidden="true">
                        </a>
                        <a href="https://wa.me/5511992179781?text=Ol%C3%A1%20Mariana,%20achei%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20consulta." aria-label="WhatsApp" class="site-rodape__midia-botao site-rodape__midia-botao--whatsapp" target="_blank" rel="noopener noreferrer">
                            <img src="/images/icons8-whatsapp.svg" alt="WhatsApp" class="site-rodape__midia-icone--whatsapp" aria-hidden="true">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div class="site-rodape__creditos">
        Ícone WhatsApp por <a href="https://icons8.com/icon/16713/whatsapp" target="_blank" rel="noopener noreferrer">Whatsapp</a> e ícone Instagram por <a href="https://icons8.com/icon/Xy10Jcu1L2Su/instagram" target="_blank" rel="noopener noreferrer">Instagram</a>, via <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>.
    </div>`;
    }
}