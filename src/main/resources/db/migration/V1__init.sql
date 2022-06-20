create table categories
(
    id    bigserial primary key,
    title varchar(255)
);
insert into categories (title)
values ('Food');

create table products
(
    id          bigserial primary key,
    title       varchar(255),
    cost        int,
    category_id bigint references categories (id)
);
insert into products (title, cost, category_id)
values ('product1', 10, 1),
       ('product2', 100, 1),
       ('product3', 80, 1),
       ('product4', 25, 1),
       ('product5', 15, 1),
       ('product6', 66, 1),
       ('product7', 66, 1),
       ('product8', 900, 1),
       ('product9', 400, 1),
       ('product10', 2, 1),
       ('product11', 500, 1),
       ('product12', 550, 1),
       ('product13', 120, 1),
       ('product14', 190, 1),
       ('product15', 78, 1),
       ('product16', 35, 1),
       ('product17', 700, 1),
       ('product18', 680, 1),
       ('product19', 200, 1),
       ('product20', 190, 1);

