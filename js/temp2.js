calcularRateio() {
    console.log("Iniciando cálculo de rateio com validações...");
    
    try {
        // Verificação dos elementos essenciais
        if (!this.elements.valorSolicitado) {
            throw new Error("Valor solicitado não preenchido!");
        }
        
        if (!this.elements.repasseSolicitado) {
            throw new Error("Erro em encontrar o valor de repasse solicitado!");
        }
        
        if (!this.elements.contrapartidaSolicitado) {
            throw new Error("Erro em encontrar o valor de contrapartida solicitada!");
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
        } else {
            console.warn("Elemento percentRpVigente não encontrado, usando valor padrão");
            percentualRP = 57.32; // Valor padrão baseado no exemplo
        }
        
        if (this.elements.percentCpVigente) {
            const percentualCPText = this.elements.percentCpVigente.textContent.replace('%', '').trim();
            percentualCP = parseFloat(percentualCPText);
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
                        
            // Atualizar o campo de valor solicitado
            this.elements.valorSolicitado.value = formatToString(novoTotal);
        }
        
        // Garantia contra valores negativos
        valorRP = Math.max(0, valorRP);
        valorCP = Math.max(0, valorCP);
        
        // Formatação e atualização dos campos
        this.elements.repasseSolicitado.value = formatToString(valorRP);
        this.elements.contrapartidaSolicitado.value = formatToString(valorCP);
        
        // Forçar atualização visual
        this.elements.repasseSolicitado.dispatchEvent(new Event('change'));
        this.elements.contrapartidaSolicitado.dispatchEvent(new Event('change'));
        
        return true;
    } catch (error) {
        console.error("Erro no cálculo de rateio:", error);
        return false;
    }
}