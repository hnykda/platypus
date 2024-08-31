import { humanId } from "human-id";

export const generateId = () => {
  return humanId({
    separator: "-",
    capitalize: false,
  });
};
