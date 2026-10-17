import { invitation } from "@/config/invitation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const imageSize = { width: 1200, height: 630 };
export const imageAlt = "Peri masalı kitabının kapağı: nişan davetiyesi";

export async function createShareImage() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/EBGaramond-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#140d0a",
        }}
      >
        <div
          style={{
            width: 860,
            height: 500,
            display: "flex",
            background: "#4a2618",
            padding: 18,
            boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3e2c4",
              color: "#2a1c12",
              border: "3px solid #e6c97a",
              padding: "36px 48px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Body",
                fontSize: 34,
                marginTop: 22,
                color: "#5c4030",
              }}
            >
              {`${invitation.couple.firstName} · ${invitation.couple.secondName}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...imageSize,
      fonts: [
        { name: "Display", data: display, weight: 600, style: "normal" },
        { name: "Body", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
