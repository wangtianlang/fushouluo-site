// ---------------- 1. 地图功能 ----------------
const map = L.map('map').setView([31.027, 120.293], 13);
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
  subdomains: ['1', '2', '3', '4'],
  maxZoom: 18,
  attribution: '© 高德地图'
}).addTo(map);

const sites = [
  { lat: 31.030, lng: 120.295, type: "卵块", note: "岸边芦苇茎秆" },
  { lat: 31.024, lng: 120.290, type: "成螺", note: "浅水区石块下" },
  { lat: 31.033, lng: 120.300, type: "高风险水域", note: "沟渠汇入太湖处" },
];

sites.forEach(s => {
  L.marker([s.lat, s.lng]).addTo(map).bindPopup('<strong>' + s.type + '</strong><br>' + s.note);
});


// ---------------- 2. 测验功能 ----------------
const questions = [
  { img: "q1.jpg", question: "这是福寿螺还是田螺？", options: ["福寿螺", "田螺"], answer: 0 },
  { img: "q2.jpg", question: "这是福寿螺还是田螺？", options: ["福寿螺", "田螺"], answer: 1 },
  { img: "q3.jpg", question: "这是福寿螺还是田螺？", options: ["福寿螺", "田螺"], answer: 0 },
  { img: "q4.jpg", question: "这是福寿螺还是田螺？", options: ["福寿螺", "田螺"], answer: 0 },
  { img: "q5.jpg", question: "这是福寿螺还是田螺？", options: ["福寿螺", "田螺"], answer: 1 }
];

let current = 0;
let score = 0;

function renderQuestion() {
  const q = questions[current];
  const box = document.getElementById("quiz-box");
  
  let htmlContent = '';
  htmlContent += '<p><strong>第 ' + (current + 1) + ' / ' + questions.length + ' 题</strong></p >';
  // 注意下面这行，<img> 之间绝对不能有空格
  htmlContent += '<img src="' + q.img + '" alt="题目图片" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; display: block;">';
  htmlContent += '<p>' + q.question + '</p >';
  
  q.options.forEach(function(opt, i) {
    htmlContent += '<label style="display:block; margin: 10px 0; cursor: pointer;">';
    htmlContent += '<input type="radio" name="q" value="' + i + '"> ' + opt;
    htmlContent += '</label>';
  });

  box.innerHTML = htmlContent;
  document.getElementById("quiz-next").hidden = false;
}

document.getElementById("quiz-next").addEventListener("click", () => {
  const selected = document.querySelector('input[name="q"]:checked');
  if (!selected) {
    alert("请先选择一个答案！");
    return;
  }
  
  if (Number(selected.value) === questions[current].answer) {
    score++;
  }
  
  current++;
  
  if (current < questions.length) {
    renderQuestion();
  } else {
    document.getElementById("quiz-box").innerHTML = "";
    document.getElementById("quiz-next").hidden = true;
    const result = document.getElementById("quiz-result");
    result.hidden = false;
    result.textContent = '你答对了 ' + score + ' / ' + questions.length + ' 题。';
  }
});

renderQuestion();