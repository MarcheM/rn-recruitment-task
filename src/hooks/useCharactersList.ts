import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchData } from "../api/api";
import { CharacterList } from "../types/Character";
import { useRef } from "react";
import { useCharacterContext } from '../context/CharacterContext';

export function useCharactersList() {
  const previousData = useRef<any>(null);
  const { appliedSearchName, appliedStatusFilter, appliedSpeciesFilter } = useCharacterContext();

  return useInfiniteQuery({
    queryKey: ['characters', appliedSearchName, appliedStatusFilter, appliedSpeciesFilter],
    queryFn: ({ pageParam = 1 }) => {
      let url = `character?page=${pageParam}`;
      if (appliedSearchName.length > 0) {
        url += `&name=${encodeURIComponent(appliedSearchName)}`;
      }
      if (appliedStatusFilter.length > 0) {
        url += `&status=${encodeURIComponent(appliedStatusFilter)}`;
      }
      if (appliedSpeciesFilter.length > 0) {
        url += `&species=${encodeURIComponent(appliedSpeciesFilter)}`;
      }
      return fetchData<CharacterList>(url);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) {
        return undefined;
      }
      const nextUrl = new URL(lastPage.info.next);
      const nextPage = nextUrl.searchParams.get('page');
      return nextPage ? parseInt(nextPage) : undefined;
    },
    initialPageParam: 1,
    placeholderData: previousData.current,
  });
} 