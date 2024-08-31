import { humanId } from "human-id";
import { customAlphabet } from "nanoid";

const nanoidGenerator = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  3
);

export const generateHumanId = () => {
  return humanId({
    separator: "-",
    capitalize: false,
  });
};

export const generateId = () => {
  return nanoidGenerator();
};
