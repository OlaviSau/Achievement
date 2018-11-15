export interface AchievementModel {
  key: string;
  title: string;
  points: number;
  completed: boolean;
  tasks: {
    id: number,
    description: string,
    completed: boolean
  }[];
  img: string;
}
