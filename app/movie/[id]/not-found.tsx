import Link from "next/link"

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#0a0f1e",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif", padding: "24px",
    }}>
      <div className="animate-fade-in-up" style={{ textAlign: "center", maxWidth: "420px" }}>
        <div style={{ fontSize: "80px", marginBottom: "24px" }}>🎬</div>

        <h1 style={{
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800,
          background: "linear-gradient(135deg, #fff 0%, #f5c518 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          margin: "0 0 16px", lineHeight: 1.1,
        }}>
          Movie Not Found
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 36px" }}>
          We couldn&apos;t find that movie. It may have been removed or the ID is invalid.
        </p>

        <Link href="/" className="cta-btn">
          ← Back to Search
        </Link>
      </div>
    </main>
  )
}
