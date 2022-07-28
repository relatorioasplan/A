function parser({ table }) {
    return table.rows
        .map(row => [...table.cols.map((col, index) => ({ [col.label]: row.c[index].v, }))])
        .map(data => data.reduce((acc, value) => ({ ...acc, ...value }), {}))
}

function LerBD() {
    //var municipio = document.getElementById("municipio").value;
    // municipio = 'SÃO SIMÃO'
    // var dbRef = firebase.database().ref();
    // //  for (let i = 0; i < 581; i++){

    // dbRef.child("/PlanilhaPresidencia").child(0).get().then((snapshot) => {
    // if (snapshot.exists()) {
    //     var teste = snapshot.val();

    // // console.log(snapshot.val());
    // console.log(teste);
    // } else {
    //     console.log("No data available");
    // }
    // }).catch((error) => {
    //     console.error(error);
    // });

    var url = 'https://opensheet.elk.sh/19m-nYHiUQW5Vvo38F21mGqkoLViLTv4etur92_zI4cU/Dados'; // ou https://opensheet.elk.sh/a09rksjodf[...]/Minhaaba
    fetch(url).then(response => response.json()).then((dados) => {

        //console.table(dados);
        Processa(dados);

    });

}

function Processa(MeusDados) {
    var tamanhoTabela = MeusDados.length;
    //console.log(tamanho); -> tamanho
    //console.log(MeusDados[1]['MUNICIPIO']);

    var municipio_tela = document.getElementById("municipio").value;
    var MUNICIPIO;
    var PROCESSO;
    var CONVENENTE;
    var PROGRAMA;
    var MODALIDADE;
    var BAIRRO;
    var OBJETO;
    var DATA_DE_VIGENCIA;
    var SITUACAO_DA_OBRA;
    var QUANT_PREVISTA;
    var ENCAMINHAMENTO_PARA_SOLUCAO;
    var QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS;
    var VALOR_TOTAL_DA_OBRA_PREVISTO_RS;
    var RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS;
    var RECURSO_ESTADUAL_PREVISTO_RS;
    var RECURSO_ESTADUAL_ENTREGUE;
    var IRREGULARIDADE;
    var ACAO2;
    var ACAO;
    var controle = 0;
    if (municipio_tela == "") {

    }
    else {
        document.getElementById("relatorio").value = ""; // limpa tela  

        var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        //Verificação se pega do ultimo relaotorio (1) - ou dados da planilha (0)
        if (teste === "0") {
            document.getElementById("relatorio").value += "*" + municipio_tela + "*\n";
            document.getElementById("relatorio").value += "\n_Crédito Parceria_\n";
            //FOR //IF
            for (var i = 0; i < tamanhoTabela; i++) {//tamanhoTabela
                MUNICIPIO = MeusDados[i]['MUNICIPIO'];
                if (MUNICIPIO == municipio_tela) {
                    PROGRAMA = MeusDados[i]['PROGRAMA'];
                    if (PROGRAMA != 'ALUGUEL SOCIAL' && PROGRAMA != 'GOIÁS SOCIAL') {
                        PROCESSO = MeusDados[i]['PROCESSO'];
                        CONVENENTE = MeusDados[i]['CONVENENTE'];

                        MODALIDADE = MeusDados[i]['MODALIDADE'];
                        BAIRRO = MeusDados[i]['BAIRRO'];
                        OBJETO = MeusDados[i]['OBJETO'];
                        DATA_DE_VIGENCIA = MeusDados[i]['DATA DE VIGÊNCIA'];
                        SITUACAO_DA_OBRA = MeusDados[i]['SITUACAO DA OBRA'];
                        QUANT_PREVISTA = MeusDados[i]['QUANT. PREVISTA'];
                        ENCAMINHAMENTO_PARA_SOLUCAO = MeusDados[i]['ENCAMINHAMENTO PARA SOLUÇÃO '];
                        QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS = MeusDados[i]['QUANT. DE PARCELAS REALIZADAS / BENEFICIÁRIOS CADASTRADOS'];
                        VALOR_TOTAL_DA_OBRA_PREVISTO_RS = MeusDados[i]['VALOR TOTAL DA OBRA - PREVISTO - R$'];
                        RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS = MeusDados[i]['RECURSO FEDERAL/MUNICIPAL/OSC - PREVISTO - R$'];
                        RECURSO_ESTADUAL_PREVISTO_RS = MeusDados[i]['RECURSO ESTADUAL - PREVISTO - R$'];
                        RECURSO_ESTADUAL_ENTREGUE = MeusDados[i]['RECURSO ESTADUAL ENTREGUE - R$'];
                        IRREGULARIDADE = MeusDados[i]['IRREGULARIDADE'];
                        ACAO2 = MeusDados[i]['AÇÃO2'];
                        ACAO = MeusDados[i]['AÇÃO'];
                        if (DATA_DE_VIGENCIA !== undefined) {

                            let arrDATA_DE_VIGENCIA = DATA_DE_VIGENCIA.split("/");
                            if (arrDATA_DE_VIGENCIA[2] >= 2019 || SITUACAO_DA_OBRA == "EM ANDAMENTO" || SITUACAO_DA_OBRA == "PARALISADA" || SITUACAO_DA_OBRA == "SOBRESTADO") {
                                controle = 1;

                                let tamanho = SITUACAO_DA_OBRA.length;
                                let tranforma = SITUACAO_DA_OBRA.toLocaleLowerCase().slice(1, tamanho);
                                let aux = SITUACAO_DA_OBRA[0].toLocaleUpperCase() + tranforma;
                                if (arrDATA_DE_VIGENCIA[2] < 2019) {
                                    document.getElementById("relatorio").value += "\nAnterior à gestão atual";
                                }
                                document.getElementById("relatorio").value += "\n" + aux + "\n";
                                document.getElementById("relatorio").value += PROCESSO + "\n";
                                if (MODALIDADE != "COMUNITÁRIO") {


                                    if (QUANT_PREVISTA > 1) {
                                        document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + "s PREVISTAS\n";
                                        if (SITUACAO_DA_OBRA == "CONCLUÍDA" || SITUACAO_DA_OBRA == "ENTREGUE") {
                                            document.getElementById("relatorio").value += "Concluído/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS + " UHs\n";
                                        }
                                    }
                                    else {
                                        document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + " PREVISTA\n";
                                        if (SITUACAO_DA_OBRA == "CONCLUÍDA" || SITUACAO_DA_OBRA == "ENTREGUE") {
                                            document.getElementById("relatorio").value += "Concluído/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS + " UH\n";
                                        }
                                    }
                                    //IF CONCLUIDO OU ENTREGUE? SIM: document.getElementById("relatorio").value += "Concluido/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS +  "\n";

                                }
                                else {
                                    document.getElementById("relatorio").value += BAIRRO + " - " + OBJETO + "\n";
                                }
                                if (RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "R$ 0,00" || RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "(vazio)" || RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == undefined) {
                                    document.getElementById("relatorio").value += "Valor total/valor estadual previsto: " + RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor total/valor estadual entregue: " + RECURSO_ESTADUAL_ENTREGUE + "\n";
                                }
                                else {
                                    document.getElementById("relatorio").value += "Valor Total: " + VALOR_TOTAL_DA_OBRA_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor estadual previsto: " + RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                                    document.getElementById("relatorio").value += "Valor estadual entregue: " + RECURSO_ESTADUAL_ENTREGUE + "\n";
                                    document.getElementById("relatorio").value += "Valor contrapartida: " + RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS + "\n";
                                }
                                document.getElementById("relatorio").value += "Convenente: " + CONVENENTE + "\n";
                                document.getElementById("relatorio").value += '*' + ENCAMINHAMENTO_PARA_SOLUCAO + "\n";
                                document.getElementById("relatorio").value += '*' + IRREGULARIDADE + "\n";
                                document.getElementById("relatorio").value += '*' + ACAO2 + "\n";

                            }
                        }
                    }
                }
            } if (controle == 0) {
                document.getElementById("relatorio").value += "Não constam obras";
            }

            let dbRef = firebase.database().ref();
            dbRef.child("/Relatorio").child(municipio_tela).child("AluguelSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    var TextoAluguelSocial = snapshot.val();
                    var arrAluguelSocial = TextoAluguelSocial.split("&");
                    document.getElementById("relatorio").value += "\n\n_Aluguel Social_\n";
                    for (let i = 0; i < arrAluguelSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrAluguelSocial[i] + "\n";
                    }

                }
                else {
                    document.getElementById("relatorio").value += "\n_Aluguel Social_\n\n";
                }
            })

            dbRef.child("/Relatorio").child(municipio_tela).child("GoiasSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    var TextoGoiasSocial = snapshot.val();
                    var arrTextoGoiasSocial = TextoGoiasSocial.split("&");
                    document.getElementById("relatorio").value += "_Goiás Social_\n";
                    for (let i = 0; i < arrTextoGoiasSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrTextoGoiasSocial[i] + "\n";
                    }

                }
                else {
                    document.getElementById("relatorio").value += "\n_Goiás Social_\n\n";
                }
            })

        }

        else {//Banco de dados
            let dbRef = firebase.database().ref();

            dbRef.child("/Relatorio").child(municipio_tela).child("DataRelatorio").get().then((snapshot) => {
                if (snapshot.exists()) {
                    debugger
                    var TextoDataRelatorio = snapshot.val();
                    document.getElementById("relatorio").value += "*" + municipio_tela + "* - " + TextoDataRelatorio + "\n";
                    document.getElementById("relatorio").value += "\n_Crédito Parceria_\n";
                }
                else {
                    document.getElementById("relatorio").value += "*" + municipio_tela + "* - " + "Sem relatório salvo para este município\n";
                }
            })

            dbRef.child("/Relatorio").child(municipio_tela).child("CreditoParceria").get().then((snapshot) => {
                if (snapshot.exists()) {
                    var TextoCredito = snapshot.val();
                    var arrTextoCredito = TextoCredito.split("&");
                    for (let i = 0; i < arrTextoCredito.length - 1; i++) {
                        document.getElementById("relatorio").value += arrTextoCredito[i] + "\n";
                    }

                }
            })

            dbRef.child("/Relatorio").child(municipio_tela).child("AluguelSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    var TextoAluguelSocial = snapshot.val();
                    var arrAluguelSocial = TextoAluguelSocial.split("&");
                    document.getElementById("relatorio").value += "_Aluguel Social_\n";
                    for (let i = 0; i < arrAluguelSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrAluguelSocial[i] + "\n";
                    }

                }

            })

            dbRef.child("/Relatorio").child(municipio_tela).child("GoiasSocial").get().then((snapshot) => {
                if (snapshot.exists()) {
                    var TextoGoiasSocial = snapshot.val();
                    var arrTextoGoiasSocial = TextoGoiasSocial.split("&");
                    document.getElementById("relatorio").value += "_Goiás Social_\n";
                    for (let i = 0; i < arrTextoGoiasSocial.length - 1; i++) {
                        document.getElementById("relatorio").value += arrTextoGoiasSocial[i] + "\n";
                    }

                }
            })


        }

    }
}

function salvarBD() {
    if (document.getElementById("relatorio").value != "") {
        var AluguelSocial = "";
        var CreditoParceria = "";
        var GoiasSocial = "";
        var Municipio = document.getElementById("municipio").value;
        const date = new Date();
        var DataRelatorio = date.toLocaleDateString();
        var texto = document.getElementById("relatorio").value;
        var arrTexto = texto.split("\n");
        var posicaoCreditoParceria = arrTexto.indexOf('_Crédito Parceria_');
        var posicaoAluguelSocial = arrTexto.indexOf('_Aluguel Social_');
        var posicaoGoiasSocial = arrTexto.indexOf('_Goiás Social_');
        console.log(arrTexto);
        console.log(posicaoCreditoParceria);
        console.log(posicaoAluguelSocial);
        console.log(posicaoGoiasSocial);

        for (let i = posicaoCreditoParceria + 1; i < posicaoAluguelSocial; i++) {
            CreditoParceria += arrTexto[i] + "&";
        }

        for (let i = posicaoAluguelSocial + 1; i < posicaoGoiasSocial; i++) {
            AluguelSocial += arrTexto[i] + "&";
        }

        for (let i = posicaoGoiasSocial + 1; i < arrTexto.length; i++) {
            GoiasSocial += arrTexto[i] + "&";
        }

        const db = {
            AluguelSocial: AluguelSocial,
            CreditoParceria: CreditoParceria,
            GoiasSocial: GoiasSocial,
            Municipio: Municipio,
            DataRelatorio: DataRelatorio
        };
        let Relatorio_id = Municipio;
        let updates = {};
        updates['/Relatorio/' + Relatorio_id] = db;
        let relatorio_ref = firebase.database().ref();
        relatorio_ref.update(updates)
            .then(function () {
                return { success: true, message: 'Dados Salvos' };
            })
            .catch(function (error) {
                return { success: false, message: `Erro, dados nao salvos: ${error.message}` };
            });

        popup("Dados salvos");
    }
    else {
        popup("erro, sem dados para salvar");
    }
}

