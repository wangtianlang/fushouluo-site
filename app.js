// ---------------- 1. 地图功能 ----------------
const map = L.map('map').setView([31.027, 120.293], 13);
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
  subdomains: ['1', '2', '3', '4'],
  maxZoom: 18,
  attribution: '© 高德地图'
}).addTo(map);

const sites = [
  { lat: 31.030, lng: 120.295, type: "卵块 Egg Mass", note: "岸边芦苇茎秆 (Reeds on the bank)" },
  { lat: 31.024, lng: 120.290, type: "成螺 Adult Snail", note: "浅水区石块下 (Under stones in shallow water)" },
  { lat: 31.033, lng: 120.300, type: "高风险水域 High Risk", note: "沟渠汇入太湖处 (Ditch entering Taihu Lake)" },
];

sites.forEach(s => {
  L.marker([s.lat, s.lng]).addTo(map).bindPopup('<strong>' + s.type + '</strong><br>' + s.note);
});


// ---------------- 2. 测验功能（双语版） ----------------
const questions = [
  { img: "q1.jpg", question: "这是福寿螺还是田螺？<br><span class='en'>Is this an Apple Snail or a Mud Snail?</span>", options: ["福寿螺 Apple Snail", "田螺 Mud Snail"], answer: 0 },
  { img: "q2.jpg", question: "这是福寿螺还是田螺？<br><span class='en'>Is this an Apple Snail or a Mud Snail?</span>", options: ["福寿螺 Apple Snail", "田螺 Mud Snail"], answer: 1 },
  { img: "q3.jpg", question: "这是福寿螺还是田螺？<br><span class='en'>Is this an Apple Snail or a Mud Snail?</span>", options: ["福寿螺 Apple Snail", "田螺 Mud Snail"], answer: 0 },
  { img: "q4.jpg", question: "这是福寿螺还是田螺？<br><span class='en'>Is this an Apple Snail or a Mud Snail?</span>", options: ["福寿螺 Apple Snail", "田螺 Mud Snail"], answer: 0 },
  { img: "q5.jpg", question: "这是福寿螺还是田螺？<br><span class='en'>Is this an Apple Snail or a Mud Snail?</span>", options: ["福寿螺 Apple Snail", "田螺 Mud Snail"], answer: 1 }
];

let current = 0;
let score = 0;

function renderQuestion() {
  const q = questions[current];
  const box = document.getElementById("quiz-box");
  
  let htmlContent = '';
  htmlContent += '<p><strong>第 ' + (current + 1) + ' / ' + questions.length + ' 题 (Question)</strong></p >';
  htmlContent += '<img src="' + q.img + '" style="width: 100%; max-width: 400px; height: auto; max-height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; display: block;">';
  htmlContent += '<p>' + q.question + '</p >';
  
  q.options.forEach(function(opt, i) {
    htmlContent += '<label style="display:block; margin: 10px 0; cursor: pointer; font-size: 16px;">';
    htmlContent += '<input type="radio" name="q" value="' + i + '"> ' + opt;
    htmlContent += '</label>';
  });

  box.innerHTML = htmlContent;
  document.getElementById("quiz-next").hidden = false;
}

document.getElementById("quiz-next").addEventListener("click", () => {
  const selected = document.querySelector('input[name="q"]:checked');
  if (!selected) {
    alert("请先选择一个答案！ (Please select an answer first!)");
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
    result.innerHTML = '你答对了 ' + score + ' / ' + questions.length + ' 题。<br><span class="en">You answered ' + score + ' / ' + questions.length + ' correctly.</span>';
  }
});

renderQuestion();