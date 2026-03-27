/**
 * Scripts compartilhados entre todas as páginas
 */

// Toggle do menu mobile
export function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('show');
            menu.setAttribute('aria-hidden', String(!isOpen));
            btn.setAttribute('aria-expanded', String(isOpen));
        });

        // Fechar ao clicar em link (se mobile)
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    menu.classList.remove('show');
                    menu.setAttribute('aria-hidden', 'true');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// Smooth scrolling para links internos
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Botão "Back to Top"
export function initBackToTop() {
    // Criar botão se não existir
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.type = 'button';
        backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        backToTopBtn.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backToTopBtn);
    }

    const updateVisibility = () => {
        const isVisible = window.scrollY > 300;
        backToTopBtn.classList.toggle('show', isVisible);
        backToTopBtn.setAttribute('aria-hidden', String(!isVisible));
    };

    // Mostrar/ocultar com base no scroll
    window.addEventListener('scroll', updateVisibility);
    updateVisibility();

    // Click para scroll suave ao topo
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Formatar data ISO para pt-BR
export function formatDateISO(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
    } catch (e) {
        return iso;
    }
}

// Inicializar automaticamente quando importado
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
});