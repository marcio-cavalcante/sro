// emailModule.js - Módulo para envio de emails com pendências

// Função principal para enviar o email com as pendências
export function enviarEmailPendencias() {
    try {
        // Obter valores dos campos
        const emails = document.getElementById('emails')?.value || '';
        const numeroCeDesbl = document.getElementById('numeroCeDesbl')?.value || '';
        const tomador = document.getElementById('tomador')?.value || '';
        const gestor = document.getElementById('gestor')?.value || '';
        const convenio = document.getElementById('convenio')?.value || '';
        const operation = document.getElementById('operation')?.value || '';
        
        // Obter o texto do apontamento
        const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
        if (!textareaApontamento || !textareaApontamento.value) {
            alert("Não há dados de apontamento. Verifique se as pendências foram geradas corretamente.");
            return;
        }
        
        const textoApontamento = textareaApontamento.value;
        
        // Extrair valores do texto de apontamento
        let valorMedicao = extrairValor(textoApontamento, "Recebemos a Medição no valor de", ",");
        
        // Extrair valores de repasse e contrapartida
        const repasse = extrairValorApos(textoApontamento, "Repasse: ");
        const contrapartida = extrairValorApos(textoApontamento, "Contrapartida: ");
        
        // Extrair ordem do desbloqueio e parcela
        const linhaOrdem = extrairLinhaContendo(textoApontamento, "Ordem do Desbloqueio:");
        const ordemDesbloqueio = extrairValorEntre(linhaOrdem, "Ordem do Desbloqueio:", "-");
        const parcela = extrairValorApos(linhaOrdem, "Parcela nº:");
        
        // Extrair instrumento de desbloqueio e evolução
        const linhaInstrumento = extrairLinhaContendo(textoApontamento, "Instrumento de desbloqueio:");
        const instrumento = extrairValorEntre(linhaInstrumento, "Instrumento de desbloqueio:", ",");
        const evolucao = extrairValorApos(linhaInstrumento, "evolução de");
        
        // Extrair beneficiários se houver
        const beneficiarios = extrairLinhaBeneficiarios(textoApontamento);
        
        // Extrair informações do beneficiário e valor
        let empresa = "";
        let valorEmpresa = "";
        
        // Verificar se temos beneficiários
        if (beneficiarios.length > 0) {
            const beneficiarioCompleto = beneficiarios[0];
            
            // Remover o traço inicial se existir
            const beneficiarioSemTraco = beneficiarioCompleto.replace(/^-\s*/, "");
            
            // Verificar se o formato é "Empresa - Valor: R$ XXX" ou similar
            if (beneficiarioSemTraco.includes(" - ") && 
               (beneficiarioSemTraco.includes("Valor:") || beneficiarioSemTraco.includes("R$"))) {
                // Extrair a parte antes do primeiro ' - '
                empresa = beneficiarioSemTraco.split(" - ")[0].trim();
                
                // Extrair a parte do valor
                if (beneficiarioSemTraco.includes("Valor:")) {
                    valorEmpresa = beneficiarioSemTraco.split("Valor:")[1].trim();
                } else if (beneficiarioSemTraco.includes("R$")) {
                    const partes = beneficiarioSemTraco.split("R$");
                    if (partes.length > 1) {
                        valorEmpresa = partes[1].trim();
                    }
                }
            } else {
                // Se não tem o formato esperado, usar todo o conteúdo como empresa
                empresa = beneficiarioSemTraco;
            }
        }
        
        // Se não conseguiu extrair das linhas de beneficiários, tentar diretamente do texto
        if (!empresa) {
            empresa = extrairValorApos(textoApontamento, "Empresa:") || 
                     extrairValorApos(textoApontamento, "Beneficiário:") || "";
        }
        
        if (!valorEmpresa) {
            valorEmpresa = extrairValorApos(textoApontamento, "Valor Empresa:") || 
                          extrairValorApos(textoApontamento, "Valor:") || "";
        }
        
        // Verificar se o valor já contém R$, se não, adicionar
        if (valorEmpresa && !valorEmpresa.includes("R$")) {
            valorEmpresa = valorEmpresa;
        }
        
        // Extrair pendências
        const pendencias = extrairPendencias(textoApontamento);
        
        // Compor o assunto do email
        const assunto = `CE GIGOV/JP ${numeroCeDesbl} - ${tomador} - ${gestor} ${convenio} - Operação ${operation} - Pendência para Desbloqueio`;
        
        // Compor o corpo do email em formato de texto
        let corpoEmailTexto = `Ao(À)
${tomador}

Assunto: Pendência para Desbloqueio
Ref.:  ${gestor} ${convenio} - Operação ${operation}

Sr.(a.) Convenente

1. Informamos resultado da análise da medição do contrato em referência, no valor de ${valorMedicao}, na seguinte composição:

-----------------------------------------------------------------------
Valor total:                            ${valorMedicao}
-----------------------------------------------------------------------
Repasse:                                ${repasse}
Contrapartida:                          ${contrapartida}
-----------------------------------------------------------------------

1.1 Dados do desbloqueio.

-----------------------------------------------------------------------
Ordem do Desbloqueio:                   ${ordemDesbloqueio}
Parcela:                                ${parcela}
-----------------------------------------------------------------------
`;

        // Não é necessário adicionar beneficiários separadamente agora que estão incluídos na tabela de dados
        // Mas se quiser manter uma seção separada para vários beneficiários (se houver mais de um), pode descomentar esse código
        /*
        if (beneficiarios.length > 1) {
            corpoEmailTexto += `
1.2 Beneficiários adicionais.

-----------------------------------------------------------------------`;
            // Começar do segundo beneficiário (índice 1) se o primeiro já foi usado
            for (let i = 1; i < beneficiarios.length; i++) {
                corpoEmailTexto += `
${beneficiarios[i]}`;
            }
            corpoEmailTexto += `
-----------------------------------------------------------------------
`;
        }
        */

        // Adicionar pendências
        if (pendencias.length > 0) {
            corpoEmailTexto += `
2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:

`;
            pendencias.forEach((pendencia) => {
                corpoEmailTexto += `- ${pendencia}
`;
            });
        } else {
            corpoEmailTexto += `
2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:

Sem pendências registradas.
`;
        }

        corpoEmailTexto += `
3. Ficamos no aguardo para prosseguimento do processo, ficando à disposição para eventuais esclarecimentos, se necessários.

Atenciosamente,

GIGOV/JP`;

        // Compor o corpo do email em formato HTML seguindo o modelo do Word
        let corpoEmailHTML = `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <p>Ao(À)<br>
    <strong>${tomador}</strong></p>

    <p>Assunto: <strong>Pendência para Desbloqueio</strong><br>
    Ref.: <strong>${gestor} ${convenio} - Operação ${operation}</strong></p>

    <p>Sr.(a.) Convenente</p>

    <p>1. Informamos resultado da análise da medição do contrato em referência, no valor de R$ ${valorMedicao}, na seguinte composição:</p>

    <div style="margin: 15px 0;">
        <table style="width: 100px; border-collapse: collapse; border-top: 1px solid #000; border-bottom: 1px solid #000;">
            <tr>
                <td style="padding: 5px 10px; width: 50px;">Valor total:</td>
                <td style="padding: 5px 10px;">R$ ${valorMedicao}</td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #000; padding: 1px;"></td></tr>
            <tr>
                <td style="padding: 5px 10px;">Repasse:</td>
                <td style="padding: 5px 10px;">R$ ${repasse}</td>
            </tr>
            <tr>
                <td style="padding: 5px 10px;">Contrapartida:</td>
                <td style="padding: 5px 10px;">R$ ${contrapartida}</td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #000; padding: 1px;"></td></tr>
        </table>
    </div>

    <p>1.1 Dados do desbloqueio.</p>

    <div style="margin: 15px 0;">
        <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #000; border-bottom: 1px solid #000;">
            <tr>
                <td style="padding: 5px 10px; width: 25%; vertical-align: top;">Beneficiário:</td>
                <td style="padding: 5px 10px;"><strong>${empresa 
                  ? (valorEmpresa 
                     ? `${empresa} - Valor: R$ ${valorEmpresa}`
                     : empresa)
                  : (beneficiarios.length > 0 
                     ? beneficiarios[0].replace(/^-\s*/, "") 
                     : 'A ser informado')}</strong></td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #000; padding: 1px;"></td></tr>
            <tr>
                <td style="padding: 5px 10px; vertical-align: top;">Ordem desbloq.:</td>
                <td style="padding: 5px 10px;"><strong>${ordemDesbloqueio} - Parcela nº: ${parcela}</strong></td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #000; padding: 1px;"></td></tr>
            <tr>
                <td style="padding: 5px 10px; vertical-align: top;">Instrum. desbloq.:</td>
                <td style="padding: 5px 10px;"><strong>${instrumento} com evolução de ${evolucao}</strong></td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #000; padding: 1px;"></td></tr>
        </table>
    </div>`;

        // Verificar se há beneficiários e adicioná-los no lugar apropriado
        // Nota: Já temos uma linha para beneficiários na tabela acima
        
        // Adicionar pendências
        if (pendencias.length > 0) {
            corpoEmailHTML += `
    <p>2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:<strong></p>

    <p>`;
            pendencias.forEach((pendencia, index) => {
                corpoEmailHTML += `- ${pendencia}<br>`;
            });
            corpoEmailHTML += `</strong></p>`;
        } else {
            // Se não houver pendências, adicione uma mensagem padrão ou mantenha conforme necessário
            corpoEmailHTML += `
    <p>2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:<strong></p>
    
    <p><strong>Sem pendências registradas</strong></p>`;
        }

        // Nota sobre tarifas (se aplicável)
        // Exemplo de como adicionar uma seção condicional para tarifas
        // Esta parte precisará ser ajustada conforme suas necessidades específicas
        /*
        const tarifasPendentes = ""; // Adicione lógica para extrair informações sobre tarifas se necessário
        if (tarifasPendentes) {
            corpoEmailHTML += `
    <p>Atentar para o recolhimento das tarifas pendentes:</p>
    <p>- ${tarifasPendentes}</p>`;
        }
        */

        corpoEmailHTML += `
    <p>3. Ficamos no aguardo para prosseguimento do processo, ficando à disposição para eventuais esclarecimentos, se necessários.</p>

    <p>Atenciosamente,</p>

    <p><strong>GIGOV/JP</strong></p>
</div>`;

        // Armazenar os dados no sessionStorage para recuperar na página de visualização
        const emailData = {
            destinatarios: emails,
            assunto: assunto,
            corpoTexto: corpoEmailTexto,
            corpoHTML: corpoEmailHTML
        };
        
        sessionStorage.setItem('emailData', JSON.stringify(emailData));
        
        // Abrir nova janela com a pré-visualização do email
        const previewWindow = window.open('email-preview.html', '_blank');
        
        // Se não conseguir abrir a janela (bloqueadores de pop-up), informar ao usuário
        if (!previewWindow) {
            alert("Não foi possível abrir a janela de pré-visualização. Verifique se o bloqueador de pop-ups está ativado.");
        }
        
    } catch (error) {
        console.error("Erro ao compor o email:", error);
        alert("Ocorreu um erro ao tentar compor o email. Verifique o console para mais detalhes.");
    }
}

// Função para abrir o cliente de email a partir da página de pré-visualização
export function abrirClienteEmail() {
    try {
        const emailData = JSON.parse(sessionStorage.getItem('emailData'));
        if (!emailData) {
            alert("Dados do email não encontrados!");
            return;
        }
        
        // URL mailto simplificada (apenas com destinatários e assunto)
        const mailtoSimples = `mailto:${emailData.destinatarios}?subject=${encodeURIComponent(emailData.assunto)}`;
        
        // Abrir o cliente de email com a URL simplificada
        window.location.href = mailtoSimples;
        
        // Mostrar mensagem ao usuário
        alert("Um email será aberto com os destinatários e assunto.\n\nPor favor, copie o conteúdo HTML da pré-visualização e cole no corpo do email.");
        
    } catch (error) {
        console.error("Erro ao abrir cliente de email:", error);
        alert("Ocorreu um erro ao tentar abrir o cliente de email.");
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
    const linhas = texto.split('\n');
    for (const linha of linhas) {
        if (linha.includes(marcador)) {
            return linha.substring(linha.indexOf(marcador) + marcador.length).trim();
        }
    }
    return "";
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
    // Tentar diferentes formatos de cabeçalho de beneficiários
    const possiveisCabecalhos = ["Beneficiário(s):", "Beneficiários:", "Beneficiário:", "Empresa:"];
    
    let linhaInicio = -1;
    let linhas = texto.split('\n');
    
    // Procurar por qualquer um dos cabeçalhos possíveis
    for (const cabecalho of possiveisCabecalhos) {
        const index = linhas.findIndex(linha => linha.includes(cabecalho));
        if (index !== -1) {
            linhaInicio = index;
            break;
        }
    }
    
    if (linhaInicio === -1) return [];
    
    const resultado = [];
    let i = linhaInicio + 1;
    
    // Coletar todas as linhas que começam com '-' ou contém informações de beneficiário
    while (i < linhas.length && 
          (linhas[i].trim().startsWith('-') || 
           linhas[i].includes("Empresa:") || 
           linhas[i].includes("Valor:") ||
           linhas[i].includes("Beneficiário:"))) {
        resultado.push(linhas[i].trim());
        i++;
    }
    
    // Se não encontramos nada nas linhas seguintes, verificar se há info na própria linha do cabeçalho
    if (resultado.length === 0) {
        for (const cabecalho of possiveisCabecalhos) {
            if (linhas[linhaInicio].includes(cabecalho)) {
                const conteudo = linhas[linhaInicio].split(cabecalho)[1].trim();
                if (conteudo) {
                    resultado.push(conteudo);
                }
                break;
            }
        }
    }
    
    return resultado;
}

function extrairPendencias(texto) {
    // As pendências vêm após "para desbloqueio, desde que atendidas as seguintes condições:"
    // e antes da linha que começa com "Dados da medição:"
    const marcadorInicio = "para desbloqueio, desde que atendidas as seguintes condições:";
    const marcadorFim = "Dados da medição:";
    
    const inicioIndex = texto.indexOf(marcadorInicio);
    if (inicioIndex === -1) return [];
    
    const fimIndex = texto.indexOf(marcadorFim, inicioIndex);
    if (fimIndex === -1) return [];
    
    const secaoPendencias = texto.substring(inicioIndex + marcadorInicio.length, fimIndex).trim();
    
    // Se contém "Sem pendências registradas", retorna array vazio
    if (secaoPendencias.includes("Sem pendências registradas")) {
        return [];
    }
    
    // Dividir por linhas e filtrar apenas as que começam com "-"
    const linhas = secaoPendencias.split('\n');
    const pendencias = linhas
        .filter(linha => linha.trim().startsWith('-'))
        .map(linha => linha.trim().substring(2).trim());
    
    return pendencias;
}