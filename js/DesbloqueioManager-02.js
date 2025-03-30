// DesbloqueioManager.js
import { PendenciasModule } from './PendenciasModule.js';
import { ValoresModule } from './ValoresModule.js';

const DesbloqueioManager = (function() {
    let pendenciasModule;
    let valoresModule;

    function init() {
        pendenciasModule = new PendenciasModule();
        pendenciasModule.init();

        valoresModule = new ValoresModule();
        valoresModule.init();
        
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

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    DesbloqueioManager.init();
});