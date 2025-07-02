import type React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className={`d-flex ${styles.container}`}>{children}</div>;
};

export default Container;
