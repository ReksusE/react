import { useState, useRef, useEffect } from 'react'

export default function FilterDropdown({ filterKey, title, i18n, options = [], onFilterChange, resetTrigger }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedValue(null)
  }, [resetTrigger])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleOptionClick = (value) => {
    const newValue = value === selectedValue ? null : value
    setSelectedValue(newValue)
    setIsOpen(false)
    onFilterChange(filterKey, newValue)
  }

  return (
    <div className="concepts__filters-group" data-filter-key={filterKey} ref={dropdownRef}>
      <button
        type="button"
        className="concepts__filters-btn"
        data-js-filter-btn
        data-i18n={i18n}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        {selectedValue || title}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <div className="concepts__dropdown-list" >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="concepts__dropdown-item"
            data-js-filter-value
            data-filter-key={filterKey}
            data-filter-value={option.value}
            data-i18n={option.i18n}
            onClick={() => handleOptionClick(option.title)}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  )
}