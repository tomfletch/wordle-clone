import { dictionary } from "../dictionary";

export const getRandomAnswer = (): string => {
  const answers = [...dictionary];
  return answers[Math.floor(Math.random() * answers.length)];
};
