import db from '../../../db/banco';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const aluno = db.prepare('SELECT * FROM alunos WHERE id_aluno = ?').get(id);

    if (!aluno) {
      return NextResponse.json({ erro: 'Aluno não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(aluno);
  } catch (error) {
    console.error('Erro ao buscar aluno', error);
    return NextResponse.json({ erro: 'Não foi possível buscar o aluno.' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { nome, idade, serie, ra } = await request.json();
    const resultado = db.prepare(
      'UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?'
    ).run(nome, idade, serie, ra, id);

    if (resultado.changes === 0) {
      return NextResponse.json({ erro: 'Aluno não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ mensagem: 'Aluno atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar aluno', error);
    return NextResponse.json({ erro: 'Não foi possível atualizar o aluno.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const resultado = db.prepare('DELETE FROM alunos WHERE id_aluno = ?').run(id);

    if (resultado.changes === 0) {
      return NextResponse.json({ erro: 'Aluno não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ mensagem: 'Aluno deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar aluno', error);
    return NextResponse.json({ erro: 'Não foi possível deletar o aluno.' }, { status: 500 });
  }
}
