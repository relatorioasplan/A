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
function popup(texto) { //função popup de aviso na tela
    alert(texto);
}

function relatorioAsplan() {
    //     var municipio = document.getElementById("municipio").value;
    //     if(municipio == "")
    //     {

    //     }
    //     else{    
    //     document.getElementById("relatorio").value = "";

    //     var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    //             //Verificação se é ou nao ponto de controle
    //             if (teste === "0") {
    //                 document.getElementById("relatorio").value +=  "*" + municipio + "*\n";
    //                 document.getElementById("relatorio").value +=  "\n_Crédito Parceria_\n\n";
    //             }
    //             else {
    //                 document.getElementById("relatorio").value += "*" + municipio + "* - "  +"\n";
    //                 document.getElementById("relatorio").value +=  "\n_Crédito Parceria_\n\n";
    //             }

    //             //IF - FAZER VERIFICAÇÃO SE HÁ DADOS SALVOS NO BANCO DE DADOS
    //             //ELSE
    //             document.getElementById("relatorio").value +=  "\n\n_Aluguel Social_\n\n";
    //             document.getElementById("relatorio").value +=  "\n\n_Goiás Social_\n\n";

    // }
    LerBD();
}