CREATE TABLE `c4711_finalproject`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `subject` VARCHAR(45) NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `FK_post_user_idx` (`user_id` ASC),
  CONSTRAINT `FK_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `c4711_finalproject`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);