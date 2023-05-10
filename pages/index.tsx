import { Box, Input, Button, Checkbox, Text } from "@saleor/macaw-ui/next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { labelText, textarea } from "../textarea.css";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();

	const [version, setVersion] = useState(router.query.version?.toString() || "");
	const [contents, setContents] = useState(router.query.contents?.toString() || "");
	const [theme, setTheme] = useState(router.query.theme?.toString() || "");
	const [params, setParams] = useState<{
		version: string;
		contents: string;
		theme: string;
	} | null>(null);

	useEffect(() => {
		const version = router.query.version?.toString() || "";
		const contents = router.query.contents?.toString() || "";
		const theme = router.query.theme?.toString() || "";
		setVersion(version);
		setContents(contents);
		setTheme(theme);

		if (version || contents || theme) {
			setParams({ version, contents, theme });
		}
	}, [router.query]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setParams({ contents, version, theme });
		router.push({ query: { contents, version, theme } });
	};

	const urlSmall = params && `/api/updates?` + new URLSearchParams(params);
	const urlLarge = params && `/api/updates?` + new URLSearchParams({ ...params, variant: "large" });
	const urlYouTube =
		params && `/api/updates?` + new URLSearchParams({ ...params, variant: "youtube" });

	return (
		<Box paddingBottom={13}>
			<Head>
				<meta name="og:title" content="Vercel Edge Network" />
				<meta name="og:description" content="Vercel Edge Network" />
				<meta
					name="og:image"
					content={
						// Because OG images must have a absolute URL, we use the
						// `VERCEL_URL` environment variable to get the deployment’s URL.
						// More info:
						// https://vercel.com/docs/concepts/projects/environment-variables
						`${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""}/api/updates`
					}
				/>
			</Head>

			<Box
				onSubmit={handleSubmit}
				display="flex"
				as="form"
				flexDirection="column"
				gap={8}
				__maxWidth={768}
				marginLeft="auto"
				marginRight="auto"
			>
				<Input
					label="Version"
					name="version"
					value={version}
					onChange={(e) => setVersion(e.currentTarget.value)}
					size="large"
				/>
				<Box as="label" display="flex" flexDirection="column">
					<div className={labelText}>Text</div>
					<textarea
						name="contents"
						value={contents}
						onChange={(e) => setContents(e.currentTarget.value)}
						rows={4}
						className={textarea}
						required
					/>
				</Box>
				<Checkbox
					name="theme"
					checked={theme === "dark"}
					onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
				>
					Noire? ▰
				</Checkbox>
				<Button type="submit" size="large">
					Generate
				</Button>
				{urlSmall && urlLarge && urlYouTube && (
					<Box display="flex" flexDirection="column" rowGap={12}>
						<div>
							<Text as="h2" variant="hero" size="large" marginBottom={4}>
								Blog small:
							</Text>
							<Box>
								<a href={urlSmall} download={`saleor-update-small-${new Date().toISOString()}.png`}>
									<img src={urlSmall} />
								</a>
							</Box>
						</div>
						<div>
							<Text as="h2" variant="hero" size="large" marginBottom={4}>
								Blog large:
							</Text>
							<a href={urlLarge} download={`saleor-update-large-${new Date().toISOString()}.png`}>
								<img src={urlLarge} />
							</a>
						</div>
						<div>
							<Text as="h2" variant="hero" size="large" marginBottom={4}>
								YouTube:
							</Text>
							<a
								href={urlYouTube}
								download={`saleor-update-youtube-${new Date().toISOString()}.png`}
							>
								<img src={urlYouTube} />
							</a>
						</div>
					</Box>
				)}
			</Box>
		</Box>
	);
}
