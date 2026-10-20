import db from '../../db/banco';
import{ NextResponse } from "next/server";

export async function GET() {
    try {
        const notas = db.prepare(`
            SELECT notas.id_notas, alunos.nome, alunos.ra, notas.t1, notas.t2,
                   notas.n1, notas.n2, notas.n3
            FROM notas
            INNER JOIN alunos ON notas.aluno_id = alunos.id_aluno
            ORDER BY alunos.nome
        `).all();
        return NextResponse.json(notas);
    } catch (error) {
        console.error('Erro ao buscar notas', error);
        return NextResponse.json({ erro: 'Não foi possível buscar as notas.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const alunoId = Number(dados.aluno_id);
        const nomesNotas = ['t1', 't2', 't3', 'n1', 'n2', 'n3'];
        const valoresNotas = nomesNotas.map((nome) => Number(dados[nome]));

        if (!Number.isInteger(alunoId) || valoresNotas.some((valor) => !Number.isFinite(valor))) {
            return NextResponse.json({ erro: 'Selecione um aluno e informe todas as notas.' }, { status: 400 });
        }

        const aluno = db.prepare('SELECT id_aluno FROM alunos WHERE id_aluno = ?').get(alunoId);
        if (!aluno) {
            return NextResponse.json({ erro: 'Aluno não encontrado.' }, { status: 404 });
        }

        const valor = (valoresNotas[3] + valoresNotas[4] + valoresNotas[5]) / 3;
        const sql = db.prepare(`
            INSERT INTO notas (aluno_id, t1, t2, t3, n1, n2, n3, valor)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        sql.run(alunoId, ...valoresNotas, valor);

        return NextResponse.json({ mensagem: 'Nota salva com sucesso' });
    } catch (error) {
       console.error('Erro ao salvar nota', error);
       return NextResponse.json({ erro: 'Não foi possível salvar as notas.' }, { status: 500 });
    }
}
    