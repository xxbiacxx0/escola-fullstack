import db from '../../db/banco';
import{ NextResponse } from "next/server";

export async function GET() {
    try {
        const alunos = db.prepare('SELECT * FROM alunos ORDER BY nome').all();
        return NextResponse.json(alunos);
    } catch (error) {
        console.error('Erro ao buscar alunos', error);
        return NextResponse.json({ erro: 'Não foi possível buscar os alunos.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare('INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)');
        sql.run(
            dados.nome, 
            dados.idade, 
            dados.serie, 
            dados.ra
        );

        return NextResponse.json({ mensagem: 'Aluno salvo com sucesso' });
    } catch (error) {
       console.error('Erro ao salvar aluno', error);
       return NextResponse.json({ erro: 'Não foi possível salvar o aluno.' }, { status: 500 });
    }
}
    