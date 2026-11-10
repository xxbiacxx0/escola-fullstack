'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/header';

const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

export default function EditarProfessor() {
  const { id } = useParams();
  const router = useRouter();
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [diasSemana, setDiasSemana] = useState([]);
  const [disciplinaId, setDisciplinaId] = useState('');
  const [totalAulas, setTotalAulas] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaProfessor, respostaDisciplinas] = await Promise.all([
          fetch(`/api/professores/${encodeURIComponent(id)}`),
          fetch('/api/disciplinas'),
        ]);
        const [professor, dadosDisciplinas] = await Promise.all([
          respostaProfessor.json(),
          respostaDisciplinas.json(),
        ]);

        if (!respostaProfessor.ok) {
          throw new Error(professor.erro || 'Não foi possível carregar o professor.');
        }
        if (!respostaDisciplinas.ok) {
          throw new Error(dadosDisciplinas.erro || 'Não foi possível carregar as disciplinas.');
        }

        setNome(professor.nome);
        setNif(professor.nif);
        setDiasSemana(professor.dias_semana);
        setDisciplinaId(String(professor.disciplina_id));
        setTotalAulas(String(professor.total_aulas_semana));
        setDisciplinas(dadosDisciplinas);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  function alternarDia(dia) {
    setDiasSemana((diasAtuais) => (
      diasAtuais.includes(dia)
        ? diasAtuais.filter((diaAtual) => diaAtual !== dia)
        : [...diasAtuais, dia]
    ));
  }

  async function salvarProfessor(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      const resposta = await fetch(`/api/professores/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          nif,
          dias_semana: diasSemana,
          disciplina_id: disciplinaId,
          total_aulas_semana: totalAulas,
        }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível atualizar o professor.');
      }
      router.push('/listaprofessor');
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  };
  const labelStyle = { fontWeight: 'bold', fontSize: '13px', color: '#000000' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />
      <main style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ padding: '30px', border: '2px solid #fee2e2', borderRadius: '10px', boxShadow: '0 4px 10px rgba(204, 0, 0, 0.05)' }}>
          <h1 style={{ color: '#cc0000', marginTop: 0, fontSize: '22px' }}>Editar Professor</h1>
          {erro && <p role="alert" style={{ color: '#cc0000' }}>{erro}</p>}
          {carregando ? <p>Carregando professor...</p> : !erro && (
            <form onSubmit={salvarProfessor} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="nome" style={labelStyle}>Nome do professor</label>
                <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="nif" style={labelStyle}>Matrícula (NIF)</label>
                <input id="nif" value={nif} onChange={(event) => setNif(event.target.value)} style={inputStyle} required />
              </div>
              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend style={labelStyle}>Dias que ministra aula</legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', marginTop: '8px' }}>
                  {dias.map((dia) => (
                    <label key={dia} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#000000' }}>
                      <input type="checkbox" checked={diasSemana.includes(dia)} onChange={() => alternarDia(dia)} />
                      {dia}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="disciplinaId" style={labelStyle}>Disciplina responsável</label>
                <select id="disciplinaId" value={disciplinaId} onChange={(event) => setDisciplinaId(event.target.value)} style={inputStyle} required>
                  <option value="">Selecione uma disciplina</option>
                  {disciplinas.map((disciplina) => (
                    <option key={disciplina.id_disciplina} value={disciplina.id_disciplina}>{disciplina.nome}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="totalAulas" style={labelStyle}>Total de aulas na semana</label>
                <input
                  id="totalAulas"
                  type="number"
                  min="1"
                  step="1"
                  value={totalAulas}
                  onChange={(event) => setTotalAulas(event.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              <button type="submit" disabled={salvando} style={{ backgroundColor: '#cc0000', color: '#ffffff', border: 0, padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
