/** @jsxImportSource @emotion/react */

import { Box } from "./components";
import { css } from "@emotion/react";
import { getThemeCSSVars } from "./system";
function SectionEmotion() {
  // TODO - this shold be a helper, and on a higher-level component
  const varArray = getThemeCSSVars();
  let cssVariables = "";
  for (let i in varArray) {
    cssVariables += varArray[i];
  }

  return (
    <div
      css={css`
        ${cssVariables}
      `}
    >
      <h2>Sweet Emotion</h2>
      <Box
        mb="9"
        showBoxTitle={false}
        mt={1}
        pl="4"
        myTitle="Wuuuut ya I tink that is cool"
        color="sprk.black"
        sx={{
          paddingLeft: "101px",
          borderWidth: "8px",
        }}
        onClick={() => {
          console.log("muffin candy carrot cake biscuit");
        }}
        className="box-one"
        id="box-1"
      >
        <p>
          Fruitcake muffin candy carrot cake biscuit gingerbread soufflé
          tiramisu fruitcake. Liquorice icing pastry brownie wafer sesame snaps.
        </p>
      </Box>
      <Box
        mb="9"
        mt="12"
        pl="4"
        pr="14"
        mx="4"
        color="sprk.purple"
        showBoxTitle={true}
        onClick={() => {
          console.log("Dessert ice cream pastry ");
        }}
        className="box-2"
        id="box-2"
      >
        <p>
          Candy canes jelly beans macaroon caramels sweet roll. Jelly beans
          chupa chups chocolate bar croissant cake muffin sweet roll icing.
          Brownie gingerbread tart candy canes sweet sugar plum topping.
        </p>
      </Box>
    </div>
  );
}

export default SectionEmotion;
