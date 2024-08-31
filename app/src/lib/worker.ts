import { Job, Worker } from "bullmq";
import { updateTask } from "./db/main";
import { TaskStatus } from "./db/types";
import { TaskName, TaskRegistry } from "./db/tasks";
import { REDIS_HOST, REDIS_PORT } from "./constants";

console.log("Worker starting, ", {
  host: REDIS_HOST,
  port: REDIS_PORT,
});

const worker = new Worker(
  "alpha",
  async (job) => {
    const taskSpec = TaskRegistry[job.name as TaskName];

    if (!taskSpec) {
      throw new Error(`Task ${job.name} not found`);
    }

    const taskFunc = taskSpec.func;
    const args = job.data.args;
    // @ts-expect-error - typescript complains even though this works
    const result = await taskFunc(...args);
    job.updateData(result);
  },
  {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  }
);

const afterJob = async (job: Job, status: TaskStatus, error: string) => {
  console.log(`${job.id} has ${status}!`);
  if (job.id) {
    updateTask({
      taskId: job.id,
      status,
      error,
      result: JSON.stringify(job.data.result),
      finishedAt: new Date().toISOString(),
    });
  } else {
    console.log("Job id is undefined");
  }
};

worker.on("completed", (job) => {
  afterJob(job, TaskStatus.COMPLETED, "");
});

worker.on("failed", (job: Job | undefined, err: Error) => {
  if (!job) {
    console.log("Job is undefined. Error:", err);
    return;
  }
  afterJob(job, TaskStatus.FAILED, err.message);
});
