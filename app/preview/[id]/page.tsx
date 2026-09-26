import Link from "next/link";
import { PreviewPanel } from "../../../components/preview-panel";
import { getGeneration } from "../../../lib/api";

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const generation = await getGeneration(id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-moss">Preview</p>
          <h1 className="mt-1 text-3xl font-semibold">{generation.productName || "Generated product"}</h1>
        </div>
        <Link className="btn btn-secondary" href="/">
          New generation
        </Link>
      </div>
      <PreviewPanel initial={generation} />
    </main>
  );
}
