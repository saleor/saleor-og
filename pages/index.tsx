import { Box, Input, Button } from "@saleor/macaw-ui/next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { labelText, textarea } from "../textarea.css";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();

	const [version, setVersion] = useState(router.query.version?.toString() || "");
	const [contents, setContents] = useState(router.query.contents?.toString() || "");
	const [params, setParams] = useState<{
		version: string;
		contents: string;
	} | null>(null);

	useEffect(() => {
		setVersion(router.query.version?.toString() || "");
		setContents(router.query.contents?.toString() || "");
	}, [router.query]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setParams({ contents, version });
		router.push({ query: { contents, version } });
	};

	const urlSmall = params && `/api/updates?` + new URLSearchParams(params);
	const urlLarge = params && `/api/updates?` + new URLSearchParams({ ...params, large: "" });

	return (
		<div>
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
					/>
				</Box>
				<Button type="submit" size="large">
					Generate
				</Button>
				{urlSmall && urlLarge && (
					<>
						<a href={urlSmall} download={`saleor-update-small-${new Date().toISOString()}.png`}>
							<img src={urlSmall} />
						</a>
						<a href={urlLarge} download={`saleor-update-large-${new Date().toISOString()}.png`}>
							<img src={urlLarge} />
						</a>
					</>
				)}
			</Box>
		</div>
	);
}
