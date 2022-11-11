## WAS

웹 브라우저 - 서버 - was - db
was는 자바 Web Application Server의 약자 웹 컨테이너라고도 한다
브라우저에서 요청한게 동적이라면 이를 Was에서 처리하고 결과를 반환함
대표적으로 nginx apache등

* 기능
데이터 베이스
트랜젝션
비즈니스 로직 수행

* WebServer를 앞에 두는 이유
Was에서만 처리하면 속도가 느리므로 Web Server에서 따로 처리 할 수 있는것은 Was로 오기전에 Web Server에서 해결한다