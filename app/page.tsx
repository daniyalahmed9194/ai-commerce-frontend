import { GenerationForm } from "../components/generation-form";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-moss">Generate</p>
        <h1 className="mt-1 text-3xl font-semibold">Create a catalog image from one product photo</h1>
      </div>
      <GenerationForm />
    </main>
  );
}
