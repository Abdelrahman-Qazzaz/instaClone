import { ButtonsProps, Prompt } from "../Prompt";

export const ViewStoryOrVisitProfilePrompt = () => {
  const buttonsProps: ButtonsProps = [
    { text: "View Story", onClick: () => {} },
    { text: "Visit Profile", onClick: () => {} },
  ];
  return <Prompt buttonsProps={buttonsProps} />;
};
