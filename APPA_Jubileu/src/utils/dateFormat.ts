//String to Date yyyymmdd -> dd/mm/yyyy
export const SToD = (data: any) => {
    // Verifica se a data tem o formato correto
    if (!/^\d{8}$/.test(data)) {
      throw new Error('A data deve ter 8 dígitos no formato yyyymmdd.');
    }
  
    // Extrai o ano, mês e dia da string
    const ano = data.substring(0, 4);
    const mes = data.substring(4, 6);
    const dia = data.substring(6, 8);
  
    // Verifica a validade dos valores de ano, mês e dia
    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
      throw new Error('A data informada é inválida.');
    }
  
    // Converte ano, mês e dia em números inteiros
    const anoInt = parseInt(ano);
    const mesInt = parseInt(mes);
    const diaInt = parseInt(dia);
  
    // Verifica se os valores de ano, mês e dia estão dentro dos limites corretos
    if (anoInt < 1 || mesInt < 1 || mesInt > 12 || diaInt < 1 || diaInt > 31) {
      throw new Error('A data informada é inválida.');
    }
  
    // Retorna a data formatada
    return `${dia}/${mes}/${ano}`;
  }