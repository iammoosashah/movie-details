import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ id: string }>
}

type MovieDetail = {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    BoxOffice?: string
    Response: string
}

export default async function MovieDetails({ params }: Props) {
    const { id } = await params

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`,
        { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
        throw new Error("Failed to fetch movie details")
    }

    const movie: MovieDetail = await response.json()

    if (movie.Response === "False") {
        notFound()
    }

    const hasPoster = movie.Poster && movie.Poster !== "N/A"
    const rating = parseFloat(movie.imdbRating)
    const genres = movie.Genre?.split(", ") ?? []

    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* Back button */}
            <div style={{ padding: "28px 32px 0" }}>
                <Link href="/" className="back-btn">
                    ← Back to Search
                </Link>
            </div>

            {/* Main layout */}
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px 80px" }}>
                <div style={{ display: "flex", gap: "48px", alignItems: "flex-start", flexWrap: "wrap" }}>

                    {/* ── Poster column ── */}
                    <div style={{ flexShrink: 0, width: "clamp(220px, 28%, 300px)" }} className="animate-scale-in">
                        <div style={{
                            borderRadius: "16px", overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                        }}>
                            {hasPoster ? (
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    style={{ width: "100%", display: "block" }}
                                />
                            ) : (
                                <div style={{
                                    aspectRatio: "2/3", display: "flex", alignItems: "center",
                                    justifyContent: "center", background: "#0d1429", fontSize: "60px", color: "#1e293b",
                                }}>
                                    🎬
                                </div>
                            )}
                        </div>

                        {/* IMDb Rating card */}
                        {movie.imdbRating && movie.imdbRating !== "N/A" && (
                            <div style={{
                                marginTop: "16px", padding: "16px 20px",
                                background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.2)",
                                borderRadius: "14px", textAlign: "center",
                            }}>
                                <div style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                                    IMDb Rating
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    <span style={{ fontSize: "24px" }}>⭐</span>
                                    <span style={{ color: "#f5c518", fontSize: "28px", fontWeight: 800 }}>{movie.imdbRating}</span>
                                    <span style={{ color: "#475569", fontSize: "14px", alignSelf: "flex-end", paddingBottom: "4px" }}>/10</span>
                                </div>
                                {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                                    <p style={{ color: "#64748b", fontSize: "11px", margin: "6px 0 0" }}>{movie.imdbVotes} votes</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Info column ── */}
                    <div style={{ flex: 1, minWidth: "260px" }} className="animate-fade-in-up">

                        {/* Type + Rated badges */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                            <Badge text={movie.Type === "movie" ? "Movie" : movie.Type === "series" ? "TV Series" : movie.Type} gold />
                            {movie.Rated && movie.Rated !== "N/A" && <Badge text={movie.Rated} />}
                            {movie.Runtime && movie.Runtime !== "N/A" && <Badge text={movie.Runtime} />}
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800,
                            margin: "0 0 8px", lineHeight: 1.1, color: "#f8fafc",
                        }}>
                            {movie.Title}
                        </h1>

                        {/* Year + Country */}
                        <p style={{ color: "#64748b", fontSize: "15px", margin: "0 0 20px" }}>
                            {movie.Year}{movie.Country && movie.Country !== "N/A" ? ` · ${movie.Country}` : ""}
                        </p>

                        {/* Genre badges */}
                        {genres.length > 0 && (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                                {genres.map((g) => (
                                    <span key={g} style={{
                                        background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                                        color: "#a5b4fc", borderRadius: "8px", padding: "5px 12px",
                                        fontSize: "12px", fontWeight: 500,
                                    }}>
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Plot */}
                        {movie.Plot && movie.Plot !== "N/A" && (
                            <div style={{ marginBottom: "28px" }}>
                                <SectionLabel>Plot</SectionLabel>
                                <p style={{ color: "#cbd5e1", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>{movie.Plot}</p>
                            </div>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <InfoRow label="Director" value={movie.Director} />
                            <InfoRow label="Released" value={movie.Released} />
                            <InfoRow label="Language" value={movie.Language} />
                            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                                <InfoRow label="Box Office" value={movie.BoxOffice} />
                            )}
                        </div>

                        {/* Actors */}
                        {movie.Actors && movie.Actors !== "N/A" && (
                            <div style={{ marginTop: "20px" }}>
                                <SectionLabel>Cast</SectionLabel>
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {movie.Actors.split(", ").map((actor) => (
                                        <span key={actor} style={{
                                            background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.09)",
                                            borderRadius: "8px", padding: "5px 12px", fontSize: "13px", color: "#cbd5e1",
                                        }}>
                                            {actor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Awards */}
                        {movie.Awards && movie.Awards !== "N/A" && (
                            <div style={{
                                marginTop: "24px", padding: "14px 18px",
                                background: "rgba(245,197,24,0.06)", border: "1px solid rgba(245,197,24,0.15)",
                                borderRadius: "12px",
                            }}>
                                <span style={{ fontSize: "16px", marginRight: "8px" }}>🏆</span>
                                <span style={{ color: "#fde68a", fontSize: "13.5px" }}>{movie.Awards}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

/* ── Sub-components ── */

function Badge({ text, gold }: { text: string; gold?: boolean }) {
    return (
        <span style={{
            background: gold ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${gold ? "rgba(245,197,24,0.3)" : "rgba(255,255,255,0.1)"}`,
            color: gold ? "#f5c518" : "#94a3b8",
            borderRadius: "8px", padding: "4px 12px",
            fontSize: "12px", fontWeight: 600, textTransform: "capitalize" as const,
        }}>
            {text}
        </span>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p style={{ color: "#64748b", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
            {children}
        </p>
    )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
    if (!value || value === "N/A") return null
    return (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px 14px" }}>
            <p style={{ color: "#64748b", fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 4px" }}>{label}</p>
            <p style={{ color: "#e2e8f0", fontSize: "13.5px", margin: 0, fontWeight: 500 }}>{value}</p>
        </div>
    )
}