
import './HomePage.css'
import { ThemeToggle } from "../components/ThemeToggle"; 


export default function HomePage() {
  return (
    <>
      <header className="siteHeader">
        <div className="container headerInner">
          <a className="brand" href="/">madebyjoao</a>

          <nav className="nav">
            <a className="navLink" href="/projects">Projects</a>
            <a className="navLink" href="/about">About</a>
            <a className="navLink" href="/certifications">Certifications</a>
            <a className="navLink" href="/contact">Contact</a>
          </nav>

          <div className="headerActions">
              <ThemeToggle />
            <a className="btn btnPrimary" href="/contact">Contact</a>
          </div>
        </div>
      </header>

      <main className="siteMain">

        <section className="section hero">
          <div className="container heroGrid">
            <div className="heroContent">
              <p className="eyebrow">Web Developer</p>
              <h1 className="heroTitle">João Coutinho Silva</h1>
              <p className="heroSubtitle">
                I build clean, reliable web applications with modern front-end and back-end stacks.
              </p>

              <div className="heroCtas">
                <a className="btn btnPrimary" href="/contact">Contact</a>
                <a className="btn btnSecondary" href="/projects">View projects</a>
              </div>

              <ul className="heroHighlights">
                <li className="pill">React</li>
                <li className="pill">Node</li>
                <li className="pill">SQL</li>
              </ul>
            </div>

            <div className="heroVisual" aria-hidden="true">
              <div className="heroVisualBox" />
            </div>
          </div>
        </section>


        <section className="section featuredProjects">
          <div className="container sectionHeader">
            <h2 className="sectionTitle">Featured projects</h2>
            <a className="sectionLink" href="/projects">See all</a>
          </div>

          <div className="container">
            <div className="cardGrid">
              {/* ProjectCard components later; structure stays the same */}
              <article className="card projectCard">
                <h3 className="cardTitle">Project name</h3>
                <p className="cardText">One or two lines describing what it is and why it matters.</p>
                <ul className="tagRow">
                  <li className="tag">React</li>
                  <li className="tag">API</li>
                </ul>
                <div className="cardActions">
                  <a className="btn btnGhost" href="#">Live</a>
                  <a className="btn btnGhost" href="#">GitHub</a>
                </div>
              </article>

              <article className="card projectCard">{/* ... */}</article>
              <article className="card projectCard">{/* ... */}</article>
              <article className="card projectCard">{/* ... */}</article>
              <article className="card projectCard">{/* ... */}</article>
              <article className="card projectCard">{/* ... */}</article>
            </div>
          </div>
        </section>


        <section className="section skills">
          <div className="container sectionHeader">
            <h2 className="sectionTitle">Skills</h2>
          </div>

          <div className="container">
            <div className="skillsGrid">
              <div className="card skillGroup">
                <h3 className="cardTitle">Frontend</h3>
                <ul className="bulletList">
                  <li>React</li>
                  <li>CSS / Responsive layouts</li>
                  <li>Accessibility basics</li>
                </ul>
              </div>

              <div className="card skillGroup">
                <h3 className="cardTitle">Backend</h3>
                <ul className="bulletList">
                  <li>Node / Express</li>
                  <li>REST APIs</li>
                  <li>Auth basics</li>
                </ul>
              </div>

              <div className="card skillGroup">
                <h3 className="cardTitle">Tools</h3>
                <ul className="bulletList">
                  <li>Git / GitHub</li>
                  <li>Docker (basic)</li>
                  <li>Linux</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section className="section certifications">
          <div className="container sectionHeader">
            <h2 className="sectionTitle">Certifications</h2>
            <a className="sectionLink" href="/certifications">See all</a>
          </div>

          <div className="container">
            <div className="cardGrid cardGridDense">
              <article className="card certCard">
                <h3 className="cardTitle">Certification name</h3>
                <p className="meta">Issuer • Year</p>
              </article>
              <article className="card certCard">{/* ... */}</article>
              <article className="card certCard">{/* ... */}</article>
              <article className="card certCard">{/* ... */}</article>
            </div>
          </div>
        </section>


        <section className="section contactStrip">
          <div className="container">
            <div className="panel contactPanel">
              <div className="contactPanelText">
                <h2 className="panelTitle">Let’s build something.</h2>
                <p className="panelText">Open to apprenticeship opportunities and freelance projects.</p>
              </div>
              <div className="contactPanelActions">
                <a className="btn btnPrimary" href="/contact">Contact</a>
                <a className="btn btnSecondary" href="mailto:contact@madebyjoao.fr">Email</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container footerInner">
          <small className="muted">© {new Date().getFullYear()} madebyjoao</small>
        </div>
      </footer>
    </>
  );
}
