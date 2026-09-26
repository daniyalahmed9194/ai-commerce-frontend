"use client";

import { useMemo, useState } from "react";
import { Camera, Loader2, Sparkles, Upload } from "lucide-react";
import type { GenerationInput } from "../lib/types";
import { createGeneration, generateCaption, generateImage } from "../lib/api";

const defaults: GenerationInput = {
  gender: "Girl",
  age: "3-4 years",
  background: "Elegant indoor studio",
  pose: "Standing",
  postType: "Instagram feed 4:5",
  productName: "",
  price: "",
  sizes: "",
  extraInstructions: ""
};

export function GenerationForm() {
  const [input, setInput] = useState<GenerationInput>(defaults);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  async function submit() {
    if (!file) {
      setError("Please upload a product image first.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const created = await createGeneration(input, file);
      const generated = await generateImage(created.id);
      await generateCaption(generated.id);
      window.location.href = `/preview/${created.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function update<K extends keyof GenerationInput>(key: K, value: GenerationInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-md border border-black/10 bg-white p-4">
        <label className="field-label">Product image</label>
        <div className="mt-2 flex min-h-[360px] flex-col items-center justify-center rounded-md border border-dashed border-black/20 bg-mist/50 p-4 text-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected product" className="max-h-[340px] rounded-md object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-sm text-black/65">
              <Camera size={36} />
              Upload from desktop, camera, or gallery
            </div>
          )}
        </div>
        <label className="btn btn-secondary mt-4 w-full cursor-pointer">
          <Upload size={16} />
          Choose image
          <input
            className="hidden"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>
      </section>

      <section className="rounded-md border border-black/10 bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Gender" value={input.gender} options={["Girl", "Boy", "Custom"]} onChange={(value) => update("gender", value)} />
          <Select label="Age" value={input.age} options={["2-3 years", "3-4 years", "5-6 years", "7-8 years", "Custom"]} onChange={(value) => update("age", value)} />
          <Select label="Background" value={input.background} options={["Elegant indoor studio", "Clean studio", "Outdoor", "Plain", "Custom prompt"]} onChange={(value) => update("background", value)} />
          <Select label="Pose" value={input.pose} options={["Standing", "Sitting", "Lifestyle", "Custom"]} onChange={(value) => update("pose", value)} />
          <Select label="Post type" value={input.postType} options={["Instagram feed 4:5", "Square 1:1", "Story 9:16", "Facebook post"]} onChange={(value) => update("postType", value)} />
          <Field label="Product name" value={input.productName} onChange={(value) => update("productName", value)} />
          <Field label="Price" value={input.price} onChange={(value) => update("price", value)} />
          <Field label="Sizes" value={input.sizes} onChange={(value) => update("sizes", value)} />
        </div>
        <label className="mt-4 block">
          <span className="field-label">Extra instructions</span>
          <textarea className="field min-h-24" value={input.extraInstructions} onChange={(event) => update("extraInstructions", event.target.value)} />
        </label>
        {error ? <p className="mt-4 rounded-md bg-clay/10 p-3 text-sm text-clay">{error}</p> : null}
        <button className="btn btn-primary mt-5 w-full" disabled={busy} onClick={submit}>
          {busy ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          Generate image and captions
        </button>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input className="field" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
