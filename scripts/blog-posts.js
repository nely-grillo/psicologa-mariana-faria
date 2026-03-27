/**
 * Carregador de posts do blog (compartilhado)
 */

import { formatDateISO } from './common.js';

export async function loadBlogPosts(containerId, options = {}) {
    const {
        jsonPath = '/posts/blog-posts.json',
        limit = null,
        showDate = true,
        cardClass = 'blog__post',
        filterVisible = true,  // controla filtro de visibilidade
        linkType = 'all',
        internalReadMoreText = 'Leia mais →',
        externalReadMoreText = 'Link externo ↗'
    } = options;

    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';

    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error('Falha ao carregar posts');
        const posts = await res.json();

        // Filtrar visíveis APENAS se filterVisible = true
        const isVisible = p => p && (p.visible === true || p.visible === 'true');
        const filteredPosts = filterVisible 
            ? posts.filter(isVisible)  // Filtra apenas os visíveis
            : posts;                    // Retorna todos

        // Ordenar por data (mais recente primeiro)
        const sortedPosts = filteredPosts.sort((a, b) => {
            const da = new Date(a.date || 0).getTime() || 0;
            const db = new Date(b.date || 0).getTime() || 0;
            return db - da;
        });

        const isExternalLink = link => /^https?:\/\//i.test(String(link || ''));

        const linkFilteredPosts = sortedPosts.filter(post => {
            const external = isExternalLink(post.link);
            if (linkType === 'external') return external;
            if (linkType === 'internal') return !external;
            return true;
        });

        const postsToShow = limit ? linkFilteredPosts.slice(0, limit) : linkFilteredPosts;

        if (postsToShow.length === 0) {
            const baseClass = cardClass.includes('__') ? cardClass.split('__')[0] : 'blog';
            container.innerHTML = `<p class="${baseClass}__mensagem">Nenhum artigo disponível no momento.</p>`;
            return;
        }

        postsToShow.forEach(post => {
            const external = isExternalLink(post.link);
            const a = document.createElement('a');
            a.href = post.link || '#';
            a.className = cardClass;
            a.setAttribute('aria-label', post.title);

            if (external) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }

            const img = document.createElement('img');
            img.src = post.image;
            img.alt = post.title;
            img.className = `${cardClass}-imagem`;
            img.loading = 'lazy';
            img.decoding = 'async';

            const body = document.createElement('div');
            body.className = `${cardClass}-corpo`;

            const h3 = document.createElement('h3');
            h3.className = `${cardClass}-titulo`;
            h3.textContent = post.title;

            const p = document.createElement('p');
            p.className = `${cardClass}-resumo`;
            p.textContent = post.excerpt;

            const meta = document.createElement('div');
            meta.className = `${cardClass}-meta`;

            if (showDate && post.date) {
                const time = document.createElement('time');
                time.dateTime = post.date;
                time.textContent = formatDateISO(post.date);
                meta.appendChild(time);
            }

            const readMore = document.createElement('span');
            readMore.className = `${cardClass}-leia-mais`;
            readMore.textContent = external ? externalReadMoreText : internalReadMoreText;
            meta.appendChild(readMore);

            body.appendChild(h3);
            body.appendChild(p);
            body.appendChild(meta);

            a.appendChild(img);
            a.appendChild(body);

            container.appendChild(a);
        });
    } catch (err) {
        console.error('Erro carregando posts:', err);
        const baseClass = cardClass.includes('__') ? cardClass.split('__')[0] : 'blog';
        container.innerHTML = `<p class="${baseClass}__mensagem">Não foi possível carregar os artigos no momento.</p>`;
    }
}