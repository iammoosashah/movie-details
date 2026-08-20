export default function Loading() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0a0f1e", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Back button skeleton */}
      <div style={{ padding: "28px 32px 0" }}>
        <div className="skeleton" style={{ width: "130px", height: "36px", borderRadius: "10px" }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px 80px" }}>
        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Poster skeleton */}
          <div style={{ flexShrink: 0, width: "clamp(220px, 28%, 300px)" }}>
            <div className="skeleton" style={{ width: "100%", aspectRatio: "2/3", borderRadius: "16px" }} />
            <div className="skeleton" style={{ marginTop: "16px", height: "88px", borderRadius: "14px" }} />
          </div>

          {/* Info skeleton */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <div className="skeleton" style={{ width: "70px", height: "26px", borderRadius: "8px" }} />
              <div className="skeleton" style={{ width: "50px", height: "26px", borderRadius: "8px" }} />
              <div className="skeleton" style={{ width: "80px", height: "26px", borderRadius: "8px" }} />
            </div>
            <div className="skeleton" style={{ width: "70%", height: "48px", borderRadius: "10px", marginBottom: "12px" }} />
            <div className="skeleton" style={{ width: "30%", height: "18px", borderRadius: "6px", marginBottom: "24px" }} />

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
              {["80px", "90px", "70px"].map((w, i) => (
                <div key={i} className="skeleton" style={{ width: w, height: "28px", borderRadius: "8px" }} />
              ))}
            </div>

            <div className="skeleton" style={{ height: "14px", borderRadius: "6px", marginBottom: "8px" }} />
            <div className="skeleton" style={{ height: "14px", borderRadius: "6px", marginBottom: "8px" }} />
            <div className="skeleton" style={{ height: "14px", width: "75%", borderRadius: "6px", marginBottom: "28px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: "60px", borderRadius: "10px" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}