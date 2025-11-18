import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown } from 'lucide-react';

// Main Portfolio Component
function Portfolio({ data }) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [noise, setNoise] = useState(0);
  const [expandedYear, setExpandedYear] = useState(null);

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
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
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
        <button 
          onClick={() => setActiveSection('home')}
          className={`text-lg md:text-2xl tracking-widest hover:opacity-80 transition-opacity ${glitchActive ? 'animate-pulse' : ''}`}
        >
          <span className="relative inline-block">
            ryonkt
            {glitchActive && (
              <>
                <span className="absolute top-0 left-0 text-red-500 hidden md:inline" style={{ transform: 'translate(-2px, -2px)' }}>ryonkt</span>
                <span className="absolute top-0 left-0 text-blue-500 hidden md:inline" style={{ transform: 'translate(2px, 2px)' }}>ryonkt</span>
              </>
            )}
          </span>
        </button>
        <div className="flex gap-2 md:gap-6 text-xs md:text-base">
          {['about', 'biography', 'works', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className="hover:bg-white hover:text-black px-2 md:px-3 py-1 md:py-2 transition-all duration-300 border border-transparent hover:border-white"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pt-24 min-h-screen">
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
                ambient // drone // minimal folk
              </div>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
                <span className="animate-pulse">exploring the delicate balance between sound and silence</span>
              </div>
            </div>

            {/* Animated lines */}
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
                  <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-300">
                    i'm ryo nakata, born in 1984 in sapporo, japan. i create ambient and drone music under the name ryonkt. using guitar and digital processing, i craft immersive soundscapes that explore the delicate balance between sound and silence.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-300">
                    my approach focuses on minimal phrases and spatial expressions, translating everyday scenery and natural phenomena into sonic landscapes. from intimate guitar-based compositions to dense digital drones and organic analog recordings, i seek to create meditative environments that invite deep listening.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">approach</div>
                    <div className="text-xs md:text-sm">guitar processing / field recording / digital manipulation / analog tape / spatial composition</div>
                  </div>
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">influences</div>
                    <div className="text-xs md:text-sm">ambient / drone / minimal folk / atmospheric / organic soundscapes</div>
                  </div>
                  <div className="border border-white p-3 md:p-4">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">tools</div>
                    <div className="text-xs md:text-sm">guitar / ableton live / field recorders / cassette recorders / reel-to-reel tape</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Biography Section */}
        {activeSection === 'biography' && (
          <section className="min-h-screen flex items-start justify-center p-4 md:p-12 py-24">
            <div className="max-w-5xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight border-b border-white pb-4">biography</h2>
              
              <div className="space-y-8 md:space-y-12">
                {/* Era 1 */}
                <div className="border-l-2 border-white border-opacity-20 pl-6 md:pl-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-300">2007-2008 // netlabel era</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3">
                    emerged during the golden age of netlabel culture, releasing works through prominent platforms including noise-joy, dog eared records, resting bell, and audiotalaia. characterized by intimate guitar-based compositions and pastoral minimal folk influenced by natural phenomena and landscapes.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    key works include 'the world that was surrounded by a deep forest and warm light' (resting bell, 2008), which established the foundation of my sound, and 'gray sky' (2008), marking a dramatic shift toward dense, continuous ambient drone.
                  </p>
                </div>

                {/* Era 2 */}
                <div className="border-l-2 border-white border-opacity-20 pl-6 md:pl-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-300">2009-2010 // physical media transition</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3">
                    transitioned from digital-only releases to physical formats through respected labels including experimedia, students of decay, and smallfish. this period saw the development of more constructed, refined compositions while maintaining the exploration of transparency and flow.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    released 'small conversations' (experimedia, 2009) as a limited 150-copy pressing and contributed to important compilations, solidifying international recognition.
                  </p>
                </div>

                {/* Era 3 */}
                <div className="border-l-2 border-white border-opacity-20 pl-6 md:pl-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-300">2011-2012 // methodological innovation</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3">
                    contributed 'return' to the landmark compilation 'air texture vol. 1' alongside oneohtrix point never, loscil, and biosphere—a recognition of my work as essential to defining atmospheric textures in contemporary electronic music.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    released 'troposphere' (twice removed, 2012), a pivotal work created entirely from processed guitar recordings without synthesizers. utilizing ableton live for extensive filtering and processing, this album showcased a sculptural approach to sound design, creating vast soundscapes from minimal source material.
                  </p>
                </div>

                {/* Era 4 */}
                <div className="border-l-2 border-white border-opacity-20 pl-6 md:pl-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-300">2013-present // analog return & collaboration</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3">
                    shifted focus toward collaboration and organic recording methods. formed rion with ian hawgood (home normal), deliberately eschewing computers in favor of cassette recorders, reel-to-reel tape, and acoustic instruments. 'fireflies' (hibernate recordings, 2013) combined drone guitar with field recordings and church organs, capturing the quiet magic of rural summers.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    collaborated with offthesky on 'breathing' (dronarivm, 2013), a dialogic two-disc work exploring mutual sonic spaces. these projects represent a full-circle return to organic warmth and physical materiality after intensive digital experimentation.
                  </p>
                </div>

                {/* Philosophy */}
                <div className="border-l-2 border-white pl-6 md:pl-8 mt-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">philosophy</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    my work embodies the broader trajectory of 2000s-2010s ambient music: from digital democratization through netlabels, to sculptural sound design via DAWs, and ultimately to renewed appreciation for analog warmth and physical media. each piece seeks not merely to provide atmosphere, but to invite listeners into meditative spaces where sound and silence exist in dialogue.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Works Section */}
        {activeSection === 'works' && (
          <section className="min-h-screen flex items-start justify-center p-4 md:p-12 py-24">
            <div className="max-w-6xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight border-b border-white pb-4">works</h2>
              
              {/* Works organized by year */}
              <div className="space-y-1">
                {Object.entries(data.worksByYear).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([year, works]) => (
                  <div key={year} className="border border-white border-opacity-20">
                    <button
                      onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                      className="w-full p-4 md:p-6 flex justify-between items-center hover:bg-white hover:bg-opacity-5 transition-all"
                    >
                      <div className="text-left">
                        <div className="text-xl md:text-2xl font-bold">{year}</div>
                        <div className="text-xs md:text-sm text-gray-500 mt-1">{works.length} release{works.length > 1 ? 's' : ''}</div>
                      </div>
                      <ChevronDown 
                        size={24} 
                        className={`transform transition-transform ${expandedYear === year ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {expandedYear === year && (
                      <div className="border-t border-white border-opacity-20">
                        {works.map((work, index) => (
                          <div
                            key={index}
                            className="p-4 md:p-6 border-b border-white border-opacity-10 last:border-b-0 hover:bg-white hover:bg-opacity-5 transition-all"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="text-lg md:text-xl font-semibold break-words">{work.title}</div>
                              <div className="text-xs md:text-sm text-gray-500">
                                {work.format} // {work.label}
                              </div>
                              {work.note && (
                                <div className="text-xs md:text-sm text-gray-600 italic">{work.note}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Collaborations & Compilations */}
              <div className="mt-12 pt-12 border-t border-white border-opacity-20">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">collaborations & compilations</h3>
                <div className="space-y-4">
                  {data.collaborations.map((work, index) => (
                    <div
                      key={index}
                      className="border border-white border-opacity-20 p-4 md:p-6 hover:bg-white hover:bg-opacity-5 transition-all"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="text-base md:text-lg font-semibold">{work.title}</div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {work.artist} // {work.year}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {work.format} // {work.label}
                        </div>
                        {work.note && (
                          <div className="text-xs md:text-sm text-gray-600 italic">{work.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
                    available for collaborations, commissions, and sound design projects. interested in exploring new territories in ambient and drone music.
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
      <footer className="p-3 md:p-6 border-t border-white border-opacity-20 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2 bg-black">
        <div>© 2025 ryonkt // all rights reserved</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>system active</span>
        </div>
      </footer>
    </div>
  );
}

// Main App Component with Comprehensive Discography
export default function App() {
  const [data] = useState({
    worksByYear: {
      '2013': [
        { 
          title: 'breathing', 
          format: 'album (2xcd)',
          label: 'dronarivm',
          note: 'collaboration with offthesky'
        },
        { 
          title: 'fireflies', 
          format: 'album (cd)',
          label: 'hibernate recordings',
          note: 'as rion with ian hawgood'
        },
      ],
      '2012': [
        { 
          title: 'troposphere', 
          format: 'album (digital)',
          label: 'twice removed',
          note: 'guitar-only source material processed in ableton live'
        },
      ],
      '2011': [
        { 
          title: 'north small town', 
          format: 'album (digital)',
          label: 'own label',
          note: ''
        },
      ],
      '2010': [
        { 
          title: 'window to the room', 
          format: 'album (cd)',
          label: 'under the spire',
          note: ''
        },
        { 
          title: 'past memory and image', 
          format: 'album (cd)',
          label: 'students of decay',
          note: 'includes tracks moon and blue lake'
        },
      ],
      '2009': [
        { 
          title: 'small conversations', 
          format: 'album (cd)',
          label: 'experimedia',
          note: 'limited to 150 copies'
        },
        { 
          title: 'four fragments', 
          format: 'album (cd-r)',
          label: 'smallfish',
          note: 'london label'
        },
        { 
          title: 'sunlight & water', 
          format: 'album (cd-r)',
          label: 'the land of',
          note: ''
        },
        { 
          title: 'periodic wind', 
          format: 'single track (digital)',
          label: 'audiotalaia',
          note: '27-minute drone piece'
        },
      ],
      '2008': [
        { 
          title: 'the world that was surrounded by a deep forest and warm light', 
          format: 'album (digital)',
          label: 'resting bell',
          note: 'minimal folk / ambient. includes tracks green world, kaze, trip'
        },
        { 
          title: 'gray sky', 
          format: 'single track (digital)',
          label: 'resting bell',
          note: '17-minute dense ambient drone'
        },
        { 
          title: 'transparence', 
          format: 'album (digital)',
          label: 'audiotalaia',
          note: ''
        },
        { 
          title: "today's weather is rainy", 
          format: 'album (digital)',
          label: 'dog eared records',
          note: ''
        },
        { 
          title: 'all the things which i see', 
          format: 'album (digital)',
          label: 'lunar flower',
          note: 'includes track night walk'
        },
      ],
      '2007': [
        { 
          title: 'sea', 
          format: 'album (digital)',
          label: 'noise-joy',
          note: 'early experimental work'
        },
        { 
          title: 'slow time', 
          format: 'album (digital)',
          label: 'dog eared records',
          note: ''
        },
      ],
    },
    collaborations: [
      {
        artist: 'ryonkt',
        title: 'return',
        year: '2011',
        format: 'compilation track',
        label: 'air texture vol. 1',
        note: '7:49 track. alongside oneohtrix point never, loscil, biosphere'
      },
      {
        artist: 'rion (ryonkt & ian hawgood)',
        title: 'fireflies',
        year: '2013',
        format: 'album (cd)',
        label: 'hibernate recordings',
        note: 'analog recording with cassette & reel-to-reel tape'
      },
      {
        artist: 'ryonkt & offthesky',
        title: 'breathing',
        year: '2013',
        format: 'album (2xcd)',
        label: 'dronarivm',
        note: 'collaborative dialogue between japan and usa'
      },
    ],
    contact: {
      email: 'contact@ryonkt.org',
      bandcamp: 'ryonkt.bandcamp.com',
      soundcloud: 'soundcloud.com/ryonkt',
      instagram: '@ryonkt_official'
    }
  });

  return <Portfolio data={data} />;
}
