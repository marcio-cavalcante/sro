// ValoresModule.js
import { formatarValor, parseToNumber, formatToString } from './Utils.js';

export class ValoresModule {
    constructor() {
        this.elements = {};
        this.formatOptions = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
    }

    init() {
        this.cacheElements();
        this.setupMinimalEventListeners();
        this.initializeForms();
    }

    cacheElements() {
        this.elements.parcelaNumeroSelect = document.getElementById('parcelaNumero');
        this.elements.primeiroDesbloq = document.getElementById('primeiroDesbloq');
        this.elements.intermediarioDesbloq = document.getElementById('intermediarioDesbloq');
        this.elements.ultimoDesbloq = document.getElementById('ultimoDesbloq');
        this.elements.rreRadio = document.getElementById('rre');
        this.elements.raeRadio = document.getElementById('rae');
        this.elements.checklist3 = document.querySelector('.checklist3');
        this.elements.checklist4 = document.querySelector('.checklist4');
        this.elements.checklist5 = document.querySelector('.checklist5');
        this.elements.checklist6 = document.querySelector('.checklist6');
        this.elements.valorCtef = document.getElementById('valorCtef');
        this.elements.valorSolicitado = document.getElementById('valorSolicitado');
        this.elements.repasseSolicitado = document.getElementById('repasseSolicitado');
        this.elements.contrapartidaSolicitado = document.getElementById('contrapartidaSolicitado');
        this.elements.valorCtefAjustado = document.getElementById('valorCtefAjustado');
        this.elements.repasseAjustado = document.getElementById('repasseAjustado');
        this.elements.contrapartidaAjustado = document.getElementById('contrapartidaAjustado');
        this.elements.percentRpVigente = document.getElementById('percentRpVigente');
        this.elements.percentCpVigente = document.getElementById('percentCpVigente');
        this.elements.cpExecVigente = document.getElementById('cpExecVigente');
        this.elements.repasseAjusteManual = document.getElementById('repasseAjusteManual');
        this.elements.contrapartidaAjusteManual = document.getElementById('contrapartidaAjusteManual');
        this.elements.tarifasPendentes = document.getElementById('tarifasPendentes');
        this.elements.tarifaPendDesc = document.getElementById('tarifaPendDesc');
        this.elements.tarifaPendValor = document.getElementById('tarifaPendValor');
        this.elements.tarifasInputs = document.getElementById('tarifasInputs');
        this.elements.addTarifaRow = document.getElementById('addTarifaRow');
        this.elements.instrumentoNumero = document.getElementById('instrumentoNumero');
        this.elements.repasseSaldoDesbloquear = document.getElementById('repasseSaldoDesbloquear');
        this.elements.contrapartidaSaldoDesbloquear = document.getElementById('contrapartidaSaldoDesbloquear');
        
        
    }

    setupMinimalEventListeners() {
        // 1. Formatação de valores durante entrada
        if (this.elements.valorCtef) {
            this.elements.valorCtef.addEventListener('input', () => {
                this.elements.valorCtef.value = formatarValor(this.elements.valorCtef.value);
            });
        }

        if (this.elements.valorSolicitado) {
            this.elements.valorSolicitado.addEventListener('input', () => {
                this.elements.valorSolicitado.value = formatarValor(this.elements.valorSolicitado.value);
            });
            // Adicionar evento blur para calcular rateio automaticamente após perder o foco
            this.elements.valorSolicitado.addEventListener('blur', () => {
                if (this.elements.valorSolicitado.value) {
                this.calcularRateio();
                }
            });
        }

        if (this.elements.valorCtefAjustado) {
            this.elements.valorCtefAjustado.addEventListener('input', () => {
                this.elements.valorCtefAjustado.value = formatarValor(this.elements.valorCtefAjustado.value);
            });
            // Valor Exec. Vigente - Cálculo do rateio automatico após perder o foco (evento blur)
            this.elements.valorCtefAjustado.addEventListener('blur', () => {
                if (this.elements.valorCtefAjustado.value) {
                    // Após calcular, verificar imediatamente o limite
                    this.calcularRateioVigente();
                    setTimeout(() => this.aplicarLimiteCPForcado(), 50);
                }
            });
        }
        
        if (this.elements.repasseAjusteManual) {
            this.elements.repasseAjusteManual.addEventListener('input', () => {
                this.elements.repasseAjusteManual.value = formatarValor(this.elements.repasseAjusteManual.value);
            });
        }
        
        if (this.elements.contrapartidaAjusteManual) {
            this.elements.contrapartidaAjusteManual.addEventListener('input', () => {
                this.elements.contrapartidaAjusteManual.value = formatarValor(this.elements.contrapartidaAjusteManual.value);
            });
        }
        
        // 2. Gerenciamento de tarifas
        if (this.elements.tarifasPendentes) {
            this.elements.tarifasPendentes.addEventListener('change', () => this.toggleTarifasPendentes());
        }
        
        if (this.elements.addTarifaRow) {
            this.elements.addTarifaRow.addEventListener('click', (event) => this.addTarifaRow(event));
        }
        

        if (this.elements.tarifaPendValor) {
            this.elements.tarifaPendValor.addEventListener('input', () => {
                this.elements.tarifaPendValor.value = formatarValor(this.elements.tarifaPendValor.value);
            });
        }

        // 3. Atualização de número da parcela quando a ordem de desbloqueio muda
        if (this.elements.primeiroDesbloq) {
            this.elements.primeiroDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
            this.elements.intermediarioDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
            this.elements.ultimoDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
        }

    //     const btnCalcularValores = document.getElementById('btnCalcularValores');
    // if (btnCalcularValores) {
    //     btnCalcularValores.addEventListener('click', () => {
    //         // Após executar os cálculos normais, forçar verificação do limite
    //         setTimeout(() => {
    //             this.aplicarLimiteCPForcado();
    //         }, 100); // Pequeno delay para garantir que os cálculos anteriores terminem
    //     });
    // }
    }

    initializeForms() {
        this.gerarNumeros('parcelaNumero');
        this.gerarNumeros('instrumentoNumero');
        this.atualizarParcelaNumero();
    }

    gerarNumeros(selectId, max = 100) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) {
            console.warn(`Select element '${selectId}' não encontrado.`);
            return;
        }

        selectElement.innerHTML = '';

        const optionSelecione = document.createElement('option');
        optionSelecione.value = '';
        optionSelecione.textContent = 'Selecione';
        selectElement.appendChild(optionSelecione);

        for (let i = 1; i <= max; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectElement.appendChild(option);
        }
    }

    atualizarParcelaNumero() {
        if (!this.elements.parcelaNumeroSelect) return;

        if (this.elements.primeiroDesbloq && this.elements.primeiroDesbloq.checked) {
            this.elements.parcelaNumeroSelect.innerHTML = '';
            const option = document.createElement('option');
            option.value = 1;
            option.textContent = '1';
            this.elements.parcelaNumeroSelect.appendChild(option);
        } else if ((this.elements.intermediarioDesbloq && this.elements.intermediarioDesbloq.checked) || 
                   (this.elements.ultimoDesbloq && this.elements.ultimoDesbloq.checked)) {
            this.gerarNumeros('parcelaNumero');
        }
    }

    toggleTarifasPendentes() {
        if (!this.elements.tarifasPendentes || !this.elements.tarifaPendDesc ||
            !this.elements.tarifaPendValor || !this.elements.tarifasInputs) return;

        const isChecked = this.elements.tarifasPendentes.checked;

        if (isChecked) {
            this.elements.tarifaPendDesc.disabled = true;
            this.elements.tarifaPendValor.disabled = true;
            this.elements.tarifaPendDesc.value = '';
            this.elements.tarifaPendValor.value = '';

            const rows = this.elements.tarifasInputs.querySelectorAll('.tarifaRow');
            rows.forEach(row => row.remove());
        } else {
            this.elements.tarifaPendDesc.disabled = false;
            this.elements.tarifaPendValor.disabled = false;

            if (!document.getElementById('tarifaPendDesc')) {
                this.createTarifaRow(this.elements.tarifasInputs, true);
            }
        }
    }

    createTarifaRow(container, isFirst = false) {
        const row = document.createElement('div');
        row.classList.add('tarifaRow');

        const descricaoLabel = document.createElement('label');
        descricaoLabel.setAttribute('for', 'tarifaPendDesc');
        descricaoLabel.textContent = 'Descrição:';

        const descricaoInput = document.createElement('input');
        descricaoInput.type = 'text';
        descricaoInput.name = 'tarifaPendDesc';
        descricaoInput.className = 'tarifaPendDesc';
        if (isFirst) descricaoInput.id = 'tarifaPendDesc';

        const valorLabel = document.createElement('label');
        valorLabel.setAttribute('for', 'tarifaPendValor');
        valorLabel.textContent = 'Valor:';

        const valorInput = document.createElement('input');
        valorInput.type = 'text';
        valorInput.name = 'tarifaPendValor';
        if (isFirst) valorInput.id = 'tarifaPendValor';

        row.appendChild(descricaoLabel);
        row.appendChild(descricaoInput);
        row.appendChild(valorLabel);
        row.appendChild(valorInput);

        // container.appendChild(row);
        return row;
    }

    addTarifaRow(event) {
        event.preventDefault();
        if (!this.elements.tarifasInputs) return;
        this.createTarifaRow(this.elements.tarifasInputs);
    }

    // Método para calcular todos os valores de uma vez
    // calcularTodosValores() {
    //     console.log("Iniciando cálculo de todos os valores...");
    
    //     // Realizar os cálculos iniciais
    //     this.calcularRateio();
    //     this.calcularRateioVigente();
        
    //     // Força a verificação do limite de CP como última etapa
    //     this.aplicarLimiteCPForcado();
    // }

    aplicarLimiteCPForcado() {
        try {          
            // Captura SALDO A DESBLOQUEAR DE CP na página
            const cpSaldoElement = document.getElementById('contrapartidaSaldoDesbloquear');
            if (!cpSaldoElement) {
                console.error("Elemento contrapartidaSaldoDesbloquear não encontrado no DOM");
                return;
            }
            
            // Captura CP AJUSTADA - EXEC. VIGENTE na página
            const cpAjustadoElement = document.getElementById('contrapartidaAjustado');
            if (!cpAjustadoElement) {
                console.error("Elemento contrapartidaAjustado não encontrado no DOM");
                return;
            }
            
            // Captura RP AJUSTADO - EXEC. VIGENTE na página
            const rpAjustadoElement = document.getElementById('repasseAjustado');
            if (!rpAjustadoElement) {
                console.error("Elemento repasseAjustado não encontrado no DOM");
                return;
            }
            
            // Obter o saldo disponível diretamente do texto do elemento
            const cpSaldoText = cpSaldoElement.textContent;
            const cpSaldo = parseToNumber(cpSaldoText);
            
            if (cpSaldo === null || isNaN(cpSaldo)) {
                console.error("Saldo de CP inválido:", cpSaldoText);
                return;
            }
            
            // Obter o valor atual de CP ajustado
            const cpAtual = parseToNumber(cpAjustadoElement.value);
            
            if (cpAtual === null || isNaN(cpAtual)) {
                console.error("Valor de CP ajustado inválido:", cpAjustadoElement.value);
                return;
            }
                        
            // Se a CP excede o limite, forçar o valor para o limite
            if (cpAtual > cpSaldo) {
                console.warn(`FORÇANDO limite de CP: ${cpAtual} → ${cpSaldo}`);
                
                // Obter o RP atual para manter o total
                const rpAtual = parseToNumber(rpAjustadoElement.value) || 0;
                const totalAtual = cpAtual + rpAtual;
                
                // Definir novo RP para manter o total
                const novoRP = totalAtual - cpSaldo;
                
                // Verificar que RP não seja negativo
                const rpFinal = Math.max(0, novoRP);
                
                // Aplicar os valores finais limitados
                cpAjustadoElement.value = formatToString(cpSaldo);
                rpAjustadoElement.value = formatToString(rpFinal);
                
                // Notificar ao usuário
                alert(`ATENÇÃO: O valor da contrapartida foi limitado ao máximo disponível (${formatToString(cpSaldo)})`);
            }
        } catch (error) {
            console.error("Erro ao aplicar limite forçado de CP:", error);
        }
    }










// Método para calcular o rateio automaticamente com validações RATEIO_AUTOMATICO
calcularRateio() {
    try {
        // Verificar se o valor solicitado está preenchido
        if (!this.elements.valorSolicitado || !this.elements.valorSolicitado.value) {
            console.warn("Valor solicitado não preenchido");
            return false;
        }

        // Obter o valor total solicitado
        const valorTotal = parseToNumber(this.elements.valorSolicitado.value);
        console.log(`AUTO - Valor total solicitado: ${valorTotal}`);
        
        if (valorTotal === null || isNaN(valorTotal) || valorTotal <= 0) {
            console.warn(`Valor total inválido: ${valorTotal}`);
            alert('Digite um valor válido para o desbloqueio!');
            return false;
        }
        
        // Obter os valores de saldo disponível para repasse e contrapartida
        let saldoRepasseDesbloquear = null;
        let saldoContrapartidaDesbloquear = null;
        
        // Obter saldo de repasse
        if (this.elements.repasseSaldoDesbloquear) {
            const saldoRPTexto = this.elements.repasseSaldoDesbloquear.textContent;
            saldoRepasseDesbloquear = parseToNumber(saldoRPTexto);
            console.log(`AUTO - Saldo de repasse disponível: ${saldoRepasseDesbloquear}`);
        }
        
        if (this.elements.contrapartidaSaldoDesbloquear) {
            const saldoCPTexto = this.elements.contrapartidaSaldoDesbloquear.textContent;
            saldoContrapartidaDesbloquear = parseToNumber(saldoCPTexto);
            console.log(`AUTO - Saldo de contrapartida disponível: ${saldoContrapartidaDesbloquear}`);
        }
        
        // Se não conseguiu obter os valores, não continua
        if (saldoRepasseDesbloquear === null || saldoContrapartidaDesbloquear === null) {
            console.error("AUTO - Não foi possível obter os saldos disponíveis");
            return false;
        }
        
        // Calcular saldo total disponível
        const saldoTotalDisponivel = saldoRepasseDesbloquear + saldoContrapartidaDesbloquear;
        console.log(`AUTO - Saldo total disponível: ${saldoTotalDisponivel}`);
        
        // VALIDAÇÃO 1: Verificar se o valor solicitado excede o saldo total disponível
        if (valorTotal > saldoTotalDisponivel) {
            console.warn(`AUTO - Valor solicitado (${valorTotal}) excede o saldo total disponível (${saldoTotalDisponivel})`);
            alert(`AUTO - O valor digitado (${formatToString(valorTotal)}) ultrapassa o saldo total disponível (${formatToString(saldoTotalDisponivel)}).\n\nPor favor, digite um valor menor ou igual ao saldo disponível.`);
            this.elements.valorSolicitado.value = '';
            this.elements.repasseSolicitado.value = '';
            this.elements.contrapartidaSolicitado.value = '';
            return false;
        }
        
        // Obter os percentuais de repasse e contrapartida
        let percentualRP = 0;
        let percentualCP = 0;
        
        if (this.elements.percentRpVigente) {
            const percentualRPText = this.elements.percentRpVigente.textContent.replace('%', '').trim();
            percentualRP = parseFloat(percentualRPText);
            console.log(`AUTO - Percentual RP: ${percentualRP}%`);
        }
        
        if (this.elements.percentCpVigente) {
            const percentualCPText = this.elements.percentCpVigente.textContent.replace('%', '').trim();
            percentualCP = parseFloat(percentualCPText);
            console.log(`AUTO - Percentual CP: ${percentualCP}%`);
        }
        
        // Validar percentuais
        if (isNaN(percentualRP) || isNaN(percentualCP)) {
            console.error("AUTO - Percentuais inválidos");
            return false;
        }
        
        // Calcular valores de repasse e contrapartida com base nos percentuais
        let valorRP = (valorTotal * percentualRP) / 100;
        let valorCP = (valorTotal * percentualCP) / 100;
        console.log(`AUTO - Valores iniciais: RP=${valorRP}, CP=${valorCP}`);
        
        // VALIDAÇÃO 2: Verificar se o valor de contrapartida excede o saldo disponível
        if (valorCP > saldoContrapartidaDesbloquear) {
            console.warn(`AUTO - Contrapartida calculada (${valorCP}) > saldo disponível (${saldoContrapartidaDesbloquear})`);
            alert(`Cálculo inicial do rateio: RP R$ ${formatToString(valorRP)} e CP R$ ${formatToString(valorCP)}.\nContrapartida ajustada ao saldo disponível: R$ ${formatToString(saldoContrapartidaDesbloquear)}`);

            // Ajustar para usar todo o saldo disponível de contrapartida
            valorCP = saldoContrapartidaDesbloquear;
            // Recalcular repasse para manter o valor total
            valorRP = valorTotal - valorCP;
            
            console.log(`AUTO - Valores ajustados: RP=${valorRP}, CP=${valorCP}`);
            
            // Verificar se o repasse ajustado excede o saldo disponível
            if (valorRP > saldoRepasseDesbloquear) {
                console.warn(`AUTO - Repasse ajustado (${valorRP}) > saldo disponível (${saldoRepasseDesbloquear})`);
                alert(`Após ajuste da contrapartida, o valor de repasse (${formatToString(valorRP)}) excede o saldo disponível (${formatToString(saldoRepasseDesbloquear)}).`);
                
                // Neste caso, ajustamos para usar o máximo possível de ambos
                valorRP = saldoRepasseDesbloquear;
                // Valor total ajustado
                const novoTotal = valorRP + valorCP;
                
                // Atualizar o campo de valor solicitado
                this.elements.valorSolicitado.value = formatToString(novoTotal);
                console.log(`AUTO - Novo valor total: ${novoTotal}`);
            }
        }
        
        // Garantir que os valores não sejam negativos
        valorRP = Math.max(0, valorRP);
        valorCP = Math.max(0, valorCP);
        
        // Atualizar os campos com os valores calculados
        if (this.elements.repasseSolicitado) {
            this.elements.repasseSolicitado.value = formatToString(valorRP);
        }
        
        if (this.elements.contrapartidaSolicitado) {
            this.elements.contrapartidaSolicitado.value = formatToString(valorCP);
        }
        
        console.log(`AUTO - Rateio finalizado: RP=${valorRP}, CP=${valorCP}`);
        return true;
    } catch (error) {
        console.error("AUTO - Erro ao calcular rateio:", error);
        alert("AUTO - Ocorreu um erro ao calcular o rateio. Verifique os valores informados.");
        return false;
    }
}












// Método para calcular o rateio após ajuste do valor de execução vigente
calcularRateioVigente() {
    console.log("Iniciando cálculo de rateio vigente com validações...");
    
    try {
        // Verificação dos elementos essenciais
        if (!this.elements.valorSolicitado || !this.elements.valorCtefAjustado ||
            !this.elements.repasseAjustado || !this.elements.contrapartidaAjustado ||
            !this.elements.cpExecVigente) {
            throw new Error("Elementos para cálculo de rateio vigente não encontrados!");
        }
        
        // Verificar se os valores necessários estão preenchidos
        if (!this.elements.valorCtefAjustado.value || this.elements.valorCtefAjustado.value.trim() === '') {
            console.warn("Valor de CTEF ajustado vazio, não é possível calcular o rateio vigente.");
            return false;
        }
        
        if (!this.elements.valorSolicitado.value || this.elements.valorSolicitado.value.trim() === '') {
            console.warn("Valor solicitado vazio, não é possível calcular o rateio vigente.");
            return false;
        }
        
        // Obter os valores necessários
        const valorSolicitado = parseToNumber(this.elements.valorSolicitado.value);
        const novoValorExecVigente = parseToNumber(this.elements.valorCtefAjustado.value);
        
        if (valorSolicitado === null || isNaN(valorSolicitado) || valorSolicitado <= 0) {
            console.warn(`Valor solicitado inválido: ${valorSolicitado}`);
            alert('Digite um valor válido para o desbloqueio!');
            return false;
        }
        
        if (novoValorExecVigente === null || isNaN(novoValorExecVigente) || novoValorExecVigente <= 0) {
            console.warn(`Valor de execução vigente inválido: ${novoValorExecVigente}`);
            alert('Digite um valor válido para o valor de execução vigente!');
            return false;
        }
        
        // Obter valor da contrapartida vigente
        let cpExecVigenteText = this.elements.cpExecVigente.textContent;
        console.log(`CP Exec Vigente (texto): "${cpExecVigenteText}"`);
        
        // Limpar o valor para conversão - usando parseToNumber para manter consistência
        const novaCpVigente = parseToNumber(cpExecVigenteText);
        
        if (novaCpVigente === null || isNaN(novaCpVigente)) {
            console.error('Valor de CP vigente inválido:', cpExecVigenteText);
            alert('Erro ao ler o valor da contrapartida vigente. Verifique os dados da operação.');
            return false;
        }
        
        console.log(`Valores para cálculo: Valor Solicitado=${valorSolicitado}, Novo Valor Exec=${novoValorExecVigente}, CP Vigente=${novaCpVigente}`);
        
        // VALIDAÇÃO: Verificar se o valor da CP vigente é maior que o novo valor de execução
        if (novaCpVigente > novoValorExecVigente) {
            console.warn(`Contrapartida vigente (${novaCpVigente}) > novo valor de execução (${novoValorExecVigente})`);
            alert(`O valor da contrapartida vigente (${formatToString(novaCpVigente)}) é maior que o novo valor de execução (${formatToString(novoValorExecVigente)}). Verifique os valores.`);
            this.elements.valorCtefAjustado.value = '';
            this.elements.repasseAjustado.value = '';
            this.elements.contrapartidaAjustado.value = '';
            return false;
        }
        
        // Calcular novo RP vigente e percentuais
        const novoRpVigente = novoValorExecVigente - novaCpVigente;
        
        // Verificar se o novo RP é negativo (situação anômala)
        if (novoRpVigente < 0) {
            console.warn(`Repasse calculado negativo: ${novoRpVigente}`);
            alert('O cálculo resultou em um valor de repasse negativo. Verifique os valores de entrada.');
            this.elements.repasseAjustado.value = '';
            this.elements.contrapartidaAjustado.value = '';
            return false;
        }
        
        // Calcular os novos percentuais
        const novoPercentRpVig = (novoRpVigente / novoValorExecVigente) * 100;
        const novoPercentCpVig = (novaCpVigente / novoValorExecVigente) * 100;
        
        console.log(`Novos percentuais: RP=${novoPercentRpVig.toFixed(2)}%, CP=${novoPercentCpVig.toFixed(2)}%`);
        
        // Obter saldos para validação
        let saldoRepasseDesbloquear = null;
        let saldoContrapartidaDesbloquear = null;
        
        // Obter saldo de repasse
        if (this.elements.repasseSaldoDesbloquear) {
            const saldoRPTexto = this.elements.repasseSaldoDesbloquear.textContent;
            saldoRepasseDesbloquear = parseToNumber(saldoRPTexto);
            console.log(`Saldo de repasse disponível: ${saldoRepasseDesbloquear}`);
        }
        
        // Obter saldo de contrapartida
        if (this.elements.contrapartidaSaldoDesbloquear) {
            const saldoCPTexto = this.elements.contrapartidaSaldoDesbloquear.textContent;
            saldoContrapartidaDesbloquear = parseToNumber(saldoCPTexto);
            console.log(`Saldo de contrapartida disponível: ${saldoContrapartidaDesbloquear}`);
        }
        
        // Aplicar os novos percentuais ao valor solicitado para desbloqueio
        let valorRPNovo = (valorSolicitado * novoPercentRpVig) / 100;
        let valorCPNovo = (valorSolicitado * novoPercentCpVig) / 100;
        
        console.log(`Valores calculados: RP=${valorRPNovo}, CP=${valorCPNovo}`);
        
        // VALIDAÇÃO: Verificar se o valor de contrapartida excede o saldo disponível
        if (saldoContrapartidaDesbloquear !== null && valorCPNovo > saldoContrapartidaDesbloquear) {
            console.warn(`Contrapartida calculada (${valorCPNovo}) > saldo disponível (${saldoContrapartidaDesbloquear})`);
            
            // Limitar o valor da contrapartida ao saldo disponível
            valorCPNovo = saldoContrapartidaDesbloquear;
            
            // Ajustar o valor do repasse para manter o total solicitado, se possível
            const totalAjustado = valorSolicitado;
            valorRPNovo = totalAjustado - valorCPNovo;
            
            // Verificar se o repasse ajustado não excede o saldo disponível
            if (saldoRepasseDesbloquear !== null && valorRPNovo > saldoRepasseDesbloquear) {
                valorRPNovo = saldoRepasseDesbloquear;
                // Neste caso, o total solicitado não pode ser mantido
            }
            
            console.log(`Valores ajustados após limite CP: RP=${valorRPNovo}, CP=${valorCPNovo}`);
            
            // Alertar o usuário
            alert(`Contrapartida ajustada ao saldo disponível: R$ ${formatToString(valorCPNovo)}`);
        }
        
        // VALIDAÇÃO: Verificar se o repasse excede o saldo disponível
        if (saldoRepasseDesbloquear !== null && valorRPNovo > saldoRepasseDesbloquear) {
            console.warn(`Repasse calculado (${valorRPNovo}) > saldo disponível (${saldoRepasseDesbloquear})`);
            
            // Alertar o usuário
            alert(`O repasse calculado (${formatToString(valorRPNovo)}) excede o saldo disponível (${formatToString(saldoRepasseDesbloquear)}).`);
            
            // Ajustar valores mantendo os percentuais
            const novoTotalPossivel = (saldoRepasseDesbloquear * 100) / novoPercentRpVig;
            valorRPNovo = saldoRepasseDesbloquear;
            valorCPNovo = novoTotalPossivel - valorRPNovo;
            
            // Verificar novamente se a CP ajustada não excede seu limite
            if (saldoContrapartidaDesbloquear !== null && valorCPNovo > saldoContrapartidaDesbloquear) {
                valorCPNovo = saldoContrapartidaDesbloquear;
                // Neste caso, ambos os limites estão sendo atingidos
            }
            
            console.log(`Valores ajustados: RP=${valorRPNovo}, CP=${valorCPNovo}`);
        }
        
        // Garantia contra valores negativos
        valorRPNovo = Math.max(0, valorRPNovo);
        valorCPNovo = Math.max(0, valorCPNovo);
        
        // Formatação e atualização dos campos
        this.elements.repasseAjustado.value = formatToString(valorRPNovo);
        this.elements.contrapartidaAjustado.value = formatToString(valorCPNovo);
        
        // Forçar atualização visual
        this.elements.repasseAjustado.dispatchEvent(new Event('change'));
        this.elements.contrapartidaAjustado.dispatchEvent(new Event('change'));
        
        return true;
    } catch (error) {
        console.error("Erro no cálculo de rateio vigente:", error);
        alert(`Erro ao calcular o rateio vigente: ${error.message}`);
        return false;
    }
}













// Método para verificar e aplicar o limite de saldo para CP ajustado
verificarLimiteSaldoCP() {
    try {
        console.log("Verificando limite de saldo para CP ajustado...");
        
        // Verificar elementos necessários
        if (!this.elements.contrapartidaAjustado || 
            !this.elements.repasseAjustado || 
            !this.elements.contrapartidaSaldoDesbloquear) {
            console.warn("Elementos necessários para verificação de limite de CP não encontrados");
            return;
        }
        
        // Obter o valor de CP ajustado
        const cpAjustado = parseToNumber(this.elements.contrapartidaAjustado.value);
        if (cpAjustado === null || isNaN(cpAjustado)) {
            console.warn("Valor de CP ajustado inválido");
            return;
        }
        
        // Obter o saldo disponível para CP
        const saldoCPText = this.elements.contrapartidaSaldoDesbloquear.textContent;
        const saldoCP = parseToNumber(saldoCPText);
        if (saldoCP === null || isNaN(saldoCP)) {
            console.warn("Saldo de CP não encontrado ou inválido");
            return;
        }
        
        console.log(`Verificando limite CP: CP Ajustado=${cpAjustado}, Saldo CP=${saldoCP}`);
        
        // Verificar se CP ajustado excede o saldo disponível
        if (cpAjustado > saldoCP) {
            console.warn(`CP ajustado (${cpAjustado}) excede o saldo disponível (${saldoCP})`);
            
            // Obter o RP ajustado atual
            const rpAjustado = parseToNumber(this.elements.repasseAjustado.value);
            if (rpAjustado === null || isNaN(rpAjustado)) {
                console.warn("Valor de RP ajustado inválido");
                return;
            }
            
            // Calcular o total atual
            const totalAtual = cpAjustado + rpAjustado;
            
            // Limitar o CP ao saldo disponível
            const cpLimitado = saldoCP;
            
            // Ajustar o RP para manter o total, se possível
            let rpAjustadoNovo = totalAtual - cpLimitado;
            
            // Verificar se o RP ajustado não excede o saldo disponível
            if (this.elements.repasseSaldoDesbloquear) {
                const saldoRPText = this.elements.repasseSaldoDesbloquear.textContent;
                const saldoRP = parseToNumber(saldoRPText);
                
                if (saldoRP !== null && !isNaN(saldoRP) && rpAjustadoNovo > saldoRP) {
                    rpAjustadoNovo = saldoRP;
                    console.warn(`RP ajustado também excede o saldo disponível, limitando a ${saldoRP}`);
                }
            }
            
            // Atualizar os campos
            this.elements.contrapartidaAjustado.value = formatToString(cpLimitado);
            this.elements.repasseAjustado.value = formatToString(rpAjustadoNovo);
            
            // Notificação ao usuário
            alert(`A contrapartida foi limitada ao saldo disponível: ${formatToString(cpLimitado)}`);
            
            console.log(`Valores ajustados: CP=${formatToString(cpLimitado)}, RP=${formatToString(rpAjustadoNovo)}`);
        }
    } catch (error) {
        console.error("Erro ao verificar limite de saldo CP:", error);
    }
}

}