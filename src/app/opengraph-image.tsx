import { createShareImage, imageAlt, imageSize } from "@/lib/share-image";

export const alt = imageAlt;
export const size = imageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createShareImage();
}
