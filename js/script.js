function copiar() { //função copiar
    const texto = document.getElementById('relatorio');
    texto.select();
    document.execCommand('copy');
    alert("Texto Copiado");

}
function limpar() { //função limpar tela onde reseta os valores e desativas os quadros novamente
    document.getElementById("municipio").value = "";
    document.getElementById("relatorio").value = "";
   
}

function envio() { //Função de enviar via whatsapp

    var texto = document.getElementById("relatorio").value;
    if (texto === "") {
        popup("ERRO, 'Relatorio' encontra-se em branco");
    }
    else {
        texto = window.encodeURIComponent(texto);
        window.open("https://api.whatsapp.com/send?1=pt_BR&text=" + texto, "_blank");
    }

}