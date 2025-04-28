const fs = require('fs');

console.log("start");
const data = fs.readFileSync("sample.txt"); //Sync: 순서대로 출력, 전에 뭐 있으면 기다림
console.log(`길이는 : ${data.length} 입니다.`);
//그냥 readFile은 비동기 -> 코드가 점점 오른쪽으로 쏠림
//promise 이용
