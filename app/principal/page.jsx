import Header from "../components/header";

export default function Principal() {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flex: "1",
      maxWidth: "1100px",
      width: "100%",
      margin: "0 auto",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    hero: {
      backgroundColor: "#cc0000",
      color: "#ffffff",
      borderRadius: "12px",
      padding: "40px 32px",
      marginBottom: "32px",
      boxShadow: "0 8px 20px rgba(204, 0, 0, 0.15)",
    },
    badge: {
      backgroundColor: "#ffffff",
      color: "#cc0000",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "4px 12px",
      borderRadius: "16px",
      textTransform: "uppercase",
      display: "inline-block",
      marginBottom: "16px",
    },
    heroTitle: {
      fontSize: "30px",
      fontWeight: "bold",
      margin: "0 0 12px 0",
    },
    heroDescription: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#ffffff",
      margin: "0 0 24px 0",
      maxWidth: "700px",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      transition: "background-color 0.3s",
    },

    btnPrimary: {
      backgroundColor: "#ffffff",
      color: "#cc0000",
      padding: "12px 24px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "14px",
      display: "inline-block",
    },
    btnSecondary: {
      backgroundColor: "#cc0000",
      color: "#ffffff",
      border: "2px solid #ffffff",
      padding: "10px 22px",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "14px",
      display: "inline-block",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "24px",
      borderRadius: "10px",
      border: "2px solid #fee2e2",
      display: "flex",
      flexDirection: "column",
    },
    iconBox: {
      width: "44px",
      height: "44px",
      borderRadius: "8px",
      backgroundColor: "#fee2e2",
      color: "#cc0000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0 0 8px 0",
      color: "#cc0000",
    },
    cardText: {
      fontSize: "14px",
      color: "#4a4a4a",
      lineHeight: "1.5",
      margin: "0 0 16px 0",
      flex: "1",
    },
    cardLink: {
      color: "#cc0000",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "14px",
    },
   
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        {/* Banner de Boas-Vindas */}
        <section style={styles.hero}>
          <span style={styles.badge}>Sesi Mirandópolis</span>
          <h2 style={styles.heroTitle}>Bem-vindo ao Sistema Escolar</h2>
          <p style={styles.heroDescription}>
            Este é o sistema de gerenciamento escolar, onde você pode cadastrar e listar alunos, além de gerenciar suas notas e frequências.
          </p>
          <div style={styles.buttonContainer}>
            <a href="/listaluno" style={styles.btnPrimary}>
              Listar Alunos
            </a>
            <a href="/cadaluno" style={styles.btnSecondary}>
              Novo Cadastro
            </a>
          </div>
        </section>

        {/* Cards de Navegação Rápida */}
        <section style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.iconBox}>👨‍🎓</div>
            <h3 style={styles.cardTitle}>Alunos</h3>
            <p style={styles.cardText}>
              Cadastre novos alunos, consulte cadastros existentes e gerencie informações das turmas.
            </p>
            <a href="/cadaluno" style={styles.cardLink}>
              Acessar módulo &rarr;
            </a>
          </div>

          <div style={styles.card}>
            <div style={styles.iconBox}>📊</div>
            <h3 style={styles.cardTitle}>Boletim & Notas</h3>
            <p style={styles.cardText}>
              Lance notas por disciplina, acompanhe o desempenho dos estudantes e obtenha relatórios.
            </p>
            <a href="/cadnotas" style={styles.cardLink}>
              Lançar notas &rarr;
            </a>
          </div>

          <div style={styles.card}>
            <div style={styles.iconBox}>📢</div>
            <h3 style={styles.cardTitle}>Avisos</h3>
            <p style={styles.cardText}>
              Consulte os comunicados oficiais, eventos do calendário e informações da unidade Mirandópolis.
            </p>
            <a href="/avisos" style={styles.cardLink}>
              Ver comunicados &rarr;
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}