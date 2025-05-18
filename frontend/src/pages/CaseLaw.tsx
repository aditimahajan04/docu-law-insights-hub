import { useState } from 'react';
import { api } from '@/lib/api';

interface Case {
  id: string;
  title: string;
  citation: string;
  summary: string;
  date: string;
}

const CaseLaw = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.get<{ data: Case[] }>('/case-law/search', {
        params: { query: searchQuery },
      });
      setCases(response.data.data);
    } catch (err) {
      setError('Failed to search case law');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Case Law Search</h1>
        <p className="text-muted-foreground">
          Search for relevant case law and legal precedents.
        </p>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="search"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Search Query
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter search terms..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
      )}

      {cases.length > 0 && (
        <div className="space-y-4">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold">{case_.title}</h3>
                <p className="text-sm text-muted-foreground">{case_.citation}</p>
                <p className="mt-2">{case_.summary}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Date: {new Date(case_.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && searchQuery && cases.length === 0 && (
        <div className="text-center text-muted-foreground">
          No cases found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default CaseLaw;
