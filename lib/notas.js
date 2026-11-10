const nomesNotas = ['t1', 't2', 't3', 'n1', 'n2', 'n3'];

export function obterValoresNotas(dados) {
  const valores = nomesNotas.map((nome) => dados?.[nome]);

  if (valores.some((valor) => (
    (typeof valor !== 'number' && typeof valor !== 'string')
    || (typeof valor === 'string' && valor.trim() === '')
  ))) {
    return null;
  }

  const valoresNumericos = valores.map(Number);
  if (valoresNumericos.some((valor) => (
    !Number.isFinite(valor) || valor < 0 || valor > 10
  ))) {
    return null;
  }

  return valoresNumericos;
}
