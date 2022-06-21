import { SymbolInfo } from './symbol-info';

export interface SearchResponse {
  count: number;
  result: SymbolInfo[];
}
