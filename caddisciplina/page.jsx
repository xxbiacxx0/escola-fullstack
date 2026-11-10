'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function CadastroDisciplina() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [pontuacaoMinima, setPontuacaoMinima] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function cadastrarDisciplina(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      const resposta = await fetch('/api/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, pontuacao_minima: pontuacaoMinima }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível salvar a disciplina.');
      }
      router.push('/listadisciplina');
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
      <main style={{ maxWidth: '550px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ padding: '30px', border: '2px solid #fee2e2', borderRadius: '10px', boxShadow: '0 4px 10px rgba(204, 0, 0, 0.05)' }}>
          <h1 style={{ color: '#cc0000', marginTop: 0, fontSize: '22px' }}>Cadastro de Disciplina</h1>
          {erro && <p role="alert" style={{ color: '#cc0000' }}>{erro}</p>}
          <form onSubmit={cadastrarDisciplina} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="nome" style={labelStyle}>Nome da disciplina</label>
              <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="pontuacaoMinima" style={labelStyle}>Pontuação mínima para passar (0 a 10)</label>
              <input
                id="pontuacaoMinima"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={pontuacaoMinima}
                onChange={(event) => setPontuacaoMinima(event.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" disabled={salvando} style={{ backgroundColor: '#cc0000', color: '#ffffff', border: 0, padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              {salvando ? 'Salvando...' : 'Salvar disciplina'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
