import { memo } from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

function Filter({ filter, onFilterChange }) {
    return (
        <label className={s.field}>
            <span className={s.label}>Find contacts by name</span>
            <input
                type="text"
                name="filter"
                value={filter}
                autoComplete="off"
                onChange={onFilterChange}
            />
        </label>
    );
}

export default memo(Filter);
