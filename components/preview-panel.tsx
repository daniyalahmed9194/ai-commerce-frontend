"use client";

import { useState } from "react";
import { Check, Loader2, RefreshCw, Save, Trash2 } from "lucide-react";
import type { ProductGeneration } from "../lib/types";
import { approveGeneration, deleteGeneration, generateCaption, generateImage, updateGeneration } from "../lib/api";

export function PreviewPanel({ initial }: { initial: ProductGeneration }) {
  const [generation, setGeneration] = useState(initial);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  async function run(label: string, action: () => Promise<ProductGeneration>) {
    setBusy(label);
    setMessage("");
    try {
      setGeneration(await action());
      setMessage("Saved.");
    } finally {
      setBusy("");
    }
  }

  async function remove() {
    if (!window.confirm("Delete this generation and its stored images?")) return;
    setBusy("delete");
    try {
      await deleteGeneration(generation.id);
      window.location.href = "/history";
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="grid gap-4 sm:grid-cols-2">
        <ImageBox title="Source" url={generation.sourceImageUrl} />
        <ImageBox title="Generated" url={generation.generatedImageUrl} />
      </section>

      <section className="rounded-md border border-black/10 bg-white p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-black/60">Status</p>
            <h1 className="text-2xl font-semibold capitalize">{generation.status}</h1>
          </div>
          <span className="rounded-md bg-mist px-3 py-1 text-sm">{generation.postType}</span>
        </div>

        <CaptionEditor
          label="Instagram caption"
          value={generation.captionInstagram ?? ""}
          onChange={(captionInstagram) => setGeneration((current) => ({ ...current, captionInstagram }))}
        />
        <CaptionEditor
          label="Facebook caption"
          value={generation.captionFacebook ?? ""}
          onChange={(captionFacebook) => setGeneration((current) => ({ ...current, captionFacebook }))}
        />
        <CaptionEditor
          label="Hashtags"
          value={generation.hashtags.join(", ")}
          onChange={(value) => setGeneration((current) => ({ ...current, hashtags: value.split(",").map((tag) => tag.trim()).filter(Boolean) }))}
        />

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button className="btn btn-secondary" disabled={!!busy} onClick={() => run("regenerate", () => generateImage(generation.id))}>
            {busy === "regenerate" ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
            Regenerate
          </button>
          <button className="btn btn-secondary" disabled={!!busy} onClick={() => run("caption", () => generateCaption(generation.id))}>
            {busy === "caption" ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
            New captions
          </button>
          <button
            className="btn btn-secondary"
            disabled={!!busy}
            onClick={() =>
              run("save", () =>
                updateGeneration(generation.id, {
                  captionInstagram: generation.captionInstagram,
                  captionFacebook: generation.captionFacebook,
                  hashtags: generation.hashtags
                })
              )
            }
          >
            {busy === "save" ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Save copy
          </button>
          <button className="btn btn-primary" disabled={!!busy} onClick={() => run("approve", () => approveGeneration(generation.id))}>
            {busy === "approve" ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
            Approve
          </button>
        </div>

        <button className="btn btn-secondary mt-2 w-full border-clay/30 text-clay" disabled={!!busy} onClick={remove}>
          {busy === "delete" ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
          Delete generation
        </button>

        {message ? <p className="mt-4 text-sm text-moss">{message}</p> : null}
        <div className="mt-5 rounded-md bg-paper p-3 text-sm text-black/70">
          Check color, embroidery, neckline, sleeve shape, trouser or skirt shape, and garment proportions before approving.
        </div>
      </section>
    </div>
  );
}

function ImageBox({ title, url }: { title: string; url: string | null }) {
  return (
    <div className="rounded-md border border-black/10 bg-white p-3">
      <p className="mb-2 text-sm font-medium">{title}</p>
      <div className="flex aspect-[4/5] items-center justify-center rounded-md bg-mist/60">
        {url ? <img src={url} alt={title} className="max-h-full max-w-full rounded-md object-contain" /> : <span className="text-sm text-black/55">Waiting</span>}
      </div>
    </div>
  );
}

function CaptionEditor({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mb-4 block">
      <span className="field-label">{label}</span>
      <textarea className="field min-h-24" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
