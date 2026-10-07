const $ = (s) => document.querySelector(s);
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const todayStr = fmt(new Date());
const EV_LABEL = { start: '접수 시작', end: '접수 마감', exam: '필기/면접' };

let view = new Date(); view.setDate(1);
let selected = null;
const filter = { type: '전체', job: '전체', q: '' };

function chips(el, key, values) {
  el.innerHTML = '';
  ['전체', ...values].forEach((v) => {
    const b = document.createElement('button');
    b.className = 'chip' + (filter[key] === v ? ' on' : '');
    b.textContent = v;
    b.onclick = () => { filter[key] = v; render(); };
    el.append(b);
  });
}

const visibleJobs = () => JOBS.filter((j) =>
  (filter.type === '전체' || j.type === filter.type) &&
  (filter.job === '전체' || j.job === filter.job) &&
  (!filter.q || (j.org + j.title).toLowerCase().includes(filter.q)));

function eventsOn(dateStr, jobs) {
  const out = [];
  jobs.forEach((j) => ['start', 'end', 'exam'].forEach((k) => { if (j[k] === dateStr) out.push({ job: j, kind: k }); }));
  return out;
}

function dday(dateStr) {
  const diff = Math.round((new Date(dateStr) - new Date(todayStr)) / 864e5);
  return diff === 0 ? 'D-DAY' : diff > 0 ? `D-${diff}` : '마감';
}

function renderCalendar(jobs) {
  $('#monthTitle').textContent = `${view.getFullYear()}년 ${view.getMonth() + 1}월`;
  const box = $('#days'); box.innerHTML = '';
  const first = new Date(view);
  first.setDate(1 - first.getDay());
  for (let i = 0; i < 42; i++) {
    const d = new Date(first); d.setDate(first.getDate() + i);
    const ds = fmt(d);
    if (i >= 35 && d.getMonth() !== view.getMonth()) break;
    const cell = document.createElement('div');
    cell.className = 'day' + (d.getMonth() !== view.getMonth() ? ' other' : '') + (ds === todayStr ? ' today' : '') + (ds === selected ? ' sel' : '');
    cell.innerHTML = `<span class="n">${d.getDate()}</span>`;
    const evs = eventsOn(ds, jobs);
    evs.slice(0, 3).forEach(({ job, kind }) => {
      const b = document.createElement('button');
      b.className = 'ev ' + kind;
      b.textContent = `${job.org} ${EV_LABEL[kind]}`;
      b.onclick = (e) => { e.stopPropagation(); openModal(job); };
      cell.append(b);
    });
    if (evs.length > 3) cell.insertAdjacentHTML('beforeend', `<div class="more">+${evs.length - 3}개 더</div>`);
    cell.onclick = () => { selected = selected === ds ? null : ds; render(); };
    box.append(cell);
  }
}

function renderList(jobs) {
  const ul = $('#list'); ul.innerHTML = '';
  let items;
  if (selected) {
    $('#sideTitle').textContent = `${selected} 일정`;
    items = eventsOn(selected, jobs).map(({ job, kind }) => ({ job, sub: EV_LABEL[kind], badge: dday(job.end) }));
  } else {
    $('#sideTitle').textContent = '마감 임박 공고';
    items = jobs.filter((j) => j.end >= todayStr).sort((a, b) => a.end.localeCompare(b.end))
      .map((job) => ({ job, sub: `~ ${job.end}`, badge: dday(job.end) }));
  }
  if (!items.length) ul.innerHTML = '<li class="empty">표시할 공고가 없습니다.</li>';
  items.forEach(({ job, sub, badge }) => {
    const li = document.createElement('li');
    const near = badge.startsWith('D-') && Number(badge.slice(2)) <= 3 || badge === 'D-DAY';
    li.innerHTML = `<span class="badge ${near ? '' : 'ok'}">${badge}</span><b>${job.org}</b><div>${job.title}</div><div class="org">${sub}</div>`;
    li.onclick = () => openModal(job);
    ul.append(li);
  });
}

function openModal(j) {
  $('#mTitle').textContent = j.title;
  $('#mOrg').textContent = `${j.org} · ${j.type}`;
  $('#mBody').innerHTML = `
    <dt>접수 기간</dt><dd>${j.start} ~ ${j.end} (${dday(j.end)})</dd>
    <dt>필기/면접</dt><dd>${j.exam}</dd>
    <dt>직무</dt><dd>${j.job}</dd>
    <dt>근무지</dt><dd>${j.region}</dd>
    <dt>채용인원</dt><dd>${j.people}</dd>`;
  $('#mLink').href = j.url;
  $('#modal').hidden = false;
}

function render() {
  chips($('#typeChips'), 'type', [...new Set(JOBS.map((j) => j.type))]);
  chips($('#jobChips'), 'job', [...new Set(JOBS.map((j) => j.job))]);
  const jobs = visibleJobs();
  renderCalendar(jobs);
  renderList(jobs);
}

$('#prev').onclick = () => { view.setMonth(view.getMonth() - 1); render(); };
$('#next').onclick = () => { view.setMonth(view.getMonth() + 1); render(); };
$('#today').onclick = () => { view = new Date(); view.setDate(1); selected = null; render(); };
$('#search').oninput = (e) => { filter.q = e.target.value.trim().toLowerCase(); render(); };
$('#closeModal').onclick = () => ($('#modal').hidden = true);
$('#modal').onclick = (e) => { if (e.target.id === 'modal') e.currentTarget.hidden = true; };
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });

render();
