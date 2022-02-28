/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { parseStyleProps } from "../system";

export function Box({ children, as = false, ...props }) {
	const TagName = as ? as : "div";
	const [styleProps, forWardProps] = parseStyleProps(props);

	const boxStyles = {
		...styleProps,
		border: "solid thin",
		marginRight: "20px",
	};

	return (
		<TagName css={boxStyles} {...forWardProps}>
			{children}
		</TagName>
	);
}
