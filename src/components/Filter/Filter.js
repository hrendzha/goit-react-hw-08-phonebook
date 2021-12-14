import { memo } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterInputRef: PropTypes.object,
};

function Filter({ filter, onFilterChange, filterInputRef }) {
  return (
    <TextField
      ref={filterInputRef}
      autoComplete="off"
      name="filter"
      id="filter"
      label="Filter"
      margin="normal"
      size="small"
      onChange={onFilterChange}
      value={filter}
    />
  );
}

export default memo(Filter);
