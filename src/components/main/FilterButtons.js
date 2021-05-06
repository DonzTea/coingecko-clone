import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveFilter, toggleFilter } from '../../redux/reducers/filters';

export default function FilterButtons() {
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  return (
    <div className="pb-3">
      <button
        className={`btn btn-${activeFilter === 'all' ? 'dark' : 'light'} mr-2`}
        onClick={() => dispatch(toggleFilter())}
      >
        All Coins
      </button>
      <button
        className={`btn btn-${activeFilter === 'favorited' ? 'dark' : 'light'}`}
        onClick={() => dispatch(toggleFilter())}
      >
        Favorited
      </button>
    </div>
  );
}
