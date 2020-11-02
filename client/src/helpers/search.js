import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function useQueryBuilder() {
  const queries = useQuery();
  const addQuery = (name, value) => {
    if (!value) {
      queries.delete(name);
    } else {
      if (name === 'size') {
        queries.delete('page');
      }
      queries.set(name, value);
    }
    return queries.toString();
  };
  return { addQuery };
}

export const search = { useQuery, useQueryBuilder };