document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnConfirmarServPrePos29").addEventListener("click", function () {

        //Ofício tomador
        let oficioTomador = document.getElementById('oficioTomador').value
        document.getElementById('resumoDocTomador').value = oficioTomador

        //Data ofício tomador
        let dataNaoBr = document.getElementById('dataOficioTomador').value;
        if (dataNaoBr) { // Valida data
            // Transforma no formato brasileiro
            let partes = dataNaoBr.split("-");
            let dataBrasileira = `${partes[2]}/${partes[1]}/${partes[0]}`; // Reorganiza dd/mm/aaaa
            document.getElementById('resumoDataDocTomador').value = dataBrasileira; // Atribuição
        }

        //Verifica lista de serviços selecinados
        let checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checkboxesMarcados.length === 0) {
            alert("Nenhum serviço selecionado. Selecione ao menos um para continuar.");
            return;
        }

        let dataAssinatura = document.getElementById('assinatura').value;
        let partesData = dataAssinatura.split("/");
        let dataFormatada = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}`);

        let dataNovaTabela = new Date("2024-05-23");
        let tabela = dataFormatada >= dataNovaTabela ? "pos29" : "pre29";

        let regramento = document.getElementById('regramento').value;
        let arquivo = tabela === "pre29" ? "../js/ServExtraModule/servicosPre29.txt" : "../js/ServExtraModule/servicosPos29.txt";

        // Limpa a div de serviços antes de adicionar novos itens
        let listaServicosDiv = document.getElementById("listaServicos");
        let totalServicosDiv = document.getElementById("totalServicos");
        listaServicosDiv.innerHTML = ""; // Limpa lista antes de adicionar novos serviços
        let total = 0;

        fetch(arquivo)
            .then(response => response.text())
            .then(data => {
                let jsonData = JSON.parse(data);

                checkboxesMarcados.forEach(checkbox => {
                    let servico = checkbox.value;

                    let resultado = jsonData.find(item => item.tabela === tabela && item.regramento === regramento && item.servico === servico);

                    if (resultado) {
                        let valorFormatado = resultado.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                        // Adiciona cada serviço à div "listaServicos"
                        let servicoItem = document.createElement("p");
                        servicoItem.textContent = `${servico}: ${valorFormatado}`;
                        listaServicosDiv.appendChild(servicoItem);

                        // Soma ao total
                        total += resultado.valor;
                    } else {
                        console.log(`Nenhum valor correspondente encontrado para o serviço: ${servico}`);
                    }
                });

                // Formata e exibe o total na div "totalServicos"
                let totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                totalServicosDiv.textContent = `Total: ${totalFormatado}`;
            })
            .catch(error => console.error("Erro ao buscar arquivo:", error));

    });
});