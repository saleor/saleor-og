import { sprinkles, vars } from "@saleor/macaw-ui/next";
import { style } from "@vanilla-extract/css";

export const textarea = style({
	resize: "none",
	paddingLeft: vars.space[6],
	paddingRight: vars.space[6],
	paddingTop: vars.space[12],
	paddingBottom: vars.space[4],
	borderRadius: vars.borderRadius[3],
	borderWidth: vars.borderWidth[1],
	borderColor: `transparent`,
	backgroundColor: vars.colors.background.surfaceNeutralHighlight,
	color: vars.colors.foreground.textNeutralDefault,
	fontSize: vars.fontSize.bodyLarge,
	":hover": {
		borderColor: vars.colors.border.neutralHighlight,
	},
	":focus": {
		borderColor: vars.colors.border.brandSubdued,
		outline: "none",
		backgroundColor: vars.colors.background.interactiveNeutralHighlightDefault,
	},
});

export const labelText = style({
	paddingLeft: vars.space[7],
	color: vars.colors.foreground.textNeutralSubdued,
	fontWeight: vars.fontWeight.bodyLarge,
	letterSpacing: vars.letterSpacing.bodyLarge,
	lineHeight: vars.lineHeight.bodyLarge,
	transform: `translateY(150%) scale(.84)`,
	transition: `transform .3s`,
	transformOrigin: `left`,
});
