# Site da Psicóloga Mariana Faria

Site institucional estático da psicóloga Mariana Faria, com foco em apresentação profissional, serviços, conteúdo de blog e contato via WhatsApp.

## Sobre o Projeto

Este projeto foi desenvolvido como site estático responsivo, com conteúdo distribuído em páginas HTML e estilos CSS modulares.

## Tecnologias

- HTML5
- CSS3 (arquitetura modular em `styles/`)
- JavaScript ES Modules
- GitHub Pages

## Estrutura Atual

```text
.
├── index.html
├── sobre_mim.html
├── atendimento.html
├── blog.html
├── posts/
│   ├── index.html
│   ├── ansiedade.html
│   ├── estresse.html
│   └── blog-posts.json
├── scripts/
│   ├── common.js
│   └── blog-posts.js
├── styles/
│   ├── styles.css
│   ├── global.css
│   ├── header.css
│   ├── footer.css
│   ├── components.css
│   ├── index.css
│   ├── blog.css
│   ├── atendimento.css
│   ├── sobre_mim.css
│   └── index_post.css
├── images/
├── robots.txt
├── sitemap.xml
└── CNAME
```

## Funcionalidades

- Layout responsivo para mobile e desktop
- Menu mobile com abertura/fechamento via JavaScript
- Botao "voltar ao topo"
- Carregamento dinamico de cards de posts com `blog-posts.json`
- Separacao entre links internos e externos na pagina `posts/index.html`
- Integracao com WhatsApp para agendamento

## Executando Localmente

1. Clone o repositorio:

```bash
git clone https://github.com/nely-grillo/psicologa-mariana-faria.git
cd psicologa-mariana-faria
```

2. Inicie um servidor local:

```bash
# Python
python -m http.server 8000

# ou Node
npx serve .
```

3. Acesse em `http://localhost:8000`.

## Qualidade de Codigo

Este projeto possui configuracao de qualidade com Prettier, ESLint e Stylelint.

1. Instale dependencias:

```bash
npm install
```

2. Rode verificacoes:

```bash
npm run lint
```

3. Formate arquivos automaticamente:

```bash
npm run format
```

## Contato

- WhatsApp: https://wa.me/5511992179781
- Instagram: https://www.instagram.com/marianafaria.psi/

## Licenca

Projeto proprietario da Psicologa Mariana Faria. Todos os direitos reservados.
