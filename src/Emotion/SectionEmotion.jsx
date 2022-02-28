/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Button, Container, Box } from "./components";
import { css } from "@emotion/react";
import { getThemeCSSVars } from "./system";

function SectionEmotion(props) {
	const varArray = getThemeCSSVars();
	let cssVariables = "";
	for (let i in varArray) {
		cssVariables += varArray[i];
	}
	return (
		<div
			css={css`
				${cssVariables}
			`}>
			<h2>Sweet Emotion</h2>
			<Box
				mb="36"
				mt="12"
				pl="96"
				title="Wuuuut ya I tink that is cool"
				color="sprk.black.50"
				onClick={() => {
					console.log("oh ya");
				}}>
				hi~
			</Box>
			<h3>Oh ya</h3>
		</div>
	);
}

export default SectionEmotion;
