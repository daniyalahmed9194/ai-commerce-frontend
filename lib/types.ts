export type GenerationStatus = "draft" | "processing" | "generated" | "approved" | "failed";

export type GenerationInput = {
  gender: string;
  age: string;
  background: string;
  pose: string;
  postType: string;
  productName: string;
  price: string;
  sizes: string;
  extraInstructions?: string;
};

export type ProductGeneration = GenerationInput & {
  id: string;
  sourceImageUrl: string | null;
  generatedImageUrl: string | null;
  promptUsed: string | null;
  captionInstagram: string | null;
  captionFacebook: string | null;
  hashtags: string[];
  status: GenerationStatus;
  createdAt: string;
  updatedAt: string;
};

export type CaptionResult = {
  captionInstagram: string;
  captionFacebook: string;
  hashtags: string[];
};
