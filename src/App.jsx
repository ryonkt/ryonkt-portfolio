import React, { useState, useEffect } from 'react';
import { Volume2, Mail, ExternalLink } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${noise}' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Cursor trail - hidden on mobile */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-40 transition-all duration-1000 ease-out hidden md:block"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-between items-center border-b border-white border-opacity-20 bg-black bg-opacity-95">
        <div className={`text-lg md:text-2xl tracking-widest ${glitchActive ? 'animate-pulse' : ''}`}>
          <span className="relative inline-block">
            ryonkt
            {glitchActive && (
              <>
                <span className="absolute top-0 left-0 text-red-500 hidden md:inline" style={{ transform: 'translate(-2px, -2px)' }}>ryonkt</span>
                <span className="absolute top-0 left-0 text-blue-500 hidden md:inline" style={{ transform: 'translate(2px, 2px)' }}>ryonkt</span>
              </>
            )}
          </span>
        </div>
        <div className="flex gap-3 md:gap-8 text-xs md:text-base">
          {['about', 'works', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item.toLowerCase())}
              className="hover:bg-white hover:text-black px-2 md:px-4 py-1 md:py-2 transition-all duration-300 border border-transparent hover:border-white"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pt-24">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center relative px-4">
            <div className="text-center max-w-full">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4 md:mb-8 tracking-tight break-words">
                <span className="relative inline-block">
                  ryonkt
                  {glitchActive && (
                    <>
                      <span className="absolute top-0 left-0 text-white opacity-50 hidden md:inline" style={{ transform: 'translate(-4px, -4px)', clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}>ryonkt</span>
                      <span className="absolute top-0 left-0 text-white opacity-50 hidden md:inline" style={{ transform: 'translate(4px, 4px)', clipPath: 'polygon(0 70%, 100% 70%, 100% 100%, 0 100%)' }}>ryonkt</span>
                    </>
                  )}
                </span>
              </h1>
              <div className="text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] mb-4 text-gray-400">
                ambient // drone // artist
              </div>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                <Volume2 size={16} />
                <span className="animate-pulse">immersive soundscapes & meditative sonic environments</span>
              </div>
            </div>

            {/* Animated lines - reduced on mobile */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white opacity-5 hidden md:block"
                  style={{
                    left: `${i * 10}%`,
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
          <section className="min-h-screen flex items-center justify-center p-4 md:p-12">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight border-b border-white pb-4">about</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-300">{data.about.description1}</p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-300">{data.about.description2}</p>
                </div>
                <div className="space-y-4">
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">techniques</div>
                    <div className="text-xs md:text-sm">{data.about.techniques}</div>
                  </div>
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">influences</div>
                    <div className="text-xs md:text-sm">{data.about.influences}</div>
                  </div>
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">tools</div>
                    <div className="text-xs md:text-sm">{data.about.tools}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Works Section */}
        {activeSection === 'works' && (
          <section className="min-h-screen flex items-center justify-center p-4 md:p-12">
            <div className="max-w-6xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight border-b border-white pb-4">works</h2>
              <div className="space-y-1">
                {data.works.map((work, index) => (
                  <div
                    key={work.id}
                    className="border border-white border-opacity-20 p-4 md:p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex-1">
                        <div className="text-lg md:text-2xl font-bold tracking-tight mb-2 break-words lowercase">{work.title}</div>
                        <div className="text-xs md:text-sm text-gray-500 group-hover:text-gray-700 lowercase">
                          {work.type} // {work.year}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <button className="p-2 border border-current hover:scale-110 transition-transform">
                          <Volume2 size={18} className="md:w-5 md:h-5" />
                        </button>
                        {work.url && (
                          <a href={work.url} target="_blank" rel="noopener noreferrer" className="p-2 border border-current hover:scale-110 transition-transform">
                            <ExternalLink size={18} className="md:w-5 md:h-5" />
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
          <section className="min-h-screen flex items-center justify-center p-4 md:p-12">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight border-b border-white pb-4">contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <p className="text-base md:text-lg leading-relaxed mb-6 md:mb-8 text-gray-300">
                    available for collaborations, commissions, and sound design projects. 
                    creating immersive soundscapes and meditative sonic environments.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-base md:text-lg break-all">
                      <Mail size={18} className="flex-shrink-0 md:w-5 md:h-5" />
                      <span>{data.contact.email}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <a href={`https://${data.contact.bandcamp}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-3 md:p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">bandcamp</div>
                    <div className="text-sm md:text-base break-all">{data.contact.bandcamp}</div>
                  </a>
                  <a href={`https://${data.contact.soundcloud}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-3 md:p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">soundcloud</div>
                    <div className="text-sm md:text-base break-all">{data.contact.soundcloud}</div>
                  </a>
                  <a href="https://www.discogs.com/artist/951514-Ryonkt" target="_blank" rel="noopener noreferrer" className="block border border-white p-3 md:p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">discogs</div>
                    <div className="text-sm md:text-base break-all">discogs.com/artist/951514-ryonkt</div>
                  </a>
                  <a href={`https://instagram.com/${data.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block border border-white p-3 md:p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">instagram</div>
                    <div className="text-sm md:text-base">{data.contact.instagram}</div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 md:p-6 border-t border-white border-opacity-20 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2 bg-black bg-opacity-95">
        <div>© 2025 ryonkt // all rights reserved</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>system active</span>
        </div>
      </footer>
    </div>
  );
}

// Main App Component with Real Discography Data
export default function App() {
  const [data, setData] = useState({
    works: [
      { 
        id: 1, 
        title: "breathing", 
        year: "2013", 
        type: "album (with offthesky)", 
        url: "https://www.discogs.com/master/1060402-Ryonkt-offthesky-Breathing" 
      },
      { 
        id: 2, 
        title: "four fragments", 
        year: "2009", 
        type: "album", 
        url: "https://www.discogs.com/release/1614000-Ryonkt-Four-Fragments" 
      },
      { 
        id: 3, 
        title: "small conversations", 
        year: "2009", 
        type: "album", 
        url: "https://www.discogs.com/release/2039558-Ryonkt-Small-Conversations" 
      },
      { 
        id: 4, 
        title: "the world that was surrounded by a deep forest and warm light", 
        year: "2008", 
        type: "album", 
        url: "https://www.discogs.com/release/1290856-Ryonkt-The-World-That-Was-Surrounded-By-A-Deep-Forest-And-Warm-Light" 
      },
      { 
        id: 5, 
        title: "past memory and image", 
        year: "2008", 
        type: "ep", 
        url: "https://ryonkt.bandcamp.com/" 
      },
      { 
        id: 6, 
        title: "sunlight & water", 
        year: "2007", 
        type: "ep", 
        url: "https://ryonkt.bandcamp.com/" 
      },
    ],
    about: {
      description1: "I'm Ryo Nakata, born in 1984 and based in Tokyo, Japan. I create ambient and drone music under the name ryonkt. Using guitar and laptop, I craft immersive soundscapes that explore the delicate balance between sound and silence.",
      description2: "My approach focuses on minimal phrases and spatial expressions, translating everyday scenery and emotions into sonic landscapes. I seek to create meditative environments that invite deep listening, where each sound exists in dialogue with the space around it. Through collaboration with other artists, I continue to explore new territories in ambient music.",
      techniques: "guitar / laptop production / minimal phrases / spatial expression / field recording / delay layers",
      influences: "ambient / drone / minimal folk / atmospheric / experimental",
      tools: "guitar / notebook pc / audio editing software / delay effects / reverb processing"
    },
    contact: {
      email: "contact@ryonkt.org",
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

  return <Portfolio data={data} />;
}
