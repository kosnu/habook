CREATE TABLE payments (
    pk                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id                VARCHAR(256) NOT NULL,
    paid_on           DATETIME     NOT NULL,
    number_of_product INT UNSIGNED NOT NULL,
    amount            INT UNSIGNED NOT NULL,
    product_id        VARCHAR(256) NOT NULL,
    category_id       VARCHAR(256) NOT NULL,
    user_id           VARCHAR(256) NOT NULL,
    created_at        DATETIME     NOT NULL,
    updated_at        DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS products (
    pk         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id         VARCHAR(256) NOT NULL,
    name       VARCHAR(256) NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS categories (
    pk         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id         VARCHAR(256) NOT NULL,
    name       VARCHAR(256) NOT NULL,
    enable     BOOLEAN      NOT NULL,
    user_id    VARCHAR(256) NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS users (
    pk         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id         VARCHAR(256) NOT NULL,
    name       VARCHAR(256) NOT NULL,
    enable     BOOLEAN      NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS income_histories (
    pk         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id         VARCHAR(256) NOT NULL,
    income     INT UNSIGNED NOT NULL,
    user_id    VARCHAR(256) NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS expense_histories (
    pk         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id         VARCHAR(256) NOT NULL,
    expense    INT UNSIGNED NOT NULL,
    user_id    VARCHAR(256) NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    PRIMARY KEY (pk),
    UNIQUE (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;
