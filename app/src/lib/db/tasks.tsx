const sleepTime = 10000;

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

export const searchForEvidence = async ({ question }: { question: string }) => {
  await sleep();
  return {
    evidence: [
      `Evidence for ${question}`,
      `More evidence for ${question}`,
      `Even more evidence for ${question}`,
    ],
  };
};

export const TaskNames = {
  VALIDATE_QUESTION: "VALIDATE_QUESTION",
  CLASSIFY_QUESTION: "CLASSIFY_QUESTION",
  IMPROVE_QUESTION: "IMPROVE_QUESTION",
  SEARCH_FOR_EVIDENCE: "SEARCH_FOR_EVIDENCE",
} as const;

export type TaskName = (typeof TaskNames)[keyof typeof TaskNames];

export const TaskRegistry: Record<
  TaskName,
  {
    name: TaskName;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func: (...args: any[]) => any;
    // if true, the task can be "Activated", which means its results will take an effect
    supportsAction: boolean;
  }
> = {
  [TaskNames.VALIDATE_QUESTION]: {
    name: TaskNames.VALIDATE_QUESTION,
    description: "Validate the question",
    func: validateQuestion,
    supportsAction: false,
  },
  [TaskNames.CLASSIFY_QUESTION]: {
    name: TaskNames.CLASSIFY_QUESTION,
    description: "Classify the question",
    func: classifyQuestion,
    supportsAction: false,
  },
  [TaskNames.IMPROVE_QUESTION]: {
    name: TaskNames.IMPROVE_QUESTION,
    description: "Improve the question",
    func: improveQuestion,
    supportsAction: false,
  },
  [TaskNames.SEARCH_FOR_EVIDENCE]: {
    name: TaskNames.SEARCH_FOR_EVIDENCE,
    description: "Search for evidence",
    func: searchForEvidence,
    supportsAction: true,
  },
};

export type TaskFunctions = {
  [K in TaskName]: (typeof TaskRegistry)[K]["func"];
};
