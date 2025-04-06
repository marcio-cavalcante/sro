btnChecarPendencias.addEventListener('click', function () {

    function capturaPendencias() {

        //Verifica se foi informada a operação e se o texto das pendências foi colado
        if (document.getElementById('operation').value === "") {
            alert('Informe a operação para continuar!')
            return
        }
        if (document.getElementById('pendencias').value === "") {
            alert('É necesário colar o texto do apontamento gerado quando foi enviado e email de pendências para desbloqueio, no padrão original.')
            return
        }

        const textareaApontamento = document.getElementById('pendencias');
        let textareaContent = textareaApontamento.value;
        let lines = textareaContent.split('\n');

        // Captura valor do desbloqueio - VI
        let valorDesbloqueioTotal = null;
        for (let line of lines) {
            if (line.includes("Recebemos a Medição no valor de ")) {
                // Encontra a parte após "Recebemos a Medição no valor de "
                let valorParte = line.split("Recebemos a Medição no valor de R$ ")[1].trim();
                // Pega parte até a segunda vírgula e o espaço, para excluir o resto da frase
                valorParte = valorParte.split(", ")[0].trim();
                // 'valorParte' contém o valor total a desbloquear
                valorDesbloqueioTotal = valorParte;
            }
            document.getElementById('viDesbloquear').value = valorDesbloqueioTotal
        }

        // Captura valor do desbloqueio - RP
        let valorDesbloqueioRepasse = null;
        for (let line of lines) {
            if (line.includes("Repasse: R$ ")) {
                let valorParte = line.split("Repasse: R$ ")[1].trim();
                valorParte = valorParte.split(" -")[0].trim();
                valorDesbloqueioRepasse = valorParte;
            }
            document.getElementById('rpDesbloquear').value = valorDesbloqueioRepasse
        }

        // Captura valor do desbloqueio - CP
        let valorDesbloqueioContrapartida = null;
        for (let line of lines) {
            if (line.includes("Contrapartida: R$ ")) {
                let valorParte = line.split("Contrapartida: R$ ")[1].trim();
                valorParte = valorParte.split(" ")[0].trim();
                valorDesbloqueioContrapartida = valorParte;
            }
            document.getElementById('cpDesbloquear').value = valorDesbloqueioContrapartida;
        }

        // Capturando o nome dos CTEF a partir da textarea
        let beneficiarios = []; // Variável para armazenar os beneficiários
        let capturingBeneficiarios = false; // Identifica quando começar a capturar os beneficiários

        for (let line of lines) {
            if (line.includes("Beneficiário")) { // Se linha contém "Beneficiário", começa capturar linhas seguintes
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
            document.getElementById("listaCtef").innerHTML = `<label>Lista de CTEF:</label><br>` +
                beneficiarios.map(item => `<input type="text" id="listaBeneficiarios" value="${item}"><br>`).join("");
        }

        // Captura Ordem do Desbloqueio
        let ordemDesbloqueio = null;
        for (let line of lines) {
            if (line.includes("Ordem de desbloqueio: ")) {
                let valorParte = line.split("Ordem de desbloqueio: ")[1].trim();
                valorParte = valorParte.split(" -")[0].trim();
                ordemDesbloqueio = valorParte;
            }
            document.getElementById('ordemDesbloqueio').value = ordemDesbloqueio;

            //Controla Visibilidade da aba de apontamentos de PCF - CHECKLIST10
            const divChecklist = document.querySelector('.checklist10');
            
            if (ordemDesbloqueio === "Último") {
                divChecklist.style.display = 'block';
                divChecklist.style.pointerEvents = 'auto';
                divChecklist.style.opacity = '1';
                console.log('Checklist10 ativada - valor do instrumento: ' + ordemDesbloqueio);
            } else {
                divChecklist.style.display = 'none';
                divChecklist.style.pointerEvents = 'none';
                divChecklist.style.opacity = '0';
                console.log('Checklist10 desativada - valor do instrumento: ' + ordemDesbloqueio);
            }
        }
        
        atualizaApontamentoPcf()






        // Captura Número da Parcela
        let parcelaNumero = null;
        for (let line of lines) {
            if (line.includes("Parcela nº: ")) {
                let valorParte = line.split("Parcela nº: ")[1].trim();
                valorParte = valorParte.split(" ")[0].trim();
                parcelaNumero = valorParte;
            }
            document.getElementById('parcelaNumero').value = parcelaNumero;
        }

        // Captura Instrumento do Desbloqueio
        let instrumentoDesbloqueio = null;
        for (let line of lines) {
            if (line.includes("Instrumento de desbloqueio: ")) {
                let valorParte = line.split("Instrumento de desbloqueio: ")[1].trim();
                valorParte = valorParte.split(" c")[0].trim();
                instrumentoDesbloqueio = valorParte;
            }
            document.getElementById('instrumentoDesbloqueio').value = instrumentoDesbloqueio;
        }

        // Captura Evolução do Contrato
        let evolucaoContrato = null;
        for (let line of lines) {
            if (line.includes("com evolução de ")) {
                let valorParte = line.split("com evolução de ")[1].trim();
                valorParte = valorParte.split(" ")[0].trim();
                evolucaoContrato = valorParte;
            }
            document.getElementById('evolucaoContrato').value = evolucaoContrato;
        }

        // Captura Tarifa
        let linhasTarifas = [];
        let buscandoTarifas = false;
        document.getElementById("linhasTarifas").innerHTML = ''; // Limpa as checkboxes existentes

        for (let line of lines) {
            if (line.includes("Atentar para o recolhimento da")) { // Inicia captura quando encontra a linha que contém "Atentar para o recolhimento da"
                buscandoTarifas = true;
                continue;
            }

            if (line.includes("Tão logo solucionadas")) { // Frase break Tão logo solucionadas"

                break;
            }

            if (buscandoTarifas && line.trim().startsWith("-")) {
                linhasTarifas.push(line.trim().trim());
            }
        }

        linhasTarifas.forEach(item => {
            const checkbox = document.createElement("input"); // Criar o elemento de checkbox
            checkbox.type = "checkbox";
            checkbox.id = item;

            const label = document.createElement("label"); // Criar o rótulo (label)
            label.htmlFor = item;
            label.textContent = item;

            const div = document.createElement("div"); // Criar um contêiner para o checkbox e o rótulo
            div.appendChild(checkbox);
            div.appendChild(label);

            document.getElementById("linhasTarifas").appendChild(div); // Adicionar o div ao contêiner principal
        });

        // Captura as pendências
        let linhasPendencias = [];
        let buscandoPendencias = false;
        document.getElementById("linhasPendencias").innerHTML = ''; // Limpa as checkboxes existentes

        for (let line of lines) {
            if (line.includes("Recebemos a Medição no valor de")) {
                buscandoPendencias = true;
                continue;
            }

            if (line.includes("Dados da medição:")) {
                break;
            }

            if (buscandoPendencias && line.trim().startsWith("-")) {
                linhasPendencias.push(line.trim().trim());
            }
        }

        linhasPendencias.forEach(item => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = item;

            const label = document.createElement("label");
            label.htmlFor = item;
            label.textContent = item;

            const div = document.createElement("div");
            div.appendChild(checkbox);
            div.appendChild(label);

            document.getElementById("linhasPendencias").appendChild(div);
        });
     
/*
Recebemos a Medição no valor de R$ 999.999,01, para desbloqueio, desde que atendidas as seguintes condições:
- Apontamento 1.
- Apontamento 2.
- Apontamento 3.

Dados da medição:
Repasse: R$ 999.999,02 - Contrapartida: R$ 99.999,03
Beneficiário(s):
- Empresa 1 - CNPJ 99.999.999/9999-99 - Valor: R$999.999,99
- Empresa 2 - CNPJ 99.999.999/9999-99 - Valor: R$999.999,99
Ordem de desbloqueio: Último - Parcela nº: 99
Instrumento de desbloqueio: MEDIÇÃO 9, com evolução de 99.99%

Atentar para o recolhimento da(s) tarifa(s) pendente(s):
- Tarifa 1 - Valor: R$ 9.999,99
- Tarifa 2 - Valor: R$ 9.999,99

Tão logo solucionadas, de forma consolidada, informar a GIGOV para continuidade do processo.
*/

    }
    capturaPendencias();

});


//Função para atualização da área de texto da PCF
function atualizaApontamentoPcf() {
document.getElementById('prestacaoContasFinal').value = ""
const dataAssinaturaStr = document.getElementById('assinatura').value;
console.log('dataAssinaturaStr', dataAssinaturaStr)
console.log(typeof(dataAssinaturaStr))

// Converte a string para um objeto Date - Formato esperado: DD/MM/AAAA
const partesData = dataAssinaturaStr.split('/');
if (partesData.length !== 3) {
    this.elements.textareaPCF.value = 'Formato de data inválido. Deve ser DD/MM/AAAA.';
    return;
}
console.log('partesData', partesData)
console.log(typeof(partesData))

const dia = parseInt(partesData[0], 10);
const mes = parseInt(partesData[1], 10) - 1; // Mês em JavaScript é 0-11
const ano = parseInt(partesData[2], 10);

const dataAssinatura = new Date(ano, mes, dia);

// Definir as datas de referência para comparação
const data20010101 = new Date(2001, 0, 1); // 01/01/2001
const data20161131 = new Date(2016, 11, 31); // 31/08/2016
const data20170101 = new Date(2017, 0, 1); // 01/01/2017
const data20181231 = new Date(2018, 11, 31); // 31/12/2018
const data20190101 = new Date(2019, 0, 1); // 01/01/2019
const data20230831 = new Date(2023, 7, 31); // 31/08/2023
const data20230901 = new Date(2023, 8, 1); // 01/09/2023

// Determinar qual texto exibir com base na data
let texto = '';

if (dataAssinatura >= data20010101 && dataAssinatura <= data20161131) {
texto = "Contrato concluído, com última parcela liberada. Solicitamos que após o pagamento ao fornecedor, seja providenciada a devolução do saldo de repasse e rendimentos e efetivada a prestação de contas final.";
} else if (dataAssinatura >= data20170101 && dataAssinatura <= data20181231) {
texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, sob pena de Notificação de Irregularidade, conforme PI nº 424/2016 e IN MPDG nº 002/2018 e as respectivas alterações.";
} else if (dataAssinatura >= data20190101 && dataAssinatura <= data20230831) {
texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, sob pena de Notificação de Irregularidade, conforme PI nº 424/2016 e IN MPDG nº 002/2018 e as respectivas alterações. Para este contrato, o saldo remanescente deverá ser devolvido integralmente à União. Utilizar a opção 'Cálculo Manual pelo Convenente', no Transferegov, comunicando a GIGOV, após a solicitação da autorização.";
} else if (dataAssinatura >= data20230901) {
texto = "Informamos que após a realização do pagamento final, esta entidade tem até 30 dias para realizar a devolução de saldo a União, utilizando o cálculo automático do TransfereGov, sob pena de Notificação de Irregularidade, conforme PC nº 33/2023 e as respectivas alterações.";
} else {
texto = "Data fora dos períodos previstos para instruções específicas de PCF.";
}

// Atualizar a textarea
document.getElementById('prestacaoContasFinal').value = texto; 
}