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

        // MODIFICADO: Configurar botão de verificar pendências para usar o novo método
        const btnVerificarRadios = document.getElementById('btnVerificarRadios');
        if (btnVerificarRadios) {
            btnVerificarRadios.addEventListener('click', function() {
                // Usar o novo método para verificar todas as pendências de uma vez
                const pendencias = pendenciasModule.verificarTodasPendencias();
                console.log('Pendências atuais:', pendencias);
                
                // Feedback visual para o usuário
                alert('Verificação de pendências concluída. Foram encontradas ' + pendencias.length + ' pendências.');
            });
        }
        
        // ADICIONADO: Novo botão para calcular valores
        const btnCalcularValores = document.getElementById('btnCalcularValores');
        if (btnCalcularValores) {
            btnCalcularValores.addEventListener('click', function() {
                valoresModule.calcularTodosValores();
            });
        }
        
        // ADICIONADO: Configurar listeners para os radios de aptidão de desbloqueio
        const radiosSim = document.getElementById('simAptoDesbl');
        const radiosNao = document.getElementById('naoAptoDesbl');
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        
        if (radiosSim && radiosNao && textareaApontamento) {
            radiosSim.addEventListener('change', function() {
                if (this.checked) {
                    // Texto padrão para medição aprovada
                    textareaApontamento.value = "Medição aprovada para desbloqueio.";
                }
            });
            
            radiosNao.addEventListener('change', function() {
                if (this.checked) {
                    // Limpar textarea, será preenchida pelo botão de verificação
                    textareaApontamento.value = "";
                    alert('Clique no botão "Verificar Pendências" para gerar o texto do apontamento.');
                }
            });
        }
    }

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule
    };
})();

document.addEventListener('DOMContentLoaded', DesbloqueioManager.init);