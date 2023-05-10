import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
	runtime: "edge",
};

const font = fetch(new URL("../../assets/Hero New Bold.otf", import.meta.url)).then((res) =>
	res.arrayBuffer(),
);

export default async function handler(req: NextRequest) {
	const fontData = await font;

	const { searchParams } = new URL(req.url);
	const version = searchParams.get("version") || "";
	const contents = searchParams.get("contents")?.split("\n") || ["Saleor OG"];
	const variant: "small" | "large" | "youtube" = ["small", "large", "youtube"].includes(
		searchParams.get("variant") as "small" | "large" | "youtube",
	)
		? (searchParams.get("variant") as "small" | "large" | "youtube")
		: "small";

	const theme: "dark" | "light" = ["dark", "light"].includes(
		searchParams.get("theme") as "dark" | "light",
	)
		? (searchParams.get("theme") as "dark" | "light")
		: "light";

	const url = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:3000`;

	const width = 2086;
	const height = { large: 1300, small: 1100, youtube: 1173 }[variant];

	const topMargin = { large: 100, small: 0, youtube: 0 }[variant];
	const topPadding = 292 + topMargin;
	const backgroundPositionY = 225 - topMargin;

	return new ImageResponse(
		(
			<div
				style={{
					backgroundColor: theme === "dark" ? "#121212" : "#fff",
					backgroundImage:
						theme === "dark"
							? `url('${url}/updates_bg_larger_noire.png')`
							: `url('${url}/updates_bg_larger.png')`,
					backgroundPosition: `-298px -${backgroundPositionY}px`,
					backgroundSize: "cover",
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					padding: `${topPadding}px 278px 292px 278px`,
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
						...(variant === "youtube" && { marginLeft: "auto", marginRight: "auto" }),
					}}
				>
					<svg
						width="160"
						height="160"
						viewBox="0 0 160 160"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="160" height="160" rx="24" fill={theme === "dark" ? `#fff` : `#121212`} />
						<rect
							width="76.4519"
							height="44.1737"
							transform="matrix(1 0 -0.689367 0.724413 57 64)"
							fill={theme === "dark" ? `#121212` : `#fff`}
						/>
					</svg>

					{version && (
						<div
							style={{
								fontSize: 60,
								marginLeft: 42,
								lineHeight: 1,
								color: theme === "dark" ? `#fff` : `#000`,
							}}
						>
							{`× ${version}`}
						</div>
					)}
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						fontSize: 120,
						lineHeight: 1.05,
						marginTop: 40,
						letterSpacing: "-4px",
						color: theme === "dark" ? `#fff` : `#000`,
						...(variant === "youtube" && { marginLeft: "auto", marginRight: "auto" }),
					}}
				>
					{contents.map((text, idx) => (
						<div
							key={text + idx}
							style={{
								...(variant === "youtube" && { marginLeft: "auto", marginRight: "auto" }),
							}}
						>
							{text}
						</div>
					))}
				</div>
			</div>
		),
		{
			width,
			height,
			emoji: "twemoji",
			fonts: [
				{
					name: "Hero New",
					data: fontData,
					style: "normal",
					weight: 700,
				},
			],
		},
	);
}
