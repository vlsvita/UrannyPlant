export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: number; // timestamp (Date.now())
  updatedAt: number;
}
