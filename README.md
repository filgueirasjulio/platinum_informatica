# Platinum Informática: site institucional

Página única e estática (HTML, CSS e JavaScript puros), sem build.

## Rodar localmente
```bash
npm start            # ou: python3 -m http.server 8080
npm run check        # valida links, ativos e números de contato
```

## Editar o conteúdo
Telefones, preço da promoção, serviços, endereço e redes ficam em `src/content.js`.
Os links de WhatsApp, telefone, e-mail e mapa são gerados a partir desse arquivo.
Se mudar o número principal, atualize também os links de fallback em `index.html`; o `npm run check` avisa se divergirem.

## Publicar
Envie a pasta (`index.html`, `src/`, `assets/`) para qualquer hospedagem estática. A pasta `images/` é só referência e não precisa ser publicada.

## Pendências
- Informar a URL exata da página do Facebook (hoje o link é uma busca), em `src/content.js`.
- Se houver o arquivo original do logotipo, ele pode substituir `assets/logo.svg`.
