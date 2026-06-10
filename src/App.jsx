import { lazy, Suspense, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import {
  BadgeCheck,
  Building2,
  Calculator,
  ClipboardCheck,
  Hammer,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";

const phoneNumber = "8087702847";
const heroImage = "https://images.pexels.com/photos/6034140/pexels-photo-6034140.jpeg";
const ThreeShowcase = lazy(() => import("./ThreeShowcase.jsx"));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

function openWhatsApp(message) {
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function App() {
  const [formNote, setFormNote] = useState("Your details open as a WhatsApp inquiry for quick confirmation.");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  const services = useMemo(() => [
    [Home, "House Construction", "Complete turnkey home construction from foundation to finishing."],
    [ShieldCheck, "Engineer Site Supervision", "Protect your investment with professional quality monitoring."],
    [Calculator, "Construction Cost Estimation", "Know your actual budget before starting construction."],
    [Ruler, "Structural Design", "Safe and optimized structural planning for your plot and family needs."],
    [Wrench, "Renovation & Home Extension", "Upgrade existing homes efficiently with practical engineering guidance."]
  ], []);

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello construction site Engineers, I want to book a free engineer consultation.",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Location: ${form.get("location")}`,
      `Plot size: ${form.get("plot") || "Not sure"}`,
      `Expected budget: ${form.get("budget")}`
    ].join("\n");
    setFormNote("Opening WhatsApp with your consultation request...");
    openWhatsApp(message);
  };

  const magnetic = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    gsap.to(target, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.15,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18,
      duration: 0.28,
      ease: "power2.out"
    });
  };

  const resetMagnetic = (event) => gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="MahaBuild Engineers home">
          <span className="brand-mark">SC</span>
          <span><strong>Construction Site</strong><small></small></span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#services">Services</a><a href="#portfolio">Homes</a><a href="#process">Process</a><a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Free Visit</a>
      </header>

      <main id="home">
        <section className="hero">
          <img src={heroImage} alt="Engineer supervised modern home construction " className="hero-img" />
          <div className="hero-overlay" />
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="eyebrow" variants={fadeUp}>Engineer-Led Home Construction</motion.p>
            <motion.h1 variants={fadeUp}>Build Your Dream Home Without Budget Surprises</motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>Engineer-supervised home construction with transparent costing, quality control, and timely delivery.</motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="btn btn-primary" href="#contact" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>Get Free Site Visit</a>
              <button className="btn btn-secondary" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want a construction cost estimate for my home project in/near Aurangabad.")} onMouseMove={magnetic} onMouseLeave={resetMagnetic}>Get Construction Cost Estimate</button>
            </motion.div>
            <motion.div className="trust-row" variants={fadeUp}>
              {["Civil Engineers Team", "Transparent Costing", "Quality Materials", "Site Supervision", "On-Time Project Management"].map((item) => <span key={item}>✓ {item}</span>)}
            </motion.div>
          </motion.div>
        </section>

        <motion.section className="stats strip" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[["₹15L-₹75L", "Budget-focused homes"], ["5-stage", "Quality inspection"], ["NRI-ready", "Remote progress updates"], ["Local", "Aurangabad expertise"]].map(([big, small]) => (
            <motion.div key={big} variants={fadeUp}><strong>{big}</strong><span>{small}</span></motion.div>
          ))}
        </motion.section>

        <section className="section split" id="pain">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Before You Start</p><h2>Are You Worried About?</h2>
            <p>Most first-home builders lose money because the project is managed informally. We solve these problems through professional engineering management.</p>
          </motion.div>
          <motion.div className="pain-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {["Contractors increasing costs?", "Poor construction quality?", "Delays in project completion?", "Material wastage?", "Lack of site supervision?"].map((item) => <motion.article key={item} variants={fadeUp}>{item}</motion.article>)}
          </motion.div>
        </section>

        <section className="section services-3d" id="services">
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Services</p><h2>Complete Construction Support From Planning to Handover</h2>
          </motion.div>
          <div className="service-layout">
            <motion.div className="card-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {services.map(([Icon, title, copy], index) => (
                <motion.article className="service-card" key={title} variants={fadeUp} whileHover={{ y: -8, borderColor: "#1565c0" }}>
                  <Icon size={28} /><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p>
                </motion.article>
              ))}
            </motion.div>
            {/* 3D Model  👇🏻*/}
            {/* <Suspense fallback={<div className="three-showcase three-loading">Loading 3D home model</div>}>
              <ThreeShowcase />
            </Suspense> */}
          </div>
        </section>

        <motion.section className="cta-band" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div><h2>Planning a home loan or NRI family project?</h2><p>Get an engineer-reviewed budget assessment before you commit to construction.</p></div>
          <button className="btn btn-light" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want a free engineer consultation for my home project.")}><MessageCircle size={18} /> Chat on WhatsApp</button>
        </motion.section>

        <section className="section split" id="why">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Why Choose Us</p><h2>Built for Families Who Need Every Rupee to Work Hard</h2>
          </motion.div>
          <motion.ul className="check-list" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {["Engineer-led approach", "Transparent material and labor costing", "Regular progress updates", "Quality checks at every stage", "Budget-focused planning", "Local Aurangabad expertise"].map((item) => <motion.li key={item} variants={fadeUp}><BadgeCheck size={18} /> {item}</motion.li>)}
          </motion.ul>
        </section>

        <section className="section" id="process">
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">How It Works</p><h2>A Clear Path From Plot Visit to Handover</h2>
          </motion.div>
          <motion.div className="steps" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {["Free Site Visit", "Detailed Budget Estimate", "Design & Planning", "Construction Execution", "Quality Inspection & Handover"].map((title, index) => (
              <motion.article className="step" key={title} variants={fadeUp} whileHover={{ y: -6 }}>
                <b>{index + 1}</b><h3>{title}</h3><p>{["We inspect your plot, access, soil context, and family requirements.", "You receive practical costing for structure, materials, labor, and finishes.", "Drawings, structural planning, and project schedule are finalized.", "Engineer-supervised work starts with regular updates and cost tracking.", "Stage-wise checks support a clean, confident final handover."][index]}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* <section className="section" id="portfolio">
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Portfolio</p><h2>Completed Homes and Practical Transformations</h2>
          </motion.div>
          <motion.div className="portfolio-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {["Waluj 2BHK Turnkey Home", "Shendra Duplex Residence", "Paithan Road Extension"].map((title, index) => (
              <motion.article className="project" key={title} variants={fadeUp} whileHover={{ scale: 1.018 }}>
                <div className={`before before-${index + 1}`}><span>Before</span></div><div className={`after home-${index + 1}`}><span>After</span></div>
                <h3>{title}</h3><p>{["980 sq ft | Budget-managed foundation to finishing | Family occupancy ready.", "1,450 sq ft | Structural design, supervision, and monthly NRI updates.", "First-floor extension | Quality checks, material planning, and waste control."][index]}</p>
              </motion.article>
            ))}
          </motion.div>
        </section> */}

        <section className="section testimonials">
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Families Trust Us</p><h2>Clear Communication, Better Control</h2>
          </motion.div>
          <motion.div className="card-grid three" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              ["The estimate helped us plan our home loan properly. Site updates were clear and we always knew what was happening.", "Priya J., Aurangabad"],
              ["We were worried about contractor cost increases. Their engineer explained materials and checked work stage by stage.", "Sandeep K., Waluj"],
              ["As an NRI family, regular photos and progress calls gave us confidence while building near Chikalthana.", "Meera P., Dubai"]
            ].map(([quote, name]) => <motion.blockquote key={name} variants={fadeUp}>“{quote}”<cite>- {name}</cite></motion.blockquote>)}
          </motion.div>
        </section>

        <motion.section className="section areas" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="eyebrow">Service Areas</p><h2>Aurangabad and Nearby Maharashtra Districts</h2>
          <div className="area-tags">{["Aurangabad", "Waluj", "Shendra", "Paithan Road", "Chikalthana", "Beed Bypass Area", "Nearby Maharashtra districts"].map((area) => <span key={area}><MapPin size={15} /> {area}</span>)}</div>
        </motion.section>

        <section className="section contact-section" id="contact">
          <motion.div className="contact-copy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Free Consultation</p><h2>Ready to Build Your Home?</h2>
            <p>Get a Free Engineer Consultation and Construction Budget Assessment Today.</p>
            <div className="contact-points"><span>✓ Free site visit booking</span><span>✓ Budget range: ₹15 lakh to ₹75 lakh</span><span>✓ WhatsApp response for faster planning</span></div>
          </motion.div>
          <motion.form className="lead-form" onSubmit={handleLeadSubmit} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
            <label>Phone Number<input name="phone" type="tel" placeholder="+91 98765 43210" required /></label>
            <label>Location<input name="location" type="text" placeholder="Aurangabad / Waluj / Shendra" required /></label>
            <label>Plot Size<input name="plot" type="text" placeholder="Example: 30x40 or 1,200 sq ft" /></label>
            <label>Expected Budget<select name="budget" required><option value="">Select budget</option><option>₹15L - ₹25L</option><option>₹25L - ₹40L</option><option>₹40L - ₹60L</option><option>₹60L - ₹75L</option><option>Need estimate</option></select></label>
            <button className="btn btn-primary" type="submit"><ClipboardCheck size={18} /> Book Free Consultation</button>
            <p className="form-note">{formNote}</p>
          </motion.form>
        </section>
      </main>

      <button className="whatsapp-float" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want help with home construction in/near Aurangabad.")}><MessageCircle size={18} /> WhatsApp</button>

      <footer className="footer">
        <div><strong>MahaBuild Engineers</strong><p>Engineer-led construction management for budget-focused homes in Aurangabad and Maharashtra.</p></div>
        <div><span>Phone</span><a href="tel:+919876543210"><Phone size={14} /> +91 98765 43210</a><span>WhatsApp</span><button onClick={() => openWhatsApp("Hello MahaBuild Engineers, I found your website and want a consultation.")}>Chat on WhatsApp</button></div>
        <div><span>Email</span><a href="mailto:hello@mahabuildengineers.in">hello@mahabuildengineers.in</a><span>Location</span><a href="https://maps.google.com/?q=Aurangabad%20Maharashtra" target="_blank" rel="noreferrer">Google Maps Location</a></div>
        <div><span>Social</span><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">LinkedIn</a></div>
        <div className=" bg">WhatsApp</div>
      </footer>
      
    </>
  );
}

export default App;
