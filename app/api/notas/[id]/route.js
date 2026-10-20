import db from '../../../db/banco';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const nota = db.prepare(`
      SELECT notas.id_notas, notas.aluno_id, notas.t1, notas.t2, notas.t3,
             notas.n1, notas.n2, notas.n3, notas.valor, alunos.nome, alunos.ra
      FROM notas
      INNER JOIN alunos ON notas.aluno_id = alunos.id_aluno
      WHERE notas.id_notas = ?
    `).get(id);

    if (!nota) {
      return NextResponse.json({ erro: 'Nota não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(nota);
  } catch (error) {
    console.error('Erro ao buscar nota', error);
    return NextResponse.json({ erro: 'Não foi possível buscar a nota.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const dados = await request.json();
    const nomesNotas = ['t1', 't2', 't3', 'n1', 'n2', 'n3'];
    const valoresNotas = nomesNotas.map((nome) => Number(dados[nome]));

    if (valoresNotas.some((valor) => !Number.isFinite(valor))) {
      return NextResponse.json({ erro: 'Informe todas as notas.' }, { status: 400 });
    }

    const valor = (valoresNotas[3] + valoresNotas[4] + valoresNotas[5]) / 3;
    const resultado = db.prepare(`
      UPDATE notas
      SET t1 = ?, t2 = ?, t3 = ?, n1 = ?, n2 = ?, n3 = ?, valor = ?
      WHERE id_notas = ?
    `).run(...valoresNotas, valor, id);

    if (resultado.changes === 0) {
      return NextResponse.json({ erro: 'Nota não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ mensagem: 'Nota atualizada com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar nota', error);
    return NextResponse.json({ erro: 'Não foi possível atualizar a nota.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const resultado = db.prepare('DELETE FROM notas WHERE id_notas = ?').run(id);

    if (resultado.changes === 0) {
      return NextResponse.json({ erro: 'Nota não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ mensagem: 'Nota deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar nota', error);
    return NextResponse.json({ erro: 'Não foi possível deletar a nota.' }, { status: 500 });
  }
}
