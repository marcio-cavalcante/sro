document.getElementById('operacaoForm').addEventListener('submit', function(event) {
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
            const etiquetasDaOperacaoIndex = headers.findIndex(header => 
                header.trim().startsWith('etiquetasDaOperacao'));
            
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
                        emailTomador: rows[i][emailTomadorIndex],
                        etiquetasDaOperacao: rows[i][etiquetasDaOperacaoIndex] || ''
                    };  
                    break;
                }
            }

            const etiquetasDaOperacaoDicionario = result.etiquetasDaOperacao;
            const etiquetasArray = etiquetasDaOperacaoDicionario.split(",").map(item => item.trim());

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

        // Atribuindo valores aos campos correspodentes no navegador de acordo com a operação selecionada
        document.getElementById('operation').value = result.operacao + '-' + result.dv || 'nao achada'
        document.getElementById('convenio').value = result.convenio || '-';
        document.getElementById('tomador').value = result.tomador || '-';
        document.getElementById('cnpj').value = result.cnpjTomador || '-';
        document.getElementById('emails').value = result.emailTomador || '-';
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

        // Função para exibir as etiquetas no container
        const container = document.getElementById("etiquetasDaOperacaoContainer");
        
        etiquetasArray.forEach(etiqueta => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = etiqueta; // Define o valor como o texto da etiqueta
            input.readOnly = true; // Torna o input apenas leitura
            input.className = "etiqueta-input"; // Classe para estilização (opcional)
            container.appendChild(input); // Adiciona o input ao container
        });
    })
    .catch(error => {
        console.error("Error fetching or processing CSV:", error);
    });

    //GESTAO DA PRODUTIVIDADE
    window.horaInicio;

    function iniciarContagem() {
        horaInicio = new Date(); // Registra o horário de início
        const horaInicioFormatada = horaInicio.toLocaleTimeString("pt-BR");
        document.getElementById("hora-inicio").value = horaInicioFormatada;
    }
    
    iniciarContagem()
  
});

let horaFim;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrar-atividade").addEventListener("click", encerrarContagem);
  });
  
  function encerrarContagem() {
    console.log("Atividade finalizada!");

    horaFim = new Date(); // Registra o horário de término
    const horaFimFormatada = horaFim.toLocaleTimeString("pt-BR");
    document.getElementById("hora-fim").value = horaFimFormatada;

    const timeSpentMs = horaFim - window.horaInicio; // Calcula o tempo em milissegundos
    const seconds = Math.floor((timeSpentMs / 1000) % 60); // Extrai os segundos
    const minutes = Math.floor((timeSpentMs / (1000 * 60)) % 60); // Extrai os minutos
    const hours = Math.floor(timeSpentMs / (1000 * 60 * 60)); // Extrai as horas
  
    // Formata o resultado como HH:MM:SS
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById("tempo-total").value = formattedTime;

    console.log(formattedTime);
  }

    //Controla Visibilidade da aba de apontamentos de Procedimentos Pós Análises - CHECKLIST12
    const checklist12 = document.querySelector('.checklist12');
    const radiosSim = document.getElementById('simAptoDesbl');
    const radiosNao = document.getElementById('naoAptoDesbl');
    
    // Desabilitar a DIV CHECKLIST12 inicialmente
    if (checklist12) checklist12.style.display = 'none';

    if (radiosSim && radiosNao) {
        radiosSim.addEventListener('change', function() {
            if (this.checked) {
                // Habilita DIV
                if (checklist12) checklist12.style.display = 'block';
            }
        });
        radiosNao.addEventListener('change', function() {
            if (this.checked) {
                // checagemMinimaApontamentos()
                // // Desabilita DIV
                if (checklist12) checklist12.style.display = 'none';
            }
        });
    } else {
        console.warn("Radios de aptidão ou textarea não encontrados!");
    };

    // Ao clicar no botão para abrir o diálogo
    btnEnviarFasAssinatura.addEventListener('click', function() {
        dialogo.showModal(); // Exibe o diálogo
    });

    // Lógica do botão de confirmação
    confirmarBtn.addEventListener('click', function () {
        let selecionado = document.querySelector('input[name="fasPara"]:checked');
        
        if (!selecionado) {
            alert("Por favor, selecione um destinatário.");
            return;
        }

        let fasPara = selecionado.value; // Captura o valor escolhido
        const fasTomador = document.getElementById('tomador').value;
        const fasOperacao = document.getElementById('operation').value;
        
        let fasAssunto = `Solicita Autorização para Desbloqueio (FAS) - ${fasTomador} - Operação ${fasOperacao}`;
        let fasCorpo = `À\nCoordenação\n\n1. Segue Ficha de Autorização de Saque (FAS) da operação ${fasOperacao} - ${fasTomador}, para sua verificação e assinatura.`;
    
        let mailtoLink = `mailto:${fasPara}?subject=${encodeURIComponent(fasAssunto)}&body=${encodeURIComponent(fasCorpo)}`;
        window.location.href = mailtoLink;

        dialogo.close(); // Fecha o diálogo após o envio
    });

    // Fechar o diálogo ao clicar no botão de cancelar
    cancelarBtn.addEventListener('click', function () {
        dialogo.close(); // Fecha o diálogo ao cancelar
    });
    







    // Função para configurar o botão de copiar apontamento de desbloqueio (Botão 1 da checklist12)
function setupBotaoCopiarApontamentoDesbloqueio() {
    const btnCopiarApontamentoPC = document.getElementById('btnCopiarApontamentoPC');
    // const valorSolicitadoInput = document.getElementById('valorSolicitado');
    const numeroCeDesblInput = document.getElementById('numeroCeDesbl');
    
    // if (!btnCopiarApontamentoPC || !valorSolicitadoInput || !numeroCeDesblInput) {
    //     console.warn("Elementos para copiar apontamento de desbloqueio não encontrados");
    //     return;
    // }
    
    btnCopiarApontamentoPC.addEventListener('click', function() {
        // Obter os valores necessários
        // const valorSolicitado = valorSolicitadoInput.value.trim() || "0,00";
        const valorSolicitado = document.getElementById('viDesbloquear').value
        const numeroCe = numeroCeDesblInput.value.trim() || "INFORME A CE DE DESBLOQUEIO";
        
        // Obter a data atual formatada
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        
        // Criar o texto a ser copiado substituindo as chaves pelos valores
        const textoParaCopiar = `Registrar/anexar no Transferegov.br a comprovação da execução financeira referente à mensagem de autorização de saque CE ${numeroCe} emitida em ${dataFormatada} no valor de R$ ${valorSolicitado}.\nAtenção: Solicitamos que nos seja informada via e-mail, tão logo seja efetivada, a referida prestação de contas.`;
        
        // Criar um elemento temporário para copiar o texto
        const tempInput = document.createElement('textarea');
        tempInput.value = textoParaCopiar;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Mostrar caixa de diálogo orientativa
        alert("Conteúdo para lançar no apontamento pronto!\n\n" +
              "Criar novo apontamento no REUNI\n" +
              "Item: INFO - Etapa: Dispensado preenchimento\n" +
              "Atuação: Operacional - Fase: Desbloqueio\n" +
              "No campo Descrição Colar conteúdo (CTRL+V)");
    });
}
setupBotaoCopiarApontamentoDesbloqueio()





// Função para configurar o botão de copiar situação de desbloqueio (Botão 2 da checklist12)
// function setupBotaoCopiarSituacaoDesbloqueio() {
    const btnCopiarSituacaoPC = document.getElementById('btnCopiarSituacaoPC');
    
    // if (!btnCopiarSituacaoPC || !parcelaNumeroSelect || !primeiroDesbloq || 
    //     !intermediarioDesbloq || !ultimoDesbloq || !valorSolicitadoInput || !numeroCeDesblInput) {
    //     console.warn("Elementos para copiar situação de desbloqueio não encontrados");
    //     return;
    // }
    
    btnCopiarSituacaoPC.addEventListener('click', function() {

        const parcelaNumeroSelect = document.getElementById('parcelaNumero');
        const ordemDesbloqueio = document.getElementById('ordemDesbloqueio').value;
        console.log('ordemDesbloqueio 1', ordemDesbloqueio)
        // const primeiroDesbloq = document.getElementById('primeiroDesbloq');
        // const intermediarioDesbloq = document.getElementById('intermediarioDesbloq');
        // const ultimoDesbloq = document.getElementById('ultimoDesbloq');
        const valorSolicitadoInput = document.getElementById('viDesbloquear').value;
        const numeroCeDesblInput = document.getElementById('numeroCeDesbl');

        
        // Verificar se algum radio da ordem de desbloqueio está marcado
        // if (!primeiroDesbloq.checked && !intermediarioDesbloq.checked && !ultimoDesbloq.checked) {
        //     alert("Verifique se o item informando a ordem do desbloqueio foi marcado.");
        //     return;
        // }
        
        // Obter a parcela selecionada
        const parcela = parcelaNumeroSelect.value;
        if (!parcela) {
            alert("Número da parcela inválido, verifique o apontamento.");
            return;
        }
        
        // Obter a data atual formatada
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        
        // Obter os outros valores necessários
        // const valorSolicitado = valorSolicitadoInput.value.trim() || "0,00";
        // const numeroCe = numeroCeDesblInput.value.trim() || "XXXXX";
        
        // Primeira parte do texto para o alert (primeira frase do texto do botão 1)
        // const primeiraParte = `Registrar/anexar no Transferegov.br a comprovação da execução financeira referente à mensagem de autorização de saque CE ${numeroCe} emitida em ${dataFormatada} no valor de R$ ${valorSolicitado}.`;
        
        // Determinar o texto a ser copiado com base no radio selecionado
        let textoParaCopiar = "";
        console.log(ordemDesbloqueio)
        if (ordemDesbloqueio === "Primeiro" || ordemDesbloqueio === "Intermediário") {
            textoParaCopiar = `Realizado desbloqueio OBTV referente a Parcela ${parcela} em ${dataFormatada}. Aguardando a comprovação de execução financeira e nova medição/RRE.`;
        } else if (ordemDesbloqueio === "Último") {
            textoParaCopiar = `Realizado desbloqueio OBTV referente a Parcela ${parcela} em ${dataFormatada}, devendo ser realizada a Prestação de Contas Final.`;
        }
        
        // Criar um elemento temporário para copiar o texto
        const tempInput = document.createElement('textarea');
        tempInput.value = textoParaCopiar;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Mostrar caixa de diálogo orientativa
        alert(`${textoParaCopiar}\n\n` +
              "Conteúdo para lançar na Situação Atual pronto!\n" +
              "No campo Situação Atual colar conteúdo (CTRL+V)");
    });
// }