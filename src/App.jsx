import { lazy, Suspense, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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

// The phone number for WhatsApp redirects
const phoneNumber = "8087702847";

// High-quality fallback hero image URL
const heroImage = "https://images.pexels.com/photos/6034140/pexels-photo-6034140.jpeg";

// Lazy-loaded 3D home model showcase component to improve initial page load performance
const ThreeShowcase = lazy(() => import("./ThreeShowcase.jsx"));

// ANIMATION VARIANTS (Framer Motion)

// A smooth fade-up animation variant for standard text and cards
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

// Stagger variant that orchestrates a staggered sequence of animations for its children
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

// Slide-in from left variant for asymmetric layout elements
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Slide-in from right variant for asymmetric layout elements
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Smooth zoom-in reveal variant for visual/interactive elements like cards and 3D frames
const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

// A clean clip-reveal animation that slides text up from inside an overflow-hidden block
const clipReveal = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

/**
 * Utility to redirect users to WhatsApp with custom prefilled messages
 * @param {string} message - Prefilled text for the WhatsApp chat
 */
function openWhatsApp(message) {
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function App() {
  // formNote state tracks user-friendly status updates below the contact form submission
  const [formNote, setFormNote] = useState("Your details open as a WhatsApp inquiry for quick confirmation.");

  // scrollY and scrollYProgress drive scroll-linked effects
  const { scrollY, scrollYProgress } = useScroll();

  // Spring-smoothed scroll progress value for the top reading indicator bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  // Hero image scroll parallax: translates image downward and scales it up slowly as you scroll
  const heroY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);

  // Memoized array of services offered to prevent unnecessary re-evaluations
  const services = useMemo(() => [
    [Home, "House Construction", "Complete turnkey home construction from foundation to finishing."],
    [ShieldCheck, "Engineer Site Supervision", "Protect your investment with professional quality monitoring."],
    [Calculator, "Construction Cost Estimation", "Know your actual budget before starting construction."],
    [Ruler, "Structural Design", "Safe and optimized structural planning for your plot and family needs."],
    [Wrench, "Renovation & Home Extension", "Upgrade existing homes efficiently with practical engineering guidance."]
  ], []);

  /**
   * Processes consultation form values and formats a WhatsApp message payload
   * @param {React.FormEvent<HTMLFormElement>} event - Submission event
   */
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

  /**
   * GSAP mouse movement interactive magnetic effect for primary CTA buttons
   */
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

  /**
   * Resets the CTA button to its resting coordinates when cursor exits bounds
   */
  const resetMagnetic = (event) => gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });

  return (
    <>
      {/* Top scroll reading progress indicator bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Main navigation header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="MahaBuild Engineers home">
          <span className="brand-mark">SC</span>
          <span><strong>Construction Site</strong><small></small></span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#portfolio">Homes</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Free Visit</a>
      </header>

      <main id="home">
        {/* HERO SECTION: Features load-in zoom and scroll parallax for the background image */}
        <section className="hero" style={{ overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <motion.img 
              src={heroImage} 
              alt="Engineer supervised modern home construction" 
              className="hero-img" 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: heroY, scale: heroScale }}
            />
          </div>
          <div className="hero-overlay" />
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
            <div style={{ overflow: "hidden" }}>
              <motion.p className="eyebrow" variants={clipReveal}>Engineer-Led Home Construction</motion.p>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.h1 variants={clipReveal}>Build Your Dream Home Without Budget Surprises</motion.h1>
            </div>
            <motion.p className="hero-sub" variants={fadeUp}>
              Engineer-supervised home construction with transparent costing, quality control, and timely delivery.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="btn btn-primary" href="#contact" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>Get Free Site Visit</a>
              <button className="btn btn-secondary" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want a construction cost estimate for my home project in/near Aurangabad.")} onMouseMove={magnetic} onMouseLeave={resetMagnetic}>Get Construction Cost Estimate</button>
            </motion.div>
            <motion.div className="trust-row" variants={fadeUp}>
              {["Civil Engineers Team", "Transparent Costing", "Quality Materials", "Site Supervision", "On-Time Project Management"].map((item) => <span key={item}>✓ {item}</span>)}
            </motion.div>
          </motion.div>
        </section>

        {/* STATS SECTION: Displays key achievements with staggered pop-up reveals */}
        <motion.section className="stats strip" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
          {[["₹15L-₹75L", "Budget-focused homes"], ["5-stage", "Quality inspection"], ["NRI-ready", "Remote progress updates"], ["Local", "Aurangabad expertise"]].map(([big, small]) => (
            <motion.div key={big} variants={zoomIn}><strong>{big}</strong><span>{small}</span></motion.div>
          ))}
        </motion.section>

        {/* PAIN POINTS SECTION: Asymmetrical slide reveals highlighting typical construction concerns */}
        <section className="section split" id="pain" style={{ overflow: "hidden" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={slideInLeft}>
            <p className="eyebrow">Before You Start</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Are You Worried About?</motion.h2>
            </div>
            <p>Most first-home builders lose money because the project is managed informally. We solve these problems through professional engineering management.</p>
          </motion.div>
          <motion.div className="pain-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            {["Contractors increasing costs?", "Poor construction quality?", "Delays in project completion?", "Material wastage?", "Lack of site supervision?"].map((item) => (
              <motion.article key={item} variants={slideInRight}>{item}</motion.article>
            ))}
          </motion.div>
        </section>

        {/* SERVICES SECTION: Presents the 3D home showcase alongside service items */}
        <section className="section services-3d" id="services" style={{ overflow: "hidden" }}>
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="eyebrow">Services</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Complete Construction Support From Planning to Handover</motion.h2>
            </div>
          </motion.div>
          <div className="service-layout">
            <motion.div className="card-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              {services.map(([Icon, title, copy], index) => (
                <motion.article className="service-card" key={title} variants={fadeUp} whileHover={{ y: -8, borderColor: "#1565c0" }}>
                  <Icon size={28} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </motion.div>
            
            {/* Interactive 3D Model loaded lazily to ensure performance */}
            <Suspense fallback={<div className="three-showcase three-loading">Loading 3D home model</div>}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={zoomIn} style={{ height: "100%" }}>
                <ThreeShowcase />
              </motion.div>
            </Suspense>
          </div>
        </section>

        {/* CALL TO ACTION BAND: A scroll reveal section highlighting financial assessments */}
        <motion.section className="cta-band" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={zoomIn}>
          <div>
            <h2>Planning a home loan or NRI family project?</h2>
            <p>Get an engineer-reviewed budget assessment before you commit to construction.</p>
          </div>
          <button className="btn btn-light" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want a free engineer consultation for my home project.")}><MessageCircle size={18} /> Chat on WhatsApp</button>
        </motion.section>

        {/* WHY CHOOSE US SECTION: Explains benefits using staggered text slide-ups */}
        <section className="section split" id="why" style={{ overflow: "hidden" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={slideInLeft}>
            <p className="eyebrow">Why Choose Us</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Built for Families Who Need Every Rupee to Work Hard</motion.h2>
            </div>
          </motion.div>
          <motion.ul className="check-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {["Engineer-led approach", "Transparent material and labor costing", "Regular progress updates", "Quality checks at every stage", "Budget-focused planning", "Local Aurangabad expertise"].map((item) => (
              <motion.li key={item} variants={slideInRight}><BadgeCheck size={18} /> {item}</motion.li>
            ))}
          </motion.ul>
        </section>

        {/* HOW IT WORKS PROCESS SECTION: Cards showing project timeline with staggered pop-ups */}
        <section className="section" id="process" style={{ overflow: "hidden" }}>
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="eyebrow">How It Works</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>A Clear Path From Plot Visit to Handover</motion.h2>
            </div>
          </motion.div>
          <motion.div className="steps" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            {["Free Site Visit", "Detailed Budget Estimate", "Design & Planning", "Construction Execution", "Quality Inspection & Handover"].map((title, index) => (
              <motion.article className="step" key={title} variants={fadeUp} whileHover={{ y: -6 }}>
                <b>{index + 1}</b>
                <h3>{title}</h3>
                <p>{["We inspect your plot, access, soil context, and family requirements.", "You receive practical costing for structure, materials, labor, and finishes.", "Drawings, structural planning, and project schedule are finalized.", "Engineer-supervised work starts with regular updates and cost tracking.", "Stage-wise checks support a clean, confident final handover."][index]}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* PORTFOLIO SECTION: Showcases real project comparisons with hover scaling effects */}
        <section className="section" id="portfolio" style={{ overflow: "hidden" }}>
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="eyebrow">Portfolio</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Completed Homes and Practical Transformations</motion.h2>
            </div>
          </motion.div>
          <motion.div className="portfolio-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            {["Waluj 2BHK Turnkey Home", "Shendra Duplex Residence", "Paithan Road Extension"].map((title, index) => (
              <motion.article className="project" key={title} variants={zoomIn} whileHover={{ scale: 1.02, y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className={`before before-${index + 1}`}><span>Before</span></div>
                <div className={`after home-${index + 1}`}><span>After</span></div>
                <h3>{title}</h3>
                <p>{["980 sq ft | Budget-managed foundation to finishing | Family occupancy ready.", "1,450 sq ft | Structural design, supervision, and monthly NRI updates.", "First-floor extension | Quality checks, material planning, and waste control."][index]}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* TESTIMONIALS SECTION: Cards slide up in sequence to build user trust */}
        <section className="section testimonials" style={{ overflow: "hidden" }}>
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="eyebrow">Families Trust Us</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Clear Communication, Better Control</motion.h2>
            </div>
          </motion.div>
          <motion.div className="card-grid three" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            {[
              ["The estimate helped us plan our home loan properly. Site updates were clear and we always knew what was happening.", "Priya J., Aurangabad"],
              ["We were worried about contractor cost increases. Their engineer explained materials and checked work stage by stage.", "Sandeep K., Waluj"],
              ["As an NRI family, regular photos and progress calls gave us confidence while building near Chikalthana.", "Meera P., Dubai"]
            ].map(([quote, name]) => (
              <motion.blockquote key={name} variants={fadeUp}>
                “{quote}”
                <cite>- {name}</cite>
              </motion.blockquote>
            ))}
          </motion.div>
        </section>

        {/* AREAS SECTION: Shows regional coverage maps in a clean tag structure */}
        <motion.section className="section areas" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={zoomIn}>
          <p className="eyebrow">Service Areas</p>
          <div style={{ overflow: "hidden" }}>
            <motion.h2 variants={clipReveal}>Aurangabad and Nearby Maharashtra Districts</motion.h2>
          </div>
          <div className="area-tags">
            {["Aurangabad", "Waluj", "Shendra", "Paithan Road", "Chikalthana", "Beed Bypass Area", "Nearby Maharashtra districts"].map((area) => (
              <span key={area}><MapPin size={15} /> {area}</span>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION: Splits the page between copy prompts and the main consultation form */}
        <section className="section contact-section" id="contact" style={{ overflow: "hidden" }}>
          <motion.div className="contact-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={slideInLeft}>
            <p className="eyebrow">Free Consultation</p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 variants={clipReveal}>Ready to Build Your Home?</motion.h2>
            </div>
            <p>Get a Free Engineer Consultation and Construction Budget Assessment Today.</p>
            <div className="contact-points">
              <span>✓ Free site visit booking</span>
              <span>✓ Budget range: ₹15 lakh to ₹75 lakh</span>
              <span>✓ WhatsApp response for faster planning</span>
            </div>
          </motion.div>
          <motion.form className="lead-form" onSubmit={handleLeadSubmit} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={slideInRight}>
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

      {/* Floating button for quick user communication on WhatsApp */}
      <button className="whatsapp-float" onClick={() => openWhatsApp("Hello MahaBuild Engineers, I want help with home construction in/near Aurangabad.")}><MessageCircle size={18} /> WhatsApp</button>

      {/* Footer layout containing contact links and service descriptions */}
      <footer className="footer">
        <div>
          <strong>MahaBuild Engineers</strong>
          <p>Engineer-led construction management for budget-focused homes in Aurangabad and Maharashtra.</p>
        </div>
        <div>
          <span>Phone</span>
          <a href="tel:+918087702847"><Phone size={14} /> +91 80877 02847</a>
          <span>WhatsApp</span>
          <button onClick={() => openWhatsApp("Hello MahaBuild Engineers, I found your website and want a consultation.")}>Chat on WhatsApp</button>
        </div>
        <div>
          <span>Email</span>
          <a href="mailto:hello@mahabuildengineers.in">hello@mahabuildengineers.in</a>
          <span>Location</span>
          <a href="https://maps.google.com/?q=Aurangabad%20Maharashtra" target="_blank" rel="noreferrer">Google Maps Location</a>
        </div>
        <div>
          <span>Social</span>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className="bg">WhatsApp</div>
      </footer>
    </>
  );
}

export default App;
