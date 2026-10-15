/* CADASTRO DOS VESTIDOS:
   id: código de identificação que você define manualmente (ex.: 'AV001').
   preco: preço que será exibido (ex.: 'R$ 89,90'). Deixe vazio para ocultar.
   imagem: caminho local ou URL da foto.
   link: URL de afiliada da Shopee (imagem, nome e botão serão clicáveis).
   Os IDs e preços abaixo estão vazios para você preencher com os dados corretos.
*/

import { produtos as produtosOriginais } from './produtos.js';

const produtos = produtosOriginais.map(p => ({
  id: String(p.id || '').trim(),
  preco: String(p.preco || '').trim(),
  nome: String(p.nome || '').trim(),
  categoria: String(p.categoria || '').trim(),
  imagem: String(p.imagem || '').trim(),
  link: String(p.link || '').trim(),
  selo: String(p.selo || '').trim()
}));
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
  const active=safeUrl(p.link);
  const photo=element(active?'a':'div','photo'+(active?' photo-link':''));
  if(active){photo.href=p.link;photo.target='_blank';photo.rel='sponsored nofollow noopener noreferrer';photo.setAttribute('aria-label','Ver '+p.nome+' na Shopee')}
  const img=element('img');img.src=p.imagem||'assets/avelle-logo.webp';img.alt=p.nome;img.loading='lazy';img.decoding='async';img.onerror=()=>{img.onerror=null;img.src='assets/avelle-logo.webp'};photo.append(img);
  if(p.selo)photo.append(element('span','tag',p.selo));
  const meta=element('div','product-meta');
  meta.append(element('div','category',p.categoria||'Moda feminina'));
  const heading=element('h2','product-name');
  const name=element(active?'a':'span','product-name-link',p.nome);
  if(active){name.href=p.link;name.target='_blank';name.rel='sponsored nofollow noopener noreferrer'}
  heading.append(name);meta.append(heading);
  if(String(p.id||'').trim())meta.append(element('div','product-id','ID: '+String(p.id).trim()));
  meta.append(element('div','product-price',String(p.preco||'').trim()||'Preço na Shopee'));
  const action=element(active?'a':'span','product-action'+(active?'':' disabled'));
  action.append(document.createTextNode(active?'VER NA SHOPEE':'EM BREVE'),element('span','',active?'↗':'—'));
  if(active){action.href=p.link;action.target='_blank';action.rel='sponsored nofollow noopener noreferrer';action.setAttribute('aria-label','Ver '+p.nome+' na Shopee')}
  meta.append(action);card.append(photo,meta);return card;
}
function renderFilters(){const categorias=['Todas',...new Set(produtos.map(p=>p.categoria).filter(Boolean))];filters.replaceChildren(...categorias.map(cat=>{const btn=element('button','filter'+(cat===categoriaAtual?' active':''),cat);btn.type='button';btn.setAttribute('aria-pressed',String(cat===categoriaAtual));btn.onclick=()=>{categoriaAtual=cat;renderFilters();render();};return btn}))}
function render(){
  const q=normalize(search.value.trim());
  const lista=produtos.filter(p=>(categoriaAtual==='Todas'||p.categoria===categoriaAtual)&&normalize([p.id,p.nome,p.categoria].join(' ')).includes(q));
  grid.replaceChildren(...lista.map(createCard));
  if(count)count.textContent=lista.length+' '+(lista.length===1?'peça':'peças');
  empty.hidden=lista.length!==0;
}
document.querySelector('#year').textContent=new Date().getFullYear();
search.addEventListener('input',render);
renderFilters();render();
