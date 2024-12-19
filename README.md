<<<<<<< HEAD
# dozn_assignment_project
![image](https://github.com/user-attachments/assets/ed4b0703-9b65-461f-902e-1a42f1a22cba)
<br/> (주)더즌 사전과제 입니다. <br/>

## 프로그램 실행
```
npm run dev
```

## 프로젝트의 구성
**Page1:**  로그인 페이지 <br/>
**Page2:**  API 목록 조회 페이지 + 스크래핑 데이터 호출 후, 응답 팝업 페이지<br/>
**Page3:**  호출 모록 조회 페이지 + 스크래핑 데이터 호출에 대한 응답 팝업 펭지<br/>

## 추가 component
- [x] Navbar 구현
      <li/> 유효한 토큰 보유 시, 목록 조회 네비게이션 표시 x 
      <li/> 만료된 토큰 or 토큰 미보유 시 로그인 버튼만 표시 x 

### page1: 로그인 페이지
- [x] 로그인을 하여야만 다른 페이지에 접속 가능
- [x] 로그인 유효성 검사 추가 
      <li/> 아무것도 작성 안하면 에러 x
      <li/> 아이디는 4 ~ 12 글자 x
      <li/> 비밀번호는 8글자 이상, 영문, 숫자 x
      <li/> 에러 발생 시 인풋 아래에 에러 메시지 출력 x

- [x] 특정 아이디로 로그인 후, 로그인 성공 시, 토큰 저장
- [x] 토큰의 유효성 체크
- [X] 저장된 토큰 만료 시, 자동으로 로그아웃 후, 로그인 페이지로 리다이렉트
- [x] 유효한 토큰으로 접속 시, home 페이지로 리다이렉트
      

### page2: API 목록 조회 페이지 &  스크레핑 데이터 호출 후, 응답 팝업 페이지
- [x] api 응답 데이터는 페이지네이션 적용
- [x] 데이터는 테이블 형식으로 표시, 페이지당 10행씩
- [x] 테이블 칼럼
  <br/> <br/>
  | API 이름 | API 코드 | API 설명 | 모듈 코드 | 모듈 이름 | 키워드 코드 | 키워드 이름 | 제공기관 |
  <br/><br/>
- [x] 각 행에는 호출 버튼을 두고, 클릭 시 스크래핑 데이터 호출 및 응답 값을 팝업으로 표시


### page3: 호출 목록 조회 페이지 & 스크레핑 데이터 호출에 대한 응답 팝업 페이지
- [x] 스크래핑 데이터 호출 히스토리는 카드 형태로 표시 <br/>
      **다음 내용 표시:** 호출 시간, API 이름, API 코드, 모듈 코드, 모듈 이름
- [x] 카드에는 북마크 표시가 있고, 활성화된 카드는 맨 위에 정렬
- [x] 최신순, 오래된 순으로 정렬 기능 추가
- [x] 스크래핑 데이터 호출에 대한 응답 값을 팝업으로 표시
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> dcbd967 (feat: 프로젝트 생성)
