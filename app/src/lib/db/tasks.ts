export const TaskNames = {
  VALIDATE_QUESTION: "VALIDATE_QUESTION",
  CLASSIFY_QUESTION: "CLASSIFY_QUESTION",
  IMPROVE_QUESTION: "IMPROVE_QUESTION",
} as const;

export type TaskName = (typeof TaskNames)[keyof typeof TaskNames];

const sleepTime = 4000;
const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, sleepTime));
};
const validateQuestion = async ({ question }: { question: string }) => {
  await sleep();

  return {
    success: true,
  };
};
const classifyQuestion = async ({ question }: { question: string }) => {
  await sleep();
  return {
    quantified: true,
    actor: false,
  };
};

export const improveQuestion = async ({
  question,
  otherArg,
}: {
  question: string;
  otherArg: string;
}) => {
  console.log("running IMPROVE QUESTION", question, otherArg);
  await sleep();
  return {
    alternatives: [
      `WTF ${question} ???`,
      `Like, what is with ${question}?`,
      `Seriously, ${question}???`,
    ],
  };
};

export const TaskRegistry = {
  [TaskNames.VALIDATE_QUESTION]: {
    name: TaskNames.VALIDATE_QUESTION,
    description: "Validate the question",
    func: validateQuestion,
  },
  [TaskNames.CLASSIFY_QUESTION]: {
    name: TaskNames.CLASSIFY_QUESTION,
    description: "Classify the question",
    func: classifyQuestion,
  },
  [TaskNames.IMPROVE_QUESTION]: {
    name: TaskNames.IMPROVE_QUESTION,
    description: "Improve the question",
    func: improveQuestion,
  },
};

export type TaskFunctions = {
  [K in TaskName]: (typeof TaskRegistry)[K]["func"];
};
