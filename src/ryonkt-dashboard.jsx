import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Eye, Music } from 'lucide-react';

export default function RyonktDashboard() {
  const [activeTab, setActiveTab] = useState('works');
  const [isEditing, setIsEditing] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Initial data
  const [works, setWorks] = useState([
    { id: 1, title: "VOID//ECHO", year: "2025", type: "Album", url: "" },
    { id: 2, title: "FRAGMENTED_SIGNALS", year: "2024", type: "EP", url: "" },
    { id: 3, title: "STATIC RITUALS", year: "2024", type: "Single", url: "" },
    { id: 4, title: "DISSONANCE::MEMORY", year: "2023", type: "Album", url: "" },
    { id: 5, title: "NULL FREQUENCY", year: "2023", type: "Live Recording", url: "" },
  ]);

  const [about, setAbout] = useState({
    description1: "RYONKT is an experimental sound artist exploring the intersection of noise, silence, and digital decay. Through unconventional synthesis methods and field recordings, each composition challenges traditional musical structures.",
    description2: "Based in the liminal spaces between frequencies, creating sonic landscapes that exist at the edge of perception.",
    techniques: "Granular Synthesis / Field Recording / Generative Algorithms / Analog Manipulation",
    influences: "Musique Concrète / Glitch / Dark Ambient / Noise / Industrial",
    tools: "Modular Synthesis / Max/MSP / Custom Software / Tape Manipulation"
  });

  const [contact, setContact] = useState({
    email: "contact@ryonkt.com",
    bandcamp: "ryonkt.bandcamp.com",
    soundcloud: "soundcloud.com/ryonkt",
    instagram: "@ryonkt_official"
  });

  const [editForm, setEditForm] = useState({});

  // Works Management
  const addWork = () => {
    const newWork = {
      id: Date.now(),
      title: "NEW WORK",
      year: new Date().getFullYear().toString(),
      type: "Album",
      url: ""
    };
    setWorks([newWork, ...works]);
    setIsEditing(newWork.id);
    setEditForm(newWork);
  };

  const deleteWork = (id) => {
    if (window.confirm('Are you sure you want to delete this work?')) {
      setWorks(works.filter(w => w.id !== id));
    }
  };

  const startEdit = (item, type) => {
    setIsEditing(item.id || type);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (typeof isEditing === 'number') {
      setWorks(works.map(w => w.id === isEditing ? editForm : w));
    }
    setIsEditing(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-white border-opacity-20 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-widest mb-2">RYONKT // DASHBOARD</h1>
            <p className="text-sm text-gray-500">Content Management System</p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all"
          >
            <Eye size={20} />
            {showPreview ? 'HIDE PREVIEW' : 'SHOW PREVIEW'}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white border-opacity-20 min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('works')}
              className={`w-full text-left px-4 py-3 transition-all ${
                activeTab === 'works' 
                  ? 'bg-white text-black' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Music size={16} className="inline mr-2" />
              WORKS
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-3 transition-all ${
                activeTab === 'about' 
                  ? 'bg-white text-black' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full text-left px-4 py-3 transition-all ${
                activeTab === 'contact' 
                  ? 'bg-white text-black' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              CONTACT
            </button>
          </nav>

          <div className="mt-8 p-4 border border-white border-opacity-20">
            <div className="text-xs text-gray-500 mb-2">QUICK TIPS</div>
            <ul className="text-xs space-y-2 text-gray-400">
              <li>• Click Edit to modify content</li>
              <li>• Use Save to confirm changes</li>
              <li>• Preview to see live site</li>
              <li>• All changes save instantly</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* WORKS TAB */}
          {activeTab === 'works' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight">MANAGE WORKS</h2>
                <button
                  onClick={addWork}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all"
                >
                  <Plus size={20} />
                  ADD NEW WORK
                </button>
              </div>

              <div className="space-y-4">
                {works.map((work) => (
                  <div
                    key={work.id}
                    className="border border-white border-opacity-20 p-6"
                  >
                    {isEditing === work.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">TITLE</label>
                            <input
                              type="text"
                              value={editForm.title || ''}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                              className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">YEAR</label>
                            <input
                              type="text"
                              value={editForm.year || ''}
                              onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                              className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">TYPE</label>
                            <select
                              value={editForm.type || 'Album'}
                              onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                              className="w-full bg-black border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                            >
                              <option>Album</option>
                              <option>EP</option>
                              <option>Single</option>
                              <option>Live Recording</option>
                              <option>Compilation</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">URL (OPTIONAL)</label>
                            <input
                              type="text"
                              value={editForm.url || ''}
                              onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                              placeholder="https://..."
                              className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-gray-200"
                          >
                            <Save size={16} />
                            SAVE
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center gap-2 px-6 py-2 border border-white hover:bg-white hover:text-black"
                          >
                            <X size={16} />
                            CANCEL
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold mb-2">{work.title}</div>
                          <div className="text-sm text-gray-500">{work.type} // {work.year}</div>
                          {work.url && (
                            <div className="text-xs text-gray-600 mt-1">{work.url}</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(work, 'work')}
                            className="p-3 border border-white border-opacity-20 hover:bg-white hover:text-black transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteWork(work.id)}
                            className="p-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight">MANAGE ABOUT</h2>
                {isEditing !== 'about' && (
                  <button
                    onClick={() => startEdit(about, 'about')}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all"
                  >
                    <Edit2 size={20} />
                    EDIT ABOUT
                  </button>
                )}
              </div>

              {isEditing === 'about' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">DESCRIPTION - PARAGRAPH 1</label>
                    <textarea
                      value={editForm.description1 || ''}
                      onChange={(e) => setEditForm({ ...editForm, description1: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-3 focus:outline-none focus:border-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">DESCRIPTION - PARAGRAPH 2</label>
                    <textarea
                      value={editForm.description2 || ''}
                      onChange={(e) => setEditForm({ ...editForm, description2: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-3 focus:outline-none focus:border-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">TECHNIQUES</label>
                    <input
                      type="text"
                      value={editForm.techniques || ''}
                      onChange={(e) => setEditForm({ ...editForm, techniques: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">INFLUENCES</label>
                    <input
                      type="text"
                      value={editForm.influences || ''}
                      onChange={(e) => setEditForm({ ...editForm, influences: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">TOOLS</label>
                    <input
                      type="text"
                      value={editForm.tools || ''}
                      onChange={(e) => setEditForm({ ...editForm, tools: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAbout(editForm);
                        setIsEditing(null);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200"
                    >
                      <Save size={20} />
                      SAVE CHANGES
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-6 py-3 border border-white hover:bg-white hover:text-black"
                    >
                      <X size={20} />
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-white border-opacity-20 p-8 space-y-6">
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">DESCRIPTION</h3>
                    <p className="text-lg mb-4">{about.description1}</p>
                    <p className="text-lg">{about.description2}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">TECHNIQUES</h3>
                      <p className="text-sm">{about.techniques}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">INFLUENCES</h3>
                      <p className="text-sm">{about.influences}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">TOOLS</h3>
                      <p className="text-sm">{about.tools}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight">MANAGE CONTACT</h2>
                {isEditing !== 'contact' && (
                  <button
                    onClick={() => startEdit(contact, 'contact')}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all"
                  >
                    <Edit2 size={20} />
                    EDIT CONTACT
                  </button>
                )}
              </div>

              {isEditing === 'contact' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">BANDCAMP</label>
                    <input
                      type="text"
                      value={editForm.bandcamp || ''}
                      onChange={(e) => setEditForm({ ...editForm, bandcamp: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">SOUNDCLOUD</label>
                    <input
                      type="text"
                      value={editForm.soundcloud || ''}
                      onChange={(e) => setEditForm({ ...editForm, soundcloud: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">INSTAGRAM</label>
                    <input
                      type="text"
                      value={editForm.instagram || ''}
                      onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                      className="w-full bg-transparent border border-white border-opacity-20 px-4 py-2 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setContact(editForm);
                        setIsEditing(null);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200"
                    >
                      <Save size={20} />
                      SAVE CHANGES
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-6 py-3 border border-white hover:bg-white hover:text-black"
                    >
                      <X size={20} />
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-white border-opacity-20 p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">EMAIL</h3>
                      <p className="text-lg">{contact.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">BANDCAMP</h3>
                      <p className="text-lg">{contact.bandcamp}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">SOUNDCLOUD</h3>
                      <p className="text-lg">{contact.soundcloud}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">INSTAGRAM</h3>
                      <p className="text-lg">{contact.instagram}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white border-opacity-20 bg-black p-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>ALL CHANGES SAVED</span>
          </div>
          <div className="text-gray-500">
            RYONKT CMS v1.0 // {new Date().toLocaleDateString()}
          </div>
        </div>
      </footer>
    </div>
  );
}