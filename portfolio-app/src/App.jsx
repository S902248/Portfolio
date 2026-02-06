import { useState, useEffect } from 'react';
import './App.css';
import ownerImg from '/image/owner.jpg';

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [typedText, setTypedText] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const welcomeText = 'Welcome To My Portfolio';
  const fullOwnerName = 'Shubham Adhav';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [welcomeText]);

  useEffect(() => {
    let idx = 0;
    setOwnerName('');
    const interval = setInterval(() => {
      if (idx <= fullOwnerName.length) {
        setOwnerName(fullOwnerName.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 90);
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
      // const res = await fetch('http://localhost:5000/api/contact', {
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

  return (
    <div className="portfolio-navbar-layout">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-portfolio-title">Port<span style={{color:'#ffd200'}}>folio</span></span>
        </div>
        <ul className="navbar-links">
          <li><a href="#home" onClick={() => setActiveSection('home')}>Home</a></li>
          <li><a href="#about" onClick={() => setActiveSection('about')}>About</a></li>
          <li><a href="#experience" onClick={() => setActiveSection('experience')}>Experience</a></li>
          <li><a href="#projects" onClick={() => setActiveSection('projects')}>Projects</a></li>
          <li><a href="#tools" onClick={() => setActiveSection('tools')}>Tools</a></li>
          <li><a href="#resume" onClick={() => setActiveSection('resume')}>Resume</a></li>
          <li><a href="#contact" onClick={() => setActiveSection('contact')}>Contact</a></li>
        </ul>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </nav>
      <div className="owner-img-container">
        <img src={ownerImg} alt="Owner" className="owner-img" />
        <div className="owner-name stylish-name">{ownerName}</div>
      </div>

      <main>
        {activeSection === 'home' && (
          <section id="home" className="home-section">
            <div className="home-video-bg">
              <video autoPlay loop muted playsInline className="home-bg-video">
                <source src="/video/Goal.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="home-content">
                <h1>{typedText}<span className="typing-cursor">|</span></h1>
                <p>Hi, I'm <strong>Shubham Adhav</strong>, a full-stack developer with a passion for building high-quality, scalable web applications. Welcome to my professional portfolio where I showcase my skills, experiences, and projects.</p>
                <a href="https://www.linkedin.com/in/shubham-adhav-patil-b1b743299/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                  <img src="/image/linkdin.jpeg" alt="LinkedIn" className="linkedin-icon" />
                </a>
                <a href="#" className="instagram-link" onClick={e => { e.preventDefault(); alert('Instagram is disabled for some reasons!'); }}>
                  <img src="/image/insta.jpeg" alt="Instagram" className="instagram-icon" />
                </a>
              </div>
            </div>

            {/* About Section */}
            <div className="home-section-divider"></div>
            <div className="about-video-bg">
              <video autoPlay loop muted playsInline className="about-bg-video">
                <source src="/video/building.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="about-content">
                <h2>About Me</h2>
                <p>I'm a software developer with a strong foundation in computer science and hands-on experience in modern web technologies. My journey began with curiosity for how websites work, and over time, it evolved into a deep passion for crafting powerful user experiences. I enjoy solving real-world problems, collaborating with teams, and continually learning new technologies to stay ahead in this fast-paced industry.</p>
                <ul className="about-highlights">
                  <li>🎓 Completed my post-graduation (PG) in MCA.</li>
                  <li>💼 Interned at Internship Studio.</li>
                  <li>🖥️ Currently working at Devcon Software Solution.</li>
                </ul>
                <p>When I'm not coding, you can find me exploring new tech blogs, reading productivity books, or experimenting with creative UI designs.</p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="home-section-divider"></div>
            <div className="experience-video-bg">
              <video autoPlay loop muted playsInline className="experience-bg-video">
                <source src="/video/building.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="experience-content">
                <h2>Work Experience</h2>
                <div className="experience-list">
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>MERN Developer</h3>
                      <span className="experience-date">Dec 2025 - Present</span>
                    </div>
                    <p className="experience-company">Nimbja Security Solution Pvt Ltd</p>
                    <p className="experience-description">Developing full-stack applications using MERN stack (MongoDB, Express.js, React.js, Node.js) for enterprise security solutions.</p>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>Intern</h3>
                      <span className="experience-date">Jul 2025 - Oct 2025</span>
                    </div>
                    <p className="experience-company">Internship Studi</p>
                    <p className="experience-description">Gained practical experience in web development, collaborated with senior developers, and contributed to various frontend and backend projects.</p>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>Intern</h3>
                      <span className="experience-date">Jan 2025 - Jun 2025</span>
                    </div>
                    <p className="experience-company">Worknai Pvt Ltd</p>
                    <p className="experience-description">Worked on web development projects, learned best practices in coding standards, and assisted in implementing client requirements using modern web technologies.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="home-section-divider"></div>
            <div className="projects-video-bg">
              <video autoPlay loop muted playsInline className="projects-bg-video">
                <source src="/video/tools.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="projects-content">
                <h2>My Projects</h2>
                <div className="projects-grid">
                  <div className="project-card">
                    <div className="project-header">
                      <h3>Raktdaan - Blood Donation Platform</h3>
                    </div>
                    <p className="project-description">A comprehensive blood donation platform that connects blood donors with recipients. Built with modern web technologies to make blood donation accessible and efficient.</p>
                    <div className="project-tech">
                      <span className="tech-tag">React</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MongoDB</span>
                    </div>
                    <a href="https://www.raktdaan.online/" target="_blank" rel="noopener noreferrer" className="project-link">
                      🔗 Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Section */}
            <div className="home-section-divider"></div>
            <div className="tools-video-bg">
              <video autoPlay loop muted playsInline className="tools-bg-video">
                <source src="/video/tools.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="tools-content">
                <h2>Tools & Technologies</h2>
                <ul>
                  <li><strong>Frontend:</strong> React, HTML5, CSS3, JavaScript, Tailwind CSS</li>
                  <li><strong>Backend:</strong> Node.js, Express.js</li>
                  <li><strong>Database:</strong> MongoDB, Firebase</li>
                  <li><strong>Tools & Platforms:</strong> Git, GitHub, Postman, Vercel, Netlify</li>
                  <li><strong>Others:</strong> REST APIs, JWT Auth, MVC Architecture</li>
                </ul>
              </div>
            </div>

            {/* Resume Section */}
            <div className="home-section-divider"></div>
            <div className="resume-video-bg">
              <video autoPlay loop muted playsInline className="resume-bg-video">
                <source src="/video/resume.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="resume-content">
                <h2>Resume</h2>
                <a href="/image/ShubhamsResume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">
                  📄 View or Download My Resume
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div className="home-section-divider"></div>
            <div className="contact-video-bg">
              <video autoPlay loop muted playsInline className="contact-bg-video">
                <source src="/video/gojo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="contact-content">
                <h2>Contact Me</h2>
                <p>If you'd like to connect, collaborate, or discuss a project, feel free to drop a message below:</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button type="submit" disabled={status === 'Sending...'}>Send</button>
                </form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </section>
        )}
        {activeSection === 'about' && (
          <section id="about">
            <div className="about-video-bg">
              <video autoPlay loop muted playsInline className="about-bg-video">
                <source src="/video/building.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="about-content">
                <h2>About Me</h2>
                <p>I'm a software developer with a strong foundation in computer science and hands-on experience in modern web technologies. My journey began with curiosity for how websites work, and over time, it evolved into a deep passion for crafting powerful user experiences. I enjoy solving real-world problems, collaborating with teams, and continually learning new technologies to stay ahead in this fast-paced industry.</p>
                <ul className="about-highlights">
                  <li>🎓 Completed my post-graduation (PG) in MCA.</li>
                  <li>💼 Interned at Internship Studio.</li>
                  <li>🖥️ Currently working at Devcon Software Solution.</li>
                </ul>
                <p>When I'm not coding, you can find me exploring new tech blogs, reading productivity books, or experimenting with creative UI designs.</p>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'experience' && (
          <section id="experience">
            <div className="experience-video-bg">
              <video autoPlay loop muted playsInline className="experience-bg-video">
                <source src="/video/building.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="experience-content">
                <h2>Work Experience</h2>
                <div className="experience-list">
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>MERN Developer</h3>
                      <span className="experience-date">Dec 2025 - Present</span>
                    </div>
                    <p className="experience-company">Nimbja Security Solution Pvt Ltd</p>
                    <p className="experience-description">Developing full-stack applications using MERN stack (MongoDB, Express.js, React.js, Node.js) for enterprise security solutions.</p>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>Intern</h3>
                      <span className="experience-date">Jul 2025 - Oct 2025</span>
                    </div>
                    <p className="experience-company">Internship Studi</p>
                    <p className="experience-description">Gained practical experience in web development, collaborated with senior developers, and contributed to various frontend and backend projects.</p>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <h3>Intern</h3>
                      <span className="experience-date">Jan 2025 - Jun 2025</span>
                    </div>
                    <p className="experience-company">Worknai Pvt Ltd</p>
                    <p className="experience-description">Worked on web development projects, learned best practices in coding standards, and assisted in implementing client requirements using modern web technologies.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'projects' && (
          <section id="projects">
            <div className="projects-video-bg">
              <video autoPlay loop muted playsInline className="projects-bg-video">
                <source src="/video/tools.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="projects-content">
                <h2>My Projects</h2>
                <div className="projects-grid">
                  <div className="project-card">
                    <div className="project-header">
                      <h3>Raktdaan - Blood Donation Platform</h3>
                    </div>
                    <p className="project-description">A comprehensive blood donation platform that connects blood donors with recipients. Built with modern web technologies to make blood donation accessible and efficient.</p>
                    <div className="project-tech">
                      <span className="tech-tag">React</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MongoDB</span>
                    </div>
                    <a href="https://www.raktdaan.online/" target="_blank" rel="noopener noreferrer" className="project-link">
                      🔗 Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'tools' && (
          <section id="tools">
            <div className="tools-video-bg">
              <video autoPlay loop muted playsInline className="tools-bg-video">
                <source src="/video/tools.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="tools-content">
                <h2>Tools & Technologies</h2>
                <ul>
                  <li><strong>Frontend:</strong> React, HTML5, CSS3, JavaScript, Tailwind CSS</li>
                  <li><strong>Backend:</strong> Node.js, Express.js</li>
                  <li><strong>Database:</strong> MongoDB, Firebase</li>
                  <li><strong>Tools & Platforms:</strong> Git, GitHub, Postman, Vercel, Netlify</li>
                  <li><strong>Others:</strong> REST APIs, JWT Auth, MVC Architecture</li>
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'resume' && (
          <section id="resume">
            <div className="resume-video-bg">
              <video autoPlay loop muted playsInline className="resume-bg-video">
                <source src="/video/resume.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="resume-content">
                <h2>Resume</h2>
                <a href="/image/ShubhamsResume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">
                  📄 View or Download My Resume
                </a>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'contact' && (
          <section id="contact">
            <div className="contact-video-bg">
              <video autoPlay loop muted playsInline className="contact-bg-video">
                <source src="/video/gojo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="contact-content">
                <h2>Contact Me</h2>
                <p>If you'd like to connect, collaborate, or discuss a project, feel free to drop a message below:</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button type="submit" disabled={status === 'Sending...'}>Send</button>
                </form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
