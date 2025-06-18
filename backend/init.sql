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
  guarantee_start TIMESTAMP,
  guarantee_end TIMESTAMP,
  price_usd NUMERIC(10,2),
  price_uah NUMERIC(10,2),
  is_default_currency VARCHAR(10),
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL
);


INSERT INTO orders (title, date, description)
VALUES
  ('Order 1', '2017-06-29 12:09:33', 'Monitors for office'),
  ('Order 2', '2018-02-15 09:45:00', 'Keyboards and mice'),
  ('Order 3', '2019-11-05 16:20:00', 'Printers and accessories'),
  ('Order 4', '2020-01-10 13:00:00', 'Laptops for dev team'),
  ('Order 5', '2021-06-21 08:00:00', 'USB devices'),
  ('Order 6', '2022-03-01 17:45:00', 'Webcams for remote work');

INSERT INTO products (
  serial_number, is_new, photo, title, type, specification,
  guarantee_start, guarantee_end, price_usd, price_uah,
  is_default_currency, order_id, date
)
VALUES
-- Order 1
(111001, TRUE, 'images/monitor1.jpg', 'Monitor AOC 24"', 'Monitors', 'IPS, HDMI, 75Hz',
 '2017-06-29 12:00:00', '2020-06-29 12:00:00', 120.00, 3200.00, 'UAH', 1, '2017-06-29 12:09:33'),

(111002, TRUE, 'images/monitor2.jpg', 'Monitor Samsung 27"', 'Monitors', 'VA, FullHD, 60Hz',
 '2017-06-29 12:00:00', '2020-06-29 12:00:00', 150.00, 4000.00, 'USD', 1, '2017-06-29 12:09:33'),

-- Order 2
(222001, TRUE, 'images/keyboard.jpg', 'Keyboard Logitech K120', 'Keyboards', 'Wired, Membrane',
 '2018-02-01 09:00:00', '2021-02-01 09:00:00', 25.00, 700.00, 'UAH', 2, '2018-02-15 09:45:00'),

(222002, FALSE, 'images/mouse.jpg', 'Mouse HP X1000', 'Mice', 'Wired, Optical',
 '2018-02-01 09:00:00', '2021-02-01 09:00:00', 10.00, 270.00, 'UAH', 2, '2018-02-15 09:45:00'),

-- Order 3
(333001, TRUE, 'images/printer.jpg', 'Printer Canon LBP6030', 'Printers', 'Laser, A4, USB',
 '2019-11-01 16:00:00', '2022-11-01 16:00:00', 95.00, 2500.00, 'USD', 3, '2019-11-05 16:20:00'),

-- Order 4
(444001, TRUE, 'images/laptop.jpg', 'Laptop Dell Inspiron', 'Laptops', 'i5, 8GB, 256SSD',
 '2020-01-01 13:00:00', '2023-01-01 13:00:00', 750.00, 20000.00, 'USD', 4, '2020-01-10 13:00:00'),

-- Order 5
(555001, TRUE, 'images/usb.jpg', 'USB Kingston 32GB', 'USB devices', 'USB 3.0, metal',
 '2021-06-01 08:00:00', '2023-06-01 08:00:00', 8.00, 220.00, 'UAH', 5, '2021-06-21 08:00:00'),

(555002, FALSE, 'images/usb.jpg', 'USB SanDisk 64GB', 'USB devices', 'USB 3.1, plastic',
 '2021-06-01 08:00:00', '2023-06-01 08:00:00', 11.00, 290.00, 'USD', 5, '2021-06-21 08:00:00'),

-- Order 6
(666001, TRUE, 'images/webcam.jpg', 'Webcam Logitech C270', 'Webcams', 'HD, Built-in mic',
 '2022-03-01 17:30:00', '2024-03-01 17:30:00', 45.00, 1200.00, 'UAH', 6, '2022-03-01 17:45:00');
