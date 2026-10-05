import filtersData from '@/data/filters.json'
import FilterDropdown from './FilterDropdown'

export default function Filters({ onFilterChange, onReset, resetTrigger }) {
  return (
    <div className="concepts__filters reveal reveal-delay-1">
      {filtersData.map((filter) => (
        <FilterDropdown
          key={filter.key}
          filterKey={filter.key}
          title={filter.title}
          i18n={filter.i18n}
          options={filter.options}
          onFilterChange={onFilterChange}
          resetTrigger={resetTrigger}
        />
      ))}

      <button
        type="button"
        className="concepts__filters-reset"
        data-i18n="filter-btn-6"
        onClick={onReset}
      >
        Сбросить
      </button>
    </div>
  )
}