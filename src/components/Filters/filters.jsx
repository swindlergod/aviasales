import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setFilter } from '../../store/filtersReducer'

import classes from './filters.module.scss'

export default function Filters() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters.filters)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const { checkboxes } = useSelector((state) => state.filters)

  const getFiltered = (value) => {
    let newCheckedList
    if (value === 'all') {
      if (!isCheckedAll) {
        newCheckedList = ['all', 'without', 'one', 'two', 'three']
        setIsCheckedAll(true)
      } else {
        newCheckedList = []
        setIsCheckedAll(false)
      }
    } else {
      const index = filters.indexOf(value)
      if (index === -1) {
        newCheckedList = [...filters, value]
        if (newCheckedList.length === 4) {
          newCheckedList = ['all', ...newCheckedList]
          setIsCheckedAll(true)
        }
      } else {
        newCheckedList = filters.filter((val) => val !== value)
        if (newCheckedList.includes('all')) {
          newCheckedList = newCheckedList.filter((item) => item !== 'all')
          setIsCheckedAll(false)
        }
      }
    }
    dispatch(setFilter(newCheckedList))
  }

  return (
    <div className={classes.filtersList}>
      <p>Количество пересадок</p>
      {checkboxes.map((checkbox) => (
        <label className={classes.label} key={checkbox.id} htmlFor={checkbox.id}>
          <input
            className={classes.checkbox}
            type="checkbox"
            id={checkbox.id}
            value={checkbox.name}
            onChange={() => getFiltered(checkbox.value)}
            checked={filters.includes(checkbox.value)}
          />
          <span className={classes.text}>{checkbox.name}</span>
        </label>
      ))}
    </div>
  )
}
