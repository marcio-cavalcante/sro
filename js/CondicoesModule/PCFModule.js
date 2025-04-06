// PCFModule.js - Módulo para gerenciar funcionalidades de Prestação de Contas Final

export class PCFModule {
    constructor() {
        this.elements = {};
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.atualizarTextoPCF();
    }

    cacheElements() {
        this.elements.textareaPCF = document.getElementById('prestacaoContasFinal');
        this.elements.btnCopiarPCF = document.getElementById('btnCopiarPCF');
        this.elements.assinaturaInput = document.getElementById('assinatura');
        this.elements.operacaoForm = document.getElementById('operacaoForm');
    }

    setupEventListeners() {
        // Verificar se todos os elementos necessários foram encontrados
        if (!this.elements.textareaPCF || !this.elements.btnCopiarPCF || 
            !this.elements.assinaturaInput || !this.elements.operacaoForm) {
            console.warn("Elementos de Prestação de Contas Final não encontrados");
            return;
        }
        
        // Atualizar o texto quando o valor da assinatura mudar
        this.elements.assinaturaInput.addEventListener('change', () => this.atualizarTextoPCF());
        
        // Adicionar evento ao botão de copiar
        this.elements.btnCopiarPCF.addEventListener('click', () => this.copiarTextoPCF());
        
        // Adicionar evento para quando o formulário de operação for submetido
        this.elements.operacaoForm.addEventListener('submit', () => {
            // Esperar um pouco para que os campos sejam preenchidos
            setTimeout(() => this.atualizarTextoPCF(), 1000);
        });
    }

    atualizarTextoPCF() {
        // Obter a data de assinatura
        const dataAssinaturaStr = this.elements.assinaturaInput.value.trim();
        
        // Se não houver data, limpar a textarea
        if (!dataAssinaturaStr) {
            this.elements.textareaPCF.value = '';
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
    }

    copiarTextoPCF() {
        // Verificar se há conteúdo na textarea
        if (!this.elements.textareaPCF.value.trim()) {
            alert("Não há conteúdo para copiar. Verifique se a data de assinatura foi informada corretamente.");
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