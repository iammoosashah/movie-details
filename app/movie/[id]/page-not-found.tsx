import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h1>Movie Not Found</h1>
            <p>Sorry, we couldn't find that movie.</p>

            <Link href="/">
                ← Back to Movies
            </Link>
        </div>
    );
}