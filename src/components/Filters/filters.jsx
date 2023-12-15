import React from "react";
import classes from './filters.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { setFilterAll, setFilterWithout, setFilterOne, setFilterTwo, setFilterThree, setFilter } from "../../store/filtersReducer";

export default function Filters() {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)

    const getAll = () => {
        dispatch(setFilterAll())
    }

    const getWithout = () => {
        dispatch(setFilterWithout())
    }

    // const getOne = () => {
    //     dispatch(setFilterOne())
    // }

    // const getTwo = () => {
    //     dispatch(setFilterTwo())
    // }

    // const getThree = () => {
    //     dispatch(setFilterThree())
    // }

    const getFiltered = (value) => {
        dispatch(setFilter(value))
    }


    return (
        <div className={classes.filtersList}>
            <p>Количество пересадок</p>         
            <label htmlFor='selectAll'><input type="checkbox" id="selectAll" value='Все' onChange={() => getAll()} checked={filters.length === 4}/>Все</label>      
            <label htmlFor='noTransfers'><input type="checkbox" id="noTransfers"  onChange={() => getWithout()} checked={filters.some(filter => filter === 'without')}/>Без пересадок</label>            
            <label htmlFor='singleTransfer'><input type="checkbox" id="singleTransfer"  onChange={() => getFiltered('one')} checked={filters.some(filter => filter === 'one')}/>1 пересадка</label>
            <label htmlFor='twoTransfers'><input type="checkbox" id="twoTransfers"  onChange={() => getFiltered('two')} checked={filters.some(filter => filter === 'two')}/>2 пересадки</label>
            <label htmlFor='threeTransfers'><input type="checkbox" id="threeTransfers"  onChange={() => getFiltered('three')} checked={filters.some(filter => filter === 'three')}/>3 пересадки</label>               
        </div>
    )
}