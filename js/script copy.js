document.getElementById('operacaoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const operacaoInput = document.getElementById('operacao').value;

    // Limpeza de toda a página
    function limparFormulario() {
        const textInputs = document.querySelectorAll('input[type="text"], textarea');
        textInputs.forEach(input => {
            input.value = '';
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
    }

    limparFormulario();

    // Tratamento do arquivo Tudo Ogu para captura dos dados
    fetch('Planilha_Tudo_Ogu.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split('|'));
            const headers = rows[0];
            const operacaoIndex = headers.indexOf('operacao');
            const dvIndex = headers.indexOf('dv');
            const convenioIndex = headers.indexOf('convenioTgov');
            const tomadorIndex = headers.indexOf('nomeTomador');
            const cnpjIndex = headers.indexOf('cnpjTomador');
            const classificacaoIndex = headers.indexOf('classificacao');
            const assinaturaIndex = headers.indexOf('assinatura');
            const objetoIndex = headers.indexOf('objeto');
            const viIndex = headers.indexOf('vi');
            const vrIndex = headers.indexOf('vr');
            const cp1Index = headers.indexOf('cp1');
            const vrDesbloqueadoIndex = headers.indexOf('vrDesbloqueado');
            const cpDesbloqueadoIndex = headers.indexOf('cpDesbloqueado');
            const valorExecucaoVigenteIndex = headers.indexOf('valorExecucaoVigente');
            const cAgenciaIndex = headers.indexOf('cAgencia');
            const agenciaIndex = headers.indexOf('agencia');
            const cCorrenteIndex = headers.indexOf('cCorrente');
            const obtvIndex = headers.indexOf('obtv');
            const gestorIndex = headers.indexOf('gestor');
            const etiquetasDaOperacaoIndex = headers.indexOf('etiquetasDaOperacao');

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
                        vi: rows[i][viIndex],
                        vr: rows[i][vrIndex],
                        cp1: rows[i][cp1Index],

                        vrDesbloqueado: rows[i][vrDesbloqueadoIndex],
                        cpDesbloqueado: rows[i][cpDesbloqueadoIndex],

                        valorExecucaoVigente: rows[i][valorExecucaoVigenteIndex],

                        cAgencia: rows[i][cAgenciaIndex],
                        agencia: rows[i][agenciaIndex],
                        cCorrente: rows[i][cCorrenteIndex],
                        obtv: rows[i][obtvIndex],
                        gestor: rows[i][gestorIndex],
                        etiquetasDaOperacao: rows[i][etiquetasDaOperacaoIndex]                        
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

            // Função para realizar cálculos convertendo o valor para o formato numérico do JavaScript
            function parseToNumber(number) {
                if (number) {
                    return parseFloat(number.replace('.', '').replace(',', '.'));
                }
                return null;
            }
            
            // Função para exibição do número formatado no estilo brasileiro.
            function formatForDisplay(number) {
                if (number !== null && !isNaN(number)) {
                    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
                return '-';
            }

            document.getElementById('operation').value = result.operacao + '-' + result.dv || 'nao achada'
            document.getElementById('convenio').value = result.convenio || '-';
            document.getElementById('tomador').value = result.tomador || '-';
            document.getElementById('cnpj').value = result.cnpjTomador || '-';
            document.getElementById('regramento').value = result.classificacao || '-';
            document.getElementById('assinatura').value = result.assinatura || '-';
            document.getElementById('objeto').value = (result.objeto || '-').toUpperCase();
            document.getElementById('vi').value = formatNumber(result.vi) || '-';
            document.getElementById('rp').value = formatNumber(result.vr) || '-';
            document.getElementById('cp').value = formatNumber(result.cp1) || '-';
            document.getElementById('cAgencia').value = result.cAgencia || '-';
            document.getElementById('agencia').value = result.agencia || '-';
            document.getElementById('cCorrente').value = result.cCorrente || '-';
            document.getElementById('obtv').value = result.obtv || '-';
            document.getElementById('gestor').value = result.gestor || '-';

            console.log("etiquetasDaOperacao from CSV:", result.etiquetasDaOperacao);
            document.getElementById('etiquetasDaOperacao').value = result.etiquetasDaOperacao || '-';
            // document.getElementById('etiquetasDaOperacao').value = result.etiquetasDaOperacao || '-'

            document.getElementById('repasseContrato').innerHTML = formatNumber(result.vr) || '-';
            document.getElementById('contrapartidaContrato').innerHTML = formatNumber(result.cp1) || '-';
            document.getElementById('investimentoContrato').innerHTML = formatNumber(result.vi) || '-';

            // Atribuindo valores à tabela de desbloqueio Contrato de Repasse
            percentRpContrato = (parseFloat(parseToNumber(result.vr)) / parseFloat(parseToNumber(result.vi)) * 100).toFixed(2)
            document.getElementById('percentRpContrato').innerHTML = percentRpContrato || '-';

            percentCpContrato = (parseFloat(parseToNumber(result.cp1)) / parseFloat(parseToNumber(result.vi)) * 100).toFixed(2)
            document.getElementById('percentCpContrato').innerHTML = percentCpContrato || '-';

            // Atribuindo valores à tabela de desbloqueio Execução Vigente
            document.getElementById('viExecVigente').innerHTML = formatNumber(result.valorExecucaoVigente) || '-';
            
            const rpExecVigente = parseToNumber(result.valorExecucaoVigente) - parseToNumber(result.cp1)
            document.getElementById('rpExecVigente').innerHTML = formatForDisplay(rpExecVigente) || '-';
            
            document.getElementById('cpExecVigente').innerHTML = formatNumber(result.cp1) || '-';
            
            const saldoReprogramar = parseToNumber(result.vr) - rpExecVigente
            document.getElementById('saldoExecVigente').innerHTML = formatForDisplay(saldoReprogramar) || '-';
            
            percentRpVigente = (rpExecVigente / parseFloat(parseToNumber(result.valorExecucaoVigente)) * 100).toFixed(2)
            document.getElementById('percentRpVigente').innerHTML = percentRpVigente || '-';

            percentCpVigente = (parseFloat(parseToNumber(result.cp1)) / parseFloat(parseToNumber(result.valorExecucaoVigente)) * 100).toFixed(2)
            document.getElementById('percentCpVigente').innerHTML = percentCpVigente || '-';
        });

});