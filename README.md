# movie-frontend

Vue 3 웹 프론트엔드 애플리케이션입니다. 영화 정보를 검색하고 표시하는 사용자 인터페이스를 제공합니다.  

<br>

## 영화 프로젝트 구조

- **<a href="https://github.com/howtis/tmdb-java-api" target="_blank">tmdb-java-api</a>**:
자바로 개발된 라이브러리로, 영화 프로젝트를 위해 The Movie Database (TMDb) API와 통신하여 영화 정보를 검색하고 제공하는 라이브러리입니다.

- **<a href="https://github.com/howtis/movie-backend" target="_blank">movie-backend</a>**:
Spring Boot 백엔드 애플리케이션입니다. 프론트엔드와 TMDb API, DB 간의 통신을 담당하여 데이터를 저장 및 프론트엔드로 제공합니다.

- **<a href="https://github.com/howtis/movie-helm-chart" target="_blank">movie-helm-chart</a>**:
Kubernetes에서 영화 프로젝트를 배포하기 위한 Helm Chart입니다.

<br>

## 프로젝트 사이트

[p01076322603.site](https://p01076322603.site)

<br>

## 사용한 플러그인

```
axios
swiper
bootstrap-vue-3
vue-recaptcha-v3
infinite-loading-vue3-ts
```

<br>

## 테스트
개발 환경 실행을 위해 다음 환경변수가 설정되어야 합니다.
```
.env.local (또는 다른 환경을 위한 파일)
VUE_APP_TMDB_IMAGE_PATH = https://image.tmdb.org/t/p
VUE_APP_BACKEND_API = BACKEND_URL:PORT
VUE_APP_CAPTCHA_SITEKEY = RECAPTCHA_V3_SITEKEY
```
BACKEND_URL:PORT: 개발 환경 백엔드에 맞는 주소로 변경해야 합니다.  
RECAPTCHA_V3_SITEKEY: [reCAPTCHA V3](https://www.google.com/recaptcha/admin/create?hl=ko) 사이트 키를 발급받아 변경해야 합니다.
