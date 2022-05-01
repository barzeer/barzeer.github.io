--
-- Schema magazine
--
DROP SCHEMA IF EXISTS magazine ;

CREATE SCHEMA IF NOT EXISTS magazine DEFAULT CHARACTER SET utf8mb4 ;
USE magazine ;

--
-- Table magazine
--
DROP TABLE IF EXISTS magazine;

CREATE TABLE magazine (
    magazineKey INT(11) NOT NULL AUTO_INCREMENT,
    magazineName VARCHAR(45) NOT NULL,
    magazinePrice decimal(8,2) DEFAULT NULL,
    PRIMARY KEY (magazineKey)
) ENGINE = InnoDB ;

--
-- Table subscriber
--
DROP TABLE IF EXISTS subscriber;

CREATE TABLE subscriber (
    subscriberKey INT(11) NOT NULL AUTO_INCREMENT,
    subscriberLastName VARCHAR(45) NOT NULL,
    subscriberFirstName VARCHAR(45) NOT NULL,
    subscriberAddress VARCHAR(45) NOT NULL,
    subscriberCity VARCHAR(45) NOT NULL,
    subscriberState CHAR(2) NOT NULL,
    subscriberZIP CHAR(10) NOT NULL,
    PRIMARY KEY (subscriberKey)
) ENGINE = InnoDB ;

--
-- Table subscription
--
DROP TABLE IF EXISTS subscription;

CREATE TABLE subscription (
    subscriptionKey INT(11) NOT NULL AUTO_INCREMENT,
    magazineKey INT(11) NOT NULL,
    subscriberKey INT(11) NOT NULL,
    subscriptionStartDate DATE NOT NULL,
    subscriptionLength INT(11) NOT NULL,
    PRIMARY KEY (subscriptionKey),
    KEY idx_subscription_magazine (magazineKey),
    KEY idx_subscription_subscriber (subscriberKey),
    CONSTRAINT fk_subscription_magazine FOREIGN KEY (magazineKey) REFERENCES magazine (magazinekey),
    CONSTRAINT fk_subscription_subscriber FOREIGN KEY (subscriberKey) REFERENCES subscriber (subscriberkey)
) ENGINE = InnoDB ;


INSERT INTO magazine
(magazineKey, magazineName, magazinePrice)
VALUES
(1, 'Fishing in the Mojave', 13.95),
(2, 'Car Racing Made Easy', 15.45),
(3, 'Pine Cone Computing', 17.50),
(4, 'Cooking Like Mad', 18.00),
(5, 'If Only I Could Sing', 12.45),
(6, 'Beautiful Birds', 12.45),
(7, 'Corn Shucking for Fun and Profit', 15.05),
(8, 'MySQL Magic', 10.95);

INSERT INTO subscriber
(subscriberKey, subscriberLastName, subscriberFirstName,
subscriberAddress, subscriberCity, subscriberState, subscriberZIP)
VALUES
(1, 'Johnston', 'Julie', '10336 NE 187th St', 'Bothell', 'WA', '98012'),
(2, 'Anderson', 'Albert', '220 K Street Southeast', 'Auburn', 'WA', '98002'),
(3, 'Sanders', 'Samantha', '316 Union Ave', 'Snohomish', 'WA', '98290'),
(4, 'Jimenez', 'Jose', '187 27th Ave', 'Seattle', 'WA', '98122'),
(5, 'Lamont', 'Lucy', '175 Smokey Point Dr', 'Lakewood', 'WA', '98409'),
(6, 'Wong', 'Walter', '1073 South 323rd Street', 'Federal Way', 'WA', '98003');

INSERT INTO subscription
(subscriptionKey, magazineKey, subscriberKey,
subscriptionStartDate, subscriptionLength)
VALUES
(1, 1, 1, '2011-03-01', 12),
(2, 2, 2, '2011-03-01', 14),
(3, 6, 3, '2012-02-01', 12),
(4, 6, 5, '2012-02-01', 12),
(5, 4, 3, '2011-09-01', 12),
(6, 7, 5, '2012-07-01', 24),
(7, 7, 4, '2012-08-01', 12),
(8, 1, 3, '2011-05-01', 12),
(9, 1, 4, '2011-09-01', 12),
(10, 5, 3, '2011-12-01', 12),
(11, 3, 3, '2011-05-01', 18);

