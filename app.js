const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
// jwt secretkey 처리
// const secretKey = require('./config/jwt')
// const SECRET_KEY = secretKey;

app.get("/", (req, res) => {
  res.send("hello world@@");
});
app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

// app.post("/login", (req, res) => {
app.get("/login", (req, res) => {
  // req > id / pw 전달받아
  let id = "abcd";
  let pw = "1234";

  // db 확인 > select * from user where id = '${id}' and pw = '${pw}'

  // 데이터 존재 > token 발행 > 전달
  token = jwt.sign(
    {
      type: "JWT",
      id: id,
    },
    // SECRET_KEY,
    "1234", // SECRET_KEY 예시로 1234 지정
    {
      expiresIn: "15m", // 만료시간 15분
      issuer: "amj",
    }
  );
  console.log(token);
  // user에게 발행된 토큰값 보내기
  res.send(token);
});

app.get("/getOrderList", (req, res) => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJhYmNkIiwiaWF0IjoxNjk4MzE0NzU1LCJleHAiOjE2OTgzMTU2NTUsImlzcyI6ImFtaiJ9.TnHLu5bzsYu905O2wT-74Db0GcuuEA9GvT-r2l5KPCg";
  // 토큰 검사 jwt.verify(token, secretKey) secretKey가 일치하는지 불일치 시 데이터 undefined

  jwt.verify(token, "1234", (err, decoded) => {
    // db 조회 > select * from table where user_id = '${decoded_id}'
    if (err) {
      console.log(`error 발생\n ${err}`);
    }
    console.log(decoded);
    // 검증완료시 > 필요한 정보 반환
    res.send(decoded);
  });
});
