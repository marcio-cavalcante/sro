// DesbloqueioManager.js
import { PendenciasModule } from './PendenciasModule.js';
import { ValoresModule } from './ValoresModule.js';
// import { PCFModule } from './PCFModule.js';

const DesbloqueioManager = (function() {
    let pendenciasModule;
    let valoresModule;
    let pcfModule;

    function init() {
        // Inicializar os módulos
        pendenciasModule = new PendenciasModule();
        pendenciasModule.init();

        valoresModule = new ValoresModule();
        valoresModule.init();
        
        pcfModule = new PCFModule();
        pcfModule.init();

        // Garantir que os dropdowns sejam inicializados
        garantirInicializacaoDropdowns();
        
        // Configurar botão de calcular valores
        const btnCalcularValores = document.getElementById('btnCalcularValores');
        if (btnCalcularValores) {
            btnCalcularValores.addEventListener('click', function() {
                valoresModule.calcularTodosValores();
            });
        } else {
            console.warn("Botão de calcular valores não encontrado!");
        }
        
        // Remover o botão de verificar pendências, pois não será mais necessário
        const btnVerificarRadios = document.getElementById('btnVerificarRadios');
        if (btnVerificarRadios && btnVerificarRadios.parentNode) {
            btnVerificarRadios.parentNode.removeChild(btnVerificarRadios);
        }
        
        // Configurar listeners para ordem de desbloqueio (1º, Intermediário, Último)
        setupOrdemDesbloqueioListeners();
        
        // Configurar funcionalidades da seção de tarifas pendentes
        setupTarifasPendentesListeners();
        
        // Configurar botão de copiar apontamento
        setupBotaoCopiarApontamento();
        
        // Configurar listeners para os radios de aptidão de desbloqueio
        const radiosSim = document.getElementById('simAptoDesbl');
        const radiosNao = document.getElementById('naoAptoDesbl');
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        const checklist11 = document.querySelector('.checklist11');
        const checklist12 = document.querySelector('.checklist12');
        
        // Desabilitar as divs de checklist11 e checklist12 inicialmente
        if (checklist11) checklist11.style.display = 'none';
        if (checklist12) checklist12.style.display = 'none';
        
        if (radiosSim && radiosNao && textareaApontamento) {
            radiosSim.addEventListener('change', function() {
                if (this.checked) {
                    // Texto padrão para medição aprovada
                    textareaApontamento.value = "Medição aprovada para desbloqueio.";
                    
                    // Alterar visibilidade das divs
                    if (checklist11) checklist11.style.display = 'none';
                    if (checklist12) checklist12.style.display = 'block';
                }
            });
            
            radiosNao.addEventListener('change', function() {
                if (this.checked) {
                    // Limpar textarea inicialmente
                    textareaApontamento.value = "";
                    
                    // Alterar visibilidade das divs
                    if (checklist11) checklist11.style.display = 'block';
                    if (checklist12) checklist12.style.display = 'none';
                    
                    // Executar imediatamente a verificação de pendências que antes era feita pelo botão
                    const pendencias = pendenciasModule.verificarTodasPendencias();
                }
            });
        } else {
            console.warn("Radios de aptidão ou textarea não encontrados!");
        }

        setupBotaoCopiarSituacaoAtual(); // Função encarregada de copiar textos de apontamento e situação atual quando não for feito desblqueio
        setupBotaoCopiarApontamentoDesbloqueio()
        setupBotaoCopiarSituacaoDesbloqueio()
    }

    // Função para implementar o botão
function setupBotaoCopiarSituacaoAtual() {
    const btnCopiarSituacaoAtual = document.getElementById('btnCopiarSituacaoAtual');
    const valorSolicitadoInput = document.getElementById('valorSolicitado');
    
    if (!btnCopiarSituacaoAtual || !valorSolicitadoInput) {
        console.warn("Elementos para copiar situação atual não encontrados");
        return;
    }
    
    btnCopiarSituacaoAtual.addEventListener('click', function() {
        // Obter o valor digitado pelo usuário
        const valorSolicitado = valorSolicitadoInput.value.trim() || "0,00";
        
        // Criar o texto a ser copiado substituindo as chaves pelo valor
        const textoParaCopiar = `Medição apresentada pelo tomador no valor de R$ ${valorSolicitado} com pendências para desbloqueio.`;
        
        // Criar um elemento temporário para copiar o texto
        const tempInput = document.createElement('textarea');
        tempInput.value = textoParaCopiar;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Mostrar caixa de diálogo orientativa
        alert(`Medição apresentada pelo tomador no valor de R$ ${valorSolicitado} com pendências para desbloqueio.\n\n` +
              "Conteúdo para lançar na Situação Atual pronto!\n" +
              "No campo Situação Atual colar conteúdo (CTRL+V)");
    });
}

    // Função para garantir que os dropdowns sejam inicializados corretamente
    function garantirInicializacaoDropdowns() {
        // Inicializar dropdown parcelaNumero
        const parcelaNumeroSelect = document.getElementById('parcelaNumero');
        if (parcelaNumeroSelect) {
            // Limpar conteúdo atual
            parcelaNumeroSelect.innerHTML = '';
            
            // Adicionar opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Selecione';
            parcelaNumeroSelect.appendChild(optionDefault);
            
            // Adicionar números
            for (let i = 1; i <= 100; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                parcelaNumeroSelect.appendChild(option);
            }
            
            // Verificar se o primeiro desbloqueio está selecionado
            const primeiroDesbloq = document.getElementById('primeiroDesbloq');
            if (primeiroDesbloq && primeiroDesbloq.checked) {
                parcelaNumeroSelect.innerHTML = '';
                const option = document.createElement('option');
                option.value = 1;
                option.textContent = '1';
                parcelaNumeroSelect.appendChild(option);
                parcelaNumeroSelect.value = 1;
            }
        }
        
        // Inicializar dropdown instrumentoNumero
        const instrumentoNumeroSelect = document.getElementById('instrumentoNumero');
        if (instrumentoNumeroSelect) {
            // Limpar conteúdo atual
            instrumentoNumeroSelect.innerHTML = '';
            
            // Adicionar opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Selecione';
            instrumentoNumeroSelect.appendChild(optionDefault);
            
            // Adicionar números
            for (let i = 1; i <= 100; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                instrumentoNumeroSelect.appendChild(option);
            }
        }
    }
    
    // Função para configurar os listeners da ordem de desbloqueio
    function setupOrdemDesbloqueioListeners() {
        const primeiroDesbloq = document.getElementById('primeiroDesbloq');
        const intermediarioDesbloq = document.getElementById('intermediarioDesbloq');
        const ultimoDesbloq = document.getElementById('ultimoDesbloq');
        const parcelaNumeroSelect = document.getElementById('parcelaNumero');
        
        if (!primeiroDesbloq || !intermediarioDesbloq || !ultimoDesbloq || !parcelaNumeroSelect) {
            console.warn("Elementos de ordem de desbloqueio não encontrados");
            return;
        }
        
        // Função para resetar o dropdown parcelaNumero
        function resetParcelaNumero() {
            parcelaNumeroSelect.innerHTML = '';
            
            // Adicionar opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Selecione';
            parcelaNumeroSelect.appendChild(optionDefault);
            
            // Adicionar números
            for (let i = 1; i <= 100; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                parcelaNumeroSelect.appendChild(option);
            }
        }
        
        // Evento para primeiro desbloqueio
        primeiroDesbloq.addEventListener('change', function() {
            if (this.checked) {
                parcelaNumeroSelect.innerHTML = '';
                const option = document.createElement('option');
                option.value = 1;
                option.textContent = '1';
                parcelaNumeroSelect.appendChild(option);
                parcelaNumeroSelect.value = 1;
            }
        });
        
        // Eventos para intermediário e último desbloqueio
        intermediarioDesbloq.addEventListener('change', function() {
            if (this.checked) {
                resetParcelaNumero();
            }
        });
        
        ultimoDesbloq.addEventListener('change', function() {
            if (this.checked) {
                resetParcelaNumero();
            }
        });
    }
    
    // Função para configurar os listeners da seção de tarifas pendentes
    function setupTarifasPendentesListeners() {
        const tarifasPendentes = document.getElementById('tarifasPendentes');
        const tarifasInputs = document.getElementById('tarifasInputs');
        const addTarifaRow = document.getElementById('addTarifaRow');
        
        if (!tarifasPendentes || !tarifasInputs || !addTarifaRow) {
            console.warn("Elementos de tarifas pendentes não encontrados");
            return;
        }
        
        // Evento para o checkbox tarifasPendentes
        tarifasPendentes.addEventListener('change', function() {
            if (this.checked) {
                // Ocultar todo o conteúdo exceto o próprio checkbox
                const allChildren = tarifasInputs.querySelectorAll('*');
                allChildren.forEach(child => {
                    child.style.display = 'none';
                });
                
                // Também ocultar o botão de adicionar
                addTarifaRow.style.display = 'none';
                
                // Limpar todos os campos de input
                const allInputs = tarifasInputs.querySelectorAll('input[type="text"]');
                allInputs.forEach(input => {
                    input.value = '';
                });
            } else {
                // Restaurar a exibição
                const allChildren = tarifasInputs.querySelectorAll('*');
                allChildren.forEach(child => {
                    child.style.display = '';
                });
                
                // Também mostrar o botão de adicionar
                addTarifaRow.style.display = '';
            }
        });
        
        // Evento para o botão de adicionar linha de tarifa
        addTarifaRow.addEventListener('click', function() {
            // Criar nova linha
            const novaTarifaRow = document.createElement('div');
            novaTarifaRow.className = 'tarifaRow';
            
            // Criar elementos da linha
            const descLabel = document.createElement('label');
            descLabel.textContent = 'Descrição:';
            
            const descInput = document.createElement('input');
            descInput.type = 'text';
            descInput.className = 'tarifaPendDesc';
            descInput.name = 'tarifaPendDesc';
            
            const valorLabel = document.createElement('label');
            valorLabel.textContent = 'Valor:';
            
            const valorInput = document.createElement('input');
            valorInput.type = 'text';
            valorInput.name = 'tarifaPendValor';
            
            // Adicionar elementos à linha
            novaTarifaRow.appendChild(descLabel);
            novaTarifaRow.appendChild(descInput);
            novaTarifaRow.appendChild(valorLabel);
            novaTarifaRow.appendChild(valorInput);
            
            // Adicionar linha ao container
            tarifasInputs.appendChild(novaTarifaRow);
        });
    }

    // Função para configurar o botão de copiar apontamento
    function setupBotaoCopiarApontamento() {
        const btnCopiarApontamento = document.getElementById('btnCopiarApontamento');
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        
        if (!btnCopiarApontamento || !textareaApontamento) {
            console.warn("Elementos para copiar apontamento não encontrados");
            return;
        }
        
        btnCopiarApontamento.addEventListener('click', function() {
            // Verificar se há conteúdo na textarea
            if (!textareaApontamento.value.trim()) {
                alert("Não há conteúdo para copiar. Verifique se existem pendências registradas.");
                return;
            }
            
            // Copiar o conteúdo da textarea para a área de transferência
            textareaApontamento.select();
            document.execCommand('copy');
            
            // Mostrar caixa de diálogo orientativa
            alert("Conteúdo para lançar no apontamento pronto!\n\n" +
                  "Criar novo apontamento no REUNI\n" +
                  "Item: INFO - Etapa: Dispensado preenchimento\n" +
                  "Atuação: Operacional - Fase: Desbloqueio\n" +
                  "No campo Descrição Colar conteúdo (CTRL+V)");
                  
            // Remover a seleção
            window.getSelection().removeAllRanges();
        });
    }

    // Função para configurar o botão de copiar situação de desbloqueio (Botão 2 da checklist12)
function setupBotaoCopiarSituacaoDesbloqueio() {
    const btnCopiarSituacaoPC = document.getElementById('btnCopiarSituacaoPC');
    const parcelaNumeroSelect = document.getElementById('parcelaNumero');
    const primeiroDesbloq = document.getElementById('primeiroDesbloq');
    const intermediarioDesbloq = document.getElementById('intermediarioDesbloq');
    const ultimoDesbloq = document.getElementById('ultimoDesbloq');
    const valorSolicitadoInput = document.getElementById('valorSolicitado');
    const numeroCeDesblInput = document.getElementById('numeroCeDesbl');
    
    if (!btnCopiarSituacaoPC || !parcelaNumeroSelect || !primeiroDesbloq || 
        !intermediarioDesbloq || !ultimoDesbloq || !valorSolicitadoInput || !numeroCeDesblInput) {
        console.warn("Elementos para copiar situação de desbloqueio não encontrados");
        return;
    }
    
    btnCopiarSituacaoPC.addEventListener('click', function() {
        // Verificar se algum radio da ordem de desbloqueio está marcado
        if (!primeiroDesbloq.checked && !intermediarioDesbloq.checked && !ultimoDesbloq.checked) {
            alert("Verifique se o item informando a ordem do desbloqueio foi marcado.");
            return;
        }
        
        // Obter a parcela selecionada
        const parcela = parcelaNumeroSelect.value;
        if (!parcela) {
            alert("Selecione o número da parcela.");
            return;
        }
        
        // Obter a data atual formatada
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        
        // Obter os outros valores necessários
        const valorSolicitado = valorSolicitadoInput.value.trim() || "0,00";
        const numeroCe = numeroCeDesblInput.value.trim() || "XXXXX";
        
        // Primeira parte do texto para o alert (primeira frase do texto do botão 1)
        const primeiraParte = `Registrar/anexar no Transferegov.br a comprovação da execução financeira referente à mensagem de autorização de saque CE ${numeroCe} emitida em ${dataFormatada} no valor de R$ ${valorSolicitado}.`;
        
        // Determinar o texto a ser copiado com base no radio selecionado
        let textoParaCopiar = "";
        
        if (primeiroDesbloq.checked || intermediarioDesbloq.checked) {
            textoParaCopiar = `Realizado desbloqueio OBTV referente a Parcela ${parcela} em ${dataFormatada}. Aguardando a comprovação de execução financeira e nova medição/RRE.`;
        } else if (ultimoDesbloq.checked) {
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
}

// Função para configurar o botão de copiar apontamento de desbloqueio (Botão 1 da checklist12)
function setupBotaoCopiarApontamentoDesbloqueio() {
    const btnCopiarApontamentoPC = document.getElementById('btnCopiarApontamentoPC');
    const valorSolicitadoInput = document.getElementById('valorSolicitado');
    const numeroCeDesblInput = document.getElementById('numeroCeDesbl');
    
    if (!btnCopiarApontamentoPC || !valorSolicitadoInput || !numeroCeDesblInput) {
        console.warn("Elementos para copiar apontamento de desbloqueio não encontrados");
        return;
    }
    
    btnCopiarApontamentoPC.addEventListener('click', function() {
        // Obter os valores necessários
        const valorSolicitado = valorSolicitadoInput.value.trim() || "0,00";
        const numeroCe = numeroCeDesblInput.value.trim() || "XXXXX";
        
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

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule,
        pcf: () => pcfModule
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    DesbloqueioManager.init();
});