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

    // Método para calcular o rateio automaticamente
    calcularRateio() {
        if (!this.elements.valorSolicitado || !this.elements.repasseSolicitado || !this.elements.contrapartidaSolicitado) {
            console.error("Elementos para cálculo de rateio não encontrados!");
            return;
        }

        // Verificar se o valor solicitado está preenchido
        if (!this.elements.valorSolicitado.value || this.elements.valorSolicitado.value.trim() === '') {
            console.warn("Valor solicitado vazio, não é possível calcular o rateio.");
            return;
        }

        // Obter o valor total solicitado
        const valorTotal = parseToNumber(this.elements.valorSolicitado.value);

        if (valorTotal === null || isNaN(valorTotal) || valorTotal <= 0) {
            console.warn(`Valor total inválido: ${valorTotal}`);
            alert('Digite um valor válido para o desbloqueio!');
            return;
        }

        // Obter percentuais de repasse e contrapartida
        const percentualRPText = this.elements.percentRpVigente ? this.elements.percentRpVigente.textContent : '';
        const percentualCPText = this.elements.percentCpVigente ? this.elements.percentCpVigente.textContent : '';

        if (!percentualRPText || !percentualCPText) {
            console.error("Percentuais RP ou CP não encontrados");
            return;
        }

        // Converter percentuais para números
        const percentualRP = parseFloat(percentualRPText.replace('%', '').trim());
        const percentualCP = parseFloat(percentualCPText.replace('%', '').trim());

        if (isNaN(percentualRP) || isNaN(percentualCP)) {
            console.error('Percentuais inválidos:', percentualRPText, percentualCPText);
            return;
        }

        // Calcular valores
        const valorRP = (valorTotal * percentualRP) / 100;
        const valorCP = (valorTotal * percentualCP) / 100;

        // Atualizar campos de saída
        this.elements.repasseSolicitado.value = formatToString(valorRP);
        this.elements.contrapartidaSolicitado.value = formatToString(valorCP);
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