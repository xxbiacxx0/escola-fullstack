'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function ListaProfessores() {
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function buscarProfessores() {
      try {
        const resposta = await fetch('/api/professores');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar os professores.');
        }
        setProfessores(dados);
      } catch (error) {
        setErro(error.message);
      }
    }

    buscarProfessores();
  }, []);

  async function excluirProfessor(idProfessor) {
    if (!window.confirm('Deseja realmente excluir este professor?')) {
      return;
    }

    try {
      const resposta = await fetch(`/api/professores/${idProfessor}`, { method: 'DELETE' });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível excluir o professor.');
      }
      setProfessores((atuais) => atuais.filter((professor) => professor.id_professor !== idProfessor));
    } catch (error) {
      setErro(error.message);
    }
  }

  const thStyle = { padding: '12px 16px', textAlign: 'left' };
  const tdStyle = { padding: '12px 16px', borderBottom: '1px solid #fee2e2', color: '#444444' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ padding: '30px', border: '2px solid #fee2e2', borderRadius: '10px', boxShadow: '0 4px 10px rgba(204, 0, 0, 0.05)' }}>
          <h1 style={{ color: '#cc0000', marginTop: 0, fontSize: '24px' }}>Listagem de Professores</h1>
          {erro && <p role="alert" style={{ color: '#cc0000' }}>{erro}</p>}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#cc0000', color: '#ffffff' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome</th>
                  <th style={thStyle}>Matrícula (NIF)</th>
                  <th style={thStyle}>Dias de aula</th>
                  <th style={thStyle}>Disciplina responsável</th>
                  <th style={thStyle}>Aulas na semana</th>
                  <th colSpan={2} style={thStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {professores.map((professor) => (
                  <tr key={professor.id_professor}>
                    <td style={tdStyle}>{professor.id_professor}</td>
                    <td style={tdStyle}>{professor.nome}</td>
                    <td style={tdStyle}>{professor.nif}</td>
                    <td style={tdStyle}>{professor.dias_semana.join(', ')}</td>
                    <td style={tdStyle}>{professor.disciplina}</td>
                    <td style={tdStyle}>{professor.total_aulas_semana}</td>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() => router.push(`/editprofessor/${professor.id_professor}`)}
                        style={{ backgroundColor: '#ffffff', color: '#cc0000', border: '1px solid #cc0000', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Editar
                      </button>
                    </td>
                    <td style={tdStyle}>
                      <button
                        type="button"
                        onClick={() => excluirProfessor(professor.id_professor)}
                        style={{ backgroundColor: '#cc0000', color: '#ffffff', border: 0, padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {professores.length === 0 && !erro && (
                  <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center' }}>Nenhum professor cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
