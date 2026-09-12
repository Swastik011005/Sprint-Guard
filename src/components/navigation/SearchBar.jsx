import { useMemo, useRef, useState, useEffect } from 'react';
import { Search, AlertCircle, User } from 'lucide-react';
import { teamMembers } from '../../data/mockUsers.js';
import { useBlockers } from '../../context/BlockerContext.jsx';
import './SearchBar.css';

// Searches the current sprint's blockers (by id, title, and source) plus
// the mock team directory (by name, doubling as a "reporter" search since
// every blocker's reportedBy/assignedTo comes from this same list).
// Selecting a blocker result opens its detail view via BlockerContext.
function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const rootRef = useRef(null);
  const { blockers, openBlockerDetail } = useBlockers();

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
      blockers: blockers.filter(
        (blocker) =>
          blocker.title.toLowerCase().includes(term) ||
          blocker.id.toLowerCase().includes(term) ||
          blocker.source.toLowerCase().includes(term) ||
          blocker.reportedBy.toLowerCase().includes(term)
      ),
      members: teamMembers.filter((member) => member.name.toLowerCase().includes(term)),
    };
  }, [query, blockers]);

  const hasQuery = query.trim().length > 0;
  const hasResults = results.blockers.length > 0 || results.members.length > 0;

  function handleBlockerClick(blockerId) {
    openBlockerDetail(blockerId);
    setQuery('');
    setFocused(false);
  }

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
            <button
              type="button"
              className="search-bar__result"
              key={blocker.id}
              onClick={() => handleBlockerClick(blocker.id)}
            >
              <AlertCircle size={15} />
              <div>
                <div className="search-bar__result-title">{blocker.title}</div>
                <div className="search-bar__result-meta">
                  {blocker.id} · {blocker.source}
                </div>
              </div>
            </button>
          ))}

          {results.members.map((member) => (
            <div className="search-bar__result search-bar__result--static" key={member.id}>
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
