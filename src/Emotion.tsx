import { Global, css } from "@emotion/react";
import SectionEmotion from "./SectionEmotion";

function Emotion() {
  return (
    <>
      <Global
        styles={{
          "html, body": {
            fontFamily: "Verdana",
            padding: 0,
            margin: 0,
          },
          "*, :after, :before": {
            bosSizing: "border-box",
          },
        }}
      />

      <SectionEmotion />
    </>
  );
}

export default Emotion;
