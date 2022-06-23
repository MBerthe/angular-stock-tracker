import { Sentiment } from './sentiment';

export interface SentimentResponse {
  data: Sentiment[];
  symbol: string;
}
