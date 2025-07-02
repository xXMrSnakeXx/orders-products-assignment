import React from 'react';
import Modal from 'react-modal';
import styles from './DeleteOrderModal.module.css';
import { MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import type { OrderWithProducts } from '../../types';
import { formatDate } from '../../utils/helpers';

Modal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onDelete: () => void;
  order: OrderWithProducts | null;
}

export const DeleteOrderModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  onDelete,
  order,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles['delete-modal__window']}
      overlayClassName={styles['delete-modal__overlay']}
      ariaHideApp={false}
    >
      <button
        className={styles['delete-modal__close']}
        onClick={onRequestClose}
      >
        <RxCross2 size="15" />
      </button>

      <div className="border-bottom px-4 pt-4 pb-3">
        <h2 className="fs-5 fw-semibold text-dark m-0">
          Вы уверены, что хотите удалить этот приход?
        </h2>
      </div>

      <div className="d-flex align-items-center gap-3 px-4 py-3">
        <div className={styles['delete-modal__dot']} />
        <div className="flex-grow-1 d-flex justify-content-between align-items-center mt-1">
          <p className="fw-medium text-dark m-0">{order?.title}</p>
          <p className="text-secondary m-0 small">
            {order?.products?.length} Продукта
          </p>
          <p className="text-secondary m-0 small">
            {order?.date ? formatDate(order?.date, 'dd/MM') : ''}
          </p>
        </div>
      </div>

      <div
        className={`d-flex justify-content-end gap-3 px-4 py-3 ${styles['delete-modal__footer']}`}
      >
        <button
          onClick={onRequestClose}
          className="btn bg-white text-dark border-0"
        >
          ОТМЕНИТЬ
        </button>
        <button
          onClick={onDelete}
          className="btn btn-danger d-flex align-items-center gap-2"
        >
          <MdDelete size="20" />
          УДАЛИТЬ
        </button>
      </div>
    </Modal>
  );
};
