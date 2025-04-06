// Gerador de Email
textos.addEventListener('click', function () {

    // let numeroCeDesbl; // Variável para armazenar o número da CE
    // const caixaTexto = document.getElementById("cePendenciaDesbloqueio"); // Verifica se a caixa de texto está preenchida

    // if (!caixaTexto.value.trim()) {
    //     // Se não estiver preenchida, copiar texto para a área de transferência
    //     const textoCopiar = "Pendência para Desbloqueio";
    //     navigator.clipboard.writeText(textoCopiar)
    //         .then(() => {
    //             const mensagemPrompt = "Gere um número de CE.\nNo REUNI, vá em NUMERA DOCUMENTOS e escolha CE.\nNo campo assunto tecle CTRL+V\nInsira o número da CE gerada no formado xxx/20xx.";
    //             let valorCE = prompt(mensagemPrompt); // Prompt para obter o valor do usuário

    //             // Verifica se o usuário digitou algo (não cancelou o prompt)
    //             if (valorCE === null || valorCE.trim() === "") {
    //                 return;
    //             }

    //             // Atribui o valor digitado à caixa de texto e à variável
    //             caixaTexto.value = valorCE;
    //             numeroCeDesbl = valorCE;
    //             geradorEmail ()
    //         })
    //         .catch(err => {
    //             console.error('Erro ao copiar texto: ', err);
    //         });
    // } else {
    //     numeroCeDesbl = caixaTexto.value;
    //     geradorEmail ()
    // }


    let numeroCeDesbl; // Variável para armazenar o número da CE
const caixaTexto = document.getElementById("cePendenciaDesbloqueio"); // Verifica se a caixa de texto está preenchida

if (!caixaTexto.value.trim()) {
    // Se não estiver preenchida, copiar texto para a área de transferência
    const textoCopiar = "Pendência para Desbloqueio";

    // Verifica se a API clipboard está disponível
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textoCopiar)
            .then(() => {
                const mensagemPrompt = "Gere um número de CE.\nNo REUNI, vá em NUMERA DOCUMENTOS e escolha CE.\nNo campo assunto tecle CTRL+V\nInsira o número da CE gerada no formado xxx/20xx.";
                let valorCE = prompt(mensagemPrompt); // Prompt para obter o valor do usuário

                // Verifica se o usuário digitou algo (não cancelou o prompt)
                if (valorCE === null || valorCE.trim() === "") {
                    return;
                }

                // Atribui o valor digitado à caixa de texto e à variável
                caixaTexto.value = valorCE;
                numeroCeDesbl = valorCE;
                geradorEmail ();
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
    } else {
        // Alternativa com execCommand caso a clipboard API não esteja disponível
        try {
            const textArea = document.createElement("textarea");
            textArea.value = textoCopiar;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const mensagemPrompt = "Gere um número de CE.\nNo REUNI, vá em NUMERA DOCUMENTOS e escolha CE.\nNo campo assunto tecle CTRL+V\nInsira o número da CE gerada no formado xxx/20xx.";
            let valorCE = prompt(mensagemPrompt); // Prompt para obter o valor do usuário

            // Verifica se o usuário digitou algo (não cancelou o prompt)
            if (valorCE === null || valorCE.trim() === "") {
                return;
            }

            // Atribui o valor digitado à caixa de texto e à variável
            caixaTexto.value = valorCE;
            numeroCeDesbl = valorCE;
            geradorEmail ();

        } catch (err) {
            console.error('Erro ao copiar texto com fallback: ', err);
        }
    }
} else {
    numeroCeDesbl = caixaTexto.value;
    geradorEmail ();
}

})

function geradorEmail () {
    //Dados da operação, convênio e tomador 
    const operacao = document.getElementById('operation').value;
    console.log(operacao)

    const convenio = document.getElementById('convenio').value;
    console.log(convenio)

    const emails = document.getElementById('emails').value;
    console.log(emails)

    const gestor = document.getElementById('gestor').value;
    console.log(gestor)

    const tomador = document.getElementById('tomador').value
    console.log(tomador)

    let vocativoTomador = "" // Construção do vocativo "À", "Ao" ou "Ao(À)""
    switch (tomador.substring(0, 5)) {
        case "ASSOC":
        case "SECRE":
        case "FUNDA":
        case "SEC D":
        case "SUPER":
        case "FUND ":
            vocativoTomador = "À";
            break;
        case "ESTAD":
        case "MUNIC":
        case "FUNDO":
        case "HOSPI":
        case "INSTI":
            vocativoTomador = "Ao";
            break;
        default:
            vocativoTomador = "Ao(À)";
    }
    console.log(vocativoTomador)

    // Identificação de contrato é OGU ou PAC
    let contratoPac = "OGU";
    let elementosPac = document.getElementsByClassName("etiqueta-input");
    Array.from(elementosPac).forEach(elemento => {
        if (elemento.value.includes("PAC")) {
            contratoPac = "PAC";
            console.log(contratoPac);
        }
    });
    console.log(contratoPac)

    let termoCompromissoOuContratoRepasse = ""
    if (contratoPac === "OGU") {
        termoCompromissoOuContratoRepasse = "Contrato de Repasse - CR "
    } else {
        termoCompromissoOuContratoRepasse = "Termo de Compromisso - TC "
    }
    console.log(termoCompromissoOuContratoRepasse)

    // Captura do Valor total a desbloquear
    const valorSolicitado = document.getElementById('valorSolicitado').value;
    if (valorSolicitado === "") {
        alert('É necessário digitar o "Valor a desbloquear" na aba "Análise dos Valores para Desbloqueio"')
        return
    }
    console.log(valorSolicitado)
    console.log(typeof (valorSolicitado))

    // Captura o Valor do REPASSE a desbloquear
    let valorRepasseDesbloquear = ""
    if (document.getElementById('repasseAjusteManual').value !== "") {
        valorRepasseDesbloquear = document.getElementById('repasseAjusteManual').value
    } else if (document.getElementById('repasseAjustado').value !== "") {
        valorRepasseDesbloquear = document.getElementById('repasseAjustado').value
    } else {
        valorRepasseDesbloquear = document.getElementById('repasseSolicitado').value
    }
    console.log(valorRepasseDesbloquear)

    // Captura o Valor da CONTRAPARTIDA a desbloquear
    let valorContrapartidaDesbloquear = ""
    if (document.getElementById('contrapartidaAjusteManual').value !== "") {
        valorContrapartidaDesbloquear = document.getElementById('contrapartidaAjusteManual').value
    } else if (document.getElementById('contrapartidaAjustado').value !== "") {
        valorContrapartidaDesbloquear = document.getElementById('contrapartidaAjustado').value
    } else {
        valorContrapartidaDesbloquear = document.getElementById('contrapartidaSolicitado').value
    }
    console.log(valorContrapartidaDesbloquear)

    // Obtendo o conteúdo da textarea
    const textareaApontamento = document.getElementById('apontamentoDesbloqueio');
    let textareaContent = textareaApontamento.value;
    let lines = textareaContent.split('\n'); // Dividindo o conteúdo em linhas

    // Capturando o nome dos CTEF a partir da textarea
    let beneficiarios = []; // Variável para armazenar os beneficiários
    let capturingBeneficiarios = false; // Identifica quando começar a capturar os beneficiários

    for (let line of lines) {
        if (line.includes("Beneficiário(s):")) { // Se linha contém "Beneficiário(s):", começa capturar linhas seguintes
            capturingBeneficiarios = true;
            continue;
        }

        if (line.includes("Ordem de desbloqueio")) {
            break;
        }

        // Se linha começa com "-", armazena no array
        if (capturingBeneficiarios && line.trim().startsWith("-")) {
            beneficiarios.push(line.trim().trim());
        }
    }
    console.log(beneficiarios);

    // Variável para armazenar a ORDEM DO DESBLOQUEIO
    let ordemDoDesbloqueio = null;
    for (let line of lines) {
        // Verificando a linha com "Ordem do Desbloqueio:"
        if (line.includes("Ordem de desbloqueio:")) {
            ordemDoDesbloqueio = line.split("Ordem de desbloqueio:")[1].trim();
            break;
        }
    }
    console.log("Ordem de desbloqueio:", ordemDoDesbloqueio);

    // Variável para armazenar a INSTRUMENTO DE DESBLOQUEIO
    let instrumentoDoDesbloqueio = null;
    for (let line of lines) {
        // Verificando a linha com "Ordem do Desbloqueio:"
        if (line.includes("Instrumento de desbloqueio:")) {
            instrumentoDoDesbloqueio = line.split("Instrumento de desbloqueio:")[1].trim();
            break;
        }
    }
    console.log("Instr. desbloqueio:", instrumentoDoDesbloqueio);

    // Capturando as PENDÊNCIAS PARA O DESBLOQUEIO
    let linhasPendencias = [];
    let buscandoPendencias = false;

    for (let line of lines) {
        // Inicia a captura quando encontra a linha que contém "Recebemos a Medição no valor de"
        if (line.includes("Recebemos a Medição no valor de")) {
            buscandoPendencias = true;
            continue;
        }

        // Se encontramos "Dados da medição:", paramos a captura
        if (line.includes("Dados da medição:")) {
            break;
        }

        // Se estamos na fase de captura e a linha começa com "-", armazenamos no array
        if (buscandoPendencias && line.trim().startsWith("-")) {
            linhasPendencias.push(line.trim().trim());
        }
    }
    console.log("Linhas capturadas:", linhasPendencias);

    // Capturando as TARIFAS
    let linhasTarifas = [];
    let buscandoTarifas = false;

    for (let line of lines) {
        // Inicia a captura quando encontra a linha que contém "Atentar para o recolhimento da"
        if (line.includes("Atentar para o recolhimento da")) {
            buscandoTarifas = true;
            continue;
        }

        // Se encontramos "Tão logo solucionadas", paramos a captura
        if (line.includes("Tão logo solucionadas")) {
            break;
        }

        // Se estamos na fase de captura e a linha começa com "-", armazenamos no array
        if (buscandoTarifas && line.trim().startsWith("-")) {
            linhasTarifas.push(line.trim().trim());
        }
    }
    console.log("Tarifas:", linhasTarifas);

    //Número da CE de desbloqueio
    const numeroCeDesbl = document.getElementById('cePendenciaDesbloqueio')?.value || '';

    // Composição do ASSUNTO do email
    const assunto = `CE GIGOV/JP ${numeroCeDesbl} - ${tomador} - ${gestor} ${convenio} - Operação ${operacao} - Pendência para Desbloqueio`;

    // Composição do CORPO DO EMAIL em HTML
    let corpoEmailHTML = `
<div style="font-family: Arial, sans-serif; line-height: 1.5;">
<p>${vocativoTomador}<br>
<strong>${tomador}</strong></p>

<p>Assunto: <strong>Pendência para Desbloqueio</strong><br>
Ref.: <strong>${termoCompromissoOuContratoRepasse} ${gestor} ${convenio} - Operação ${operacao}</strong></p>

<p>Sr.(a.) Convenente</p>

<p>1. Informamos resultado da análise da medição do contrato em referência, no valor de R$ ${valorSolicitado}, na seguinte composição:</p>

<div style="margin: 15px 0;">
    <table style="width: 20%; table-layout: fixed; border-collapse: collapse; border: 1px solid #000;">
        <tr>
            <td style="padding: 5px 10px; width: 40%; border: 1px solid #000; white-space: nowrap;">Valor total:</td>
            <td style="padding: 5px 10px; width: 40%; border: 1px solid #000; text-align: right; white-space: nowrap;">R$ ${valorSolicitado}</td>
        </tr>
        <tr>
            <td style="padding: 5px 10px; border: 1px solid #000; white-space: nowrap;">Repasse:</td>
            <td style="padding: 5px 10px; border: 1px solid #000; text-align: right; white-space: nowrap;">R$ ${valorRepasseDesbloquear}</td>
        </tr>
        <tr>
            <td style="padding: 5px 10px; border: 1px solid #000; white-space: nowrap;">Contrapartida:</td>
            <td style="padding: 5px 10px; border: 1px solid #000; text-align: right; white-space: nowrap;">R$ ${valorContrapartidaDesbloquear}</td>
        </tr>
    </table>
</div>

<p>1.1 Dados do desbloqueio.</p>

<div style="margin: 15px 0;">
    <table style="width: 80%;">
        <tr>
            <td style="padding: 5px 10px; width: 130px; vertical-align: top;">Beneficiário:</td>
            <td style="padding: 5px 10px; text-align: left;"><strong>${beneficiarios.join('<br>')}</strong></td>
        </tr>
        <tr>
            <td style="padding: 5px 10px; vertical-align: top;">Ordem desbloq.:</td>
            <td style="padding: 5px 10px; text-align: left;"><strong>${ordemDoDesbloqueio}</strong></td>
        </tr>
        <tr>
            <td style="padding: 5px 10px; vertical-align: top;">Instrum. desbloq.:</td>
            <td style="padding: 5px 10px; text-align: left;"><strong>${instrumentoDoDesbloqueio}</strong></td>
        </tr>
    </table>
</div>

<p>2. Para que possamos autorizar o saque dos valores informados é necessário o cumprimento das(os) seguintes pendências/apontamentos:</p>

<p><strong>${linhasPendencias.join('<br>')}</strong></p>

${linhasTarifas.length > 0 ? `
<p>2.1. Ressaltamos que para a presente liberação de recursos também se faz necessário o recolhimento da(s) tarifa(s) abaixo:</p>

<p><strong>${linhasTarifas.join('<br>')}</strong></p>
` : ''}

<p>3. Ficamos no aguardo para prosseguimento do processo, ficando à disposição para eventuais esclarecimentos, se necessários.</p>
</div>
`
    console.log(corpoEmailHTML)

    // Armazenar os dados no sessionStorage para recuperar na página de visualização
    const emailData = {
        destinatarios: emails,
        assunto: assunto,
        // corpoTexto: corpoEmailTexto,
        corpoHTML: corpoEmailHTML
    };

    sessionStorage.setItem('emailData', JSON.stringify(emailData));

    // Abrir nova janela com a pré-visualização do email
    const previewWindow = window.open('email-preview.html', '_blank');

    // Se não conseguir abrir a janela (bloqueadores de pop-up), informar ao usuário
    if (!previewWindow) {
        alert("Não foi possível abrir a janela de pré-visualização. Verifique se o bloqueador de pop-ups está ativado.");
    }
}