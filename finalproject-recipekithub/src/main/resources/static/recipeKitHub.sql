SELECT * FROM QNA_BOARD;
SELECT * FROM BOOKMARK;
SELECT * FROM CART_DETAIL;
SELECT * FROM CART;
SELECT * FROM LIKE_RKH;
SELECT * FROM MEALKIT_BOARD;
SELECT * FROM MEALKIT_COMMENT;
SELECT * FROM MEALKIT_STAR_SCORE;
SELECT * FROM MEMBER;
SELECT * FROM PAYMENT;
SELECT * FROM RECIPE_BOARD;
SELECT * FROM RECIPE_CATEGORY;
SELECT * FROM RECIPE_COMMENT;
SELECT * FROM REPORT;

COMMIT

INSERT INTO QNA_BOARD VALUES();
INSERT INTO BOOKMARK VALUES();
INSERT INTO CART_DETAIL VALUES();
INSERT INTO CART VALUES();
INSERT INTO LIKE_RKH VALUES();
INSERT INTO MEALKIT_BOARD VALUES();
INSERT INTO MEALKIT_COMMENT VALUES();
INSERT INTO MEALKIT_STAR_SCORE VALUES();
INSERT INTO MEMBER VALUES();
INSERT INTO PAYMENT VALUES();
INSERT INTO RECIPE_BOARD VALUES();
INSERT INTO RECIPE_CATEGORY VALUES();
INSERT INTO RECIPE_COMMENT VALUES();
INSERT INTO REPORT VALUES();

SELECT TO_CHAR(SYSDATE,'YYYY-MM-DD HH:MI:SS') FROM DUAL;

ALTER TABLE MEMBER MODIFY member_reg_date DATE DEFAULT SYSDATE;

INSERT INTO MEMBER VALUES('kjoonie@naver.com', 'asdf', '금동준', 'kdj', '성남시 분당구', '01031609315', to_date('1993-01-05','YYYY-MM-DD'), '1', 'Y', sysdate);

DROP TABLE BOOKMARK_RKH;

ALTER TABLE recipe_board ADD (recipe_board_hits NUMBER DEFAULT 0);
ALTER TABLE mealkit_board ADD (mealkit_board_hits NUMBER DEFAULT 0);

ALTER TABLE mealkit_board RENAME COLUMN mealkit_production_date TO mealkit_reg_date;
ALTER TABLE mealkit_board RENAME COLUMN mealkit_expiration_date TO mealkit_edit_date;

COMMIT

ALTER TABLE MEALKIT_BOARD MODIFY (mealkit_category VARCHAR2(45));


ALTER TABLE MEALKIT_BOARD MODIFY mealkit_image DEFAULT NULL;
ALTER TABLE MEMBER MODIFY member_status DEFAULT 'Y';

ALTER TABLE MEALKIT_BOARD MODIFY mealkit_board_hits NUMBER DEFAULT 0;
ALTER TABLE RECIPE_BOARD MODIFY recipe_board_hits NUMBER DEFAULT 0;