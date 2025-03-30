// Utils.js

const formatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};

// Formata um valor para o formato de moeda brasileira (999.999,99)
// value: Valor a ser formatado (string)
// Retorna: Valor formatado (string)
export function formatarValor(value) {
    // Remove caracteres não permitidos, mantendo apenas números e vírgula
    value = value.replace(/[^0-9,]/g, '');

    // Garante que há apenas uma vírgula
    value = value.replace(/,+/g, ',');

    // Adiciona separadores de milhar
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value;
}

// Converte um valor em formato brasileiro para número
// value: Valor a ser convertido (string)
// Retorna: Valor convertido (number) ou null se inválido
export function parseToNumber(value) {
    if (!value) return null;

    const numberValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return isNaN(numberValue) ? null : numberValue;
}

// Formata um número para o formato brasileiro (999.999,99)
// value: Valor a ser formatado (number)
// Retorna: Valor formatado (string)
export function formatToString(value) {
    if (value === null || isNaN(value)) return '';

    return value.toLocaleString('pt-BR', formatOptions);
}