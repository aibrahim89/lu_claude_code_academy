export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const assessmentQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Which command is used to edit a file in Claude Code?',
    options: ['/update', '/modify', '/edit', '/change'],
    correctAnswer: 2
  },
  {
    id: 'q2',
    text: 'What feature allows Claude to execute terminal commands?',
    options: ['Bash Execution', 'System Access', 'Remote Shell', 'Script Runner'],
    correctAnswer: 0
  },
  {
    id: 'q3',
    text: 'Where does Claude Code store its local configuration?',
    options: ['.config/claude', '.claudecode.json', 'claude.yaml', '.env.claude'],
    correctAnswer: 1
  }
];
