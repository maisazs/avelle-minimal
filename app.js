/* COMO CADASTRAR UMA PEÇA:
   Copie um bloco dentro de produtos, altere nome/categoria/imagem/link.
   Foto: utilize caminho local (ex. "assets/vestido-rosa.jpg") ou URL HTTPS.
   Link: cole seu link de afiliada da Shopee. Sem link, aparecerá "Em breve".
   As peças abaixo são apenas exemplos e devem ser substituídas antes da divulgação.
*/
const produtos = [
  {nome:'Vestido longo elegante — exemplo',categoria:'Vestidos',imagem:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''},
  {nome:'Vestido feminino casual — exemplo',categoria:'Vestidos',imagem:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''},
  {nome:'Conjunto sofisticado — exemplo',categoria:'Conjuntos',imagem:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''},
  {nome:'Look casual versátil — exemplo',categoria:'Casual',imagem:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''},
  {nome:'Conjunto feminino moderno — exemplo',categoria:'Conjuntos',imagem:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''},
  {nome:'Peça essencial feminina — exemplo',categoria:'Casual',imagem:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=82',selo:'EXEMPLO',link:''}
];
const grid=document.querySelector('#products');
const filters=document.querySelector('#filters');
const search=document.querySelector('#searchInput');
const count=document.querySelector('#productCount');
const empty=document.querySelector('#emptyState');
let categoriaAtual='Todas';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const safeUrl=link=>{try{const u=new URL(link);return u.protocol==='https:'||u.protocol==='http:'}catch{return false}};
const element=(tag,cls,content)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(content!==undefined)node.textContent=content;return node};
function createCard(p){
  const card=element('article','product');
  const photo=element('div','photo');
  const img=element('img');img.src=p.imagem||'assets/avelle-logo.webp';img.alt=p.nome;img.loading='lazy';img.decoding='async';img.onerror=()=>{img.onerror=null;img.src='assets/avelle-logo.webp'};photo.append(img);
  if(p.selo)photo.append(element('span','tag',p.selo));
  const meta=element('div','product-meta');meta.append(element('div','category',p.categoria||'Moda feminina'),element('h2','product-name',p.nome));
  const active=safeUrl(p.link);const action=element(active?'a':'span','product-action'+(active?'':' disabled'));
  action.append(document.createTextNode(active?'VER NA SHOPEE':'EM BREVE'),element('span','',active?'↗':'—'));
  if(active){action.href=p.link;action.target='_blank';action.rel='sponsored nofollow noopener noreferrer';action.setAttribute('aria-label','Ver '+p.nome+' na Shopee')}
  meta.append(action);card.append(photo,meta);return card;
}
function renderFilters(){const categorias=['Todas',...new Set(produtos.map(p=>p.categoria).filter(Boolean))];filters.replaceChildren(...categorias.map(cat=>{const btn=element('button','filter'+(cat===categoriaAtual?' active':''),cat);btn.type='button';btn.setAttribute('aria-pressed',String(cat===categoriaAtual));btn.onclick=()=>{categoriaAtual=cat;renderFilters();render();};return btn}))}
function render(){const q=normalize(search.value.trim());const lista=produtos.filter(p=>(categoriaAtual==='Todas'||p.categoria===categoriaAtual)&&normalize(p.nome+' '+p.categoria).includes(q));grid.replaceChildren(...lista.map(createCard));count.textContent=lista.length+' '+(lista.length===1?'peça':'peças');empty.hidden=lista.length!==0}
document.querySelector('#year').textContent=new Date().getFullYear();search.addEventListener('input',render);renderFilters();render();
