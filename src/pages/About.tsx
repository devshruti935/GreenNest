const values = [
  { icon: '🌍', title: 'Planet First', desc: 'Every decision we make prioritizes environmental impact over profit margins.' },
  { icon: '🤝', title: 'Fair Trade', desc: 'We partner with artisan communities ensuring fair wages and safe working conditions.' },
  { icon: '♻️', title: 'Zero Waste', desc: 'Our goal is zero landfill waste. All packaging is compostable or recyclable.' },
  { icon: '🔬', title: 'Transparency', desc: 'Full supply chain transparency. Know exactly where your product comes from.' },
  { icon: '🌱', title: 'Regenerative', desc: "We don't just sustain — we actively regenerate ecosystems through our sourcing." },
  { icon: '💚', title: 'Community', desc: 'Building a global community of conscious consumers who care about the future.' },
];

const team = [
  { emoji: '👩‍💼', name: 'Priya Sharma', role: 'Founder & CEO' },
  { emoji: '👨‍🔬', name: 'Arjun Patel', role: 'Head of Sustainability' },
  { emoji: '👩‍🎨', name: 'Meera Reddy', role: 'Design Lead' },
  { emoji: '👨‍💻', name: 'Rohan Das', role: 'Tech Lead' },
];

const About = () => {
  return (
    <div className="page-enter">
      <div className="about-hero">
        <span className="label" style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '50px', background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.15)', color: '#52b788', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
          Our Story
        </span>
        <h1>Building a Greener Tomorrow</h1>
        <p>
          GreenNest was born from a simple idea: sustainable living shouldn't be
          hard. We connect conscious consumers with artisans who craft beautiful
          products from renewable materials — creating a marketplace that's good
          for people and the planet.
        </p>
      </div>

      {/* Values */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <span className="label">What We Believe</span>
          <h2>Our Values</h2>
          <p>These principles guide every decision we make at GreenNest.</p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <div className="team-section">
        <div className="section-header">
          <span className="label">The People</span>
          <h2>Meet Our Team</h2>
          <p>Passionate individuals working to make sustainability mainstream.</p>
        </div>
        <div className="team-grid">
          {team.map((t, i) => (
            <div className="team-member" key={i}>
              <div className="team-avatar">{t.emoji}</div>
              <h4>{t.name}</h4>
              <div className="role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">2021</div>
          <div className="stat-label">Founded</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Artisan Partners</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">12K+</div>
          <div className="stat-label">Orders Shipped</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">Landfill Waste</div>
        </div>
      </div>
    </div>
  );
};

export default About;
