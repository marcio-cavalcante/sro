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
        document.getElementById('repasseContrato').innerHTML = formatNumber(result.vr) || '-';
        document.getElementById('contrapartidaContrato').innerHTML = formatNumber(result.cp1) || '-';
        document.getElementById('investimentoContrato').innerHTML = formatNumber(result.vi) || '-';

        
        //ALTERATIVA ETIQUETAS SEM COR
        const container = document.getElementById("etiquetasDaOperacaoContainer");

const medirTexto = (texto, fonte) => {
    const canvas = document.createElement("canvas");
    const contexto = canvas.getContext("2d");
    contexto.font = fonte || "16px Arial"; 
    return contexto.measureText(texto).width;
};

etiquetasArray.forEach(etiqueta => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = etiqueta;
    input.readOnly = true;
    input.className = "etiqueta-input";

    // Define largura baseada no texto + um espaço extra mínimo
    input.style.width = (medirTexto(etiqueta, "16px Arial") + 20) + "px"; 

    container.appendChild(input);
});


//ETIQUETAS
// const container = document.getElementById("etiquetasDaOperacaoContainer");

// // Mapeamento de grupos e cores
// const gruposComCores = {
//     "situação do contrato": "brown",   // Marrom
//     "características do contrato": "green",  // Verde
//     // Adicione mais grupos conforme necessário
// };

// // Definição das etiquetas e seus grupos
// var etiquetasArray = [
//     { texto: "Obra Paralisada", grupo: "situação do contrato" },
//     { texto: "Módulo Paralisadas", grupo: "situação do contrato" },
//     { texto: "OBTV", grupo: "características do contrato" },
//     { texto: "CPS 29/2017 - MAPA", grupo: "características do contrato" }
// ];

// etiquetasArray.forEach(etiqueta => {
//     const input = document.createElement("input");
//     input.type = "text";
//     input.value = etiqueta.texto;
//     input.readOnly = true;
//     input.className = "etiqueta-input";

//     // Define a largura com base no tamanho do texto
//     input.style.width = (etiqueta.texto.length * 10) + "px";

//     // Aplica a cor com base no grupo da etiqueta
//     const cor = gruposComCores[etiqueta.grupo]; // Busca a cor no mapeamento
//     if (cor) {
//         input.style.backgroundColor = cor;
//         input.style.color = "white"; // Texto branco para melhor contraste
//         input.style.padding = "5px"; // Adiciona um pequeno espaço interno
//         input.style.borderRadius = "5px"; // Bordas arredondadas para melhor visualização
//     }

//     container.appendChild(input);
// });



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

        // Valores atribuidos à tabela de controle de desbloqueios e saldos
        document.getElementById('repasseDesbloqueado').innerHTML = formatNumber(result.vrDesbloqueado) || '-';
        document.getElementById('contrapartidaDesbloqueada').innerHTML = formatNumber(result.cpDesbloqueado) || '-';

        saldoRpDesbloquear = parseFloat(parseToNumber(result.vr)) - parseFloat(parseToNumber(result.vrDesbloqueado))
        document.getElementById('repasseSaldoDesbloquear').innerHTML = formatForDisplay(saldoRpDesbloquear) || '-';

        saldoCpDesbloquear = parseFloat(parseToNumber(result.cp1)) - parseFloat(parseToNumber(result.cpDesbloqueado))
        document.getElementById('contrapartidaSaldoDesbloquear').innerHTML = formatForDisplay(saldoCpDesbloquear) || '-';
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
    // Aqui você pode adicionar mais lógica, como salvar dados ou atualizar o DOM