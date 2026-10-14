/* CADASTRO DOS VESTIDOS:
   id: código de identificação que você define manualmente (ex.: 'AV001').
   preco: preço que será exibido (ex.: 'R$ 89,90'). Deixe vazio para ocultar.
   imagem: caminho local ou URL da foto.
   link: URL de afiliada da Shopee (imagem, nome e botão serão clicáveis).
   Os IDs e preços abaixo estão vazios para você preencher com os dados corretos.
*/
const produtos = [
  {id:'BYV-WVM-GKH',preco:'R$274,50',nome:'Vestido Longo Tomara Que Caia com Fenda',categoria:'Vestidos',imagem:'/assets/vestidos/vestido-vermelho-elegante-cetim.jpeg',link:'https://s.shopee.com.br/3B8Bf8uCDf'},
  {id:'BFZ-SEW-MDG',preco:'R$280,60',nome:'Vestido Longo com Alças com Fenda',categoria:'Vestidos',imagem:'assets/vestidos/vestido-verde-elegante-cetim-tomara-que-caia.jpeg',link:'https://s.shopee.com.br/4fwzS6EMne'},
  {id:'BTG-BTZ-TZM',preco:'R$166,54',nome:'Vestido de cetim de um ombro com fenda',categoria:'Vestidos',imagem:'assets/vestidos/vestido-um-ombro-roxo.jpeg',link:'https://s.shopee.com.br/70KuEnQFkN'},
  {id:'BGM-QUC-DAS',preco:'R$95,00',nome:'Vestido Longo Forrado Estampa Florida',categoria:'Vestidos',imagem:'assets/vestidos/vestido-preto-estampado.jpeg',link:'https://s.shopee.com.br/60SN345Il6'},
  {id:'AFE-LUM-QZA',preco:'R$76,44',nome:'Vestido de cetim sem mangas',categoria:'Vestidos',imagem:'assets/vestidos/vestido-preto-cetim.jpeg',link:'https://s.shopee.com.br/50ZprTTNZb'},
  {id:'AWD-JEB-REJ',preco:'R$265,50',nome:'Vestido Longo Decote Drapeado Fenda',categoria:'Vestidos',imagem:'assets/vestidos/vestido-marrom-elegante-cetim.jpeg',link:'https://s.shopee.com.br/6VOdeT4LDR'},
  {id:'BLS-KQA-ZPS',preco:'R$190,15',nome:'Vestido estampado manga lanterna',categoria:'Vestidos',imagem:'assets/vestidos/vestido-manga-bufante-estampado.jpeg',link:'https://s.shopee.com.br/60SN3iO8Tb'},
  {id:'AWD-JEB-QBS',preco:'R$157,74',nome:'Vestido longo em malha fria + Faixa',categoria:'Vestidos',imagem:'assets/vestidos/vestido-lenco-pescoco-serenity.jpeg',link:'https://s.shopee.com.br/905ydPd8cs'},
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
