'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function ListaDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function buscarDisciplinas() {
      try {
        const resposta = await fetch('/api/disciplinas');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar as disciplinas.');
        }
        setDisciplinas(dados);
      } catch (error) {
        setErro(error.message);
      }
    }

    buscarDisciplinas();
  }, []);

  async function excluirDisciplina(idDisciplina) {
    if (!window.confirm('Deseja realmente excluir esta disciplina?')) {
      return;
    }

    try {
      const resposta = await fetch(`/api/disciplinas/${idDisciplina}`, { method: 'DELETE' });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível excluir a disciplina.');
      }
      setDisciplinas((atuais) => atuais.filter((disciplina) => disciplina.id_disciplina !== idDisciplina));
    } catch (error) {
      setErro(error.message);
    }
  }

  const thStyle = { padding: '12px 16px', textAlign: 'left' };
  const tdStyle = { padding: '12px 16px', borderBottom: '1px solid #fee2e2', color: '#444444' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />
      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ padding: '30px', border: '2px solid #fee2e2', borderRadius: '10px', boxShadow: '0 4px 10px rgba(204, 0, 0, 0.05)' }}>
          <h1 style={{ color: '#cc0000', marginTop: 0, fontSize: '24px' }}>Listagem de Disciplinas</h1>
          {erro && <p role="alert" style={{ color: '#cc0000' }}>{erro}</p>}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#cc0000', color: '#ffffff' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome</th>
                  <th style={thStyle}>Pontuação mínima para passar</th>
                  <th colSpan={2} style={thStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((disciplina) => (
                  <tr key={disciplina.id_disciplina}>
                    <td style={tdStyle}>{disciplina.id_disciplina}</td>
                    <td style={tdStyle}>{disciplina.nome}</td>
                    <td style={tdStyle}>{disciplina.pontuacao_minima}</td>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() => router.push(`/editdisciplina/${disciplina.id_disciplina}`)}
                        style={{ backgroundColor: '#ffffff', color: '#cc0000', border: '1px solid #cc0000', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Editar
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() => excluirDisciplina(disciplina.id_disciplina)}
                        style={{ backgroundColor: '#cc0000', color: '#ffffff', border: 0, padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {disciplinas.length === 0 && !erro && (
                  <tr><td colSpan={5} style={{ ...tdStyle, textAlign: 'center' }}>Nenhuma disciplina cadastrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
