import { useMemo, useRef, useState, useEffect } from 'react';
import { Search, AlertCircle, User } from 'lucide-react';
import { recentBlockers } from '../../data/dashboardData.js';
import { teamMembers } from '../../data/mockUsers.js';
import './SearchBar.css';

// Very small client-side search across the mock blockers + team member data.
// Intentionally simple: this is a foundation, real search will come later.
function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return { blockers: [], members: [] };

    return {
      blockers: recentBlockers.filter((blocker) =>
        blocker.title.toLowerCase().includes(term)
      ),
      members: teamMembers.filter((member) =>
        member.name.toLowerCase().includes(term)
      ),
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.blockers.length > 0 || results.members.length > 0;

  return (
    <div className="search-bar" ref={rootRef}>
      <Search size={18} className="search-bar__icon" />
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search blockers, tasks or team members..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
      />

      {focused && hasQuery && (
        <div className="search-bar__results">
          {!hasResults && <div className="search-bar__empty">No matches found</div>}

          {results.blockers.map((blocker) => (
            <div className="search-bar__result" key={blocker.id}>
              <AlertCircle size={15} />
              <div>
                <div className="search-bar__result-title">{blocker.title}</div>
                <div className="search-bar__result-meta">
                  {blocker.id} · {blocker.source}
                </div>
              </div>
            </div>
          ))}

          {results.members.map((member) => (
            <div className="search-bar__result" key={member.id}>
              <User size={15} />
              <div>
                <div className="search-bar__result-title">{member.name}</div>
                <div className="search-bar__result-meta">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
