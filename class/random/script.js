document.querySelector('.back').onclick = () => history.back();

const btn = document.getElementById('btnRandom');
const box = document.getElementById('resultBox');
const historyEl = document.getElementById('history');
const names = ['Đỗ Thị F','Nguyễn Văn A','Lê Văn C','Phạm Thị D','Trần Thị B'];

btn?.addEventListener('click', () => {
  const pick = names[Math.floor(Math.random()*names.length)];
  box.innerHTML = `
    <div class="picked">
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="width:64px;height:64px;border-radius:50%;background:#EEF2FF;color:#2563EB;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px">${pick.charAt(0)}</div>
        <div style="font-weight:700">${pick}</div>
        <button class="btn" style="background:#E5EDFF;color:#2563EB" id="btnRe">Random lại</button>
      </div>
    </div>`;
  const item = document.createElement('li');
  item.textContent = pick + ' • 1 học sinh';
  historyEl.prepend(item);
  box.querySelector('#btnRe').onclick = () => btn.click();
});
