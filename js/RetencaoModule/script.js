document.getElementById('operacaoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const operacaoInput = document.getElementById('operacao').value;

    function limparFormulario() {
        const textInputs = document.querySelectorAll('input[type="text"], textarea');
        textInputs.forEach(input => { input.value = ''; });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => { checkbox.checked = false; });

        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => { radio.checked = false; });

        const selects = document.querySelectorAll('select');
        selects.forEach(select => { select.selectedIndex = 0; });

        const etiquetasContainer = document.getElementById('etiquetasDaOperacaoContainer');
        if (etiquetasContainer) { etiquetasContainer.innerHTML = ''; };
    }

    limparFormulario();

    // Tratamento do arquivo Tudo Ogu para captura dos dados
    fetch('/Planilha_Tudo_Ogu.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split('|'));
            const headers = rows[0];
            const operacaoIndex = headers.indexOf('operacao');
            const dvIndex = headers.indexOf('dv');
            const convenioIndex = headers.indexOf('convenioTgov');
            const tomadorIndex = headers.indexOf('nomeTomador');
            const cnpjIndex = headers.indexOf('cnpjTomador');
            const emailTomadorIndex = headers.indexOf('emailTomador');
            const classificacaoIndex = headers.indexOf('classificacao');
            const assinaturaIndex = headers.indexOf('assinatura');
            const objetoIndex = headers.indexOf('objeto');
            const cAgenciaIndex = headers.indexOf('cAgencia');
            const agenciaIndex = headers.indexOf('agencia');
            const cCorrenteIndex = headers.indexOf('cCorrente');

            let result = {};
            for (let i = 1; i < rows.length; i++) {
                if (rows[i][operacaoIndex] === operacaoInput) {
                    result = {
                        operacao: rows[i][operacaoIndex],
                        dv: rows[i][dvIndex],
                        convenio: rows[i][convenioIndex],
                        tomador: rows[i][tomadorIndex],
                        cnpjTomador: rows[i][cnpjIndex],
                        classificacao: rows[i][classificacaoIndex],
                        assinatura: rows[i][assinaturaIndex],
                        objeto: rows[i][objetoIndex],
                        cAgencia: rows[i][cAgenciaIndex],
                        agencia: rows[i][agenciaIndex],
                        cCorrente: rows[i][cCorrenteIndex],
                        emailTomador: rows[i][emailTomadorIndex],
                    };
                    break;
                }
            }

            // Função para formatar o número para "999.999,99"
            function formatNumber(number) {
                if (number) {
                    let num = parseFloat(number.replace(',', '.'));
                    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
                return '-';
            }

            // Atribuindo valores aos campos correspodentes no navegador de acordo com a operação selecionada
            document.getElementById('operation').value = result.operacao + '-' + result.dv || 'nao achada'
            document.getElementById('convenio').value = result.convenio || '-';
            document.getElementById('tomador').value = result.tomador || '-';
            document.getElementById('cnpj').value = result.cnpjTomador || '-';
            document.getElementById('emails').value = result.emailTomador || '-';
            document.getElementById('regramento').value = result.classificacao || '-';
            document.getElementById('assinatura').value = result.assinatura || '-';
            document.getElementById('objeto').value = (result.objeto || '-').toUpperCase();
            document.getElementById('cAgencia').value = result.cAgencia || '-';
            document.getElementById('agencia').value = result.agencia || '-';
            document.getElementById('cCorrente').value = result.cCorrente || '-';
        })
        .catch(error => {
            console.error("Error fetching or processing CSV:", error);
        });
});

//Formata campo numerico R$
document.getElementById('valorTarifa').addEventListener('input', function (event) {
    let value = event.target.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Converte para número e formata
    if (value) {
        let num = parseFloat(value) / 100; // Dividir por 100 para ajuste de casas decimais
        event.target.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});

//Formata campo Aliquota
document.getElementById('aliquotaTarifa').addEventListener('input', function (event) {
    let value = event.target.value;

    // Remove qualquer caractere que não seja número ou vírgula
    value = value.replace(/\D/g, '');

    if (value) {
        let num = parseFloat(value) / 100; // Dividir por 100 para ajustar casas decimais
        event.target.value = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
});

//BOTAO DESUSO
// document.getElementById('btnConfirma').addEventListener('click', function () {
//     const selectElement = document.getElementById('preDefinidas');
//     const selectedValue = selectElement.value;
    
//     // Verifica se algum valor foi selecionado (diferente do disabled)
//     if (selectedValue !== "") {
//         document.getElementById('aliquotaTarifa').value = selectedValue;
//         document.getElementById('tax').value = "IR";
//     }

//     // Captura os elementos de entrada
//     const valorTarifaElement = document.getElementById('valorTarifa');
//     const aliquotaTarifaElement = document.getElementById('aliquotaTarifa');
//     const valorBrutoElement = document.getElementById('valorBruto');
//     const retencaoElement = document.getElementById('retencao');
//     const valorLiquidoElement = document.getElementById('valorLiquido');

//     // Obtém os valores e remove caracteres não numéricos
//     let valorTarifa = parseFloat(valorTarifaElement.value.replace(/[^0-9,]/g, '').replace(',', '.'));
//     let aliquotaTarifa = parseFloat(aliquotaTarifaElement.value.replace(/[^0-9,]/g, '').replace(',', '.'));

//     // Verifica se os campos possuem valores válidos
//     if (!isNaN(valorTarifa) && !isNaN(aliquotaTarifa)) {
//         let valorBruto = valorTarifa;
//         let retencao = (valorBruto * aliquotaTarifa) / 100;
//         let valorLiquido = valorBruto - retencao;

//         // Aplica os valores formatados aos campos correspondentes
//         valorBrutoElement.value = valorBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         retencaoElement.value = retencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         valorLiquidoElement.value = valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//     }
// });


document.getElementById('btnConfirma').addEventListener('click', function () {
    const selectElement = document.getElementById('preDefinidas');
    const selectedValue = selectElement.value;
    
    // Verifica se algum valor foi selecionado (diferente do disabled)
    if (selectedValue !== "") {
        document.getElementById('aliquotaTarifa').value = selectedValue;
        document.getElementById('tax').value = "IR";
    }

    // Captura os elementos de entrada
    const valorTarifaElement = document.getElementById('valorTarifa');
    const aliquotaTarifaElement = document.getElementById('aliquotaTarifa');
    const valorBrutoElement = document.getElementById('valorBruto');
    const retencaoElement = document.getElementById('retencao');
    const valorLiquidoElement = document.getElementById('valorLiquido');
    const convenioElement = document.getElementById('convenio');
    const operacaoElement = document.getElementById('operation');
    const tomadorElement = document.getElementById('tomador');
    const servicoElement = document.getElementById('servico');
    const taxElement = document.getElementById('tax');
    const descricaoGuiaElement = document.getElementById('descricaoGuia');
    const apontamentoElement = document.getElementById('apontamento');

    // Obtém os valores e remove caracteres não numéricos
    let valorTarifa = parseFloat(valorTarifaElement.value.replace(/[^0-9,]/g, '').replace(',', '.'));
    let aliquotaTarifa = parseFloat(aliquotaTarifaElement.value.replace(/[^0-9,]/g, '').replace(',', '.'));

    // Verifica se os campos possuem valores válidos
    if (!isNaN(valorTarifa) && !isNaN(aliquotaTarifa)) {
        let valorBruto = valorTarifa;
        let retencao = (valorBruto * aliquotaTarifa) / 100;
        let valorLiquido = valorBruto - retencao;

        // Aplica os valores formatados aos campos correspondentes
        valorBrutoElement.value = valorBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        retencaoElement.value = retencao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        valorLiquidoElement.value = valorLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Monta o texto para `descricaoGuia`
        descricaoGuiaElement.value = `Instrumento ${convenioElement.value} - Operação ${operacaoElement.value} - ${tomadorElement.value} - ${servicoElement.value}. Valor Bruto ${valorBrutoElement.value} com retenção de ${taxElement.value} de ${retencaoElement.value}. Apresentar o comprovante de recolhimento do ${taxElement.value}.`;

        // Monta o texto para `apontamento`
        apontamentoElement.value = `Valor bruto da tarifa de ${valorBrutoElement.value}, com retenção de ${taxElement.value} ${retencaoElement.value}, tendo a guia sido emitida pelo valor líquido. Ref.: ${servicoElement.value}. OBS: Apresentar o comprovante de recolhimento do ${taxElement.value} junto com a guia quitada.`;
    }
});
