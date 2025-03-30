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

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    DesbloqueioManager.init();
});