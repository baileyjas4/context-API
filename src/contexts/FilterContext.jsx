import { createContext, useContext, useState, useMemo, useCallback } from 'react'

const FilterContext = createContext()

export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
}

export function FilterProvider({ children }) {
  const [filter, setFilterState] = useState(FILTER_TYPES.ALL)

  const setFilter = useCallback((newFilter) => {
    if (Object.values(FILTER_TYPES).includes(newFilter)) {
      setFilterState(newFilter)
    }
  }, [])

  const value = useMemo(() => ({
    filter,
    setFilter
  }), [filter, setFilter])

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
