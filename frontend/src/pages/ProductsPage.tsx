import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../reduxState/store';
import { useSelector } from 'react-redux';
import {
  filteredProducts,
  selectError,
  selectIsLoading,
} from '../reduxState/selectors';
import { useEffect } from 'react';
import { fetchProducts } from '../reduxState/products/operation';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import ProductsList from '../components/ProductsList/ProductsList';

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(filteredProducts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage message="Что-то пошло не так. Попробуйте позже" />
      )}
      {products.length > 0 && !isLoading && (
        <ProductsList products={products} />
      )}
    </>
  );
};

export default ProductsPage;
