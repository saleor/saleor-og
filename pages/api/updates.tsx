import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../../assets/Hero New Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await font;

  const { searchParams } = new URL(req.url);
  const version = searchParams.get("version") || "3.13";
  const contents = searchParams.get("contents")?.split("\n") || [
    `Transactions API`,
    `Bulk updates`,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#fff",
          backgroundImage: `url('http://localhost:3000/updates_bg.png')`,
          backgroundSize: "100% 100%",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: `292px 278px`,
          fontFamily: `Hero New`,
          fontWeight: 700,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="160" height="160" rx="24" fill="#121212" />
            <rect
              width="76.4519"
              height="44.1737"
              transform="matrix(1 0 -0.689367 0.724413 57 64)"
              fill="white"
            />
          </svg>

          <div
            style={{
              fontSize: 60,
              marginLeft: 42,
              lineHeight: 1,
            }}
          >
            {`× ${version}`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 120,
            lineHeight: 1.05,
            marginTop: 40,
            letterSpacing: "-4px",
          }}
        >
          {contents.map((text, idx) => (
            <span key={text + idx}>{text}</span>
          ))}
        </div>
      </div>
    ),
    {
      width: 2086,
      height: 1100,
      emoji: "twemoji",
      fonts: [
        {
          name: "Hero New",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}