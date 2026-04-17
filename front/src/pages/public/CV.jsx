import { Link } from "react-router";

export default function CV() {
    return (
        <>
            <style>{`
                * { margin:0; padding:0; box-sizing:border-box; }

                :root {
                  --bg:       #1a1b26;
                  --bg2:      #13141f;
                  --bg3:      #0d0e17;
                  --surface:  #252637;
                  --border:   #3b3d5c;
                  --text:     #c0caf5;
                  --muted:    #565f89;
                  --dim:      #787c99;
                  --keyword:  #bb9af7;
                  --type:     #7aa2f7;
                  --string:   #9ece6a;
                  --number:   #ff9e64;
                  --comment:  #565f89;
                  --func:     #7dcfff;
                  --var:      #f7768e;
                  --class:    #e0af68;
                  --punct:    #89ddff;
                  --op:       #c0caf5;
                }

                .cv-container {
                  background: var(--bg3);
                  color: var(--text);
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 11.5px;
                  line-height: 1.65;
                  min-height: 100vh;
                }

                /* ── TAB BAR ── */
                .tabs {
                  background: var(--bg3);
                  border-bottom: 1px solid var(--border);
                  display: flex;
                  height: 36px;
                  align-items: stretch;
                }
                .tab {
                  display: flex; align-items: center; gap: 7px;
                  padding: 0 18px;
                  font-size: 11.5px;
                  color: var(--muted);
                  border-right: 1px solid var(--border);
                  
                }
                .tab.active {
                  background: var(--bg);
                  color: var(--text);
                  border-bottom: 2px solid var(--type);
                  margin-bottom: -1px;
                }
                .dot { width:7px; height:7px; border-radius:50%; background:var(--type); opacity:.5; }
                .tab.active .dot { opacity:1; }


                /* ── LAYOUT ── */
                .wrap {
                  display: grid;
                  grid-template-columns: 210px 1fr;
                  min-height: calc(100vh - 36px);
                }

                /* ── SIDEBAR ── */
                .sidebar {
                  background: var(--bg2);
                  border-right: 1px solid var(--border);
                  padding: 20px 0 20px;
                  overflow: hidden;
                }

                .photo-area {
                  padding: 10px 14px 18px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 5px;
                }
                .photo-frame {
                  width: 110px; height: 150px;
                  border: 1px solid var(--border);
                  border-radius: 5px;
                  background: var(--surface);
                  display: flex; align-items: center; justify-content: center;
                  overflow: hidden;
                }
                .cmt { color: var(--comment); font-style: italic; font-size: 10.5px; }

                .blk { padding: 0 10px; margin-bottom: 22px; }
                .blk-hd {
                  color: var(--dim);
                  display: flex; align-items: center; flex-wrap: wrap;
                  gap: 3px;
                  padding: 0 6px;
                  margin-bottom: 2px;
                }
                .ob { color: var(--punct); padding-left: 16px; }
                .cb { color: var(--punct); padding-left: 16px; }
                .items { padding: 3px 0 3px 30px; }
                .it { display: block; font-size: 11px; color: var(--text); line-height: 1.7; }
                .it a { color: var(--type); text-decoration: none; }
                .it a:hover { text-decoration: underline; }

                .kw  { color: var(--keyword); }
                .ty  { color: var(--type); }
                .fn  { color: var(--func); }
                .st  { color: var(--string); }
                .nm  { color: var(--number); }
                .cm  { color: var(--comment); font-style: italic; }
                .vc  { color: var(--var); }
                .cl  { color: var(--class); }
                .pt  { color: var(--punct); }
                .op  { color: var(--op); }

                /* ── MAIN ── */
                .main {
                  background: var(--bg);
                  display: flex;
                  flex-direction: column;
                }

                /* summary header */
                .summary {
                  background: var(--bg2);
                  border-bottom: 1px solid var(--border);
                  padding: 16px 32px;
                  font-size: 11.5px;
                  color: var(--comment);
                  font-style: italic;
                  line-height: 1.9;
                }
                .summary strong { color: var(--dim); font-style: normal; font-weight: 500; }

                /* two-column body */
                .body-cols {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  flex: 1;
                }
                .col { padding: 20px 24px; }
                .col-left { border-right: 1px solid var(--border); }

                /* code blocks */
                .class-name {
                  font-size: 13.5px;
                  font-weight: 700;
                  color: var(--class);
                }
                .brace { color: var(--punct); }

                .method { margin: 6px 0 0 18px; }
                .method-sig { display: flex; align-items: baseline; flex-wrap: wrap; gap: 3px; }
                .method-body { padding-left: 18px; margin: 3px 0 3px; }
                .field { margin: 3px 0; }
                .field-inner { padding-left: 18px; }

                .comment-block {
                  margin: 6px 0 6px 18px;
                  padding: 7px 12px;
                  border-left: 2px solid var(--border);
                  background: rgba(255,255,255,0.025);
                  border-radius: 0 3px 3px 0;
                  color: var(--comment);
                  font-style: italic;
                  font-size: 10.5px;
                  line-height: 1.75;
                }

                .gap { height: 14px; }
                .sgap { height: 7px; }

                /* bullet list inside comment */
                .cbullet { display: block; padding-left: 10px; position: relative; }
                .cbullet::before { content: "–"; position: absolute; left: 0; color: var(--muted); }

                @media print {
                  .cv-container { background: #1a1b26; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>

            <div className="cv-container">
                <div className="tabs">
                    <div className="tab active cursor-default">
                        <span className="dot"></span>SilvaJoao.js
                    </div>
                    <div className="tab cursor-default">package.json</div>
                    <div className="tab cursor-default">README.md</div>
                    <Link to="/" className="tab hover:cursor-pointer">GetMeBack.jsx</Link>
                </div>

                <div className="wrap">
                    {/* SIDEBAR */}
                    <div className="sidebar">
                        <div className="photo-area">
                            <div className="cmt">// &lt;img&gt;</div>
                            <div className="photo-frame">
                                <img src="/photo.png" alt="João Silva" />
                            </div>
                            <div className="cmt">// &lt;/img&gt;</div>
                        </div>

                        {/* CONTACT */}
                        <div className="blk">
                            <div className="blk-hd">
                                <span className="kw">public enum</span>&nbsp;
                                <span className="ty">CONTACT</span>
                                <span className="pt">()</span>
                            </div>
                            <div className="ob">{"{"}</div>
                            <div className="items">
                                <span className="it">
                                    <span className="nm">+33 6 95 70 06 79</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="st">joao@madebyjoao.fr</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <a href="https://github.com/madebyjoao">github.com/madebyjoao</a>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="op">33</span>{" "}
                                    <span className="cm">/* ans */</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="st">"06150 Cannes La Bocca"</span>
                                </span>
                            </div>
                            <div className="cb">{"}"}</div>
                        </div>

                        {/* TECHNOLOGIES */}
                        <div className="blk">
                            <div className="blk-hd">
                                <span className="kw">public enum</span>&nbsp;
                                <span className="ty">TECHNOLOGIES</span>
                                <span className="pt">()</span>
                            </div>
                            <div className="ob">{"{"}</div>
                            <div className="items">
                                <span className="it">ReactJS<span className="pt">,</span></span>
                                <span className="it">JavaScript<span className="pt">,</span></span>
                                <span className="it">NodeJS <span className="pt">-</span> Express<span className="pt">,</span></span>
                                <span className="it">TailwindCSS<span className="pt">,</span></span>
                                <span className="it">MySQL<span className="pt">,</span></span>
                                <span className="it">CSS <span className="pt">-</span> HTML<span className="pt">,</span></span>
                                <span className="it">SEQUELIZE<span className="pt">-</span>CLI</span>
                            </div>
                            <div className="cb">{"}"}</div>
                        </div>

                        {/* LANGUES */}
                        <div className="blk">
                            <div className="blk-hd">
                                <span className="kw">public enum</span>&nbsp;
                                <span className="ty">LANGUES</span>
                                <span className="pt">()</span>
                            </div>
                            <div className="ob">{"{"}</div>
                            <div className="items">
                                <span className="it">
                                    <span className="cl">FRANÇAIS</span>{" "}
                                    <span className="pt">=</span>{" "}
                                    <span className="ty">Professionnel</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="cl">ANGLAIS</span>{" "}
                                    <span className="pt">=</span>{" "}
                                    <span className="ty">Bilingue</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="cl">PORTUGAIS</span>{" "}
                                    <span className="pt">=</span>{" "}
                                    <span className="ty">Natif</span>
                                    <span className="pt">,</span>
                                </span>
                                <span className="it">
                                    <span className="cl">ESPAGNOL</span>{" "}
                                    <span className="pt">=</span>{" "}
                                    <span className="ty">Débutant</span>
                                </span>
                            </div>
                            <div className="cb">{"}"}</div>
                        </div>

                        {/* ATOUTS */}
                        <div className="blk">
                            <div className="blk-hd">
                                <span className="kw">public enum</span>&nbsp;
                                <span className="ty">ATOUTS</span>
                                <span className="pt">()</span>
                            </div>
                            <div className="ob">{"{"}</div>
                            <div className="items">
                                <span className="it">EspritEquipe<span className="pt">,</span></span>
                                <span className="it">ApprentissageRapide<span className="pt">,</span></span>
                                <span className="it">Adaptabilité<span className="pt">,</span></span>
                                <span className="it">SensDesResponsabilités</span>
                            </div>
                            <div className="cb">{"}"}</div>
                        </div>

                        {/* INTERETS */}
                        <div className="blk">
                            <div className="blk-hd">
                                <span className="kw">public enum</span>&nbsp;
                                <span className="ty">INTERETS</span>
                                <span className="pt">()</span>
                            </div>
                            <div className="ob">{"{"}</div>
                            <div className="items">
                                <span className="it">VideoGames<span className="pt">,</span></span>
                                <span className="it">Music<span className="pt">,</span></span>
                                <span className="it">Travel<span className="pt">,</span></span>
                                <span className="it">Motorsports<span className="pt">,</span></span>
                                <span className="it">Cooking<span className="pt">,</span></span>
                                <span className="it">Sports</span>
                            </div>
                            <div className="cb">{"}"}</div>
                        </div>
                    </div>

                    {/* MAIN */}
                    <div className="main">
                        {/* Summary header */}
                        <div className="summary">
                            <div>
                                <span style={{ color: "var(--punct)" }}>///</span> &lt;summary&gt;
                            </div>
                            <div>
                                <span style={{ color: "var(--punct)" }}>///</span> En{" "}
                                <strong>reconversion</strong> vers le développement web, recherche une{" "}
                                <strong>alternance de 2 ans</strong>.
                            </div>
                            <div>
                                <span style={{ color: "var(--punct)" }}>///</span> Ancien responsable travaux
                                — compétences solides en <strong>gestion de projet</strong>, organisation
                                et résolution de problèmes.
                            </div>
                            <div>
                                <span style={{ color: "var(--punct)" }}>///</span> Conçoit des applications
                                web avec <strong>React</strong> et <strong>Node.js</strong>, fort intérêt
                                pour les <strong>architectures backend</strong> et la sécurité.
                            </div>
                            <div>
                                <span style={{ color: "var(--punct)" }}>///</span> &lt;/summary&gt;
                            </div>
                        </div>

                        {/* Two columns */}
                        <div className="body-cols">
                            {/* LEFT: EXPÉRIENCES + PROJETS */}
                            <div className="col col-left">
                                {/* EXPÉRIENCES PROFESSIONNELLES */}
                                <div>
                                    <span className="kw">public static class</span>{" "}
                                    <span className="class-name">EXPÉRIENCES</span>
                                </div>
                                <div className="brace">{"{"}</div>

                                {/* Freelance */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">public void</span>&nbsp;
                                        <span className="fn">FreelanceDev</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Client</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"NeoGec"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2026</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="ty">en cours</span>
                                            <span className="pt">);</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Type</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="kw">new</span>{" "}
                                            <span className="ty">Freelance</span>
                                            <span className="pt">;</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                    <div className="comment-block">
                                        <span className="cbullet">
                                            Conception et développement d'un site web professionnel
                                        </span>
                                        <span className="cbullet">
                                            Analyse des besoins client et définition des fonctionnalités
                                        </span>
                                        <span className="cbullet">
                                            Intégration front-end (HTML, CSS, React)
                                        </span>
                                        <span className="cbullet">
                                            Mise en place du backend (Node.js / Express)
                                        </span>
                                        <span className="cbullet">
                                            Déploiement et mise en ligne du site
                                        </span>
                                    </div>
                                </div>

                                <div className="sgap"></div>

                                {/* Responsable travaux */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">public void</span>&nbsp;
                                        <span className="fn">ResponsableTravaux</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Employeur</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"ST Aménagements"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2022</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2023</span>
                                            <span className="pt">);</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                    <div className="comment-block">
                                        <span className="cbullet">
                                            Gestion et coordination de projets (planning, ressources, délais)
                                        </span>
                                        <span className="cbullet">
                                            Organisation et supervision des équipes terrain
                                        </span>
                                        <span className="cbullet">
                                            Optimisation des processus internes
                                        </span>
                                        <span className="cbullet">
                                            Communication client et suivi des prestations
                                        </span>
                                    </div>
                                </div>

                                <div className="sgap"></div>

                                {/* Chef déménagement */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">public void</span>&nbsp;
                                        <span className="fn">ChefDéménagement</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Employeur</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Duperrex Frères / Migros MVM"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Pays</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Suisse"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2015</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2022</span>
                                            <span className="pt">);</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                    <div className="comment-block">
                                        <span className="cbullet">
                                            Planification et organisation des déménagements
                                        </span>
                                        <span className="cbullet">
                                            Coordination des équipes et gestion des priorités
                                        </span>
                                        <span className="cbullet">
                                            Relation client et prestation de service personnalisé
                                        </span>
                                        <span className="cbullet">
                                            Gestion logistique et respect des délais
                                        </span>
                                    </div>
                                </div>

                                <div className="brace">{"}"}</div>
                                <div className="gap"></div>

                                {/* PROJETS */}
                                <div>
                                    <span className="kw">public static class</span>{" "}
                                    <span className="class-name">PROJETS</span>
                                </div>
                                <div className="brace">{"{"}</div>

                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">public void</span>&nbsp;
                                        <span className="fn">PortfolioBuilder</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Status</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="ty">EnCours</span>
                                            <span className="pt">;</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                    <div className="comment-block">
                                        <span className="cbullet">
                                            Application web de création de portfolios personnalisés
                                        </span>
                                        <span className="cbullet">Système de templates dynamiques</span>
                                        <span className="cbullet">
                                            Gestion des données via API (Node.js / Express)
                                        </span>
                                        <span className="cbullet">
                                            Déploiement automatisé des portfolios utilisateurs
                                        </span>
                                    </div>
                                </div>

                                <div className="brace">{"}"}</div>
                            </div>

                            {/* RIGHT: CERTIFICATIONS + FORMATIONS */}
                            <div className="col">
                                {/* CERTIFICATIONS */}
                                <div>
                                    <span className="kw">public static class</span>{" "}
                                    <span className="class-name">CERTIFICATIONS</span>
                                </div>
                                <div className="brace">{"{"}</div>

                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">public void</span>&nbsp;
                                        <span className="fn">Codecademy</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Titre</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Formation Développement Web"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Status</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="ty">EnCours</span>
                                            <span className="pt">;</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                    <div className="comment-block">
                                        <span className="cbullet">Angular (framework front-end)</span>
                                        <span className="cbullet">
                                            Node.js &amp; Express (création d'API et serveurs)
                                        </span>
                                        <span className="cbullet">
                                            Sécurité applicative (prévention SQL Injection, XSS)
                                        </span>
                                    </div>
                                </div>

                                <div className="brace">{"}"}</div>
                                <div className="gap"></div>

                                {/* FORMATIONS */}
                                <div>
                                    <span className="kw">public partial class</span>{" "}
                                    <span className="class-name">FORMATIONS</span>{" "}
                                    <span className="pt">:</span>{" "}
                                    <span className="fn">ÉcolesSupérieures</span>
                                </div>
                                <div className="brace">{"{"}</div>

                                {/* Développeur Web */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">private void</span>&nbsp;
                                        <span className="fn">LaPlateforme</span>
                                        <span className="pt">(</span>
                                        <span className="kw">string</span>{" "}
                                        <span className="vc">_Spécialité</span>
                                        <span className="pt">)</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Titre</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Développeur Web et Web Mobile"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Lieu</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Cannes"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2025</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="ty">Actuel</span>
                                            <span className="pt">);</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Status</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="ty">EnCours</span>
                                            <span className="pt">;</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                </div>

                                <div className="sgap"></div>

                                {/* Systems Admin */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">private void</span>&nbsp;
                                        <span className="fn">LaPlateforme_SysAdmin</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Titre</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Formation Systems Admin"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Lieu</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Cannes"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2024</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2025</span>
                                            <span className="pt">);</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                </div>

                                <div className="sgap"></div>

                                {/* Licence chimie */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">private void</span>&nbsp;
                                        <span className="fn">FCUP</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Titre</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Licence en Chimie"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Lieu</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Porto, Portugal"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2012</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2014</span>
                                            <span className="pt">);</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                </div>

                                <div className="sgap"></div>

                                {/* Bac */}
                                <div className="method">
                                    <div className="method-sig">
                                        <span className="kw">private void</span>&nbsp;
                                        <span className="fn">ESDAH</span>
                                        <span className="pt">()</span>
                                    </div>
                                    <div className="brace">{"{"}</div>
                                    <div className="method-body">
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Titre</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Baccalauréat Sciences et Technologies"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Lieu</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="st">"Porto, Portugal"</span>
                                            <span className="pt">;</span>
                                        </div>
                                        <div className="field">
                                            <span className="kw">var</span>{" "}
                                            <span className="vc">_Date</span>{" "}
                                            <span className="pt">=</span>{" "}
                                            <span className="fn">Range</span>
                                            <span className="pt">(</span>début
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2009</span>
                                            <span className="pt">,</span> fin
                                            <span className="pt">:</span>{" "}
                                            <span className="nm">2012</span>
                                            <span className="pt">);</span>
                                        </div>
                                    </div>
                                    <div className="brace">{"}"}</div>
                                </div>

                                <div className="brace">{"}"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
