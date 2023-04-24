import { vars } from "@saleor/macaw-ui/next";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
	fontFamily: `Inter, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;`,
	color: vars.colors.foreground.textNeutralDefault,
	background: vars.colors.background.plain,
});

globalStyle("#__next", {
	padding: "1rem 2rem",
});
