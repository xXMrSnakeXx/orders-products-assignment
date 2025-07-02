import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import type { FC } from 'react';
import type { Option } from '../../types';
import { selectFilter, selectProducts } from '../../reduxState/selectors';
import { setFilter } from '../../reduxState/filter/filterSlice';
import './FilterSelect.css';

const FilterSelect: FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const products = useSelector(selectProducts);

  const uniqueTypes = Array.from(
    new Set(products.map((product) => product.type).filter(Boolean))
  );

  const options: Option[] = [
    { value: 'Все продукты', label: 'Все продукты' },
    ...uniqueTypes.map((type) => ({ value: type, label: type })),
  ];

  const defaultValue =
    options.find((option) => option.value === filter) || options[0];

  const handleChange = (selectedOption: Option | null) => {
    dispatch(setFilter(selectedOption?.value ?? ''));
  };

  return (
    <Select
      options={options}
      value={defaultValue}
      onChange={handleChange}
      placeholder="Выберите тип"
      isClearable
      classNamePrefix="custom-select"
    />
  );
};

export default FilterSelect;
