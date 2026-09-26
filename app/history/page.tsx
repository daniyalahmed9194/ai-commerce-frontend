import Link from "next/link";
import { listGenerations } from "../../lib/api";

export default async function HistoryPage() {
  const generations = await listGenerations();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-moss">History</p>
          <h1 className="mt-1 text-3xl font-semibold">Previous generations</h1>
        </div>
        <Link className="btn btn-primary" href="/">
          Generate
        </Link>
      </div>

      <section className="grid gap-3">
        {generations.map((generation) => (
          <Link key={generation.id} href={`/preview/${generation.id}`} className="grid gap-3 rounded-md border border-black/10 bg-white p-3 sm:grid-cols-[88px_1fr_auto] sm:items-center">
            <div className="flex h-24 w-full items-center justify-center rounded-md bg-mist sm:h-20 sm:w-20">
              {generation.generatedImageUrl || generation.sourceImageUrl ? (
                <img src={generation.generatedImageUrl ?? generation.sourceImageUrl ?? ""} alt="" className="h-full w-full rounded-md object-cover" />
              ) : (
                <span className="text-xs text-black/50">No image</span>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{generation.productName || "Untitled product"}</h2>
              <p className="mt-1 text-sm text-black/60">
                {generation.age} / {generation.gender} / {generation.postType}
              </p>
            </div>
            <span className="w-fit rounded-md bg-paper px-3 py-1 text-sm capitalize">{generation.status}</span>
          </Link>
        ))}
        {generations.length === 0 ? <p className="rounded-md border border-black/10 bg-white p-6 text-black/60">No generations yet.</p> : null}
      </section>
    </main>
  );
}
