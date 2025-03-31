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

        // Adicionar beneficiários se houver
        if (beneficiarios.length > 0) {
            corpoEmailTexto += `
1.2 Beneficiários.

-----------------------------------------------------------------------`;
            beneficiarios.forEach(beneficiario => {
                corpoEmailTexto += `
${beneficiario}`;
            });
            corpoEmailTexto += `
-----------------------------------------------------------------------
`;
        }

        // Adicionar pendências
        if (pendencias.length > 0) {
            corpoEmailTexto += `
2. Para liberação de recursos, informamos pendências:

-----------------------------------------------------------------------`;
            pendencias.forEach((pendencia, index) => {
                corpoEmailTexto += `
${index + 1}) ${pendencia}`;
            });
            corpoEmailTexto += `
-----------------------------------------------------------------------
`;
        }

        corpoEmailTexto += `
3. Tão logo solucionadas, de forma consolidada, informar a GIGOV para continuidade do processo.

Atenciosamente,

GIGOV/JP`;

        // Compor o corpo do email em formato HTML
        let corpoEmailHTML = `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <p>Ao(À)<br>
    <strong>${tomador}</strong></p>

    <p><strong>Assunto:</strong> Pendência para Desbloqueio<br>
    <strong>Ref.:</strong> ${gestor} ${convenio} - Operação ${operation}</p>

    <p>Sr.(a.) Convenente</p>

    <p>1. Informamos resultado da análise da medição do contrato em referência, no valor de ${valorMedicao}, na seguinte composição:</p>

    <div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 0; margin: 10px 0;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 5px;">Valor total:</td>
                <td style="padding: 5px; text-align: right;">${valorMedicao}</td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #ccc;"></td></tr>
            <tr>
                <td style="padding: 5px;">Repasse:</td>
                <td style="padding: 5px; text-align: right;">${repasse}</td>
            </tr>
            <tr>
                <td style="padding: 5px;">Contrapartida:</td>
                <td style="padding: 5px; text-align: right;">${contrapartida}</td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #ccc;"></td></tr>
        </table>
    </div>

    <p>1.1 Dados do desbloqueio.</p>

    <div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 0; margin: 10px 0;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 5px;">Ordem do Desbloqueio:</td>
                <td style="padding: 5px; text-align: right;">${ordemDesbloqueio}</td>
            </tr>
            <tr>
                <td style="padding: 5px;">Parcela:</td>
                <td style="padding: 5px; text-align: right;">${parcela}</td>
            </tr>
            <tr><td colspan="2" style="border-top: 1px solid #ccc;"></td></tr>
        </table>
    </div>`;

        // Adicionar beneficiários se houver
        if (beneficiarios.length > 0) {
            corpoEmailHTML += `
    <p>1.2 Beneficiários.</p>

    <div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 0; margin: 10px 0;">
        <ul style="list-style-type: none; padding-left: 5px; margin: 0;">`;
            beneficiarios.forEach(beneficiario => {
                corpoEmailHTML += `
            <li>${beneficiario}</li>`;
            });
            corpoEmailHTML += `
        </ul>
    </div>`;
        }

        // Adicionar pendências
        if (pendencias.length > 0) {
            corpoEmailHTML += `
    <p>2. Para liberação de recursos, informamos pendências:</p>

    <div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 0; margin: 10px 0;">
        <ol style="margin: 0; padding-left: 25px;">`;
            pendencias.forEach((pendencia) => {
                corpoEmailHTML += `
            <li>${pendencia}</li>`;
            });
            corpoEmailHTML += `
        </ol>
    </div>`;
        }

        corpoEmailHTML += `
    <p>3. Tão logo solucionadas, de forma consolidada, informar a GIGOV para continuidade do processo.</p>

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