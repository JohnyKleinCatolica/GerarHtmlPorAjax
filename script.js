var dataUrl = "menu.json",
    itensCardapio = "item-cardapio.html",
    itensMenu = "item-menu.html", data;
    
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

function inserePropriedade(template, propName, propValue) {
 
  var propriedade = "{{" + propName + "}}";
  template = template.replace(new RegExp(propriedade, "g"), propValue);
  return template;
}

function constroiPagina(dados) {
  data = dados;
  $ajaxUtils.sendGetRequest(itensCardapio, geraItensCardapio, false); // não é um JSON
  $ajaxUtils.sendGetRequest(itensMenu, geraItensMenu, false);
}

function geraItensCardapio(itensHtml) {
    var cardapio = '<div class="container-fluid">'; 
    data.map(function(item){
        var html = itensHtml,
            titulo = item.titulo,
            conteudo = item.Conteudo,
            imagem = item.imagem;

            html = inserePropriedade(html, "titulo", titulo);
        
            html = inserePropriedade(html, "conteudo", conteudo);
            
        cardapio += html;
    });
    cardapio += '</div>';
    insereHtml("#item-cardapio", cardapio);
}

function geraItensMenu(itensHtml) {
    var itensMenu = '<ul class="nav navbar-nav hidden-sm hidden-md hidden-lg">';
    data.map(function(item){
        var html = itensHtml,
            titulo = item.titulo;
            
        html = inserePropriedade(html, "titulo", titulo);
        itensMenu += html;
    });
    itensMenu += '</ul>';
    insereHtml("#item-menu-cardapio", itensMenu);
}

$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);