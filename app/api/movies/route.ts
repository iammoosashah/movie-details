export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}`)
    if (!response.ok) {
        throw new Error("Failed to fetch movie")
    }
    const data = await response.json()
    return Response.json(data)
}
