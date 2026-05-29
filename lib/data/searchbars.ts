import searchbarsData from "@/data/md+json/searchbars.json";

export interface SearchbarContent {
  placeholder: string;
  id: string;
}

export interface SearchbarConfig {
  id: string;
  visible: boolean;
  content: SearchbarContent;
}

export function getSearchbar(): SearchbarConfig {
  return (searchbarsData as SearchbarConfig[])[0];
}
