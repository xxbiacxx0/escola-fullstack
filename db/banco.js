import Database from 'better-sqlite3';

const db = new Database('./app/db/escola.db');

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        serie TEXT NOT NULL,
        ra TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS notas (
        id_notas INTEGER PRIMARY KEY AUTOINCREMENT,
        aluno_id INTEGER NOT NULL,
        t1 REAL NOT NULL,
        t2 REAL NOT NULL,
        t3 REAL NOT NULL,
        n1 REAL NOT NULL,
        n2 REAL NOT NULL,
        n3 REAL NOT NULL,
        valor REAL NOT NULL,
        FOREIGN KEY (aluno_id) REFERENCES alunos (id_aluno)
        ON DELETE CASCADE
    )
    ;
    CREATE TABLE IF NOT EXISTS disciplinas (
        id_disciplina INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        pontuacao_minima REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS professores (
        id_professor INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        nif TEXT NOT NULL UNIQUE,
        dias_semana TEXT NOT NULL,
        disciplina_id INTEGER NOT NULL,
        total_aulas_semana INTEGER NOT NULL,
        FOREIGN KEY (disciplina_id) REFERENCES disciplinas (id_disciplina)
    )
`);

const disciplinasIniciais = [
    'Arte',
    'Biologia',
    'Educação Digital',
    'Educação Física',
    'Espanhol',
    'Filosofia',
    'Física',
    'Geografia',
    'História',
    'Inglês',
    'Língua Portuguesa',
    'Literatura',
    'Matemática',
    'Projeto de Vida',
    'Química',
    'Redação',
    'Sociologia',
    'Algoritmos e Lógica de Programação',
    'Análise e Projeto de Sistemas',
    'Arquitetura de Computadores',
    'Banco de Dados',
    'Desenvolvimento de Aplicativos Mobile',
    'Desenvolvimento Web Front-end',
    'Desenvolvimento Web Back-end',
    'Engenharia de Software',
    'Fundamentos de Tecnologia da Informação',
    'Gestão de Projetos',
    'Modelagem de Dados',
    'Programação Orientada a Objetos',
    'Projeto Integrador',
    'Redes de Computadores',
    'Segurança da Informação',
    'Sistemas Operacionais',
    'Teste de Software',
    'UX e UI',
    'Versionamento de Código e DevOps',
];
const buscarDisciplina = db.prepare(
    'SELECT id_disciplina FROM disciplinas WHERE nome = ? COLLATE NOCASE'
);
const inserirDisciplina = db.prepare(
    'INSERT INTO disciplinas (nome, pontuacao_minima) VALUES (?, ?)'
);

for (const nome of disciplinasIniciais) {
    if (!buscarDisciplina.get(nome)) {
        inserirDisciplina.run(nome, 6);
    }
}

console.log('Banco de dados criado com sucesso!');
export default db;
