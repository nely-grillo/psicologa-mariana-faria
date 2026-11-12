/**
 * Google Ads e Google Analytics: tag do Google, consentimento de cookies
 * (Consent Mode) e conversão por clique nos links do WhatsApp
 */

// Preencher com os dados de Google Ads > Metas > Conversões
const GOOGLE_ADS_ID = 'AW-10971727252';
const CONVERSION_LABEL = '9zrmCIPQl6UdEJSL3e8o';

// Propriedade 508758930 do Google Analytics (Psicóloga Mariana Faria)
const GOOGLE_ANALYTICS_ID = 'G-85DBJJS27Z';

const CONSENT_KEY = 'cookie-consent';
const ORIGEM_GOOGLE_KEY = 'origem-google-ads';

// A tag só roda no site publicado: com ID real e fora da prévia local
const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const isTagConfigured = !GOOGLE_ADS_ID.includes('X') && !isLocalPreview;

window.dataLayer = window.dataLayer || [];
function gtag() {
    window.dataLayer.push(arguments);
}

// localStorage pode falhar (aba anônima, bloqueio de cookies)
function readConsent() {
    try {
        return localStorage.getItem(CONSENT_KEY);
    } catch {
        return null;
    }
}

function saveConsent(value) {
    try {
        localStorage.setItem(CONSENT_KEY, value);
    } catch {
        // Sem armazenamento: a escolha vale só para esta página
    }
}

// ad_personalization fica sempre negado: site de saúde não pode fazer remarketing
function updateConsent(value) {
    gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        analytics_storage: value
    });
}

// Tag do Google com tudo negado até o visitante aceitar
export function initGoogleTag() {
    gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
    });

    if (readConsent() === 'granted') {
        updateConsent('granted');
    }

    if (!isTagConfigured) return;

    // Um único gtag.js atende as duas contas
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
    gtag('config', GOOGLE_ANALYTICS_ID);

    // O script só baixa na primeira interação do visitante (rolar, tocar,
    // clicar, teclar), para não travar o celular enquanto a página aparece.
    // Os eventos ficam na fila do dataLayer; o clique no WhatsApp abre outra
    // aba, então a conversão é enviada assim que o script chega
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
    const loadScript = () => {
        events.forEach(type => window.removeEventListener(type, loadScript));
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
        document.head.appendChild(script);
    };

    events.forEach(type => window.addEventListener(type, loadScript, { once: true, passive: true }));
}

// Banner de cookies
function showCookieBanner() {
    if (document.querySelector('.cookie-banner')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML = `
        <p class="cookie-banner__texto">
            Usamos cookies do Google para contar as visitas ao site e medir se os nossos
            anúncios trazem contatos pelo WhatsApp. Nenhum dado é usado para personalizar
            anúncios.
        </p>
        <div class="cookie-banner__acoes">
            <button type="button" class="cookie-banner__botao" data-consent="denied">Recusar</button>
            <button type="button" class="cookie-banner__botao" data-consent="granted">Aceitar</button>
        </div>`;

    banner.addEventListener('click', e => {
        const choice = e.target.closest('[data-consent]')?.dataset.consent;
        if (!choice) return;

        saveConsent(choice);
        updateConsent(choice);
        banner.remove();
    });

    document.body.appendChild(banner);
}

// Link no rodapé para o visitante mudar a escolha depois
function addPreferencesLink() {
    const credits = document.querySelector('.site-rodape__creditos');
    if (!credits || credits.querySelector('.cookie-preferencias')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cookie-preferencias';
    button.textContent = 'Preferências de cookies';
    button.addEventListener('click', showCookieBanner);

    credits.append(' · ', button);
}

export function initCookieBanner() {
    if (!readConsent()) {
        showCookieBanner();
    }
    addPreferencesLink();
}

// Um único listener para todos os links do WhatsApp do site
export function initWhatsAppConversion() {
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href*="wa.me"]');
        if (!link || !isTagConfigured) return;

        gtag('event', 'conversion', {
            send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`
        });
    });
}

// Quem chegou por um anúncio (gclid/gbraid/wbraid na URL) manda "vim pelo Google" no WhatsApp
export function initOrigemGoogle() {
    const params = new URLSearchParams(window.location.search);
    const cameFromAd = ['gclid', 'gbraid', 'wbraid'].some(param => params.has(param));

    let isFromGoogle = cameFromAd;
    try {
        if (cameFromAd) sessionStorage.setItem(ORIGEM_GOOGLE_KEY, '1');
        isFromGoogle = sessionStorage.getItem(ORIGEM_GOOGLE_KEY) === '1';
    } catch {
        // Sem armazenamento: vale só para a página de chegada
    }

    if (!isFromGoogle) return;

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const url = new URL(link.href);
        const text = url.searchParams.get('text');
        if (!text) return;

        const newText = text.replace('achei seu site', 'vim pelo Google');
        url.search = `?text=${encodeURIComponent(newText)}`;
        link.href = url.toString();
    });
}
