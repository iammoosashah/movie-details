export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch movie")
    }

    const data = await response.json()

    return Response.json(data)
}