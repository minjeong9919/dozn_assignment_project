# dozn_assignment_project
(주)더즌 사전과제 입니다. 
![image](https://github.com/user-attachments/assets/ed4b0703-9b65-461f-902e-1a42f1a22cba)


## 프로젝트의 구성
**Page1:**  로그인 페이지 <br/>
**Page2:**  API 목록 조회 페이지 + 스크래핑 데이터 호출 후, 응답 팝업 페이지<br/>
**Page3:**  호출 모록 조회 페이지 + 스크래핑 데이터 호출에 대한 응답 팝업 펭지<br/>

### page1: 로그인 페이지
- [ ] 로그인을 하여야만 다른 페이지에 접속 가능
- [ ] 로그인 유효성 검사 추가 
      <li/> 아무것도 작성 안하면 에러 x
      <li/> 아이디는 4 ~ 12 글자
      <li/> 비밀번호는 8글자 이상, 영문, 숫자
      <li/> 에러 발생 시 인풋 아래에 에러 메시지 출력 x

- [x] 특정 아이디로 로그인 후, 로그인 성공 시, 토큰 저장
- [x] 토큰의 유효성 체크
- [ ] 저장된 토큰 만료 시, 자동으로 로그아웃 후, 로그인 페이지로 리다이렉트
      

### page2: API 목록 조회 페이지 &  스크레핑 데이터 호출 후, 응답 팝업 페이지
- [ ] api 응답 데이터는 페이지네이션 적용
- [x] 데이터는 테이블 형식으로 표시, 페이지당 10행씩
- [x] 테이블 칼럼
  <br/> <br/>
  | API 이름 | API 코드 | API 설명 | 모듈 코드 | 모듈 이름 | 키워드 코드 | 키워드 이름 | 제공기관 |
  <br/><br/>
- [ ] 각 행에는 호출 버튼을 두고, 클릭 시 스크래핑 데이터 호출 및 응답 값을 팝업으로 표시


### page3: 호출 목록 조회 페이지 & 스크레핑 데이터 호출에 대한 응답 팝업 페이지
- [ ] 스크래핑 데이터 호출 히스토리는 카드 형태로 표시 <br/>
      **다음 내용 표시:** 호출 시간, API 이름, API 코드, 모듈 코드, 모듈 이름
- [ ] 카드에는 북마크 표시가 있고, 활성화된 카드는 맨 위에 정렬
- [ ] 최신순, 오래된 순으로 정렬 기능 추가
- [ ] 스크래핑 데이터 호출에 대한 응답 값을 팝업으로 표시
