# Avelle — site estático

Site de página única: `index.html`, `styles.css`, `app.js` e `assets/avelle-logo.webp`. Não necessita npm ou package.json.

## Adicionar produtos
Abra `app.js`, localize `const produtos = [` e acrescente objetos com `nome`, `categoria`, `imagem`, `selo` (opcional) e `link` (URL de afiliada Shopee). O site cria os filtros automaticamente. As 6 peças iniciais são exemplos; substitua antes de divulgar.

## Executar
Dentro da pasta: `python3 -m http.server 5500` e abra `http://localhost:5500`.

## Vercel
Suba os arquivos num repositório GitHub; importe na Vercel e selecione Framework: Other, Build command: vazio, Output directory: `.`. Não há instalação npm.
