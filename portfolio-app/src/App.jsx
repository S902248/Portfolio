import { useState, useEffect } from 'react';
import './App.css';
const ownerImg = "/image/owner.jpg";

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [typedBrand, setTypedBrand] = useState('');

  useEffect(() => {
    const brand = "Shubham Adhav";
    let i = 0;
    const interval = setInterval(() => {
      setTypedBrand(brand.slice(0, i));
      i++;
      if (i > brand.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('https://poerfolio.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send.');
      }
    } catch {
      setStatus('Failed to send.');
    }
  };

  const projects = [
    {
      id: 1,
      title: "Raktdaan",
      desc: "Blood Donation Platform connecting donors with recipients. Built with React, Node.js, and MongoDB.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://www.raktdaan.online/",
      img: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2000&auto=format&fit=crop",
      theme: "red-accent"
    },
    {
      id: 2,
      title: "Carnomia",
      desc: "Modern automotive marketplace showcasing cars with a clean UI and powerful search.",
      tech: ["React", "Next.js", "API"],
      link: "https://carnomia.com/",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Cloud Kitchen",
      desc: "A premium MERN stack application for food ordering with nested categories and real-time tracking.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      link: "https://cloud-kitchen-nnz5.vercel.app/",
      img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop",
      theme: "orange-accent"
    }
  ];

  const experience = [
    {
      role: "Full Stack Developer",
      company: "Nimbusja Security Solution Pvt. Ltd.",
      date: "May 2025 - Present",
      points: [
        "Developing secure and scalable MERN stack applications",
        "Designing RESTful APIs using Node.js and Express.js",
        "Implementing JWT-based authentication and RBAC",
        "Improving performance, security, and code quality"
      ]
    },
    {
      role: "Software Developer (MERN Stack) - Intern",
      company: "WorknAI Technology Pvt. Ltd.",
      date: "Nov 2024 - Apr 2025",
      points: [
        "Built reusable React components and optimized UI performance",
        "Developed backend APIs for authentication and CRUD operations",
        "Collaborated with cross-functional teams in agile environment"
      ]
    },
    {
      role: "Web Development Intern",
      company: "Internship Studio",
      date: "Oct 2024",
      points: [
        "Built responsive UI using HTML, CSS, and JavaScript",
        "Learned Git workflows and collaborative development"
      ]
    }
  ];

  const tools = [
    { category: "Frontend", items: "React, HTML5, CSS3, JavaScript, Tailwind CSS" },
    { category: "Backend", items: "Node.js, Express.js" },
    { category: "Database", items: "MongoDB, Firebase" },
    { category: "Others", items: "REST APIs, JWT Auth, MVC Architecture, Git, GitHub, Postman, Vercel, Netlify" }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close menu on navigation
    const container = document.querySelector('.showcase-scroll');
    if (container) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Interactive Cursor Aura
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="portfolio-container">
      {/* SIDEBAR */}
      {/* NEW NAVIGATION BAR */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="nav-profile">
              <img src={ownerImg} alt="Shubham" className="nav-avatar" />
              <div className="nav-info">
                <span className="nav-name">Shubham Adhav</span>
                <span className="nav-status">💼 Available</span>
              </div>
            </div>
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-center ${isMenuOpen ? 'mobile-show' : ''}`}>
            <div className={`nav-pills ${isMenuOpen ? 'mobile-open' : ''}`}>
              <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
              <a href="#" className={activeTab === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('projects'); }}>Projects</a>
              <a href="#" className={activeTab === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About</a>
              <a href="#" className={activeTab === 'experience' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigateTo('experience'); }}>Experience</a>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-actions">
              <button className="btn-icon-mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <a href="/image/shubh.pdf" target="_blank" className="btn-resume-new">
                Resume <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">


        <section className="showcase-container">
          <div className="showcase-scroll" key={activeTab}>
            {/* HOME TAB (Hero + Projects) */}
            {activeTab === 'home' && (
              <>
                <div id="card-hero" className="mockup-card hero-card">
                  <div className="hero-content">
                    <div className="hero-profile-header">
                      <div className="hero-img-container">
                        <img src={ownerImg} alt="Shubham Adhav" className="hero-profile-img" />
                        <div className="hero-status-tag">Available for Work</div>
                      </div>
                    </div>

                    <div className="hero-greeting">👋 Hey there!</div>
                    <h1 className="hero-name">I'm <span>Shubham Adhav</span></h1>
                    <div className="hero-role-pill">🧑‍💻 Full Stack Developer @ Nimbusja</div>

                    <p className="hero-value">
                      MCA Post-Graduate (2024-2026) <br />
                      Building scalable web solutions & turning complex problems into elegant digital experiences.
                    </p>

                    <div className="hero-exp-badges">
                      <div className="hero-badge" title="Nimbusja Security">N</div>
                      <div className="hero-badge" title="Internship Studio">I</div>
                      <div className="hero-badge" title="WorknAI">W</div>
                    </div>

                    <div className="hero-social-links">
                      <a href="https://www.linkedin.com/in/shubhamadhav007/" target="_blank" className="social-pill linkedin">LinkedIn</a>
                      <a href="https://github.com/" target="_blank" className="social-pill github">GitHub</a>
                      <a href="mailto:adhavshubham628@gmail.com" target="_blank" rel="noopener noreferrer" className="social-pill gmail">Gmail</a>
                    </div>

                    <div className="hero-btns">
                      <button className="btn-primary" onClick={() => navigateTo('about')}>My Story ↗</button>
                    </div>
                  </div>
                </div>

                {projects.map((project) => (
                  <div key={project.id} className={`mockup-card ${project.theme || ''}`}>
                    <img src={project.img} alt={project.title} className="mockup-img" />
                    <div className="mockup-overlay">
                      <h3 className="mockup-title">{project.title}</h3>
                      <p className="mockup-desc">{project.desc}</p>
                      <div className="p-tech-tags">
                        {project.tech.map(t => <span key={t} className="p-tag">{t}</span>)}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-link">Visit Project ↗</a>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* PROJECTS ONLY TAB */}
            {activeTab === 'projects' && projects.map((project) => (
              <div key={project.id} className={`mockup-card ${project.theme || ''}`}>
                <img src={project.img} alt={project.title} className="mockup-img" />
                <div className="mockup-overlay">
                  <h3 className="mockup-title">{project.title}</h3>
                  <p className="mockup-desc">{project.desc}</p>
                  <div className="p-tech-tags">
                    {project.tech.map(t => <span key={t} className="p-tag">{t}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-link">Visit Project ↗</a>
                </div>
              </div>
            ))}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <>
                <div className="mockup-card text-card">
                  <div className="card-content-inner">
                    <h2 className="section-title">About Me</h2>
                    <p className="about-text">
                      I'm a software developer with a strong foundation in computer science and hands-on experience in modern web technologies.
                      My journey began with curiosity for how websites work, and over time, it evolved into a deep passion for crafting powerful user experiences.
                    </p>
                    <div className="about-highlights">
                      <div>🎓 MCA (2024-2026)</div>
                      <div>💼 Interned @ WorknAI</div>
                      <div>🖥️ Developer @ Nimbusja</div>
                    </div>
                  </div>
                </div>
                <div className="mockup-card text-card">
                  <div className="card-content-inner">
                    <h2 className="section-title">Tools & Tech</h2>
                    <div className="tools-grid">
                      {tools.map((t, idx) => (
                        <div key={idx} className="tool-box">
                          <strong>{t.category}</strong>
                          <p>{t.items}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="mockup-card text-card">
                <div className="card-content-inner">
                  <h2 className="section-title">Experience</h2>
                  <div className="exp-timeline">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="t-header">
                          <strong>{exp.role}</strong>
                          <span>{exp.date}</span>
                        </div>
                        <div className="t-company">{exp.company}</div>
                        <ul className="t-points">
                          {exp.points.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="mockup-card text-card contact-card">
                <div className="card-content-inner">
                  <h2 className="section-title">Reach Me</h2>
                  <form className="c-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required></textarea>
                    <button type="submit" className="btn-send" disabled={status === 'Sending...'}>
                      {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                  {status && <p className="status-msg">{status}</p>}
                </div>
              </div>
            )}
          </div>

          <div className="made-in-framer">
            <span>⚡</span> Crafted by Shubham
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
