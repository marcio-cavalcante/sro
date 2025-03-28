// DesbloqueioManager.js
import { PendenciasModule } from './PendenciasModule.js';
import { ValoresModule } from './ValoresModule.js';

const DesbloqueioManager = (function() {
    let pendenciasModule;
    let valoresModule;

    function init() {
        console.log("Inicializando DesbloqueioManager...");
        
        pendenciasModule = new PendenciasModule();
        pendenciasModule.init();

        valoresModule = new ValoresModule();
        valoresModule.init();

        // Configurar botão de verificar pendências
        const btnVerificarRadios = document.getElementById('btnVerificarRadios');
        if (btnVerificarRadios) {
            console.log("Configurando botão de verificar pendências...");
            btnVerificarRadios.addEventListener('click', function() {
                console.log("Botão Verificar Pendências clicado");
                // Usar o novo método para verificar todas as pendências de uma vez
                const pendencias = pendenciasModule.verificarTodasPendencias();
                console.log('Pendências encontradas:', pendencias);
                
                // Feedback visual para o usuário
                alert(`Verificação de pendências concluída. Foram encontradas ${pendencias.length} pendências.`);
            });
        } else {
            console.warn("Botão de verificar pendências não encontrado!");
        }
        
        // Configurar botão de calcular valores
        const btnCalcularValores = document.getElementById('btnCalcularValores');
        if (btnCalcularValores) {
            btnCalcularValores.addEventListener('click', function() {
                valoresModule.calcularTodosValores();
            });
        } else {
            console.warn("Botão de calcular valores não encontrado!");
        }
        
        // Configurar listeners para os radios de aptidão de desbloqueio
        const radiosSim = document.getElementById('simAptoDesbl');
        const radiosNao = document.getElementById('naoAptoDesbl');
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        
        if (radiosSim && radiosNao && textareaApontamento) {
            console.log("Configurando listeners para radios de aptidão...");
            radiosSim.addEventListener('change', function() {
                if (this.checked) {
                    console.log("Radio 'Sim' selecionado para aptidão");
                    // Texto padrão para medição aprovada
                    textareaApontamento.value = "Medição aprovada para desbloqueio.";
                }
            });
            
            radiosNao.addEventListener('change', function() {
                if (this.checked) {
                    console.log("Radio 'Não' selecionado para aptidão");
                    // Limpar textarea, será preenchida pelo botão de verificação
                    textareaApontamento.value = "";
                    alert('Selecione os problemas nas opções acima e depois clique no botão "Verificar Pendências" para gerar o texto do apontamento.');
                }
            });
        } else {
            console.warn("Radios de aptidão ou textarea não encontrados!");
        }

        console.log("DesbloqueioManager inicializado com sucesso!");
    }

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM totalmente carregado. Iniciando DesbloqueioManager...");
    DesbloqueioManager.init();
});