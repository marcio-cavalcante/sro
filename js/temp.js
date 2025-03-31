// Função para configurar o botão de enviar pendências por email
function setupBotaoEnviarPendencias() {
    // Encontrar ou criar o botão
    let btnEnviarPendencias = document.getElementById('btnEnviarPendencias');
    
    // Se o botão não existir, vamos criá-lo
    if (!btnEnviarPendencias) {
        btnEnviarPendencias = document.createElement('button');
        btnEnviarPendencias.id = 'btnEnviarPendencias';
        btnEnviarPendencias.type = 'button';
        btnEnviarPendencias.className = 'btn-enviar btn-copiar'; // Usar mesma classe do botão de copiar
        btnEnviarPendencias.textContent = 'Enviar Pendências';
        
        // Encontrar a div dos botões na checklist11
        const botoesGroup = document.querySelector('.checklist11 .buttons-group');
        if (botoesGroup) {
            botoesGroup.appendChild(btnEnviarPendencias);
        } else {
            // Se não encontrar a div de botões, adiciona à checklist11
            const checklist11 = document.querySelector('.checklist11');
            if (checklist11) {
                btnEnviarPendencias.style.marginTop = '15px';
                checklist11.appendChild(btnEnviarPendencias);
            } else {
                console.error("Elemento 'checklist11' não encontrado!");
                return;
            }
        }
    }
    
    // Adicionar evento de clique ao botão
    btnEnviarPendencias.addEventListener('click', function() {
        composeEmail();
    });
}

// Função para compor e abrir o email no Outlook
function composeEmail() {
    try {
        // Obter valores dos campos
        const emails = document.getElementById('emails')?.value || '';
        const numeroCeDesbl = document.getElementById('numeroCeDesbl')?.value || '';
        const tomador = document.getElementById('tomador')?.value || '';
        const gestor = document.getElementById('gestor')?.value || '';
        const convenio = document.getElementById('convenio')?.value || '';
        const operation = document.getElementById('operation')?.value || '';
        
        // Obtendo valores do módulo de pendências
        // Estes valores normalmente viriam da função atualizarTextarea() no PendenciasModule.js
        // Como não temos acesso direto, vamos extraí-los do textarea de apontamentos
        
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        if (!textareaApontamento || !textareaApontamento.value) {
            alert("Não há dados de apontamento. Verifique se as pendências foram geradas corretamente.");
            return;
        }
        
        const textoApontamento = textareaApontamento.value;
        
        // Extrair valores do texto de apontamento
        let valorMedicao = extrairValor(textoApontamento, "Recebemos a Medição no valor de", ",");
        
        // Extrair valores de Repasse e Contrapartida
        let repasseApontamento = "";
        let contrapartidaApontamento = "";
        
        const linhaValores = extrairLinhaContendo(textoApontamento, "Repasse:");
        if (linhaValores) {
            const partes = linhaValores.split('-');
            if (partes.length >= 2) {
                repasseApontamento = partes[0].split(':')[1].trim();
                contrapartidaApontamento = partes[1].split(':')[1].trim();
            }
        }
        
        // Extrair dados de empresa e valores
        const empresas = [];
        const linhasBeneficiarios = extrairLinhaBeneficiarios(textoApontamento);
        for (const linha of linhasBeneficiarios) {
            if (linha.includes('-')) {
                const partes = linha.split('-');
                const empresa = {
                    nomeEmpresa: partes[0].replace('-', '').trim(),
                    valor: partes[1].replace('Valor:', '').trim()
                };
                empresas.push(empresa);
            }
        }
        
        // Extrair valores de ordem, parcela e instrumento
        let ordemDesbloqueioValue = extrairValorEntre(textoApontamento, "Ordem do Desbloqueio:", "-");
        let parcelaNumeroValue = extrairValorApos(textoApontamento, "Parcela nº:");
        
        const linhaInstrumento = extrairLinhaContendo(textoApontamento, "Instrumento de desbloqueio:");
        let instrumentoDesbloqueio = "";
        let percentEvolucao = "";
        
        if (linhaInstrumento) {
            instrumentoDesbloqueio = extrairValorEntre(linhaInstrumento, "Instrumento de desbloqueio:", "com evolução");
            percentEvolucao = extrairValorEntre(linhaInstrumento, "com evolução de", "%");
        }
        
        // Extrair informações de tarifas
        const tarifasPendentes = document.getElementById('tarifasPendentes');
        let tarifasText = "";
        
        if (!tarifasPendentes || !tarifasPendentes.checked) {
            // O checkbox não está marcado, então procure pelas tarifas
            const inicioTarifas = textoApontamento.indexOf("Atentar para o recolhimento da(s) tarifa(s) pendente(s):");
            
            if (inicioTarifas !== -1) {
                const fimTarifas = textoApontamento.indexOf("Tão logo solucionadas", inicioTarifas);
                if (fimTarifas !== -1) {
                    tarifasText = textoApontamento.substring(inicioTarifas, fimTarifas).trim();
                    // Adicionar cada linha de tarifa
                    const linhasTarifas = tarifasText.split('\n').slice(1); // Pegar a partir da segunda linha
                    tarifasText = linhasTarifas.join('\n');
                }
            }
        }
        
        // Extrair relação de pendências
        let relacaoPendencias = "";
        
        // Olhando a estrutura do texto, as pendências estão entre a primeira linha e os dados da medição
        const inicioMedicao = textoApontamento.indexOf("Dados da medição:");
        if (inicioMedicao !== -1) {
            const primeiraLinha = textoApontamento.indexOf("\n");
            if (primeiraLinha !== -1 && primeiraLinha < inicioMedicao) {
                relacaoPendencias = textoApontamento.substring(primeiraLinha, inicioMedicao).trim();
                
                // Se for "Sem pendências registradas", tratar adequadamente
                if (relacaoPendencias.includes("Sem pendências registradas")) {
                    relacaoPendencias = "Sem pendências registradas.";
                }
            }
        }
        
        // Composição do assunto do email
        const assunto = `CE GIGOV/JP ${numeroCeDesbl} - ${tomador} - ${gestor} ${convenio} - Operação ${operation} - Pendência para Desbloqueio`;
        
        // Composição do corpo do email seguindo o modelo
        let corpoEmail = `Ao(À)
${tomador}

Assunto: Pendência para Desbloqueio
Ref.:  ${gestor} ${convenio} - Operação ${operation}

Sr.(a.) Convenente

1. Informamos resultado da análise da medição do contrato em referência, no valor de ${valorMedicao}, na seguinte composição:

-----------------------------------------------------------------------
Valor total:                            ${valorMedicao}
-----------------------------------------------------------------------
Repasse:                                ${repasseApontamento}
Contrapartida:                          ${contrapartidaApontamento}
-----------------------------------------------------------------------

1.1 Dados do desbloqueio.

-----------------------------------------------------------------------`;

        // Adicionar informações de empresas
        empresas.forEach(empresa => {
            corpoEmail += `
Beneficiário:   ${empresa.nomeEmpresa} - Valor: ${empresa.valor}`;
        });

        corpoEmail += `
-----------------------------------------------------------------------
Ordem desbloq.: ${ordemDesbloqueioValue} - Parcela nº: ${parcelaNumeroValue}
-----------------------------------------------------------------------
Instrum. desbloq.: ${instrumentoDesbloqueio} com evolução de ${percentEvolucao}%
-----------------------------------------------------------------------`;

        // Adicionar informações de tarifas se existirem
        if (tarifasText) {
            corpoEmail += `

Atentar para o recolhimento das tarifas pendentes:

${tarifasText}`;
        }

        // Adicionar relação de pendências
        corpoEmail += `

2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:

${relacaoPendencias}

3. Ficamos no aguardo para prosseguimento do processo, ficando à disposição para eventuais esclarecimentos, se necessários.`;

        // Formatar a URL para o protocolo mailto
        const mailtoUrl = `mailto:${emails}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
        
        // Abrir no cliente de email padrão (Outlook)
        window.location.href = mailtoUrl;
        
    } catch (error) {
        console.error("Erro ao compor o email:", error);
        alert("Ocorreu um erro ao tentar enviar o email. Verifique o console para mais detalhes.");
    }
}

// Funções auxiliares para extrair informações do texto
function extrairValor(texto, inicio, fim) {
    const inicioIndex = texto.indexOf(inicio);
    if (inicioIndex === -1) return "";
    
    const valorInicio = inicioIndex + inicio.length;
    const valorFim = texto.indexOf(fim, valorInicio);
    
    if (valorFim === -1) return "";
    
    return texto.substring(valorInicio, valorFim).trim();
}

function extrairValorEntre(texto, inicio, fim) {
    const inicioIndex = texto.indexOf(inicio);
    if (inicioIndex === -1) return "";
    
    const valorInicio = inicioIndex + inicio.length;
    const valorFim = texto.indexOf(fim, valorInicio);
    
    if (valorFim === -1) return "";
    
    return texto.substring(valorInicio, valorFim).trim();
}

function extrairValorApos(texto, marcador) {
    const inicioIndex = texto.indexOf(marcador);
    if (inicioIndex === -1) return "";
    
    const valorInicio = inicioIndex + marcador.length;
    const linhaFim = texto.indexOf('\n', valorInicio);
    
    if (linhaFim === -1) {
        return texto.substring(valorInicio).trim();
    }
    
    return texto.substring(valorInicio, linhaFim).trim();
}

function extrairLinhaContendo(texto, marcador) {
    const linhas = texto.split('\n');
    for (const linha of linhas) {
        if (linha.includes(marcador)) {
            return linha.trim();
        }
    }
    return "";
}

function extrairLinhaBeneficiarios(texto) {
    const inicioIndex = texto.indexOf("Beneficiário(s):");
    if (inicioIndex === -1) return [];
    
    const linhas = texto.split('\n');
    const linhaInicio = linhas.findIndex(linha => linha.includes("Beneficiário(s):"));
    if (linhaInicio === -1) return [];
    
    const resultado = [];
    let i = linhaInicio + 1;
    
    while (i < linhas.length && linhas[i].trim().startsWith('-')) {
        resultado.push(linhas[i].trim());
        i++;
    }
    
    return resultado;
}

// Adicionar a função ao objeto DesbloqueioManager
if (typeof DesbloqueioManager !== 'undefined') {
    // Se o DesbloqueioManager já existir, adicionar a função
    const oldInit = DesbloqueioManager.init;
    
    DesbloqueioManager.init = function() {
        // Chamar a inicialização original
        oldInit.apply(this, arguments);
        
        // Adicionar a configuração do novo botão
        setupBotaoEnviarPendencias();
    };
} else {
    // Se não existir, adicionar um listener ao carregamento da página
    document.addEventListener('DOMContentLoaded', function() {
        setupBotaoEnviarPendencias();
    });
}