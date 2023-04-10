# 🚀 프로젝트 설명
* 본 프로젝트는 **API 콜 최적화**를 적용한 **검색어 조회 웹 사이트** 입니다.

# 🚩 베포 주소
[React_SearchApi](https://64297d1c7910a60008dcf006--statuesque-beijinho-50a311.netlify.app/)

<br>

# 💻 실제 구현 화면
* 메인 화면
<img src="https://user-images.githubusercontent.com/61799492/229288180-4a126af8-c054-4526-b70c-58f57e1f9381.png" />

<hr>

* 검색 시 화면
<img src="https://user-images.githubusercontent.com/61799492/229288369-7bcdd27e-64a7-42bd-94c6-070af9576164.png" />

<hr>

* 검색 후 화면
<img src="https://user-images.githubusercontent.com/61799492/229288424-02ed0321-2565-4330-b810-71d4f9855044.png" />

<br>

# ⚒️ 주요 기능 구현
* **API 콜 최적화**
  * 검색 서비스는 사용자가 입력할 때마다 API 콜을 요청하기 때문에 비효율적일 수 있어, 이를 최적화
  * 단, axios만 사용 가능(axios의 cache 옵션 X, react-query와 같은 캐싱 라이브러리 사용 X)
  * react, react-router-dom, styled-componet와 같은 기본적인 라이브러리만 사용 가능
  
* **최근 검색어 기능**
  * 최근 검색어 최대 5개
  * 5개 안에 중복된 검색어 있을 경우, 새로 추가 X ➡️ 기존에 있던 검색어가 가장 첫 번째로 이동
  * 5개가 넘었을 때 새로운 검색어가 추가되면, 가장 마지막 검색어 삭제
  * 해당 데이터는 웹 페이지 종료 후에도 유지되도록
  
* **키보드 만으로 추천 검색어 및 일반 검색 기능**
  * 키보드 만으로 상하 이동, ENTER로 검색
  * 마우스 클릭으로도 검색어로 검색 가능
  * 검색 시 별다른 페이지 이동 없이 최근 검색어가 추가되는 형태
  
* **검색 단어 하이라이트**
  * 검색어가 포함된 부분을 하이라이트
  * 검색 결과가 없을 시 "검색결과가 없습니다"라는 백엔드에서 전송한 메시지 출력

<br>

# ✨ API 콜 최적화 방법 - Debouncing
* API 콜 최적화 방법으로는 쓰로틀링, 디바운싱, API 캐시, axios에서 관련 설정, 캐싱 라이브러리 사용 등 여러 방법이 존재합니다.
  * **쓰로틀링** : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
  * **디바운싱** : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
  
![쓰로틀링 디바운싱](https://user-images.githubusercontent.com/61799492/229331078-44beaeec-82e1-4a73-985c-cae1106833ba.png)

* 이미지출처(좌) : <a href="https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1%EA%B3%BC-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-e02f6bb14627">오늘의-프로그래밍/디바운싱과-쓰로틀링-이해하기</a>

* 이미지출처(우) : <a href="https://guiyomi.tistory.com/122">디바운싱(debouncing) vs 쓰로틀링(throttling) - 둉이</a>

<br>

👉 저는 이 중 **디바운싱** 방법을 채택하여 본 프로젝트에 적용했습니다. 해당 방법은 택한 이유는 다음과 같습니다.
- 사용자가 검색 시 입력했던 마지막으로 입력된 문자를 기준으로 연관검색어가 나와야한다고 생각하기에<br>이벤트가 연속적으로 발생하더라도 설정한 특정 시간 동안은 이벤트가 발생하지 않고, 맨 마지막 이벤트에서 발생시키는 디바운싱 방식을 검색 기능에 적용하는 것이 맞다고 판단했습니다.

* 적용한 방식 설명
```
  📜 SearchList.js
  
	// 디바운스 적용
	// searchInput값이 바뀔 때마다 안에 정의 실행
	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchInput === '') {
				setSearchList([])
				return
			}
			getData(`${searchInput}`)
				.then(data => {
					if (typeof data !== 'string' && data.length > maxSearchList) {
						return setSearchList(data.slice(0, maxSearchList))
					}
					setSearchList(data)
				})
				.catch(error => {
					console.log(error)
				})
		}, 00)

		return () => {
			clearTimeout(handler)
		}
	}, [searchInput])
```
  
* 입력을 하게 되면 화면이 렌더링되면서 searchInput에 의존성을 가지고 있는 useEffect가 실행 <br>
    ➡️ API 요청을 보낸다.<br>
    ➡️ 그런데 그 요청은 0.3초 이후에 보내도록<br>
    ➡️ ※ 결론적으로는 입력이 멈춘 후 0.3초 동안 기다린 후에 API 요청을 보낸다<br>
    
    ==> 결론적으로 onChange 이벤트가 발생할 떄마다
        매번 API 요청을 보내지 않고, 일정 term(0.3초)을 두고 요청을 보낸다.
        너무 많은 이벤트를 호출하지 않아 과도한 API 콜을 하지 않아 성능 개선에도 도움이 된다.
     
    ==> 특히, 사용감에도 큰 불편이 없었다.

![디바운스](https://user-images.githubusercontent.com/61799492/229330720-cfc3f81a-c0f9-4e35-9466-7a1561e4ab2b.gif)

* 특정 구간에 검색어를 입력할 경우 API 요청을 보내지 않고, 마지막 이벤트에서만 API 요청을 보내고 있습니다.
* 이벤트가 발생할 때마다 요청을 보내는 것이 아닌, 특정 구간에서만 API 요청을 보냅니다.

# 🔐 CORS 에러 정의
#### CORS(Cross Origin Resource Sharing)
    CORS는 다른 도메인을 가진 리소스에 엑세스할 수 있게 하는 보안 메커니즘
  👉 아무나 우리 서버에 요청을 보낼 수 있다면, 누군가 악의적으로 서버에 접근이 가능해진다는 것입니다.<br>
      이를 방지하기 위해 기본적으로 브라우저에서는 현재 있는 도메인/포트와 다른 곳으로 요청을 보내는 것을 원천적으로 막아놓습니다.
  <br>    
#### CORS 에러 해결방법

**🪄 1. 클라이언트에서 해결**<br />
  * Proxy 패턴 이용<br />
      클라이언트 웹페이지에서 직접 요청을 보내는 것이 아니라, 클라이언트 페이지 -> 클라이언트 서버 -> 백엔드 서버<br>
      👉 중간 다리를 하나 놓는다!<br>
      👉 서버에서 서버끼리 통신할 때는 CORS 정책이 적용❌을 이용<br>
      
**🪄 2. 서버(NodeJS)에서 해결**<br />
  * 응답 헤더에 Access-Control-Allow-Origin 헤더를 삽입
  * cors 미들웨어 사용
  * 쿠키 요청 허용

👉 저는 Proxy 패턴을 이용하여 CORS에러를 해결하는 방안으로 하였습니다.

```
  📜 setupProxy.js
  
// CORS 에러를 방지하기 위해 Proxy를 추가

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/search',
		createProxyMiddleware('/search', {
			target: 'http://localhost:8080',
			changeOrigin: true,
		}),
	)
}

-------------------------------------------------------------------------

  📜 package.json
  
"proxy": "http://localhost:8080"

```

