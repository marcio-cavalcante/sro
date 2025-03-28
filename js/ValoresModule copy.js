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
        this.setupEventListeners();
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

    setupEventListeners() {
        if (this.elements.primeiroDesbloq) {
            this.elements.primeiroDesbloq.addEventListener('change', () => this.handleDesbloqueioChange());
            this.elements.intermediarioDesbloq.addEventListener('change', () => this.handleDesbloqueioChange());
            this.elements.ultimoDesbloq.addEventListener('change', () => this.handleDesbloqueioChange());
        }

        if (this.elements.rreRadio) {
            this.elements.rreRadio.addEventListener('change', () => this.toggleChecklists56());
            this.elements.raeRadio.addEventListener('change', () => this.toggleChecklists56());
        }

        if (this.elements.valorSolicitado) {
            this.elements.valorSolicitado.addEventListener('input', () => {
                this.elements.valorSolicitado.value = formatarValor(this.elements.valorSolicitado.value);
            });
            this.elements.valorSolicitado.addEventListener('blur', () => this.calcularRateio());
        }

        if (this.elements.valorCtefAjustado) {
            this.elements.valorCtefAjustado.addEventListener('input', () => {
                this.elements.valorCtefAjustado.value = formatarValor(this.elements.valorCtefAjustado.value);
            });
            this.elements.valorCtefAjustado.addEventListener('blur', () => this.calcularRateioVigente());
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

        if (this.elements.tarifasPendentes) {
            this.elements.tarifasPendentes.addEventListener('change', () => this.toggleTarifasPendentes());
        }

        if (this.elements.addTarifaRow) {
            this.elements.addTarifaRow.addEventListener('click', (event) => this.addTarifaRow(event));
        }
    }

    initializeForms() {
        this.gerarNumeros('parcelaNumero');
        this.gerarNumeros('instrumentoNumero');
        this.toggleChecklists1234();
        this.toggleChecklists56();
    }

    handleDesbloqueioChange() {
        this.atualizarParcelaNumero();
        this.toggleChecklists1234();
    }

    gerarNumeros(selectId, max = 100) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return;

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

        if (this.elements.primeiroDesbloq.checked) {
            this.elements.parcelaNumeroSelect.innerHTML = '';
            const option = document.createElement('option');
            option.value = 1;
            option.textContent = '1';
            this.elements.parcelaNumeroSelect.appendChild(option);
        } else if (this.elements.intermediarioDesbloq.checked || this.elements.ultimoDesbloq.checked) {
            this.gerarNumeros('parcelaNumero');
        }
    }

    toggleChecklists1234() {
        if (!this.elements.checklist3 || !this.elements.checklist4) return;

        this.elements.checklist3.style.display = 'none';
        this.elements.checklist4.style.display = 'none';

        if (this.elements.primeiroDesbloq.checked) {
            this.elements.checklist3.style.display = 'flex';
        } else if (this.elements.ultimoDesbloq.checked) {
            this.elements.checklist4.style.display = 'flex';
        }
    }

    toggleChecklists56() {
        if (!this.elements.checklist5 || !this.elements.checklist6) return;

        this.elements.checklist5.style.display = 'none';
        this.elements.checklist6.style.display = 'none';

        if (this.elements.rreRadio.checked) {
            this.elements.checklist5.style.display = 'block';
        } else if (this.elements.raeRadio.checked) {
            this.elements.checklist6.style.display = 'block';
        }
    }

    calcularRateio() {
        if (!this.elements.valorSolicitado || !this.elements.repasseSolicitado || !this.elements.contrapartidaSolicitado) return;

        const valorTotal = parseToNumber(this.elements.valorSolicitado.value);

        if (valorTotal === null) {
            alert('Digite um valor válido!');
            return;
        }

        const percentualRPText = this.elements.percentRpVigente.textContent;
        const percentualCPText = this.elements.percentCpVigente.textContent;

        const percentualRP = parseFloat(percentualRPText.replace('%', '').trim());
        const percentualCP = parseFloat(percentualCPText.replace('%', '').trim());

        if (isNaN(percentualRP) || isNaN(percentualCP)) {
            console.error('Percentuais inválidos:', percentualRPText, percentualCPText);
            return;
        }

        const valorRP = (valorTotal * percentualRP) / 100;
        const valorCP = (valorTotal * percentualCP) / 100;

        this.elements.repasseSolicitado.value = formatToString(valorRP);
        this.elements.contrapartidaSolicitado.value = formatToString(valorCP);
    }

    calcularRateioVigente() {
        if (!this.elements.valorSolicitado || !this.elements.valorCtefAjustado ||
            !this.elements.repasseAjustado || !this.elements.contrapartidaAjustado ||
            !this.elements.cpExecVigente) return;

        const valorTotalVigente = parseToNumber(this.elements.valorSolicitado.value);
        const novoValorExecVigente = parseToNumber(this.elements.valorCtefAjustado.value);

        if (valorTotalVigente === null || novoValorExecVigente === null) {
            alert('Digite valores válidos!');
            return;
        }

        let cpExecVigenteText = this.elements.cpExecVigente.textContent;
        cpExecVigenteText = cpExecVigenteText.replace('R$', '').trim();
        const novaCpVigente = parseToNumber(cpExecVigenteText);

        if (novaCpVigente === null) {
            console.error('Valor de CP vigente inválido:', cpExecVigenteText);
            return;
        }

        const novoRpVigente = novoValorExecVigente - novaCpVigente;
        const novoPercentRpVig = (novoRpVigente / novoValorExecVigente) * 100;
        const novoPercentCpVig = (novaCpVigente / novoValorExecVigente) * 100;

        const valorRPNovo = (valorTotalVigente * novoPercentRpVig) / 100;
        const valorCPNovo = (valorTotalVigente * novoPercentCpVig) / 100;

        this.elements.repasseAjustado.value = formatToString(valorRPNovo);
        this.elements.contrapartidaAjustado.value = formatToString(valorCPNovo);
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
}