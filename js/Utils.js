// Utils.js - Funções utilitárias para formatação e conversão de valores

const formatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};

/**
 * Formata um valor de texto para o formato brasileiro de moeda (999.999,99)
 * @param {string} value - Texto contendo o valor a ser formatado
 * @returns {string} - Valor formatado como texto
 */
export function formatarValor(value) {
    if (!value) return '';
    
    // Remove caracteres não permitidos, mantendo apenas números e vírgula
    value = value.replace(/[^0-9,]/g, '');
    
    // Garante que há apenas uma vírgula
    const parts = value.split(',');
    if (parts.length > 2) {
        value = parts[0] + ',' + parts.slice(1).join('');
    }
    
    // Separa parte inteira e decimal
    const hasDecimal = value.includes(',');
    let intPart = hasDecimal ? value.split(',')[0] : value;
    const decPart = hasDecimal ? value.split(',')[1] : '';
    
    // Limpa zeros à esquerda da parte inteira (exceto se for zero)
    intPart = intPart.replace(/^0+/, '') || '0';
    
    // Adiciona separadores de milhar
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Reconstrói o valor com parte decimal limitada a 2 dígitos
    return hasDecimal ? `${intPart},${decPart.slice(0, 2)}` : intPart;
}

/**
 * Converte um valor em formato de texto brasileiro para número
 * @param {string} value - Texto contendo o valor a ser convertido
 * @returns {number|null} - Valor convertido como número ou null se inválido
 */
export function parseToNumber(value) {
    if (!value) return null;
    
    // Se for já um número, retorna o próprio número
    if (typeof value === 'number') return value;
    
    // Se for texto, faz o tratamento
    if (typeof value === 'string') {
        // Remove todos os caracteres que não são dígitos, vírgulas ou pontos
        const cleanedValue = value.replace(/[^\d,.]/g, '');
        
        // Trata o valor conforme padrão brasileiro (1.234,56)
        // Remove pontos, substitui vírgula por ponto
        const numberValue = parseFloat(
            cleanedValue.replace(/\./g, '').replace(',', '.')
        );
        
        return isNaN(numberValue) ? null : numberValue;
    }
    
    return null;
}

/**
 * Formata um número para o formato brasileiro (999.999,99)
 * @param {number} value - Número a ser formatado
 * @returns {string} - Valor formatado como texto
 */
export function formatToString(value) {
    if (value === null || isNaN(value)) return '';
    
    try {
        return value.toLocaleString('pt-BR', formatOptions);
    } catch (error) {
        console.error("Erro ao formatar valor:", error);
        return value.toString();
    }
}