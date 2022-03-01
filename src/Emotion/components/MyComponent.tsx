/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { parseStyleProps } from "../system";

interface boxPropTypes {
	children: string | JSX.Element | JSX.Element[];
	as?: keyof JSX.IntrinsicElements;
	showBoxTitle?: Boolean;
	myTitle?: string;
	[x : string]: unknown;
}

const MyComponent = ({ children, as, showBoxTitle = false, myTitle, ...otherProps }: boxPropTypes) => {
	const TagName = as ? as : "div";
	const [styleProps, forWardProps] = parseStyleProps(otherProps);

	const BoxStyleProps = {
		border: 'solid thin',
		borderColor: 'purple',
		boxShadow: ''
	}

	const boxStyles = {
		...styleProps,
		border: "solid thin",
		marginRight: "20px",
	};

	return (
		<>
		<TagName css={boxStyles} {...forWardProps}>
			{children}
		</TagName>
		</>
	);
}
export {MyComponent};