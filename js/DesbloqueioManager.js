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

        // Configurar o botão de verificar pendências
        const btnVerificarRadios = document.getElementById('btnVerificarRadios');
        if (btnVerificarRadios) {
            btnVerificarRadios.addEventListener('click', function() {
                // Obter todas as pendências atuais
                const pendencias = pendenciasModule.getPendencias();
                console.log('Pendências atuais:', pendencias);

                // Atualizar a textarea de apontamentos
                pendenciasModule.atualizarTextarea();

                // Se desejar dar feedback visual ao usuário
                alert('Verificação de pendências concluída. Foram encontradas ' + pendencias.length + ' pendências.');
            });
        }
    }

    return {
        init: init,
        pendencias: () => pendenciasModule,
        valores: () => valoresModule,
        formatarValor: (input) => valoresModule.formatarValor(input),
        calcularRateio: () => valoresModule.calcularRateio(),
        calcularRateioVigente: () => valoresModule.calcularRateioVigente(),
        verificarRadios: (nomeDoGrupo, mensagens) => pendenciasModule.verificarRadios(nomeDoGrupo, mensagens)
    };
})();

document.addEventListener('DOMContentLoaded', DesbloqueioManager.init);