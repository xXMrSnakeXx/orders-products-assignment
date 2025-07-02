import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../reduxState/store';
import {
  selectOrders,
  selectOrdersError,
  selectOrdersIsLoading,
} from '../reduxState/selectors';
import { fetchOrders } from '../reduxState/orders/operations';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import OrdersList from '../components/OrdersList/OrdersList';

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersIsLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage message="Что-то пошло не так. Попробуйте позже" />
      )}

      {orders.length > 0 && !isLoading && <OrdersList orders={orders} />}
    </>
  );
};

export default OrdersPage;
