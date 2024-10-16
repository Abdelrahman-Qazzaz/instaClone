import { ButtonsProps, Panel } from "../Panel";

export const ViewStoryOrVisitProfilePanel = () => {
  const buttonsProps: ButtonsProps = [
    { text: "View Story", onClick: () => {} },
    { text: "Visit Profile", onClick: () => {} },
  ];
  return <Panel buttonsProps={buttonsProps} />;
};
