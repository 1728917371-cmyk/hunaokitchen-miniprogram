/* 胡闹厨房 · 料理人格测试 —— 网页试玩版
   逻辑与小程序 utils/data.js 一致：只统计「左选项」，每维 ≥2 判为该维高位字母。 */
(function () {
  const DATA = window.DECK_DATA;
  const QUESTIONS = DATA.questions;
  const RESULTS = DATA.results;
  const DIMS = [
    { key: 'C', alt: 'A', label: '食材相性', hi: 'C 守味', lo: 'A 越界' },
    { key: 'P', alt: 'M', label: '制作工序', hi: 'P 精准', lo: 'M 随性' },
    { key: 'H', alt: 'E', label: '风味倾向', hi: 'H 清淡', lo: 'E 重口' },
    { key: 'S', alt: 'I', label: '动机诉求', hi: 'S 省事', lo: 'I 仪式' }
  ];
  const STORE = 'hunaokitchen_results_v1';

  let answers = {};
  let index = 0;

  const $ = (id) => document.getElementById(id);
  const screens = { home: $('screen-home'), quiz: $('screen-quiz'), result: $('screen-result') };

  function show(name) {
    Object.keys(screens).forEach((k) => screens[k].classList.toggle('on', k === name));
    window.scrollTo(0, 0);
  }

  /* ---------------- 首页 ---------------- */
  const roster = $('roster');
  ['AMES', 'AMEI', 'AMHS', 'CMHI', 'CMEI'].forEach((code) => {
    if (!RESULTS[code]) return;
    const img = document.createElement('img');
    img.src = RESULTS[code].image;
    img.alt = RESULTS[code].name;
    img.loading = 'lazy';
    roster.appendChild(img);
  });

  $('btn-start').addEventListener('click', () => {
    answers = {};
    index = 0;
    show('quiz');
    renderQuestion();
  });
  $('btn-history').addEventListener('click', showHistory);
  $('btn-about').addEventListener('click', showAbout);

  /* ---------------- 答题 ---------------- */
  function renderQuestion() {
    const q = QUESTIONS[index];
    $('q-part').textContent = q.part;
    $('q-count').textContent = String(index + 1).padStart(2, '0') + ' / ' + QUESTIONS.length;
    $('q-bar').style.width = Math.round(((index + 1) / QUESTIONS.length) * 100) + '%';
    $('q-dim').textContent = q.dim;
    $('q-title').textContent = q.title;

    const box = $('q-options');
    box.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt' + (answers[q.id] === opt.key ? ' sel' : '');
      btn.innerHTML = '<b>' + (i === 0 ? 'A' : 'B') + '</b><span>' + escapeHtml(opt.text) + '</span>';
      btn.addEventListener('click', () => choose(q, opt.key));
      box.appendChild(btn);
    });
    $('btn-prev').style.visibility = index === 0 ? 'hidden' : 'visible';
  }

  function choose(q, key) {
    answers[q.id] = key;
    renderQuestion();
    setTimeout(() => {
      if (index < QUESTIONS.length - 1) {
        index += 1;
        renderQuestion();
      } else {
        calc();
      }
    }, 220);
  }

  $('btn-prev').addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      renderQuestion();
    }
  });
  $('btn-quit').addEventListener('click', () => show('home'));

  /* ---------------- 计分 ---------------- */
  function calc() {
    const left = { C: 0, P: 0, H: 0, S: 0 };
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.options[0].key) left[q.options[0].key] += 1;
    });
    const code =
      (left.C >= 2 ? 'C' : 'A') +
      (left.P >= 2 ? 'P' : 'M') +
      (left.H >= 2 ? 'H' : 'E') +
      (left.S >= 2 ? 'S' : 'I');
    renderResult(code, left);
    saveHistory(code, left);
  }

  let current = null;

  function renderResult(code, left) {
    const r = RESULTS[code];
    if (!r) return;
    current = { code: code, left: left, result: r };

    $('r-code').textContent = code + ' · ' + left.C + ' / ' + left.P + ' / ' + left.H + ' / ' + left.S;
    $('r-kitchen').src = r.kitchen;
    $('r-image').src = r.image;
    $('r-image').alt = r.name;
    $('r-name').textContent = r.name;
    $('r-en').textContent = r.en;
    $('r-animal').textContent = r.animal;
    $('r-comment').textContent = r.comment;
    $('r-recipe').textContent = '推荐料理：' + r.recipe;

    $('r-tags').innerHTML = r.tags.map((t) => '<li>' + escapeHtml(t) + '</li>').join('');
    $('r-dims').innerHTML = DIMS.map((d) => {
      const v = left[d.key];
      return '<div class="dim-row"><span>' + d.label + '</span>' +
        '<div class="track"><i style="width:' + (v / 4) * 100 + '%"></i></div>' +
        '<b>' + v + '/4</b></div>';
    }).join('');
    $('r-partner').textContent = r.partner + ' · ' + (RESULTS[r.partner] ? RESULTS[r.partner].name : '');
    $('r-counter').textContent = r.counter + ' · ' + (RESULTS[r.counter] ? RESULTS[r.counter].name : '');
    show('result');
  }

  /* ---------------- 历史 ---------------- */
  function saveHistory(code, left) {
    try {
      const list = JSON.parse(localStorage.getItem(STORE) || '[]');
      list.unshift({ code: code, at: Date.now(), s: [left.C, left.P, left.H, left.S].join('/') });
      localStorage.setItem(STORE, JSON.stringify(list.slice(0, 8)));
    } catch (e) {}
  }

  function showHistory() {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(STORE) || '[]'); } catch (e) {}
    const body = $('sheet-body');
    if (!list.length) {
      body.innerHTML = '<h3>最近结果</h3><p>还没有记录。测一次就会留在这里，只存在你这台设备的浏览器里。</p>';
    } else {
      body.innerHTML = '<h3>最近结果</h3><ul>' + list.map((it) => {
        const r = RESULTS[it.code] || { name: it.code };
        const d = new Date(it.at);
        return '<li>' + escapeHtml(r.name) + ' <i>' + it.code + ' · ' + it.s + ' · ' +
          d.getMonth() + 1 + '/' + d.getDate() + '</i></li>';
      }).join('') + '</ul>';
    }
    openSheet();
  }

  function showAbout() {
    $('sheet-body').innerHTML =
      '<h3>这是什么</h3>' +
      '<p>这是课程作品《胡闹厨房 · 料理人格测试》微信小程序的网页试玩版：同一套 16 道题、同一套四维计分、同一套 16 型文案与素材。</p>' +
      '<p>四个维度是食材相性（C 守味 / A 越界）、制作工序（P 精准 / M 随性）、风味倾向（H 清淡 / E 重口）、动机诉求（S 省事 / I 仪式）。每题两个选项都是「你会怎么做」，只统计左选项，每维 ≥2 判为该维高位字母。</p>' +
      '<p>网页版在小程序基础上补了两件事：结果页可以直接生成海报图片，以及最近结果只存在你自己的浏览器里（localStorage），不会上传。</p>';
    openSheet();
  }

  const sheet = $('sheet');
  function openSheet() { sheet.hidden = false; }
  $('sheet-close').addEventListener('click', () => { sheet.hidden = true; });
  sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.hidden = true; });

  /* ---------------- 复制文案 ---------------- */
  $('btn-copy').addEventListener('click', async () => {
    if (!current) return;
    const text = '我在《胡闹厨房 · 料理人格测试》里测出了「' + current.result.name + '」（' + current.code + '）。' +
      current.result.comment.slice(0, 46) + '… 你是哪一只？';
    try {
      await navigator.clipboard.writeText(text);
      toast('文案已复制，去粘贴给朋友吧');
    } catch (e) {
      toast('复制失败，可长按结果文字手动复制');
    }
  });

  $('btn-again').addEventListener('click', () => {
    answers = {};
    index = 0;
    show('quiz');
    renderQuestion();
  });

  /* ---------------- 海报 ---------------- */
  $('btn-poster').addEventListener('click', () => {
    if (!current) return;
    toast('正在生成海报…');
    drawPoster(current).then((url) => {
      const body = $('sheet-body');
      body.innerHTML = '<h3>' + escapeHtml(current.result.name) + ' · 海报</h3>' +
        '<img src="' + url + '" alt="结果海报">' +
        '<p style="margin-top:12px;font-size:12px">长按图片可保存到相册；电脑端可直接右键另存。</p>' +
        '<p><a href="' + url + '" download="hunaokitchen-' + current.code + '.png" style="color:#B56A2E">下载 PNG</a></p>';
      openSheet();
    });
  });

  async function drawPoster(ctxData) {
    const r = ctxData.result;
    const W = 750, H = 1250;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');

    g.fillStyle = '#FAF4E6';
    g.fillRect(0, 0, W, H);

    const kitchen = await loadImg(r.kitchen);
    const ch = await loadImg(r.image);

    // 厨房背景：铺满上半部
    const topH = 620;
    cover(g, kitchen, 0, 0, W, topH);

    // 暖白面板（56% 不透明度）
    g.fillStyle = 'rgba(250,244,230,0.56)';
    g.fillRect(0, 300, W, topH - 300);

    // 角色
    const chH = 560, chW = chH * (ch.naturalWidth / ch.naturalHeight);
    g.drawImage(ch, (W - chW) / 2, 40, chW, chH);

    // 名字与英文
    g.fillStyle = '#3B2A1E';
    g.font = '600 52px "Noto Serif SC","Songti SC",serif';
    g.textAlign = 'center';
    g.fillText(r.name, W / 2, 700);
    g.fillStyle = '#B56A2E';
    g.font = '300 22px Inter, sans-serif';
    g.fillText(r.en.toUpperCase(), W / 2, 742);

    // code 与分数
    g.fillStyle = '#6B4A2E';
    g.font = '300 20px Inter, sans-serif';
    g.fillText(ctxData.code + '   ' + [ctxData.left.C, ctxData.left.P, ctxData.left.H, ctxData.left.S].join(' / '), W / 2, 782);

    // 标签胶囊
    g.font = '400 22px "Noto Sans SC",sans-serif';
    let cx = 60, cy = 820;
    r.tags.forEach((t) => {
      const tw = g.measureText(t).width + 44;
      if (cx + tw > W - 60) { cx = 60; cy += 52; }
      roundRect(g, cx, cy, tw, 40, 20, 'rgba(251,239,215,1)', 'rgba(240,211,168,1)');
      g.fillStyle = '#3B2A1E';
      g.textAlign = 'center';
      g.fillText(t, cx + tw / 2, cy + 28);
      cx += tw + 12;
    });

    // 评语
    g.textAlign = 'left';
    g.fillStyle = '#3B2A1E';
    g.font = '400 26px "Noto Sans SC",sans-serif';
    let y = cy + 88;
    wrap(g, r.comment, 60, y, W - 120, 42);

    // 底部信息
    g.fillStyle = '#6B4A2E';
    g.font = '400 20px "Noto Sans SC",sans-serif';
    g.fillText('推荐料理：' + r.recipe, 60, H - 150);
    g.fillStyle = '#B56A2E';
    g.font = '300 21px "Noto Sans SC",sans-serif';
    g.fillText('胡闹厨房 · 料理人格测试', 60, H - 92);
    g.fillStyle = 'rgba(107,74,46,.7)';
    g.font = '300 16px Inter, sans-serif';
    g.fillText('16 QUESTIONS · 4 AXES · 16 PERSONAS', 60, H - 56);

    return c.toDataURL('image/png');
  }

  function cover(g, img, x, y, w, h) {
    const ir = img.naturalWidth / img.naturalHeight;
    const br = w / h;
    let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
    if (ir > br) { sw = sh * br; sx = (img.naturalWidth - sw) / 2; }
    else { sh = sw / br; sy = (img.naturalHeight - sh) / 2; }
    g.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function roundRect(g, x, y, w, h, r, fill, stroke) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
    g.fillStyle = fill; g.fill();
    if (stroke) { g.strokeStyle = stroke; g.lineWidth = 1.5; g.stroke(); }
  }

  function wrap(g, text, x, y, maxW, lh) {
    let line = '';
    for (const ch of Array.from(text)) {
      if (g.measureText(line + ch).width > maxW) {
        g.fillText(line, x, y);
        line = ch;
        y += lh;
      } else {
        line += ch;
      }
    }
    if (line) g.fillText(line, x, y);
  }

  function loadImg(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = rej;
      im.src = src;
    });
  }

  window.__paint = function (code) {
    const left = { C: 2, P: 3, H: 2, S: 2 };
    renderResult(code, left);
  };

  /* ---------------- 小工具 ---------------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.style.cssText = 'position:fixed;left:50%;bottom:56px;transform:translateX(-50%);background:rgba(59,42,30,.92);color:#FAF4E6;padding:10px 18px;border-radius:999px;font-size:13px;z-index:20;max-width:86vw;text-align:center';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.style.display = 'none'; }, 1800);
  }
})();
