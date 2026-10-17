import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a100c",
        }}
      >
        <div
          style={{
            width: 34,
            height: 44,
            display: "flex",
            background: "#f3e2c4",
            border: "3px solid #e6c97a",
            boxShadow: "4px 0 0 #4a2618",
          }}
        />
      </div>
    ),
    size,
  );
}
