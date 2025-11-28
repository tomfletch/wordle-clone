import { ANSWERS } from "../data/answers";

export const getRandomAnswer = (): string => {
  const answers = [...ANSWERS];
  return answers[Math.floor(Math.random() * answers.length)];
};
