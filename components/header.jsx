import Link from "next/link";

export default function Header() {
  const styles = {
    header: {
      backgroundColor: "#cc0000",
      color: "#ffffff",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: 0,
      color: "#ffffff",
      letterSpacing: "0.5px",
    },
    nav: {
      display: "flex",
    },
    navList: {
      display: "flex",
      listStyle: "none",
      margin: 0,
      padding: 0,
      gap: "8px",
      flexWrap: "wrap",
    },
    navItem: {
      display: "inline-block",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "600",
      padding: "8px 14px",
      borderRadius: "6px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      display: "inline-block",
    },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Sistema Escolar - Sesi</h1>

      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/" style={styles.link}>
              Início
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/cadaluno" style={styles.link}>
              Cadastro de Alunos
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/listaluno" style={styles.link}>
              Listagem de Alunos
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/cadnotas" style={styles.link}>
              Cadastro de Notas
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/listnotas" style={styles.link}>
              Listagem de Notas
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/caddisciplina" style={styles.link}>
              Cadastro de Disciplinas
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/listadisciplina" style={styles.link}>
              Listagem de Disciplinas
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/cadprofessor" style={styles.link}>
              Cadastro de Professores
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/listaprofessor" style={styles.link}>
              Listagem de Professores
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}