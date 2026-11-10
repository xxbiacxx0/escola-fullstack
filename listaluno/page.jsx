'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function ListAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function buscarAlunos() {
      try {
        const resposta = await fetch('/api/alunos');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar os alunos.');
        }
        setAlunos(dados);
      } catch (error) {
        setErro(error.message);
      }
    }

    buscarAlunos();
  }, []);

  async function excluirAluno(idAluno) {
    if (!window.confirm('Deseja realmente excluir este aluno?')) {
      return;
    }

    try {
      const resposta = await fetch(`/api/alunos/${idAluno}`, {
        method: 'DELETE',
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível excluir o aluno.');
      }
      setAlunos((alunosAtuais) =>
        alunosAtuais.filter((aluno) => aluno.id_aluno !== idAluno)
      );
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ padding: "30px", border: "2px solid #fee2e2", borderRadius: "10px", backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(204, 0, 0, 0.05)" }}>
          <h1 style={{ color: "#cc0000", marginTop: 0, marginBottom: "20px", borderBottom: "2px solid #fee2e2", paddingBottom: "10px", fontSize: "24px" }}>
            Listagem de Alunos
          </h1>

          {erro && <p role="alert" style={{ color: "#cc0000" }}>{erro}</p>}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#cc0000", color: "#ffffff" }}>
                  <th style={{ padding: "12px 16px", borderRadius: "6px 0 0 0" }}>Nome</th>
                  <th style={{ padding: "12px 16px" }}>Idade</th>
                  <th style={{ padding: "12px 16px" }}>Série</th>
                  <th style={{ padding: "12px 16px" }}>RA</th>
                  <th colSpan={2} style={{ padding: "12px 16px", textAlign: "center", borderRadius: "0 6px 0 0" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id_aluno} style={{ borderBottom: "1px solid #fee2e2" }}>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#000000", fontWeight: "bold" }}>
                      {aluno.nome}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#444444" }}>{aluno.idade}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#444444" }}>{aluno.serie}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#444444" }}>{aluno.ra}</td>
                    <td style={{ padding: "12px 8px", width: "70px", textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => router.push(`/editaluno/${aluno.id_aluno}`)}
                        style={{ backgroundColor: "#ffffff", color: "#cc0000", border: "1px solid #cc0000", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                      >
                        Editar
                      </button>
                    </td>
                    <td style={{ padding: "12px 8px", width: "70px", textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => excluirAluno(aluno.id_aluno)}
                        style={{ backgroundColor: "#cc0000", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
                {alunos.length === 0 && !erro && (
                  <tr>
                    <td colSpan={6} style={{ padding: "12px 16px", textAlign: "center", color: "#444444" }}>
                      Nenhum aluno cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: "20px", color: "#666666", fontSize: "14px", marginBottom: 0 }}>
            Esta é a página de listagem de alunos.
          </p>
        </div>
      </main>
    </div>
  );
}
