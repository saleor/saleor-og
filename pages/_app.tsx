import "../global.css";
import "@saleor/macaw-ui/next/style";

import { ThemeProvider } from "@saleor/macaw-ui/next";
import { type AppProps } from "next/app";

export default function NextApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
