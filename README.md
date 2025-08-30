# 카카오톡 웹 애플리케이션

Vue.js와 Express를 사용하여 카카오톡 API를 연동한 웹 애플리케이션입니다.

## 🚀 주요 기능

- 카카오톡 OAuth 로그인
- 사용자 프로필 정보 표시
- 채팅 인터페이스 (샘플 데이터)
- 반응형 웹 디자인
- 현대적인 UI/UX

## 🛠️ 기술 스택

### 프론트엔드
- Vue 3 (Composition API)
- Vue Router
- Pinia (상태 관리)
- Vite (빌드 도구)
- CSS3 (모던 스타일링)

### 백엔드
- Node.js
- Express.js
- Axios (HTTP 클라이언트)
- CORS 지원

## 📋 사전 요구사항

- Node.js 16+ 
- npm 또는 yarn
- 카카오 개발자 계정 및 앱 등록

## 🔧 설치 및 설정

### 1. 저장소 클론
```bash
git clone <repository-url>
cd kakao-talk-vue
```

### 2. 프론트엔드 의존성 설치
```bash
npm install
```

### 3. 백엔드 의존성 설치
```bash
cd server
npm install
cd ..
```

### 4. 환경 변수 설정

#### 프론트엔드 (.env)
```bash
# 프론트엔드는 별도 환경 변수가 필요하지 않습니다
```

#### 백엔드 (server/.env)
```bash
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
KAKAO_REDIRECT_URI=http://localhost:5000/api/auth/kakao/callback
PORT=5000
```

### 5. 카카오 개발자 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. 플랫폼 > Web 설정에서 사이트 도메인 추가: `http://localhost:3000`
3. 카카오 로그인 > Redirect URI 설정: `http://localhost:5000/api/auth/kakao/callback`
4. 동의항목 설정 (닉네임, 프로필 사진 등)

## 🚀 실행 방법

### 개발 모드

#### 백엔드 서버 실행
```bash
cd server
npm run dev
```

#### 프론트엔드 실행 (새 터미널)
```bash
npm run dev
```

### 프로덕션 빌드

```bash
# 프론트엔드 빌드
npm run build

# 백엔드 서버 실행
cd server
npm start
```

## 🌐 접속 URL

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000

## 📱 사용법

1. 홈페이지에서 "카카오톡으로 시작하기" 버튼 클릭
2. 카카오톡 로그인 진행
3. 로그인 성공 후 채팅 페이지로 자동 이동
4. 왼쪽 사이드바에서 대화 선택하여 메시지 확인

## ⚠️ 주의사항

- **카카오톡 API 제한**: 실제 카카오톡 대화 내용은 API로 접근할 수 없습니다
- 현재 구현된 채팅은 샘플 데이터입니다
- 실제 대화 기능을 구현하려면 다른 방법을 고려해야 합니다

## 🔒 보안

- OAuth 2.0을 통한 안전한 인증
- 환경 변수를 통한 민감 정보 보호
- CORS 설정으로 보안 강화

## 📁 프로젝트 구조

```
kakao-talk-vue/
├── src/
│   ├── components/          # Vue 컴포넌트
│   ├── views/              # 페이지 컴포넌트
│   ├── stores/             # Pinia 스토어
│   ├── router/             # Vue Router 설정
│   ├── App.vue             # 메인 앱 컴포넌트
│   └── main.js             # 앱 진입점
├── server/                 # 백엔드 서버
│   ├── server.js           # Express 서버
│   ├── package.json        # 서버 의존성
│   └── .env                # 서버 환경 변수
├── public/                 # 정적 파일
├── index.html              # HTML 템플릿
├── package.json            # 프론트엔드 의존성
├── vite.config.js          # Vite 설정
└── README.md               # 프로젝트 문서
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
