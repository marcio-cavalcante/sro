// ValoresModule.js
import { formatarValor, parseToNumber, formatToString } from './Utils.js';

export class ValoresModule {
    constructor() {
        this.elements = {};
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.initializeForms();
    }

    cacheElements() {
        // Elementos da tabela VALORES CONTRATUAIS
        this.elements.repasseContrato = document.getElementById('repasseContrato');
        this.elements.contrapartidaContrato = document.getElementById('contrapartidaContrato');
        this.elements.investimentoContrato = document.getElementById('investimentoContrato');
        this.elements.percentRpContrato = document.getElementById('percentRpContrato');
        this.elements.percentCpContrato = document.getElementById('percentCpContrato');
        
        // Elementos da tabela VALORES CTEF
        this.elements.viExecVigente = document.getElementById('viExecVigente');
        this.elements.rpExecVigente = document.getElementById('rpExecVigente');
        this.elements.cpExecVigente = document.getElementById('cpExecVigente');
        this.elements.saldoExecVigente = document.getElementById('saldoExecVigente');
        this.elements.percentViVigente = document.getElementById('percentViVigente');
        this.elements.percentRpVigente = document.getElementById('percentRpVigente');
        this.elements.percentCpVigente = document.getElementById('percentCpVigente');
        
        // Elementos da tabela LIBERAÇÕES
        this.elements.repasseDesbloqueado = document.getElementById('repasseDesbloqueado');
        this.elements.contrapartidaDesbloqueada = document.getElementById('contrapartidaDesbloqueada');
        this.elements.investimentoDesbloqueado = document.getElementById('investimentoDesbloqueado');
        this.elements.repasseSaldoDesbloquear = document.getElementById('repasseSaldoDesbloquear');
        this.elements.contrapartidaSaldoDesbloquear = document.getElementById('contrapartidaSaldoDesbloquear');
        this.elements.investimentoSaldoDesbloquear = document.getElementById('investimentoSaldoDesbloquear');
        
        // Elementos de CÁLCULO AUTOMÁTICO
        this.elements.valorSolicitado = document.getElementById('valorSolicitado');
        this.elements.repasseSolicitado = document.getElementById('repasseSolicitado');
        this.elements.contrapartidaSolicitado = document.getElementById('contrapartidaSolicitado');
        
        // Elementos de AJUSTE DE VALOR DE CTEF
        this.elements.valorCtefAjustado = document.getElementById('valorCtefAjustado');
        this.elements.repasseAjustado = document.getElementById('repasseAjustado');
        this.elements.contrapartidaAjustado = document.getElementById('contrapartidaAjustado');
        
        // Elementos de AJUSTE MANUAL
        this.elements.repasseAjusteManual = document.getElementById('repasseAjusteManual');
        this.elements.contrapartidaAjusteManual = document.getElementById('contrapartidaAjusteManual');
        
        // Outros elementos necessários
        this.elements.btnCalcularValores = document.getElementById('btnCalcularValores');
    }

    setupEventListeners() {
        // Evento de input para formatação de valores monetários
        if (this.elements.valorSolicitado) {
            this.elements.valorSolicitado.addEventListener('input', () => {
                this.elements.valorSolicitado.value = formatarValor(this.elements.valorSolicitado.value);
            });
            
            // Adicionar evento blur para calcular rateio automaticamente após perder o foco
            this.elements.valorSolicitado.addEventListener('blur', () => {
                this.calcularRateio();
            });
        }
        
        if (this.elements.valorCtefAjustado) {
            this.elements.valorCtefAjustado.addEventListener('input', () => {
                this.elements.valorCtefAjustado.value = formatarValor(this.elements.valorCtefAjustado.value);
            });
            
            // Adicionar evento blur para calcular ajuste automático após perder o foco
            this.elements.valorCtefAjustado.addEventListener('blur', () => {
                this.calcularAjusteCtef();
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
        
        // Evento para o botão de calcular valores
        if (this.elements.btnCalcularValores) {
            this.elements.btnCalcularValores.addEventListener('click', () => {
                this.calcularTodosValores();
            });
        }
    }

    initializeForms() {
        // Qualquer inicialização necessária
        console.log("ValoresModule inicializado");
    }

    // Método para calcular todos os valores de uma vez
    calcularTodosValores() {
        console.log("Calculando todos os valores...");
        
        // Primeiro calculamos o rateio com base no valor solicitado
        const rateioCalculado = this.calcularRateio();
        
        // Se o valor do CTEF ajustado estiver preenchido, calculamos o ajuste
        if (this.elements.valorCtefAjustado && this.elements.valorCtefAjustado.value) {
            this.calcularAjusteCtef();
        }
        
        return rateioCalculado;
    }

    // Método para calcular o rateio com base no valor solicitado
    calcularRateio() {
        console.log("Calculando rateio...");
        
        try {
            // Verificar se o valor solicitado está preenchido
            if (!this.elements.valorSolicitado || !this.elements.valorSolicitado.value) {
                console.warn("Valor solicitado não preenchido");
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
            
            // Obter os valores de saldo disponível para repasse e contrapartida
            let saldoRepasseDesbloquear = null;
            let saldoContrapartidaDesbloquear = null;
            
            if (this.elements.repasseSaldoDesbloquear) {
                const saldoRPTexto = this.elements.repasseSaldoDesbloquear.textContent;
                saldoRepasseDesbloquear = parseToNumber(saldoRPTexto);
                console.log(`Saldo de repasse disponível: ${saldoRepasseDesbloquear}`);
            }
            
            if (this.elements.contrapartidaSaldoDesbloquear) {
                const saldoCPTexto = this.elements.contrapartidaSaldoDesbloquear.textContent;
                saldoContrapartidaDesbloquear = parseToNumber(saldoCPTexto);
                console.log(`Saldo de contrapartida disponível: ${saldoContrapartidaDesbloquear}`);
            }
            
            // Se não conseguiu obter os valores, não continua
            if (saldoRepasseDesbloquear === null || saldoContrapartidaDesbloquear === null) {
                console.error("Não foi possível obter os saldos disponíveis");
                return false;
            }
            
            // Calcular saldo total disponível
            const saldoTotalDisponivel = saldoRepasseDesbloquear + saldoContrapartidaDesbloquear;
            console.log(`Saldo total disponível: ${saldoTotalDisponivel}`);
            
            // VALIDAÇÃO 1: Verificar se o valor solicitado excede o saldo total disponível
            if (valorTotal > saldoTotalDisponivel) {
                console.warn(`Valor solicitado (${valorTotal}) excede o saldo total disponível (${saldoTotalDisponivel})`);
                alert(`O valor digitado (${formatToString(valorTotal)}) ultrapassa o saldo total disponível (${formatToString(saldoTotalDisponivel)}).\n\nPor favor, digite um valor menor ou igual ao saldo disponível.`);
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
                console.log(`Percentual RP: ${percentualRP}%`);
            }
            
            if (this.elements.percentCpVigente) {
                const percentualCPText = this.elements.percentCpVigente.textContent.replace('%', '').trim();
                percentualCP = parseFloat(percentualCPText);
                console.log(`Percentual CP: ${percentualCP}%`);
            }
            
            // Validar percentuais
            if (isNaN(percentualRP) || isNaN(percentualCP)) {
                console.error("Percentuais inválidos");
                return false;
            }
            
            // Calcular valores de repasse e contrapartida com base nos percentuais
            let valorRP = (valorTotal * percentualRP) / 100;
            let valorCP = (valorTotal * percentualCP) / 100;
            console.log(`Valores iniciais: RP=${valorRP}, CP=${valorCP}`);
            
            // VALIDAÇÃO 2: Verificar se o valor de contrapartida excede o saldo disponível
            if (valorCP > saldoContrapartidaDesbloquear) {
                console.warn(`Contrapartida calculada (${valorCP}) > saldo disponível (${saldoContrapartidaDesbloquear})`);
                
                // Ajustar para usar todo o saldo disponível de contrapartida
                valorCP = saldoContrapartidaDesbloquear;
                // Recalcular repasse para manter o valor total
                valorRP = valorTotal - valorCP;
                
                console.log(`Valores ajustados: RP=${valorRP}, CP=${valorCP}`);
                
                // Verificar se o repasse ajustado excede o saldo disponível
                if (valorRP > saldoRepasseDesbloquear) {
                    console.warn(`Repasse ajustado (${valorRP}) > saldo disponível (${saldoRepasseDesbloquear})`);
                    alert(`Após ajuste da contrapartida, o valor de repasse (${formatToString(valorRP)}) excede o saldo disponível (${formatToString(saldoRepasseDesbloquear)}).`);
                    
                    // Neste caso, ajustamos para usar o máximo possível de ambos
                    valorRP = saldoRepasseDesbloquear;
                    // Valor total ajustado
                    const novoTotal = valorRP + valorCP;
                    
                    // Atualizar o campo de valor solicitado
                    this.elements.valorSolicitado.value = formatToString(novoTotal);
                    console.log(`Novo valor total: ${novoTotal}`);
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
            
            console.log(`Rateio finalizado: RP=${valorRP}, CP=${valorCP}`);
            return true;
        } catch (error) {
            console.error("Erro ao calcular rateio:", error);
            alert("Ocorreu um erro ao calcular o rateio. Verifique os valores informados.");
            return false;
        }
    }

    // Método para calcular o ajuste do CTEF (valor de execução vigente)
    calcularAjusteCtef() {
        console.log("Calculando ajuste do CTEF...");
        
        try {
            // Verificar se o valor do CTEF ajustado está preenchido
            if (!this.elements.valorCtefAjustado || !this.elements.valorCtefAjustado.value) {
                console.warn("Valor do CTEF ajustado não preenchido");
                return false;
            }
            
            // Obter o novo valor de execução vigente
            const novoValorExecVigente = parseToNumber(this.elements.valorCtefAjustado.value);
            console.log(`Novo valor de execução vigente: ${novoValorExecVigente}`);
            
            if (novoValorExecVigente === null || isNaN(novoValorExecVigente) || novoValorExecVigente <= 0) {
                console.warn(`Valor de execução vigente inválido: ${novoValorExecVigente}`);
                alert('Digite um valor válido para a execução vigente!');
                return false;
            }
            
            // Obter o valor atual da contrapartida vigente (que não deve mudar)
            let valorCPVigente = null;
            
            if (this.elements.cpExecVigente) {
                const cpVigenteTexto = this.elements.cpExecVigente.textContent;
                valorCPVigente = parseToNumber(cpVigenteTexto);
                console.log(`Valor CP vigente (não muda): ${valorCPVigente}`);
            }
            
            if (valorCPVigente === null || isNaN(valorCPVigente)) {
                console.error("Não foi possível obter o valor da contrapartida vigente");
                return false;
            }
            
            // Calcular o novo valor de repasse vigente
            const novoValorRPVigente = novoValorExecVigente - valorCPVigente;
            console.log(`Novo valor RP vigente: ${novoValorRPVigente}`);
            
            // Verificar se o valor é positivo
            if (novoValorRPVigente < 0) {
                console.warn(`Valor de RP vigente negativo: ${novoValorRPVigente}`);
                alert(`O valor de execução vigente (${formatToString(novoValorExecVigente)}) é menor que a contrapartida vigente (${formatToString(valorCPVigente)}), o que resultaria em um repasse negativo.`);
                return false;
            }
            
            // Calcular os novos percentuais
            const novoPercentualRP = (novoValorRPVigente / novoValorExecVigente) * 100;
            const novoPercentualCP = (valorCPVigente / novoValorExecVigente) * 100;
            console.log(`Novos percentuais: RP=${novoPercentualRP}%, CP=${novoPercentualCP}%`);
            
            // Atualizar os valores na tabela
            if (this.elements.rpExecVigente) {
                this.elements.rpExecVigente.textContent = formatToString(novoValorRPVigente);
            }
            
            if (this.elements.viExecVigente) {
                this.elements.viExecVigente.textContent = formatToString(novoValorExecVigente);
            }
            
            if (this.elements.percentRpVigente) {
                this.elements.percentRpVigente.textContent = novoPercentualRP.toFixed(2);
            }
            
            if (this.elements.percentCpVigente) {
                this.elements.percentCpVigente.textContent = novoPercentualCP.toFixed(2);
            }
            
            // Agora, recalcular o rateio do valor solicitado com base nos novos percentuais
            // Obter o valor solicitado atual
            if (this.elements.valorSolicitado && this.elements.valorSolicitado.value) {
                const valorSolicitado = parseToNumber(this.elements.valorSolicitado.value);
                console.log(`Recalculando rateio para valor solicitado: ${valorSolicitado}`);
                
                if (valorSolicitado !== null && !isNaN(valorSolicitado) && valorSolicitado > 0) {
                    // Calcular os novos valores de repasse e contrapartida
                    let novoRateioRP = (valorSolicitado * novoPercentualRP) / 100;
                    let novoRateioCP = (valorSolicitado * novoPercentualCP) / 100;
                    console.log(`Novo rateio inicial: RP=${novoRateioRP}, CP=${novoRateioCP}`);
                    
                    // Verificar se o valor da contrapartida excede o saldo disponível
                    let saldoContrapartidaDesbloquear = null;
                    let saldoRepasseDesbloquear = null;
                    
                    if (this.elements.contrapartidaSaldoDesbloquear) {
                        const saldoCPTexto = this.elements.contrapartidaSaldoDesbloquear.textContent;
                        saldoContrapartidaDesbloquear = parseToNumber(saldoCPTexto);
                    }
                    
                    if (this.elements.repasseSaldoDesbloquear) {
                        const saldoRPTexto = this.elements.repasseSaldoDesbloquear.textContent;
                        saldoRepasseDesbloquear = parseToNumber(saldoRPTexto);
                    }
                    
                    // Ajustar se necessário
                    if (saldoContrapartidaDesbloquear !== null && novoRateioCP > saldoContrapartidaDesbloquear) {
                        console.warn(`Nova contrapartida (${novoRateioCP}) > saldo disponível (${saldoContrapartidaDesbloquear})`);
                        
                        // Usar o saldo disponível para contrapartida
                        novoRateioCP = saldoContrapartidaDesbloquear;
                        // Recalcular repasse
                        novoRateioRP = valorSolicitado - novoRateioCP;
                        
                        // Verificar se o repasse excede o saldo disponível
                        if (saldoRepasseDesbloquear !== null && novoRateioRP > saldoRepasseDesbloquear) {
                            console.warn(`Novo repasse (${novoRateioRP}) > saldo disponível (${saldoRepasseDesbloquear})`);
                            
                            // Limitar ao saldo disponível
                            novoRateioRP = saldoRepasseDesbloquear;
                            // Recalcular o valor total
                            const novoTotal = novoRateioRP + novoRateioCP;
                            
                            // Atualizar o valor solicitado
                            this.elements.valorSolicitado.value = formatToString(novoTotal);
                        }
                    }
                    
                    // Garantir valores não negativos
                    novoRateioRP = Math.max(0, novoRateioRP);
                    novoRateioCP = Math.max(0, novoRateioCP);
                    
                    // Atualizar os campos
                    if (this.elements.repasseAjustado) {
                        this.elements.repasseAjustado.value = formatToString(novoRateioRP);
                    }
                    
                    if (this.elements.contrapartidaAjustado) {
                        this.elements.contrapartidaAjustado.value = formatToString(novoRateioCP);
                    }
                    
                    console.log(`Novo rateio ajustado: RP=${novoRateioRP}, CP=${novoRateioCP}`);
                }
            }
            
            return true;
        } catch (error) {
            console.error("Erro ao calcular ajuste do CTEF:", error);
            alert("Ocorreu um erro ao calcular o ajuste do CTEF. Verifique os valores informados.");
            return false;
        }
    }
}