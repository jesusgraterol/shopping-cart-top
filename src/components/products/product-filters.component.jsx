import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Product Filters
 * Component in charge of handling the filters that can be applied to visualized all the available
 * products in the shop.
 */
function ProductFilters({ filterList, activeFilter, handleFilterClick, disabled }) {
  const [ expanded, setExpanded ] = useState(false);


  const handleFilterExpandClick = () => setExpanded(!expanded);


  const handleFilterActivation = (newFilter) => {
    handleFilterClick(newFilter);
    setExpanded(false);
  }

  return (
    <div className="dropdown-menu">
      <button className="icon-btn primary" disabled={disabled} onClick={handleFilterExpandClick}>
        <span className="md-icon">{expanded ? 'close' : 'filter_alt'}</span>
      </button>
      {expanded && (
        <div className="dropdown-menu-content">
          <ul>
            {filterList.map((filter) => {
              return (
                <li key={filter}>
                  <button className="btn truncate" 
                          disabled={activeFilter === filter}
                          onClick={() => handleFilterActivation(filter)}>{filter}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
ProductFilters.propTypes = {
  filterList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}




/**
 * Module Exports
 */
export default ProductFilters;