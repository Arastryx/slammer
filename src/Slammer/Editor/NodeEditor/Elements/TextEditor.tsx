import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useSlamText } from "../../../SlamXML/SlamContext";

export interface TextEditorProps {
  index: number[];
}

export const TextEditor: React.FC<TextEditorProps> = ({ index }) => {
  const [text, setText] = useSlamText(index);

  console.log("hello?");

  return (
    <TextArea
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      cols={75}
    ></TextArea>
  );
};
