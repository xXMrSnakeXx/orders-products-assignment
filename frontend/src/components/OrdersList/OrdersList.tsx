import { FaListUl, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState, type FC } from 'react';
import type { OrderWithProducts } from '../../types';
import styles from './OrdersList.module.css';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { DeleteOrderModal } from '../DeleteOrderModal/DeleteOrderModal';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../reduxState/orders/operations';
import type { AppDispatch } from '../../reduxState/store';
import OrderDetails from '../OrderDetails/OrderDetails';

interface Props {
  orders: OrderWithProducts[];
}

const OrdersList: FC<Props> = ({ orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithProducts | null>(
    null
  );
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteClick = (order: OrderWithProducts) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      dispatch(deleteOrder(selectedOrder.id));
      handleCloseModal();
    }
  };

  return (
    <div className={styles['orders-list']}>
      <div className="d-flex align-items-center gap-3 ms-4 mb-4">
        <button
          className={`${styles['orders-list__add-btn']} d-flex justify-content-center align-items-center`}
        >
          <FaPlus size="20" />
        </button>
        <h2 className={styles['orders-list__heading']}>
          Приходы / {orders.length}
        </h2>
      </div>

      <ul className="d-flex flex-column gap-3">
        {orders.map((order) => {
          const isActive = activeOrderId === order.id;
          const isDetailsOpened = activeOrderId !== null;

          return (
            <li
              key={order.id}
              className={`${styles['orders-list__card']} ${
                isDetailsOpened ? styles['orders-list__card--active'] : ''
              }`}
              onClick={() => setActiveOrderId(order.id)}
            >
              <div
                className={`${styles['orders-list__left']} d-flex align-items-center`}
              >
                {!isDetailsOpened && (
                  <div className={styles['orders-list__title-wrap']}>
                    <p className={styles['orders-list__title']}>
                      {order.title}
                    </p>
                    <span className={styles['orders-list__title-line']} />
                  </div>
                )}

                <div className="d-flex align-items-center gap-3">
                  <span className={styles['orders-list__meta-icon-circle']}>
                    <FaListUl className={styles['orders-list__meta-icon']} />
                  </span>
                  <div className={styles['orders-list__meta-item']}>
                    <span>{order.products.length}</span>
                    <span>Продукта</span>
                  </div>
                </div>
              </div>

              <div
                className="d-flex align-items-center justify-content-between gap-4 text-nowrap"
                style={{ width: 300 }}
              >
                <div className={styles['orders-list__meta-item-date']}>
                  <span className={styles['orders-list__meta-date-short']}>
                    {formatDate(order.date, 'dd/MM')}
                  </span>
                  <span className={styles['orders-list__meta-date-full']}>
                    {formatDate(order.date, 'dd / LLL / yyyy')}
                  </span>
                </div>

                {!isDetailsOpened && (
                  <>
                    <div className={styles['orders-list__amounts']}>
                      <span className={styles['orders-list__amount-usd']}>
                        {formatCurrency(order.totalUSD, 'USD')}
                      </span>
                      <span className={styles['orders-list__amount-uah']}>
                        {formatCurrency(order.totalUAH, 'UAH')}
                      </span>
                    </div>

                    <button
                      className={`btn btn-link p-0 text-muted ms-3 ${styles['orders-list__delete']}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(order);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </>
                )}

                {isActive && (
                  <span className={`${styles['orders-list__arrow']} ms-auto`}>
                    &#10148;
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <DeleteOrderModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onDelete={handleConfirmDelete}
        order={selectedOrder}
      />

      {activeOrderId && (
        <OrderDetails
          order={orders.find((o) => o.id === activeOrderId)!}
          onClose={() => setActiveOrderId(null)}
        />
      )}
    </div>
  );
};

export default OrdersList;
