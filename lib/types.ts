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
  userId: string | null;
  sourceImageUrl: string | null;
  sourceImagePath: string | null;
  generatedImageUrl: string | null;
  generatedImagePath: string | null;
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

export type ClientConfig = {
  imageProvider: "mock" | "openai" | "gemini" | "qwen";
  imageOptimization: {
    enabled: boolean;
    maxSizeMb: number;
    maxLongSidePx: number;
    compressionQuality: number;
  };
};

export type ScheduledPostPlatform = "facebook" | "instagram";
export type ScheduledPostStatus = "draft" | "scheduled" | "publishing" | "published" | "failed";

export type ScheduledPost = {
  id: string;
  generationId: string;
  platform: ScheduledPostPlatform;
  scheduledAt: string | null;
  publishStatus: ScheduledPostStatus;
  externalPostId: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};
