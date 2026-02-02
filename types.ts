
export type EventType = 'start' | 'end' | 'submission';

export interface ContestDates {
  start: string;
  end: string;
  submission_deadline: string;
}

export interface Contest {
  id: string;
  title: string;
  dates: ContestDates;
  category: string;
  reward: string;
  is_team_recruiting: boolean;
  host: string;
  target: string;
  description: string;
  posterUrl: string;
  link: string;
}

export interface FilterState {
  search: string;
  categories: string[];
  rewardScale: string;
  teamOnly: boolean;
}
