import { useFilter, FILTER_TYPES } from '../contexts/FilterContext'

function FilterButtons() {
  const { filter, setFilter } = useFilter()

  const filters = [
    { key: FILTER_TYPES.ALL, label: 'All' },
    { key: FILTER_TYPES.ACTIVE, label: 'Active' },
    { key: FILTER_TYPES.COMPLETED, label: 'Completed' }
  ]

  return (
    <div className="filter-buttons">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`filter-button ${filter === key ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
