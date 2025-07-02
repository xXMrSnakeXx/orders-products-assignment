CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  description TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  serial_number BIGINT NOT NULL,
  is_new BOOLEAN DEFAULT TRUE,
  photo VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  specification TEXT,
  guarantee_start TIMESTAMP NOT NULL,
  guarantee_end TIMESTAMP NOT NULL,
  price_usd NUMERIC(10,2) NOT NULL,
  price_uah NUMERIC(10,2) NOT NULL,
  is_default_currency VARCHAR(10),
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL,
  status VARCHAR(100),
  condition VARCHAR(100),
  username VARCHAR(100),
  group_name VARCHAR(100)
);

INSERT INTO orders (title, date, description) VALUES
  ('Приход №1', '2017-06-29 12:09:33', 'Мониторы для офиса'),
  ('Приход №2', '2018-02-15 09:45:00', 'Клавиатуры и мыши'),
  ('Приход №3', '2019-11-05 16:20:00', 'Принтеры и аксессуары'),
  ('Приход №4', '2020-01-10 13:00:00', 'Ноутбуки для команды'),
  ('Приход №5', '2021-06-21 08:00:00', 'USB устройства'),
  ('Приход №6', '2022-03-01 17:45:00', 'Камеры для удаленной работы');

INSERT INTO products (
  serial_number, is_new, photo, title, type, specification,
  guarantee_start, guarantee_end, price_usd, price_uah,
  is_default_currency, order_id, date,
  status, condition, username, group_name
)
VALUES
(111001, TRUE, 'https://img.icons8.com/fluency/48/monitor.png', 'Монитор AOC 24"', 'Мониторы', 'IPS, HDMI, 75Hz',
 '2017-06-29 12:00:00', '2020-06-29 12:00:00', 120.00, 3200.00, 'UAH', 1, '2017-06-29 12:09:33',
 'в эксплуатации', 'новый', 'Иван Иванов', 'Офис №1'),

(111002, TRUE, 'https://img.icons8.com/fluency/48/monitor.png', 'Монитор Samsung 27"', 'Мониторы', 'VA, FullHD, 60Hz',
 '2017-06-29 12:00:00', '2020-06-29 12:00:00', 150.00, 4000.00, 'USD', 1, '2017-06-29 12:09:33',
 'в резерве', 'новый', NULL, 'Офис №1'),

(222001, TRUE, 'https://aristocomputers.com/wp-content/uploads/2019/06/k120.jpg', 'Клавиатура Logitech K120', 'Клавиатуры', 'Проводная, мембранная',
 '2018-02-01 09:00:00', '2021-02-01 09:00:00', 25.00, 700.00, 'UAH', 2, '2018-02-15 09:45:00',
 'в эксплуатации', 'новый', 'Светлана Орлова', 'Офис №2'),

(222002, FALSE, 'https://nayejaisa.com/wp-content/uploads/2022/06/61KSceiLHwL._SL1500_-700x700.jpg', 'Мышь HP X1000', 'Мыши', 'Проводная, оптическая',
 '2018-02-01 09:00:00', '2021-02-01 09:00:00', 10.00, 270.00, 'UAH', 2, '2018-02-15 09:45:00',
 'на списание', 'Б/У', 'Сергей Руденко', 'Офис №2'),

(333001, TRUE, 'https://img.freepik.com/premium-photo/white-background-printer_1106493-38474.jpg', 'Принтер Canon LBP6030', 'Принтеры', 'Лазерный, A4, USB',
 '2019-11-01 16:00:00', '2022-11-01 16:00:00', 95.00, 2500.00, 'UAH', 3, '2019-11-05 16:20:00',
 'в эксплуатации', 'новый', 'Марина Голикова', 'Офис №3'),

(444001, TRUE, 'https://img.icons8.com/fluency/48/laptop.png', 'Ноутбук Dell Inspiron', 'Ноутбуки', 'i5, 8ГБ, 256SSD',
 '2020-01-01 13:00:00', '2023-01-01 13:00:00', 750.00, 20000.00, 'USD', 4, '2020-01-10 13:00:00',
 'в ремонте', 'новый', 'Антон Смирнов', 'Ремонтный отдел'),

(555001, TRUE, 'https://tse1.mm.bing.net/th?id=OIP.SN-euTHLoY4dJTBJVpcS5QHaHo&r=0&w=474&h=474&c=7', 'USB Kingston 32GB', 'USB устройства', 'USB 3.0, металл',
 '2021-06-01 08:00:00', '2023-06-01 08:00:00', 8.00, 220.00, 'UAH', 5, '2021-06-21 08:00:00',
 'на складе', 'новый', 'Андрей Ковалёв', 'Склад №1'),

(555002, FALSE, 'https://tse1.mm.bing.net/th?id=OIP.SN-euTHLoY4dJTBJVpcS5QHaHo&r=0&w=474&h=474&c=7', 'USB SanDisk 64GB', 'USB устройства', 'USB 3.1, пластик',
 '2021-06-01 08:00:00', '2023-06-01 08:00:00', 11.00, 290.00, 'USD', 5, '2021-06-21 08:00:00',
 'на складе', 'новый', 'Ирина Мельник', 'Склад №1'),

(666001, TRUE, 'https://tse2.mm.bing.net/th?id=OIP.1zsCnp9Y4_xvW66K3jZergHaHo&r=0&w=474&h=474&c=7', 'Webcam Logitech C270', 'Web-камеры', 'HD, встроенный микрофон',
 '2022-03-01 17:00:00', '2024-03-01 17:00:00', 45.00, 1200.00, 'UAH', 6, '2022-03-01 17:45:00',
 'в эксплуатации', 'новый', 'Алексей Иванов', 'Офис №4');
