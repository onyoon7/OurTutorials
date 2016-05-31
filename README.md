# OurTutorials

## Installation
`npm intall`

## How to start
### Development
`npm run dev`

### Production
`npm build`
`npm start`

## How to improve
1. 카테고리 내 링크 더하기 (오늘 안에 업데이트 될 것)

2. 링크
  - like 기능
  - 링크 생성 시 서버 쪽에 보내 줄 인자를 모두 보내주기(userId, categoryId 등등)

3. Dashboard
  - 현재 로그인 된 유저가 좋아요를 누른 링크들과 그 카테고리를 가져와서 보여주기

4. css 통일
  - 현재는 css가 모듈화 돼 있다. 프로젝트가 커지면 이게 확실히 좋겠지만, 현재는 들어갈 css가 그렇게 많지 않기 때문에 하나로 통일하는 것이 좋을 듯하다. 그래서 원래 각 component에서 import해야만 css를 쓸 수 있게 했던 웹팩 세팅을 바꾼 상태다.

  -이제는 최상위 컴포넌트에서 css를 한번만 import하고, 원하는 부분에 className='CSS' 식으로 먹이면 된다.

  -현재 css들이 중복되는 이름이 여러군데 흩어져 있는데, 이것을 하나의 css 파일로 합치고, 필요한 것들만 골라내는 작업이 필요하다.
