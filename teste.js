var dataUrl = "menu.json",
    itensCardapio = "item-cardapio.html",
    itensMenu = "item-menu.html";
    
// função facilitadora para inserir HTML em um elemento
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
  $ajaxUtils.sendGetRequest(itensCardapio, geraItensCardapio, false); // não é um JSON
  //$ajaxUtils.sendGetRequest(itensMenu, geraItensMenu, false);    
}

function geraItensCardapio(itensHtml) {
    var cardapio = '<div class="container-fluid">';
    
    for(var i = 0; i < itensHtml.length; i++){
        var html = itensHtml,
            titulo = itensHtml[i].titulo,
            conteudo = itensHtml[i].Conteudo,
            imagem = itensHtml[i].imagem;
          
        html = inserePropriedade(html, "titulo", titulo);
        html = inserePropriedade(html, "conteudo", conteudo);

        cardapio += html;
    }
    cardapio += '</div>';
    insereHtml("#iem-cardapio", cardapio);
}

$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);