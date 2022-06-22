function MudaSelect() {//troca os projetos de acordo com a gerencia

    var selectSetor = document.getElementById('municipio');
       
    //remove itens
    var length = selectSetor.options.length;
    var i;
    for (i = selectSetor.options.length - 1; i >= 0; i--) {
        selectSetor.remove(i);
    }

    var inicial = document.createElement('option');
    inicial.value = "";
    inicial.text = "--Selecione o Municipio--";
    selectSetor.add(inicial);

        fetch('Municipio.txt')
            .then(response => response.text())
            .then(text => {
                const array = text.split("\r\n");
                const Select = document.getElementById("municipio");
                array.forEach((array) => {
                    option = new Option(array, array);
                    Select.options[Select.options.length] = option;
                })

            });

    }
