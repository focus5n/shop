## JOIN
SELECT U.NAME FROM USER AS U INNER JOIN CUSTOMER AS C ON U.ID = C.ID
-- 유저아이디랑 고객 아이디 같은 값만 출럭

* A테이블과 B테이블과 공통값만 출력
SELECT A.ID FROM TABLE_A AS A LEFT JOIN TABLE_B AS B ON A.ID = B.ID

* B테이블과 A테이블과 공통값만 출력
SELECT B.ID FROM TABLE_A AS A RIGHT JOIN TABLE_B AS B ON A.ID = B.ID

* A테이블과 B테이블의 공통값만 출력
SELECT ID FROM TABLE_A AS A INNER JOIN TABLE_B AS B ON A.ID = B.ID

* B테이블의 속하지 않는 A테이블의 값만 출력하기
SELECT A.ID FROM TABLE_A AS A INNER JOIN TABLE_B AS B ON A.ID = B.ID WHERE B.ID IS NULL

* 전체 값 출력하기
SELECT ID FROM TABLE_A AS A FULL OUTER JOIN TABLE_B AS B ON A.ID = B.ID

* 공통값만 제외하고 전체 출력
SELECT ID FROM TABLE_A AS A FULL OUTER JOIN TABLE_B AS B ON A.ID = B.ID WHERE A.ID IS NULL OR B.ID IS NULL

## GROUP
SELECT animal_type AS ANIMAL_TYPE, count(*) AS count FROM animal GROUP BY animal_type ORDER BY ANIMAL_TYPE

SELECT name, count(name) FROM animal WHERE name IS NOT NULL GROUP BY name HAVING COUNT(name) >= 2 ORDER BY name
-- 같은 이름인 동물 찾기

## NULL
SELECT animal_id FROM animal WHERE name IS NULL

## IF
SELECT animal_id, name, IF(sex LIKE '%Neutered%' OR sex LIKE '%Spayed%', 'o', 'x') AS '중성화' FROM animal ORDER BY animal_id

## 서브쿼리
SELECT ID, RooNum FROM Reservation WHERE Name IN (SELECT Name FROM Customer WHERE address= '서울')

## IN
SELECT ANIMAL_ID FROM animal WHERE name IN ('hjk', 'hjk2')











