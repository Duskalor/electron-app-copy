import { useState, useEffect } from 'react';
import { PjsResult } from '../types/pjs.types';

const URL = 'https://rickandmortyapi.com/api/character';
export const useApi = () => {
  const [pjs, setPjs] = useState<PjsResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setPjs(data.results);
    };
    fetchData();
  }, []);

  return { pjs };
};
