import { MdDelete } from 'react-icons/md';
import type { FC } from 'react';
import type { OrderWithProducts } from '../../types';
import styles from './OrderDetails.module.css';
import { RxCross2 } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';
import defaultIcon from '../../assets/defaultIcon.png';

interface Props {
  order: OrderWithProducts;
  onClose: () => void;
}

const OrderDetails: FC<Props> = ({ order, onClose }) => {
  return (
    <div
      className={`${styles['order-details']} d-flex flex-column bg-white rounded-3 p-3`}
    >
      <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-white">
        <h3 className="fs-5 fw-semibold text-dark m-0">{order.title}</h3>
        <button
          onClick={onClose}
          className={styles['order-details__close-btn']}
        >
          <RxCross2 size="15" />
        </button>
      </div>

      <button className="btn btn-link text-success fw-medium fs-6 ps-4 d-flex align-items-center gap-2 mb-3">
        <span className={styles['order-details__add-btn-icon']}>
          <FaPlus size="15" />
        </span>
        Добавить продукт
      </button>

      <ul className="d-flex flex-column m-0 p-0 list-unstyled">
        {order.products.map((product) => (
          <li
            key={product.id}
            className="d-flex align-items-center justify-content-center px-4 py-3 border-bottom"
          >
            <span
              className={`${styles['order-details__dot']} ${
                product.status === 'на складе'
                  ? styles['order-details__dot--green']
                  : styles['order-details__dot--black']
              }`}
            />
            <img
              src={product.photo || defaultIcon}
              alt="icon"
              className="me-3"
              style={{ width: '32px', height: '32px' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultIcon;
              }}
            />
            <div className="d-flex flex-column flex-fill">
              <p className="fw-medium text-dark m-0">{product.title}</p>
              <p className="text-secondary small m-0">
                {product.specification}
              </p>
            </div>

            <span
              className={`me-3 small ${
                product.status === 'на складе'
                  ? styles['order-details__status--free']
                  : styles['order-details__status--repair']
              }`}
            >
              {product.status}
            </span>
            <button className={styles['order-details__delete-btn']}>
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
