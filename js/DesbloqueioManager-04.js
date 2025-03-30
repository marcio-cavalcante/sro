// DesbloqueioManager.js
import { PendenciasModule } from './PendenciasModule.js';
import { ValoresModule } from './ValoresModule.js';

const DesbloqueioManager = (function() {
    let pendenciasModule;
    let valoresModule;

    function init() {
        // Inicializar os módulos
        pendenciasModule = new PendenciasModule();
        pendenciasModule.init();

        valoresModule = new ValoresModule();
        valoresModule.init();
        
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

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    DesbloqueioManager.init();
});