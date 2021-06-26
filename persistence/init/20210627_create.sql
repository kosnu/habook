CREATE TABLE IF NOT EXISTS `payment` (
    `id`                BIGINT UNSIGNED NOT NULL,
    `tax_included`      BOOLEAN         NOT NULL,
    `paid_on`           DATETIME        NOT NULL,
    `number_of_product` INT UNSIGNED    NOT NULL,
    `amount`            INT UNSIGNED    NOT NULL,
    `product_id`        BIGINT UNSIGNED NOT NULL,
    `category_id`       BIGINT UNSIGNED NOT NULL,
    `user_id`           BIGINT UNSIGNED NOT NULL,
    `created_at`        DATETIME        NOT NULL,
    `updated_at`        DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `product` (
    `id`         BIGINT UNSIGNED NOT NULL,
    `name`       VARCHAR(256)    NOT NULL,
    `created_at` DATETIME        NOT NULL,
    `updated_at` DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `category` (
    `id`         BIGINT UNSIGNED NOT NULL,
    `name`       VARCHAR(256)    NOT NULL,
    `enable`     BOOLEAN         NOT NULL,
    `user_id`    BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME        NOT NULL,
    `updated_at` DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `user` (
    `id`         BIGINT UNSIGNED NOT NULL,
    `name`       VARCHAR(256)    NOT NULL,
    `enable`     BOOLEAN         NOT NULL,
    `created_at` DATETIME        NOT NULL,
    `updated_at` DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `income_history` (
    `id`         BIGINT UNSIGNED NOT NULL,
    `income`     INT UNSIGNED    NOT NULL,
    `user_id`    BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME        NOT NULL,
    `updated_at` DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `expense_history` (
    `id`         BIGINT UNSIGNED NOT NULL,
    `expense`    INT UNSIGNED    NOT NULL,
    `user_id`    BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME        NOT NULL,
    `updated_at` DATETIME        NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE utf8_bin;
