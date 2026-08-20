'use client'
import { useState, KeyboardEvent, useEffect, useRef } from "react"
import Link from "next/link"

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  async function getMovies(query: string) {
    if (!query.trim()) return
    setLoading(true)
    setError("")
    setSearched(true)
    try {
      const res = await fetch(`/api/movies?search=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setMovies(data.Search ?? [])
    } catch {
      setError("Something went wrong. Please try again.")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleChange(value: string) {
    setSearch(value)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (!value.trim()) {
      setMovies([])
      setSearched(false)
      return
    }

    timeoutRef.current = setTimeout(() => {
      getMovies(value)
    }, 500)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      getMovies(search)
    }
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Hero ── */}
      <div className="animate-fade-in-up" style={{ textAlign: "center", padding: "80px 24px 52px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.25)",
          borderRadius: "100px", padding: "6px 16px", marginBottom: "28px",
          color: "#f5c518", fontSize: "13px", fontWeight: 500,
        }}>
          🎬 Powered by OMDB
        </div>

        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 800,
          background: "linear-gradient(135deg, #fff 0%, #f5c518 55%, #e8a50a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-0.02em",
        }}>
          CineSearch
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "460px", margin: "0 auto 44px", lineHeight: 1.6 }}>
          Discover millions of movies, TV shows, episodes and more.
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", maxWidth: "620px", margin: "0 auto", gap: "12px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{
              position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
              color: "#64748b", fontSize: "17px", pointerEvents: "none",
            }}>🔍</span>
            <input
              id="search-input"
              type="text"
              placeholder="Search movies, TV shows…"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%", padding: "16px 16px 16px 46px",
                background: "rgba(255,255,255,0.055)", border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: "14px", color: "#fff", fontSize: "15px", outline: "none",
                boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(245,197,24,0.55)"
                e.target.style.boxShadow = "0 0 0 3px rgba(245,197,24,0.1)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
          <button
            id="search-btn"
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              getMovies(search)
            }}
            style={{
              padding: "16px 28px",
              background: "linear-gradient(135deg, #f5c518, #d4a017)",
              color: "#0a0f1e", fontWeight: 700, fontSize: "15px",
              border: "none", borderRadius: "14px", cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s", whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,197,24,0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "22px" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ borderRadius: "12px", overflow: "hidden" }}>
                <div className="skeleton" style={{ height: "260px" }} />
                <div style={{ padding: "10px 0" }}>
                  <div className="skeleton" style={{ height: "13px", marginBottom: "7px" }} />
                  <div className="skeleton" style={{ height: "11px", width: "55%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>⚠️</div>
            <p style={{ color: "#f87171", fontSize: "1.05rem" }}>{error}</p>
          </div>
        )}

        {/* Results header */}
        {!loading && movies.length > 0 && (
          <div className="animate-fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
              Results for <span style={{ color: "#f5c518", fontWeight: 600 }}>"{search}"</span>
            </p>
            <span style={{ color: "#475569", fontSize: "0.8rem" }}>{movies.length} found</span>
          </div>
        )}

        {/* Movie grid */}
        {!loading && movies.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "22px" }}>
            {movies.map((movie, i) => (
              <MovieCard key={movie.imdbID} movie={movie} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && movies.length === 0 && searched && (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "100px 24px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎭</div>
            <h3 style={{ color: "#94a3b8", fontSize: "1.25rem", margin: "0 0 8px", fontWeight: 600 }}>No results found</h3>
            <p style={{ color: "#475569", margin: 0 }}>Try a different search term</p>
          </div>
        )}

        {/* Initial prompt */}
        {!searched && !loading && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <p style={{ color: "#1e293b", fontSize: "0.95rem", margin: 0 }}>Search for a movie or TV show to get started</p>
          </div>
        )}
      </div>
    </main>
  )
}

/* ── Movie Card ───────────────────────────────────────────── */
function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A"

  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      style={{ textDecoration: "none", display: "block", animationDelay: `${index * 0.04}s` }}
      className="animate-scale-in"
    >
      <div
        style={{
          background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px", overflow: "hidden",
          transition: "transform 0.22s ease, border-color 0.22s, box-shadow 0.22s",
          cursor: "pointer", height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)"
          e.currentTarget.style.borderColor = "rgba(245,197,24,0.45)"
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,197,24,0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        {/* Poster */}
        <div style={{ position: "relative", aspectRatio: "2/3", background: "#0d1429", overflow: "hidden" }}>
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none" }}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "42px", color: "#1e293b" }}>
              🎬
            </div>
          )}
          {/* Type badge */}
          <span style={{
            position: "absolute", top: "10px", right: "10px",
            background: "rgba(10,15,30,0.8)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
            padding: "3px 9px", fontSize: "10px", fontWeight: 600, color: "#94a3b8",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            {movie.Type}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: "13px 13px 14px" }}>
          <h2 style={{
            color: "#f1f5f9", fontSize: "13.5px", fontWeight: 600, margin: "0 0 5px",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {movie.Title}
          </h2>
          <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{movie.Year}</p>
        </div>
      </div>
    </Link>
  )
}