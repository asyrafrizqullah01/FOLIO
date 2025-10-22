import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ultra-polished iOS26 x Ferrari portfolio
export default function IOS26FerrariPortfolio() {
    const [theme, setTheme] = useState("light");
    const [activeSection, setActiveSection] = useState("home");
    const [contactOpen, setContactOpen] = useState(false);
    const [bio, setBio] = useState("");
    const [typing, setTyping] = useState(false);
    const navRef = useRef(null);

    // CV data (used to generate AI-style bio)
    const cv = {
        name: "Muh Asyraf Rizqullah, S.Kom.",
        title: "Front-End & Full-Stack Developer",
        location: "Yogyakarta, Indonesia",
        email: "asyrafrizqullah01@gmail.com",
        phone: "+62 822 9642 0613",
        skills: ["Laravel", "Vue.js", "React", "JavaScript", "TailwindCSS", "MySQL"],
        experience: [
            "PT Surya Panca Daya — Supervisor (2018 - 2019)",
            "Project GiriDorzz — Front-End & Back-End (2020)",
            "Mamuju Vapor Store — Thesis Full-Stack Website (2023)",
        ],
    };

    useEffect(() => {
        // auto theme based on system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");

        const handleScroll = () => {
            const sections = ["home", "projects", "about", "gallery"];
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            for (let id of sections) {
                const section = document.getElementById(id);
                if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    setActiveSection(id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Polished nav click with smooth scroll
    const handleNavClick = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
    };

    // Engine sound (already implemented) - kept
    const handleStartEngine = async () => {
        try {
            const audio = new Audio(
                "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6b2f43cc55.mp3?filename=ferrari-engine-sound-10659.mp3"
            );
            await audio.play();
            document.body.classList.add("engine-started");
            setTimeout(() => document.body.classList.remove("engine-started"), 5000);
        } catch (e) {
            console.warn("Audio playback failed", e);
        }
    };

    // Simple AI-bio generator that composes a strong paragraph from CV data
    const generateBio = () => {
        const sentence = `${cv.name} is a ${cv.title} based in ${cv.location}. With experience across ${cv.experience.length} notable projects and a toolkit including ${cv.skills.join(", ")}, Asyraf focuses on building fast, elegant, and accessible web experiences that blend performance with high-end design.`;
        // typing effect
        setBio("");
        setTyping(true);
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setBio(sentence.slice(0, i));
            if (i >= sentence.length) {
                clearInterval(interval);
                setTyping(false);
            }
        }, 12);
    };

    // Projects and gallery (sample images)
    const projects = [
        { title: "Ferrari Neural UI", desc: "Performance-driven interface merging precision and speed.", img: "https://source.unsplash.com/random/1200x600?ferrari,interior" },
        { title: "HoloSpeed Dashboard", desc: "High-performance data visualization with race-inspired motion.", img: "https://source.unsplash.com/random/1200x600?speed,red,car" },
    ];

    const gallery = Array.from({ length: 8 }).map((_, i) => `https://source.unsplash.com/random/900x700?sig=${i}&ferrari,speed`);

    return (
        <div className={`min-h-screen font-[system-ui] transition-colors duration-700 ${theme === "dark" ? "bg-gradient-to-br from-black via-gray-900 to-red-900 text-white" : "bg-gradient-to-br from-white via-gray-100 to-red-50 text-gray-900"}`}>
            {/* Top glass navbar */}
            <motion.header initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] md:w-[80%] rounded-3xl backdrop-blur-3xl bg-white/6 border border-white/6 py-3 px-5 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                    <div onClick={() => handleNavClick("home")} className="select-none cursor-pointer">
                        <motion.h1 whileHover={{ scale: 1.03 }} className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-400">Asyraf Rizqullah</motion.h1>
                        <div className="text-[11px] text-white/60 tracking-wide">Front-End & Full-Stack Dev</div>
                    </div>

                    {/* desktop nav links (center) */}
                    <nav className="hidden md:flex items-center gap-6 px-4">
                        {[{ id: "home", label: "Home" }, { id: "projects", label: "Projects" }, { id: "about", label: "About" }, { id: "gallery", label: "Gallery" }].map((nav) => (
                            <button key={nav.id} onClick={() => handleNavClick(nav.id)} className={`relative px-2 py-1 text-sm font-medium transition ${activeSection === nav.id ? "text-red-400" : "text-white/60 hover:text-red-400"}`}>
                                {nav.label}
                                {activeSection === nav.id && <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-2 h-1 rounded-full bg-gradient-to-r from-red-600 to-amber-400" />}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* right side: contact icon + theme toggle + CV */}
                <div className="flex items-center gap-3">
                    <motion.button onClick={() => setContactOpen(true)} whileHover={{ scale: 1.06 }} className="px-3 py-2 rounded-xl bg-white/4 border border-white/6 text-white/90 text-sm shadow-sm">Contact</motion.button>

                    <motion.button onClick={() => { setTheme((t) => (t === "dark" ? "light" : "dark")); }} whileHover={{ scale: 1.06 }} className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-400 text-black text-sm font-medium shadow">Theme</motion.button>

                    <a href="/resume.pdf" download className="ml-2 px-3 py-2 rounded-xl bg-white/8 border border-white/6 text-sm text-white/90">Resume</a>
                </div>
            </motion.header>

            {/* Contact modal (clean, elegant) */}
            <AnimatePresence>
                {contactOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 300 }} className="w-[90%] md:w-[40%] bg-gradient-to-br from-white/6 to-black/20 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-xl font-semibold text-red-400">Contact</h4>
                                    <p className="text-sm text-white/70 mt-1">Reach out for freelance, collaboration, or full-time roles.</p>
                                </div>
                                <button onClick={() => setContactOpen(false)} className="text-white/60">✕</button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                                    <div className="text-sm text-white/90 font-medium">Email</div>
                                    <a href={`mailto:${cv.email}`} className="text-sm ml-auto text-white/80">{cv.email}</a>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                                    <div className="text-sm text-white/90 font-medium">Phone</div>
                                    <a href={`tel:${cv.phone}`} className="text-sm ml-auto text-white/80">{cv.phone}</a>
                                </div>
                                <div className="p-3 rounded-xl bg-white/3 border border-white/6">
                                    <div className="text-sm text-white/90 font-medium">Quick Bio</div>
                                    <div className="mt-2 text-sm text-white/70 min-h-[48px]">
                                        {bio || <span className="text-white/50">Press <button onClick={generateBio} className="underline">Generate Bio</button> to create a polished summary from your CV.</span>}
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <button onClick={generateBio} className="px-3 py-1 rounded-md bg-red-500 text-white text-sm">Generate</button>
                                        <button onClick={() => { setBio(""); setTyping(false); }} className="px-3 py-1 rounded-md bg-white/6 text-white text-sm">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="pt-28">
                {/* HERO */}
                <section id="home" className="relative h-[85vh] flex flex-col justify-center items-center text-center px-6 md:px-10 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-[#2a0202]/40 to-red-900/20" />

                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-amber-400 to-white">Performance Meets Precision</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-sm md:text-lg text-white/70 max-w-3xl">I craft high-performance interfaces inspired by automotive precision and iOS elegance. Interactive, fast, and beautifully engineered.</motion.p>

                    <div className="mt-6 flex gap-4">
                        <motion.button whileHover={{ scale: 1.04 }} onClick={handleStartEngine} className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-400 text-black font-semibold shadow">Start Engine</motion.button>
                        <motion.button whileHover={{ scale: 1.04 }} onClick={() => handleNavClick('projects')} className="px-6 py-3 rounded-full bg-white/6 text-white">Explore Work</motion.button>
                    </div>

                    {/* profile card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 p-4 rounded-2xl bg-white/4 border border-white/6 w-[92%] md:w-[60%]">
                        <div className="flex items-center gap-4">
                            <img src="/profile.jpg" alt="profile" className="w-20 h-20 rounded-xl object-cover border-2 border-red-500/60" />
                            <div className="text-left">
                                <div className="text-sm text-white/70">{cv.title}</div>
                                <div className="text-lg font-semibold mt-1">{cv.name}</div>
                                <div className="text-sm text-white/60 mt-1">{cv.location}</div>
                            </div>
                            <div className="ml-auto text-sm text-white/60">Available · Open to opportunities</div>
                        </div>
                    </motion.div>
                </section>

                {/* Projects */}
                <section id="projects" className="py-16 px-6 md:px-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-red-400">Featured Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {projects.map((p, i) => (
                            <motion.article key={i} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 180 }} className="rounded-xl overflow-hidden bg-white/4 border border-white/6 backdrop-blur-md">
                                <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-red-300">{p.title}</h4>
                                    <p className="text-sm text-white/70 mt-2">{p.desc}</p>
                                    <div className="mt-3 flex gap-2">
                                        <a className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-400 text-black text-sm">Live</a>
                                        <a className="px-3 py-1 rounded-full border border-white/6 text-white/80 text-sm">Repo</a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* About with AI-generated bio */}
                <section id="about" className="py-16 px-6 md:px-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-red-400">About</h3>
                    <div className="max-w-4xl mx-auto text-white/80">
                        <p className="mb-4">Below is a polished summary generated from your CV. You can regenerate it anytime.</p>
                        <div className="p-4 rounded-xl bg-white/4 border border-white/6">
                            <div className="min-h-[96px] text-sm leading-relaxed">{bio || (<><span className="text-white/50">No bio yet — </span><button onClick={generateBio} className="underline">Generate AI bio</button></>)}</div>
                            <div className="mt-3 flex gap-3">
                                <button onClick={generateBio} className="px-3 py-1 rounded-md bg-red-500 text-white text-sm">Generate</button>
                                <button onClick={() => { setBio(''); }} className="px-3 py-1 rounded-md bg-white/6 text-white text-sm">Clear</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive 3D-ish Gallery (CSS + motion) */}
                <section id="gallery" className="py-16 px-6 md:px-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-red-400">Gallery (3D)</h3>
                    <div className="perspective-1200 mx-auto max-w-6xl">
                        <div className="gallery-3d grid grid-cols-2 md:grid-cols-4 gap-6">
                            {gallery.map((src, idx) => (
                                <motion.div key={idx} whileHover={{ scale: 1.06, rotateX: -6 }} transition={{ type: 'spring', stiffness: 220 }} className="rounded-xl overflow-hidden bg-black/30 border border-white/6 shadow-lg transform-gpu">
                                    <img src={src} alt={`G${idx}`} className="w-full h-44 object-cover" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center border-t border-white/6 backdrop-blur-2xl">
                <p className="text-sm text-white/70">© 2025 {cv.name} — iOS 26 x Ferrari Experience</p>
            </footer>

            {/* styles injected so canvas preview shows correctly */}
            <style>{`
        .perspective-1200 { perspective: 1200px; }
        .gallery-3d > div { transform-origin: center; transition: transform 0.35s ease; }
        /* subtle shimmer over navbar */
        .navbar-shimmer::after { content: '' ; position: absolute; left: -40%; top: 0; height: 100%; width: 40%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); transform: skewX(-20deg); animation: shimmer 3.8s infinite; }
        @keyframes shimmer { 0% { left: -40%; } 60% { left: 120%; } 100% { left: 120%; } }
        /* engine started small vibration */
        .engine-started { animation: engine-vib 0.08s infinite; }
        @keyframes engine-vib { 0% { transform: translateY(0); } 50% { transform: translateY(-1px); } 100% { transform: translateY(0); } }
      `}</style>
        </div>
    );
}
