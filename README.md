# Conquest Online — Recriação do site (fansite)

Recriação do site do **Conquest Online** (o Conquer Online oficial da Global
Games/91.com no Brasil), reconstruído a partir de uma captura do
[Wayback Machine](https://web.archive.org/) datada de agosto/2011, com a
"casca" do próprio Wayback Machine removida e algumas partes redesenhadas.

## Como rodar

Não abra o `index.html` direto clicando duas vezes — o navegador trata isso
como `file://` e algumas coisas (imagens de fundo, o carrossel) não carregam
direito. Suba um servidor local na pasta do projeto:

```
python -m http.server 8080
```

e abra `http://localhost:8080/index.html`. Ou, no VS Code, use a extensão
**Live Server** (botão direito no `index.html` → *Open with Live Server*).

## Estrutura do projeto

```
index.html          página inicial
signup.html          tela de "Criar Conta" (layout novo, sem backend ainda)
css/conquest.css     CSS original do site (limpo das reescritas do Wayback)
js/                  scripts originais do site (jQuery 1.4.2 + scripts próprios)
images/              ícones e imagens "soltas" do site + os ícones novos (Discord/Facebook)
img/                 espelha a estrutura de pastas de conquest.91.com/img/...
images91/            espelha a estrutura de images.91.com/co/... (CDN separado que o
                     site original também usava para algumas imagens)
```

A separação entre `img/` e `images91/` existe porque o site original puxava
imagens de dois domínios diferentes (`conquest.91.com` e `images.91.com`).
Mantive essa divisão em vez de juntar tudo numa pasta só, pra ficar claro de
onde cada asset recuperado veio.

## O que foi feito na restauração

- Removida toda a infraestrutura do Wayback Machine do código: toolbar,
  `wombat.js`, `athena.js`, analytics do archive.org, e o preâmbulo/rodapé que
  o Wayback injeta em todo HTML/CSS/JS servido por ele.
- Todas as URLs desfeitas para os endereços originais (e depois redirecionadas
  para `index.html`/`signup.html`, já que os servidores originais não existem
  mais).
- Recuperadas ~80 imagens de fundo do `conquest.css` direto do archive.org
  (menus, caixas, ícones, header).
- O carrossel "Em Destaque" do topo, que usava um Flash (`.swf`) rodado via
  [Ruffle](https://ruffle.rs/), foi trocado por um carrossel simples em
  JS/CSS puro (`playFlash_v2` em `js/ue.jq.common.js`).
- Fórum, galeria de Screenshots/Fotos/Arte de Fãs e o slideshow de Wallpapers
  foram removidos (dependiam de serviços que não existem mais).
- Notícias, Eventos, Atualizações Recentes e Top Jogadores foram reduzidos a
  1 item de exemplo cada (com texto genérico/Lorem Ipsum), já que o conteúdo
  real era do servidor original e não fazia sentido manter.
- Criada a tela `signup.html` com layout próprio (o formulário ainda não
  envia pra lugar nenhum — falta ligar num backend de verdade).

## O que ficou faltando (perdido permanentemente)

Uma boa parte dos assets abaixo **nunca foi arquivada pelo Wayback Machine**
em nenhuma data — confirmei isso buscando o histórico completo de cada
arquivo na API do archive.org (CDX). O motivo mais provável é que
`conquest.91.com` bloqueava hotlinking de algumas pastas, então o robô do
archive.org só salvou as páginas HTML, não as imagens em si.

- **O banner Flash principal do topo** (`flash_header.swf`, 960x270) — nenhum
  snapshot existe, em nenhuma data.
- **53 imagens de fundo decorativas** do `conquest.css`: texturas de menu,
  botões da página de crédito, rodapé, cursores customizados (`.cur`),
  alguns ícones.
- **As 4 imagens dos banners de notícias** (`img/ads/*.jpg`) que apareciam no
  carrossel do topo — por isso ele hoje mostra só o texto/degradê.
- **11 miniaturas** de Screenshots/Fotos/Arte de Fãs/Wallpapers — por isso
  essas seções foram removidas em vez de ficarem com ícone quebrado.

Se você tiver algum print ou download antigo desses arquivos guardado em
algum lugar, dá pra encaixar manualmente nos caminhos que já estão
referenciados no CSS/HTML.

## Limitações conhecidas

- **Sem backend**: login, criar conta, fórum, loja etc. são só layout — nada
  é enviado pra lugar nenhum ainda.
- Os textos de Notícias/Eventos/Atualizações/Top Jogadores são só exemplos
  (Lorem Ipsum), pra popular depois com conteúdo de verdade.
- Os ícones de Discord e Facebook em "Redes Sociais" apontam pra
  `index.html` por enquanto — falta colocar os links reais.
