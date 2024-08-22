import { ReadLine } from 'readline';

// readline/promises is not available in Node.js v14
export const promptAndWaitForAnswer = async ({
  rl,
  question,
  resolver,
}: {
  rl: ReadLine;
  question: string;
  resolver: (input: string) => boolean;
}) => {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(resolver(answer));
    });
  });
};
