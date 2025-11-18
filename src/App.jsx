import React, { useState, useEffect } from 'react';
import { Volume2, Mail, ExternalLink, Plus, Trash2, Edit2, Save, X, Eye, Music } from 'lucide-react';

// Main Portfolio Component
function Portfolio({ data }) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [noise, setNoise] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);

    const noiseInterval = setInterval(() => {
      setNoise(Math.random());
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
      clearInterval(noiseInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative">
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${noise}' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Cursor trail */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-40 transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center border-b border-white border-opacity-20">
        <div className={`text-2xl tracking-widest ${glitchActive ? 'animate-pulse' : ''}`}>
          <span className="relative inline-block">
            RYONKT
            {glitchActive && (
              <>
                <span className="absolute top-0 left-0 text-red-500" style={{ transform: 'translate(-2px, -2px)' }}>RYONKT</span>
                <span className="absolute top-0 left-0 text-blue-500" style={{ transform: 'translate(2px, 2px)' }}>RYONKT</span>
              </>
            )}
          </span>
        </div>
        <div className="flex gap-8">
          {['ABOUT', 'WORKS', 'CONTACT'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item.toLowerCase())}
              className="hover:bg-white hover:text-black px-4 py-2 transition-all duration-300 border border-transparent hover:border-white"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center relative">
            <div className="text-center">
              <h1 className="text-9xl font-bold mb-8 tracking-tight">
                <span className="relative inline-block">
                  RYONKT
                  {glitchActive && (
                    <>
                      <span className="absolute top-0 left-0 text-white opacity-50" style={{ transform: 'translate(-4px, -4px)', clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}>RYONKT</span>
                      <span className="absolute top-0 left-0 text-white opacity-50" style={{ transform: 'translate(4px, 4px)', clipPath: 'polygon(0 70%, 100% 70%, 100% 100%, 0 100%)' }}>RYONKT</span>
                    </>
                  )}
                </span>
              </h1>
              <div className="text-xl tracking-[0.5em] mb-4 text-gray-400">
                EXPERIMENTAL // SOUND // ARTIST
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Volume2 size={16} />
                <span className="animate-pulse">AUDIO FRAGMENTS FROM THE VOID</span>
              </div>
            </div>

            {/* Animated lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white opacity-5"
                  style={{
                    left: `${i * 5}%`,
                    top: 0,
                    width: '1px',
                    height: '100%',
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <section className="min-h-screen flex items-center justify-center p-12">
            <div className="max-w-4xl">
              <h2 className="text-6xl font-bold mb-12 tracking-tight border-b border-white pb-4">ABOUT</h2>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-lg leading-relaxed mb-6 text-gray-300">{data.about.description1}</p>
                  <p className="text-lg leading-relaxed text-gray-300">{data.about.description2}</p>
                </div>
                <div className="space-y-4">
                  <div className="border border-white p-4">
                    <div className="text-sm text-gray-500 mb-1">TECHNIQUES</div>
                    <div className="text-sm">{data.about.techniques}</div>
                  </div>
                  <div className="border border-white p-4">
                    <div className="text-sm text-gray-500 mb-1">INFLUENCES</div>
                    <div className="text-sm">{data.about.influences}</div>
                  </div>
                  <div className="border border-white p-4">
                    <div className="text-sm text-gray-500 mb-1">TOOLS</div>
                    <div className="text-sm">{data.about.tools}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Works Section */}
        {activeSection === 'works' && (
          <section className="min-h-screen flex items-center justify-center p-12">
            <div className="max-w-6xl w-full">
              <h2 className="text-6xl font-bold mb-12 tracking-tight border-b border-white pb-4">WORKS</h2>
              <div className="space-y-1">
                {data.works.map((work, index) => (
                  <div
                    key={work.id}
                    className="border border-white border-opacity-20 p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-2xl font-bold tracking-tight mb-2">{work.title}</div>
                        <div className="text-sm text-gray-500 group-hover:text-gray-700">
                          {work.type} // {work.year}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="p-2 border border-current hover:scale-110 transition-transform">
                          <Volume2 size={20} />
                        </button>
                        {work.url && (
                          <a href={work.url} target="_blank" rel="noopener noreferrer" className="p-2 border border-current hover:scale-110 transition-transform">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="min-h-screen flex items-center justify-center p-12">
            <div className="max-w-4xl w-full">
              <h2 className="text-6xl font-bold mb-12 tracking-tight border-b border-white pb-4">CONTACT</h2>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    Available for collaborations, commissions, and live performances. 
                    Interested in pushing boundaries and exploring uncharted sonic territories.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-lg">
                      <Mail size={20} />
                      <span>{data.contact.email}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <a href={`https://${data.contact.bandcamp}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-sm text-gray-500 mb-1">BANDCAMP</div>
                    <div>{data.contact.bandcamp}</div>
                  </a>
                  <a href={`https://${data.contact.soundcloud}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-sm text-gray-500 mb-1">SOUNDCLOUD</div>
                    <div>{data.contact.soundcloud}</div>
                  </a>
                  <a href={`https://instagram.com/${data.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-sm text-gray-500 mb-1">INSTAGRAM</div>
                    <div>{data.contact.instagram}</div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 border-t border-white border-opacity-20 text-sm text-gray-500 flex justify-between">
        <div>© 2025 RYONKT // ALL RIGHTS RESERVED</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>SYSTEM ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}

// Main App Component with Data Management
export default function App() {
  const [data, setData] = useState({
    works: [
      { id: 1, title: "VOID//ECHO", year: "2025", type: "Album", url: "" },
      { id: 2, title: "FRAGMENTED_SIGNALS", year: "2024", type: "EP", url: "" },
      { id: 3, title: "STATIC RITUALS", year: "2024", type: "Single", url: "" },
      { id: 4, title: "DISSONANCE::MEMORY", year: "2023", type: "Album", url: "" },
      { id: 5, title: "NULL FREQUENCY", year: "2023", type: "Live Recording", url: "" },
    ],
    about: {
      description1: "RYONKT is an experimental sound artist exploring the intersection of noise, silence, and digital decay. Through unconventional synthesis methods and field recordings, each composition challenges traditional musical structures.",
      description2: "Based in the liminal spaces between frequencies, creating sonic landscapes that exist at the edge of perception.",
      techniques: "Granular Synthesis / Field Recording / Generative Algorithms / Analog Manipulation",
      influences: "Musique Concrète / Glitch / Dark Ambient / Noise / Industrial",
      tools: "Modular Synthesis / Max/MSP / Custom Software / Tape Manipulation"
    },
    contact: {
      email: "contact@ryonkt.com",
      bandcamp: "ryonkt.bandcamp.com",
      soundcloud: "soundcloud.com/ryonkt",
      instagram: "@ryonkt_official"
    }
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ryonkt-data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ryonkt-data', JSON.stringify(data));
  }, [data]);

  // Check if we're on dashboard route
  const isDashboard = window.location.pathname.includes('/dashboard');

  if (isDashboard) {
    // Import and render dashboard (you'll need to create a separate Dashboard component)
    return <div className="text-white">Dashboard coming soon - use separate dashboard file</div>;
  }

  return <Portfolio data={data} />;
}