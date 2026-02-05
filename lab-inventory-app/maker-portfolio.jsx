import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, GitFork, Clock, ExternalLink, Github, Terminal, Wrench, ChevronDown, X, FileText, Code, Package, Copy, Check } from 'lucide-react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configuration - Change this to your GitHub username
const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME';
const REPOS_TO_SHOW = 20; // Max repos to fetch

// Configure marked.js with syntax highlighting
const configureMarked = () => {
  const renderer = new marked.Renderer();

  // Custom code block renderer with syntax highlighting
  renderer.code = (code, language) => {
    const validLang = language && hljs.getLanguage(language) ? language : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLang, ignoreIllegals: true }).value;
    return `
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">${language || 'code'}</span>
        </div>
        <pre><code class="hljs language-${validLang}">${highlighted}</code></pre>
      </div>
    `;
  };

  // Links open in new tab
  renderer.link = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:text-amber-300 underline">${text}</a>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
    headerIds: true,
    mangle: false,
  });
};

configureMarked();

// Markdown renderer using marked.js
const renderMarkdown = (text) => {
  if (!text) return '';
  try {
    return marked.parse(text);
  } catch (e) {
    console.error('Markdown parsing error:', e);
    return `<pre>${text}</pre>`;
  }
};

// Language colors
const languageColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

// Project Card Component
const ProjectCard = ({ repo, onClick }) => {
  const langColor = languageColors[repo.language] || '#6b7280';
  const updatedAt = new Date(repo.updated_at);
  const timeAgo = getTimeAgo(updatedAt);

  return (
    <div
      onClick={onClick}
      className="group relative bg-zinc-900 border border-zinc-700 rounded-lg p-5 cursor-pointer
                 hover:border-amber-500/50 hover:bg-zinc-800/80 transition-all duration-300
                 hover:shadow-lg hover:shadow-amber-500/10"
    >
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-zinc-500 font-mono text-xs ml-2">~/projects/{repo.name}</span>
      </div>

      {/* Project name */}
      <h3 className="text-xl font-mono font-bold text-zinc-100 group-hover:text-amber-400 transition-colors mb-2">
        {repo.name}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {repo.description || 'No description provided'}
      </p>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: langColor }}></span>
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-500" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={14} />
          <span>{repo.forks_count}</span>
        </div>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-1 text-xs text-zinc-600 mt-3">
        <Clock size={12} />
        <span>Updated {timeAgo}</span>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-lg"></div>
    </div>
  );
};

// Project Detail Modal
const ProjectModal = ({ repo, readme, onClose, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
           onClick={e => e.stopPropagation()}>
        {/* Modal header */}
        <div className="bg-zinc-800 border-b border-zinc-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={onClose}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="font-mono text-zinc-400 text-sm">README.md — {repo.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors text-sm">
              <Github size={16} />
              <span className="hidden sm:inline">View on GitHub</span>
              <ExternalLink size={14} />
            </a>
            <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Project stats */}
        <div className="bg-zinc-800/50 border-b border-zinc-700 p-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Star className="text-amber-500" size={18} />
            <span className="text-zinc-300">{repo.stargazers_count} stars</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="text-zinc-500" size={18} />
            <span className="text-zinc-300">{repo.forks_count} forks</span>
          </div>
          {repo.language && (
            <div className="flex items-center gap-2">
              <Code className="text-green-400" size={18} />
              <span className="text-zinc-300">{repo.language}</span>
            </div>
          )}
          {repo.license && (
            <div className="flex items-center gap-2">
              <FileText className="text-zinc-500" size={18} />
              <span className="text-zinc-300">{repo.license.name}</span>
            </div>
          )}
        </div>

        {/* README content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
              <span className="ml-3 text-zinc-400 font-mono">Loading README...</span>
            </div>
          ) : readme ? (
            <div
              className="prose prose-invert max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(readme) }}
            />
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-mono">No README found for this project</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

// Main App Component
export default function MakerPortfolio() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [readme, setReadme] = useState('');
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [username, setUsername] = useState(GITHUB_USERNAME);
  const [inputUsername, setInputUsername] = useState(GITHUB_USERNAME);

  // Fetch repos
  useEffect(() => {
    if (username === 'YOUR_GITHUB_USERNAME') return;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${REPOS_TO_SHOW}&sort=updated`
        );
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data.filter(repo => !repo.fork)); // Exclude forks
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  // Fetch README when repo is selected
  useEffect(() => {
    if (!selectedRepo) return;

    const fetchReadme = async () => {
      setReadmeLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${selectedRepo.name}/readme`
        );
        if (response.ok) {
          const data = await response.json();
          const content = atob(data.content);
          setReadme(content);
        } else {
          setReadme('');
        }
      } catch {
        setReadme('');
      } finally {
        setReadmeLoading(false);
      }
    };
    fetchReadme();
  }, [selectedRepo, username]);

  // Get unique languages
  const languages = useMemo(() => {
    const langs = [...new Set(repos.map(r => r.language).filter(Boolean))];
    return ['all', ...langs.sort()];
  }, [repos]);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let filtered = repos;

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(r => r.language === selectedLanguage);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars': return b.stargazers_count - a.stargazers_count;
        case 'name': return a.name.localeCompare(b.name);
        case 'updated':
        default: return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });
  }, [repos, searchTerm, selectedLanguage, sortBy]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setUsername(inputUsername);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px' }}></div>

      {/* Header */}
      <header className="relative border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <Wrench className="text-amber-500" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-mono font-bold text-zinc-100">
                  <span className="text-amber-500">$</span> maker_portfolio
                </h1>
                <p className="text-zinc-500 text-sm font-mono">
                  <span className="text-green-400">→</span> Projects by {username !== 'YOUR_GITHUB_USERNAME' ? username : '...'}
                </p>
              </div>
            </div>

            {/* Username form */}
            {username === 'YOUR_GITHUB_USERNAME' && (
              <form onSubmit={handleUsernameSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Enter GitHub username"
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 font-mono text-sm
                           focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                />
                <button type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-mono font-bold px-4 py-2 rounded-lg transition-colors">
                  Load
                </button>
              </form>
            )}

            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors">
              <Github size={20} />
              <span className="font-mono text-sm">@{username}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm
                         placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              />
            </div>

            {/* Language filter */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 pr-10 font-mono text-sm
                         focus:border-amber-500 focus:outline-none cursor-pointer min-w-[140px]"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 pr-10 font-mono text-sm
                         focus:border-amber-500 focus:outline-none cursor-pointer min-w-[140px]"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Alphabetical</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {username === 'YOUR_GITHUB_USERNAME' ? (
          <div className="text-center py-20">
            <Terminal size={64} className="mx-auto mb-6 text-amber-500/50" />
            <h2 className="text-2xl font-mono text-zinc-300 mb-4">Welcome to your Maker Portfolio</h2>
            <p className="text-zinc-500 mb-6">Enter your GitHub username above to load your projects</p>
            <div className="font-mono text-sm text-zinc-600 bg-zinc-900 border border-zinc-800 rounded-lg p-4 max-w-md mx-auto">
              <span className="text-green-400">$</span> const username = <span className="text-amber-400">"your-username"</span>;
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-500 mb-4"></div>
            <p className="font-mono text-zinc-400">Fetching projects from GitHub...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 font-mono">{error}</p>
              <p className="text-zinc-500 text-sm mt-2">Make sure the username is correct and has public repositories.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Project count */}
            <div className="mb-6 font-mono text-sm text-zinc-500">
              <span className="text-green-400">→</span> Found <span className="text-amber-400">{filteredRepos.length}</span> projects
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </div>

            {/* Projects grid */}
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map(repo => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Package size={48} className="mx-auto mb-4 text-zinc-600" />
                <p className="font-mono text-zinc-500">No projects match your filters</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-mono text-sm text-zinc-600">
            <span className="text-amber-500/50">/*</span> Built with React • Powered by GitHub API <span className="text-amber-500/50">*/</span>
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedRepo && (
        <ProjectModal
          repo={selectedRepo}
          readme={readme}
          loading={readmeLoading}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}
