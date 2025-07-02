import { MdDelete } from 'react-icons/md';
import type { Product } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';
import styles from './ProductsList.module.css';
import type { FC } from 'react';
import defaultIcon from '../../assets/defaultIcon.png';
import FilterSelect from '../FilterSelect/FilterSelect';

type Props = {
  products: Product[];
};

const ProductsList: FC<Props> = ({ products }) => {
  return (
    <div className={styles['products-list__wrapper']}>
      <div className="d-flex align-items-center gap-3 ms-4 mb-4">
        <h2 className={`${styles['products-list__heading']} mb-0`}>
          Продукты / {products.length}
        </h2>
        <div className="ms-5" style={{ minWidth: '260px' }}>
          <FilterSelect />
        </div>
      </div>

      <div className={styles['products-list__scroll']}>
        <ul className={styles['products-list']}>
          {products.map((product) => (
            <li key={product.id} className={styles['products-list__item']}>
              <div
                className={`${styles['products-list__status-dot']} ${
                  product.status === 'на складе'
                    ? styles['products-list__status-dot--green']
                    : styles['products-list__status-dot--black']
                }`}
              />
              <img
                src={product.photo || defaultIcon}
                className={styles['products-list__icon']}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultIcon;
                }}
                alt="icon"
              />
              <div className={styles['products-list__info']}>
                <div className={styles['products-list__name']}>
                  {product.title}
                </div>
                <div className={styles['products-list__serial']}>
                  {product.specification}
                </div>
              </div>
              <div
                className={`${styles['products-list__col']} ${
                  styles['products-list__status']
                } ${
                  product.status === 'на складе'
                    ? styles['products-list__status--free']
                    : styles['products-list__status--repair']
                }`}
              >
                {product.status}
              </div>
              <div className={styles['products-list__col']}>
                с {formatDate(product.guarantee_start, 'dd / LLL / yyyy')}{' '}
                <br />
                по {formatDate(product.guarantee_end, 'dd / LLL / yyyy')}
              </div>
              <div
                className={`${styles['products-list__col']} ${styles['products-list__condition']}`}
              >
                {product.condition}
              </div>
              <div
                className={`${styles['products-list__col']} ${styles['products-list__prices']}`}
              >
                {formatCurrency(product.price_usd ?? 0, 'USD')} <br />
                {formatCurrency(product.price_uah ?? 0, 'UAH')}
              </div>
              <div
                className={`${styles['products-list__col']} ${styles['products-list__group']}`}
              >
                {product.type}
              </div>
              <div
                className={`${styles['products-list__col']} ${styles['products-list__owner']}`}
              >
                {product.username || '—'}
              </div>
              <div
                className={`${styles['products-list__col']} ${styles['products-list__arrival']}`}
              >
                {product.arrival_name}
              </div>
              <div className={styles['products-list__col']}>
                {formatDate(product.date, 'dd / LLL / yyyy')}
              </div>
              <button className={styles['products-list__delete']}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
