function parser({table}){
    return table.rows
      .map(row => [ ...table.cols.map((col, index) => ({[col.label]: row.c[index].v,}))])
      .map(data => data.reduce((acc, value) =>  ({...acc, ...value}), {}))
  }

function LerBD(){
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

function Processa (MeusDados){
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
    
    if(municipio_tela == "")
    {
        
    }
    else{    
    document.getElementById("relatorio").value = ""; // limpa tela  
        
    var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
            //Verificação se pega do ultimo relaotorio (1) - ou dados da planilha (0)
            if (teste === "0") {
                document.getElementById("relatorio").value +=  "*" + municipio_tela + "*\n";
                document.getElementById("relatorio").value +=  "\n_Crédito Parceria_\n";
                //FOR //IF
                for (var i = 0; i<tamanhoTabela;i++){//tamanhoTabela
                    MUNICIPIO = MeusDados[i]['MUNICIPIO'];
                    if(MUNICIPIO == municipio_tela ){
                        debugger
                        PROGRAMA= MeusDados[i]['PROGRAMA'];
                        if(PROGRAMA != 'ALUGUEL SOCIAL' && PROGRAMA != 'GOIÁS SOCIAL'){
                    PROCESSO= MeusDados[i]['PROCESSO'];
                    CONVENENTE= MeusDados[i]['CONVENENTE'];
                    
                    MODALIDADE= MeusDados[i]['MODALIDADE'];
                    BAIRRO= MeusDados[i]['BAIRRO'];
                    OBJETO= MeusDados[i]['OBJETO'];
                    DATA_DE_VIGENCIA= MeusDados[i]['DATA DE VIGÊNCIA'];
                    SITUACAO_DA_OBRA= MeusDados[i]['SITUACAO DA OBRA'];
                    QUANT_PREVISTA= MeusDados[i]['QUANT. PREVISTA'];
                    ENCAMINHAMENTO_PARA_SOLUCAO= MeusDados[i]['ENCAMINHAMENTO PARA SOLUÇÃO '];
                    QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS= MeusDados[i]['QUANT. DE PARCELAS REALIZADAS / BENEFICIÁRIOS CADASTRADOS'];
                    VALOR_TOTAL_DA_OBRA_PREVISTO_RS= MeusDados[i]['VALOR TOTAL DA OBRA - PREVISTO - R$'];
                    RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS= MeusDados[i]['RECURSO FEDERAL/MUNICIPAL/OSC - PREVISTO - R$'];
                    RECURSO_ESTADUAL_PREVISTO_RS= MeusDados[i]['RECURSO ESTADUAL - PREVISTO - R$'];
                    RECURSO_ESTADUAL_ENTREGUE= MeusDados[i]['RECURSO ESTADUAL ENTREGUE - R$'];
                    IRREGULARIDADE= MeusDados[i]['IRREGULARIDADE'];
                    ACAO2= MeusDados[i]['AÇÃO2'];
                    ACAO= MeusDados[i]['AÇÃO'];
                    if(DATA_DE_VIGENCIA !== undefined){

                    let arrDATA_DE_VIGENCIA = DATA_DE_VIGENCIA.split("/");
                    if(arrDATA_DE_VIGENCIA[2] >=2019 || SITUACAO_DA_OBRA == "EM ANDAMENTO" || SITUACAO_DA_OBRA == "PARALISADA" || SITUACAO_DA_OBRA == "SOBRESTADO"){
                        

                var tamanho = SITUACAO_DA_OBRA.length;
                var tranforma = SITUACAO_DA_OBRA.toLocaleLowerCase().slice(1,tamanho);
                var aux = SITUACAO_DA_OBRA[0].toLocaleUpperCase() + tranforma;
                if (arrDATA_DE_VIGENCIA[2]<2019)
                {
                    document.getElementById("relatorio").value += "\nAnterior à gestão atual";
                }
                document.getElementById("relatorio").value += "\n" + aux + "\n";
                document.getElementById("relatorio").value += PROCESSO + "\n";
                document.getElementById("relatorio").value += BAIRRO + " - " +OBJETO + " PREVISTA\n";
                //IF CONCLUIDO OU ENTREGUE? SIM: document.getElementById("relatorio").value += "Concluido/Entregue: " + QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS +  "\n";
                if (SITUACAO_DA_OBRA == "CONCLUÍDA" || SITUACAO_DA_OBRA == "ENTREGUE"){
                document.getElementById("relatorio").value += "Concluido/Entregue: "+ QUANT_DE_PARCELAS_REALIZADAS_BENEFICIARIOS_CADASTRADOS+ "\n";
                }
                if(RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "R$ 0,00" ||RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == "(vazio)" || RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS == undefined)
                {
                    document.getElementById("relatorio").value += "Valor total/valor estadual previsto: "+ RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                    document.getElementById("relatorio").value += "Valor total/valor estadual entregue: "+ RECURSO_ESTADUAL_ENTREGUE + "\n";
                }
                else{
                    document.getElementById("relatorio").value += "Valor Total: "+ VALOR_TOTAL_DA_OBRA_PREVISTO_RS + "\n";
                    document.getElementById("relatorio").value += "Valor estadual previsto: "+ RECURSO_ESTADUAL_PREVISTO_RS + "\n";
                    document.getElementById("relatorio").value += "Valor estadual entregue: "+ RECURSO_ESTADUAL_ENTREGUE + "\n";
                    document.getElementById("relatorio").value += "Valor contra partida: "+ RECURSO_FEDERAL_MUNICIPAL_OSC_PREVISTO_RS + "\n";
                }
                document.getElementById("relatorio").value += "Convenente: "+ CONVENENTE+ "\n";
                document.getElementById("relatorio").value +=  '*' + ENCAMINHAMENTO_PARA_SOLUCAO + "\n";
                document.getElementById("relatorio").value +=  '*' + IRREGULARIDADE + "\n";
                document.getElementById("relatorio").value +=  '*' + ACAO2 + "\n";

                }
            } }}
            }
        }
            else {
                document.getElementById("relatorio").value += "*" + municipio_tela + "* - "  +"\n";
                document.getElementById("relatorio").value +=  "\n_Crédito Parceria_\n\n";
                //puxa banco
            }
        
            //IF - FAZER VERIFICAÇÃO SE HÁ DADOS SALVOS NO BANCO DE DADOS
            //ELSE
            console.log("chegou aqui 1")
            document.getElementById("relatorio").value +=  "\n\n_Aluguel Social_\n\n";
            document.getElementById("relatorio").value +=  "\n\n_Goiás Social_\n\n";
        }

        

console.log("chegou aqui")
    }

function salvarBD(AluguelSocial, CreditoParceria, GoiasSocial, Municipio, DataRelatorio) {
 //RETIRAR OS DADOS DO () E COLOCAR VALIDAÇÕES
    const db = {
        AluguelSocial: AluguelSocial,
        CreditoParceria: CreditoParceria,
        GoiasSocial: GoiasSocial,
        Municipio: Municipio,
        DataRelatorio: DataRelatorio
    };
    let Relatorio_id = firebase.database().ref().child('Relatorio').push().key;
    let updates= {};
    updates['/Relatorio/' + Relatorio_id] = db;
    let relatorio_ref = firebase.database().ref();
    relatorio_ref.update(updates)
        .then (function () {
            return {success: true, message: 'Dados Salvos'};
        })
        .catch(function(error){
            return {success: false, message: `Erro, dados nao salvos: ${error.message}`};
        });

             popup("Dados salvos")
    
}

