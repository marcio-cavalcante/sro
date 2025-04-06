//Função para checar condições mínimas de marcações no navegador para gerar os apontamentos
export function checagemMinimaApontamentos () {
    console.log('iniciada checagem dos apontamentos')

    if (document.getElementById('operation').value === "") {
        console.log('Operação não preenchida')
    }

}