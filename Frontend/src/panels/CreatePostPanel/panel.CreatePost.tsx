import { ButtonsProps, Panel } from "../Panel";

export const CreatePostPanel = () => {
  const buttonsProps: ButtonsProps = [
    { text: "View Story", onClick: () => {} },
    { text: "Visit Profile", onClick: () => {} },
  ];
  return <Panel buttonsProps={buttonsProps} />;
};
