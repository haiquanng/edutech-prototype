document.querySelector('.back').onclick = () => history.back();
document.querySelector('.search').addEventListener('input', e=>{
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#tbody tr').forEach(tr=>{
    tr.style.display = tr.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
