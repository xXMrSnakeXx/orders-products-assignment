import { useEffect, useState } from 'react';
import { socket } from '../../services/socket';
import shieldIcon from '../../assets/shieldIcon.png';
import { LuClock8 } from 'react-icons/lu';
import { MdPeople } from 'react-icons/md';
import styles from './TopMenu.module.css';

const TopMenu = () => {
  const [time, setTime] = useState(new Date());
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('activeSessions', (count: number) => {
      setSessions(count);
    });
    return () => {
      socket.off('activeSessions');
    };
  }, []);

  const formatTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();
  };

  return (
    <header
      className={`${styles.topmenu} d-flex justify-content-between align-items-center px-4`}
    >
      <div
        className={`${styles.topmenu__left} d-flex align-items-center gap-2`}
      >
        <img
          src={shieldIcon}
          alt="Shield Icon"
          className={styles.topmenu__icon}
        />
        <span className="fw-bold text-success text-uppercase fs-6">
          Inventory
        </span>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="text-start text-secondary small">
          <div>Today</div>
          <div>{formatDate(time)}</div>
        </div>

        <div className="d-flex align-items-center gap-2 fw-medium text-dark small">
          <LuClock8 color="#4caf50" />
          {formatTime(time)}
        </div>

        <div
          className={`${styles.topmenu__sessions} d-flex align-items-center fw-medium text-success small`}
        >
          <MdPeople className={styles.topmenu__people} />
          {sessions}
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
