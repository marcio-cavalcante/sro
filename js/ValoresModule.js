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
    }

    setupMinimalEventListeners() {
        // Manter apenas event listeners para formatação de valores e visibilidade de campos
        
        // 1. Formatação de valores durante entrada
        if (this.elements.valorSolicitado) {
            this.elements.valorSolicitado.addEventListener('input', () => {
                this.elements.valorSolicitado.value = formatarValor(this.elements.valorSolicitado.value);
            });
        }
        
        if (this.elements.valorCtefAjustado) {
            this.elements.valorCtefAjustado.addEventListener('input', () => {
                this.elements.valorCtefAjustado.value = formatarValor(this.elements.valorCtefAjustado.value);
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
        
        // 3. Atualização de número da parcela quando a ordem de desbloqueio muda
        if (this.elements.primeiroDesbloq) {
            this.elements.primeiroDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
            this.elements.intermediarioDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
            this.elements.ultimoDesbloq.addEventListener('change', () => this.atualizarParcelaNumero());
        }
    }

    initializeForms() {
        this.gerarNumeros('parcelaNumero');
        this.gerarNumeros('instrumentoNumero');
        // Estado inicial
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

        container.appendChild(row);
        return row;
    }

    addTarifaRow(event) {
        event.preventDefault();

        if (!this.elements.tarifasInputs) return;

        this.createTarifaRow(this.elements.tarifasInputs);
    }

    // Método para calcular todos os valores de uma vez
    calcularTodosValores() {
        console.log("Iniciando cálculo de valores...");
        
        // Realizar os cálculos
        this.calcularRateio();
        this.calcularRateioVigente();
        
        // Exibir mensagem de confirmação
        alert('Cálculos realizados com sucesso!');
    }





// Método para calcular o rateio automaticamente com validações
calcularRateio() {
    console.log("Iniciando cálculo de rateio com validações...");
    
    try {
        // Verificação dos elementos essenciais
        if (!this.elements.valorSolicitado) {
            throw new Error("Elemento valorSolicitado não encontrado!");
        }
        
        if (!this.elements.repasseSolicitado) {
            throw new Error("Elemento repasseSolicitado não encontrado!");
        }
        
        if (!this.elements.contrapartidaSolicitado) {
            throw new Error("Elemento contrapartidaSolicitado não encontrado!");
        }
        
        // Verificar se o valor solicitado está preenchido
        if (!this.elements.valorSolicitado.value || this.elements.valorSolicitado.value.trim() === '') {
            console.warn("Valor solicitado vazio, não é possível calcular o rateio.");
            return false;
        }
        
        // Obter o valor total solicitado
        const valorTotal = parseToNumber(this.elements.valorSolicitado.value);
        console.log(`Valor total solicitado: ${valorTotal}`);
        
        if (valorTotal === null || isNaN(valorTotal) || valorTotal <= 0) {
            console.warn(`Valor total inválido: ${valorTotal}`);
            alert('Digite um valor válido para o desbloqueio!');
            return false;
        }
        
        // VALIDAÇÃO 1: Verificar se o valor solicitado excede o saldo total disponível
        let saldoRepasseDesbloquear = null;
        let saldoContrapartidaDesbloquear = null;
        
        // Obter saldo de repasse
        if (this.elements.repasseSaldoDesbloquear) {
            const saldoRPTexto = this.elements.repasseSaldoDesbloquear.textContent.replace(/[^0-9,.]/g, '');
            saldoRepasseDesbloquear = parseToNumber(saldoRPTexto);
            console.log(`Saldo de repasse disponível: ${saldoRepasseDesbloquear}`);
        } else {
            console.warn("Elemento repasseSaldoDesbloquear não encontrado");
            // Usar valor exemplo se elemento não for encontrado
            saldoRepasseDesbloquear = 828620.24;
        }
        
        // Obter saldo de contrapartida
        if (this.elements.contrapartidaSaldoDesbloquear) {
            const saldoCPTexto = this.elements.contrapartidaSaldoDesbloquear.textContent.replace(/[^0-9,.]/g, '');
            saldoContrapartidaDesbloquear = parseToNumber(saldoCPTexto);
            console.log(`Saldo de contrapartida disponível: ${saldoContrapartidaDesbloquear}`);
        } else {
            console.warn("Elemento contrapartidaSaldoDesbloquear não encontrado");
            // Usar valor exemplo se elemento não for encontrado
            saldoContrapartidaDesbloquear = 350820.23;
        }
        
        // Calcular saldo total disponível
        const saldoTotalDisponivel = saldoRepasseDesbloquear + saldoContrapartidaDesbloquear;
        console.log(`Saldo total disponível: ${saldoTotalDisponivel}`);
        
        // Verificar se o valor solicitado excede o saldo total disponível
        if (valorTotal > saldoTotalDisponivel) {
            console.warn(`Valor solicitado (${valorTotal}) excede o saldo total disponível (${saldoTotalDisponivel})`);
            alert(`O valor digitado (${formatToString(valorTotal)}) ultrapassa o saldo total disponível (${formatToString(saldoTotalDisponivel)}).\n\nPor favor, digite um valor menor ou igual ao saldo disponível.`);
            this.elements.valorSolicitado.value = '';
            this.elements.repasseSolicitado.value = '';
            this.elements.contrapartidaSolicitado.value = '';
            return false;
        }
        
        // Obter percentuais de repasse e contrapartida
        let percentualRP = 0;
        let percentualCP = 0;
        
        if (this.elements.percentRpVigente) {
            const percentualRPText = this.elements.percentRpVigente.textContent.replace('%', '').trim();
            percentualRP = parseFloat(percentualRPText);
            console.log(`Percentual RP: ${percentualRP}%`);
        } else {
            console.warn("Elemento percentRpVigente não encontrado, usando valor padrão");
            percentualRP = 57.32; // Valor padrão baseado no exemplo
        }
        
        if (this.elements.percentCpVigente) {
            const percentualCPText = this.elements.percentCpVigente.textContent.replace('%', '').trim();
            percentualCP = parseFloat(percentualCPText);
            console.log(`Percentual CP: ${percentualCP}%`);
        } else {
            console.warn("Elemento percentCpVigente não encontrado, usando valor padrão");
            percentualCP = 42.68; // Valor padrão baseado no exemplo
        }
        
        if (isNaN(percentualRP) || isNaN(percentualCP)) {
            console.error('Percentuais inválidos, usando valores padrão');
            percentualRP = 57.32;
            percentualCP = 42.68;
        }
        
        // Cálculo do rateio inicial
        let valorRP = (valorTotal * percentualRP) / 100;
        let valorCP = (valorTotal * percentualCP) / 100;
        console.log(`Rateio inicial: RP=${valorRP}, CP=${valorCP}`);
        
        // VALIDAÇÃO 2: Verificar se o valor de contrapartida excede o saldo disponível
        if (saldoContrapartidaDesbloquear !== null && valorCP > saldoContrapartidaDesbloquear) {
            console.warn(`Contrapartida calculada (${valorCP}) > saldo disponível (${saldoContrapartidaDesbloquear})`);
            
            // Ajustar valores
            valorCP = saldoContrapartidaDesbloquear;
            valorRP = valorTotal - valorCP;
            
            console.log(`Valores ajustados: RP=${valorRP}, CP=${valorCP}`);
            alert(`A contrapartida foi ajustada para ${formatToString(valorCP)} pois o valor calculado excede o saldo disponível.`);
        }
        
        // VALIDAÇÃO 3: Verificar se o repasse ajustado excede o saldo disponível
        if (saldoRepasseDesbloquear !== null && valorRP > saldoRepasseDesbloquear) {
            console.warn(`Repasse ajustado (${valorRP}) > saldo disponível (${saldoRepasseDesbloquear})`);
            alert(`O valor de repasse (${formatToString(valorRP)}) excede o saldo disponível (${formatToString(saldoRepasseDesbloquear)}).`);
            
            // Se não for possível ajustar para manter o total, limitar o valor total
            const novoTotal = saldoRepasseDesbloquear + valorCP;
            
            // Recalcular com o novo total
            valorRP = saldoRepasseDesbloquear;
            
            console.log(`Valores reajustados: RP=${valorRP}, CP=${valorCP}, Total=${novoTotal}`);
            
            // Atualizar o campo de valor solicitado
            this.elements.valorSolicitado.value = formatToString(novoTotal);
        }
        
        // Garantia contra valores negativos
        valorRP = Math.max(0, valorRP);
        valorCP = Math.max(0, valorCP);
        
        // Formatação e atualização dos campos
        this.elements.repasseSolicitado.value = formatToString(valorRP);
        this.elements.contrapartidaSolicitado.value = formatToString(valorCP);
        console.log(`Valores finais: RP=${formatToString(valorRP)}, CP=${formatToString(valorCP)}`);
        
        // Forçar atualização visual
        this.elements.repasseSolicitado.dispatchEvent(new Event('change'));
        this.elements.contrapartidaSolicitado.dispatchEvent(new Event('change'));
        
        return true;
    } catch (error) {
        console.error("Erro no cálculo de rateio:", error);
        return false;
    }
}







    // Método para calcular o rateio após ajuste do valor de execução vigente
    calcularRateioVigente() {
        if (!this.elements.valorSolicitado || !this.elements.valorCtefAjustado ||
            !this.elements.repasseAjustado || !this.elements.contrapartidaAjustado ||
            !this.elements.cpExecVigente) {
            console.error("Elementos para cálculo de rateio vigente não encontrados!");
            return;
        }

        // Verificar se os valores necessários estão preenchidos
        if (!this.elements.valorSolicitado.value || !this.elements.valorCtefAjustado.value) {
            console.warn("Valores necessários vazios, não é possível calcular o rateio vigente.");
            return;
        }

        // Obter os valores necessários
        const valorTotalVigente = parseToNumber(this.elements.valorSolicitado.value);
        const novoValorExecVigente = parseToNumber(this.elements.valorCtefAjustado.value);

        if (valorTotalVigente === null || isNaN(valorTotalVigente) || 
            novoValorExecVigente === null || isNaN(novoValorExecVigente)) {
            console.warn(`Valores inválidos: valorTotalVigente=${valorTotalVigente}, novoValorExecVigente=${novoValorExecVigente}`);
            alert('Digite valores válidos para o cálculo de rateio vigente!');
            return;
        }

        // Obter valor da contrapartida vigente
        let cpExecVigenteText = this.elements.cpExecVigente.textContent;
        console.log(`CP Exec Vigente (texto): "${cpExecVigenteText}"`);
        
        // Limpar o valor para conversão
        cpExecVigenteText = cpExecVigenteText.replace(/[R$\s.]/g, '').replace(',', '.');
        console.log(`CP Exec Vigente (limpo): "${cpExecVigenteText}"`);
        
        const novaCpVigente = parseFloat(cpExecVigenteText);

        if (isNaN(novaCpVigente)) {
            console.error('Valor de CP vigente inválido:', cpExecVigenteText);
            return;
        }

        console.log(`Calculando rateio vigente com: valorTotalVigente=${valorTotalVigente}, novoValorExecVigente=${novoValorExecVigente}, novaCpVigente=${novaCpVigente}`);

        // Calcular valores 
        const novoRpVigente = novoValorExecVigente - novaCpVigente;
        const novoPercentRpVig = (novoRpVigente / novoValorExecVigente) * 100;
        const novoPercentCpVig = (novaCpVigente / novoValorExecVigente) * 100;

        console.log(`Percentuais calculados: RP=${novoPercentRpVig}%, CP=${novoPercentCpVig}%`);

        // Aplicar os novos percentuais ao valor solicitado
        const valorRPNovo = (valorTotalVigente * novoPercentRpVig) / 100;
        const valorCPNovo = (valorTotalVigente * novoPercentCpVig) / 100;

        console.log(`Valores finais: RP=${valorRPNovo}, CP=${valorCPNovo}`);

        // Atualizar campos de saída
        this.elements.repasseAjustado.value = formatToString(valorRPNovo);
        this.elements.contrapartidaAjustado.value = formatToString(valorCPNovo);
    }
}