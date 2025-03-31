// PCFModule.js - Módulo para gerenciar funcionalidades de Prestação de Contas Final

export class PCFModule {
    constructor() {
        this.elements = {};
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        
        // Atualizar o texto imediatamente
        setTimeout(() => {
            this.atualizarTextoPCF();
        }, 50);
        
        // E também após um tempo maior para garantir que outros componentes carregaram
        setTimeout(() => {
            this.atualizarTextoPCF();
        }, 500);
    }

    cacheElements() {
        this.elements.textareaPCF = document.getElementById('prestacaoContasFinal');
        this.elements.btnCopiarPCF = document.getElementById('btnCopiarPCF');
        this.elements.assinaturaInput = document.getElementById('assinatura');
        this.elements.operacaoForm = document.getElementById('operacaoForm');
        this.elements.ultimoDesbloq = document.getElementById('ultimoDesbloq');
    }

    setupEventListeners() {
        // Verificar se todos os elementos necessários foram encontrados
        if (!this.elements.textareaPCF || !this.elements.btnCopiarPCF) {
            console.warn("Elementos essenciais de Prestação de Contas Final não encontrados");
            return;
        }
        
        // Adicionar evento ao botão de copiar
        this.elements.btnCopiarPCF.addEventListener('click', () => this.copiarTextoPCF());
        
        // Adicionar evento para quando o formulário de operação for submetido
        if (this.elements.operacaoForm) {
            this.elements.operacaoForm.addEventListener('submit', () => {
                // Esperar um pouco para que os campos sejam preenchidos
                setTimeout(() => this.atualizarTextoPCF(), 1000);
            });
        }
        
        // Adicionar evento para quando a data de assinatura mudar
        if (this.elements.assinaturaInput) {
            this.elements.assinaturaInput.addEventListener('change', () => this.atualizarTextoPCF());
        }
        
        // Adicionar evento para quando o último desbloqueio for selecionado
        if (this.elements.ultimoDesbloq) {
            this.elements.ultimoDesbloq.addEventListener('change', () => {
                if (this.elements.ultimoDesbloq.checked) {
                    this.atualizarTextoPCF();
                }
            });
        }
        
        // Adicionar evento para garantir que o texto é atualizado quando a div for mostrada
        const checklist10 = document.querySelector('.checklist10');
        if (checklist10) {
            // Usar MutationObserver para detectar mudanças de visibilidade
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        // Se a div ficar visível, atualizar o texto
                        if (checklist10.style.display !== 'none') {
                            this.atualizarTextoPCF();
                        }
                    }
                }
            });
            
            observer.observe(checklist10, { attributes: true });
        }
    }

    atualizarTextoPCF() {
        console.log("Atualizando texto PCF...");
        
        // Verificar se a textarea existe
        if (!this.elements.textareaPCF) {
            console.warn("Textarea de PCF não encontrada");
            return;
        }
        
        // Verificar se o último desbloqueio está selecionado
        if (this.elements.ultimoDesbloq && !this.elements.ultimoDesbloq.checked) {
            console.log("Último desbloqueio não está selecionado, texto PCF não será atualizado");
            return;
        }
        
        // Obter a data de assinatura
        let dataAssinaturaStr = '';
        if (this.elements.assinaturaInput) {
            dataAssinaturaStr = this.elements.assinaturaInput.value.trim();
        }
        
        // Se não houver data, não mostrar mensagem
        if (!dataAssinaturaStr) {
            console.log("Data de assinatura não encontrada");
            return;
        }
        
        // Tentar converter a string para um objeto Date
        // Formato esperado: DD/MM/AAAA
        const partesData = dataAssinaturaStr.split('/');
        if (partesData.length !== 3) {
            this.elements.textareaPCF.value = 'Formato de data inválido. Deve ser DD/MM/AAAA.';
            return;
        }
        
        const dia = parseInt(partesData[0], 10);
        const mes = parseInt(partesData[1], 10) - 1; // Mês em JavaScript é 0-11
        const ano = parseInt(partesData[2], 10);
        
        const dataAssinatura = new Date(ano, mes, dia);
        
        // Verificar se a data é válida
        if (isNaN(dataAssinatura.getTime())) {
            this.elements.textareaPCF.value = 'Data inválida.';
            return;
        }
        
        // Definir as datas de referência para comparação
        const data20010101 = new Date(2001, 0, 1); // 01/01/2001
        const data20160831 = new Date(2016, 7, 31); // 31/08/2016
        const data20170101 = new Date(2017, 0, 1); // 01/01/2017
        const data20181231 = new Date(2018, 11, 31); // 31/12/2018
        const data20190101 = new Date(2019, 0, 1); // 01/01/2019
        const data20230831 = new Date(2023, 7, 31); // 31/08/2023
        const data20230901 = new Date(2023, 8, 1); // 01/09/2023
        
        // Determinar qual texto exibir com base na data
        let texto = '';
        
        if (dataAssinatura >= data20010101 && dataAssinatura <= data20160831) {
            texto = "Contrato concluído, com última parcela liberada. Solicitamos que após o pagamento ao fornecedor, seja providenciada a devolução do saldo de repasse e rendimentos e efetivada a prestação de contas final.";
        } else if (dataAssinatura >= data20170101 && dataAssinatura <= data20181231) {
            texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, sob pena de Notificação de Irregularidade, conforme PI nº 424/2016 e IN MPDG nº 002/2018 e as respectivas alterações.";
        } else if (dataAssinatura >= data20190101 && dataAssinatura <= data20230831) {
            texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, sob pena de Notificação de Irregularidade, conforme PI nº 424/2016 e IN MPDG nº 002/2018 e as respectivas alterações. Para este contrato, o saldo remanescente deverá ser devolvido integralmente à União. Utilizar a opção 'Cálculo Manual pelo Convenente', no Transferegov, comunicando a GIGOV, após a solicitação da autorização.";
        } else if (dataAssinatura >= data20230901) {
            texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, utilizando o cálculo automático do TransfereGov, sob pena de Notificação de Irregularidade, conforme PC nº 33/2023 e as respectivas alterações.";
        } else {
            texto = "Data fora dos períodos previstos para instruções específicas de PCF.";
        }
        
        // Atualizar a textarea
        this.elements.textareaPCF.value = texto;
        console.log("Texto PCF atualizado com sucesso:", texto.substring(0, 30) + "...");
    }

    copiarTextoPCF() {
        // Verificar se há conteúdo na textarea
        if (!this.elements.textareaPCF.value.trim()) {
            alert("Não há conteúdo para copiar. Verifique se a data de assinatura foi informada corretamente e se o último desbloqueio está selecionado.");
            return;
        }
        
        // Copiar o conteúdo da textarea para a área de transferência
        this.elements.textareaPCF.select();
        document.execCommand('copy');
        
        // Mostrar caixa de diálogo orientativa
        alert("Conteúdo para lançar no Apontamento de PCF pronto!\n\n" +
              "Item: PCF - Etapa: Dispensado preenchimento\n" +
              "Atuação: Operacional - Fase: PCF\n" +
              "No campo Descrição Colar conteúdo (CTRL+V)");
              
        // Remover a seleção
        window.getSelection().removeAllRanges();
    }
}