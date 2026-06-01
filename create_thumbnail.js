/**
 * サムネイル自動生成スクリプト v1.0
 * プレゼン自動生成システムと同じテーマ体系
 * 使い方: node create_thumbnail.js [フォームJSONパス] [出力パス]
 */

const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// ============================================================
// テーマ定義（プレゼンと統一）
// ============================================================
const THEMES = {
  editorial: {
    bg: '#0A0A0A',
    accent: '#FFFFFF',
    text: '#FFFFFF',
    sub: '#AAAAAA',
    style: 'editorial',
  },
  premium: {
    bg: '#0D1B3E',
    accent: '#C9A84C',
    text: '#FFFFFF',
    sub: '#C9A84C',
    style: 'premium',
  },
  startup: {
    bg: '#1A0533',
    accent: '#00E5FF',
    text: '#FFFFFF',
    sub: '#00E5FF',
    style: 'startup',
  },
  technology: {
    bg: '#050505',
    accent: '#00BCD4',
    text: '#FFFFFF',
    sub: '#00BCD4',
    style: 'technology',
  },
  trust: {
    bg: '#0D2818',
    accent: '#C9A84C',
    text: '#FFFFFF',
    sub: '#C9A84C',
    style: 'trust',
  },
  energy: {
    bg: '#0D1B3E',
    accent: '#E53935',
    text: '#FFFFFF',
    sub: '#E53935',
    style: 'energy',
  },
};

// ============================================================
// アスペクト比定義
// ============================================================
const ASPECT_RATIOS = {
  '16:9':  { width: 1920, height: 1080 },
  '1:1':   { width: 1080, height: 1080 },
  '4:3':   { width: 1440, height: 1080 },
  '9:16':  { width: 1080, height: 1920 },
  'youtube': { width: 1280, height: 720 },
  'ogp':   { width: 1200, height: 630 },
};

// ============================================================
// テキスト折り返し
// ============================================================
function wrapText(ctx, text, maxWidth) {
  const words = text.split('');
  const lines = [];
  let line = '';
  for (const char of words) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ============================================================
// グラデーション描画ヘルパー
// ============================================================
function drawGradientOverlay(ctx, w, h, color1, color2, direction = 'diagonal') {
  let grad;
  if (direction === 'diagonal') {
    grad = ctx.createLinearGradient(0, 0, w * 0.6, h);
  } else if (direction === 'bottom') {
    grad = ctx.createLinearGradient(0, 0, 0, h);
  } else {
    grad = ctx.createLinearGradient(0, 0, w, 0);
  }
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

// ============================================================
// Editorialスタイル描画
// ============================================================
function drawEditorial(ctx, w, h, data, theme) {
  // 背景：ダークグラデーション
  drawGradientOverlay(ctx, w, h, '#0A0A0A', '#1A1A2E', 'diagonal');

  // 左側アクセントライン
  ctx.fillStyle = theme.accent;
  ctx.fillRect(Math.floor(w * 0.06), Math.floor(h * 0.12), 6, Math.floor(h * 0.6));

  // カテゴリラベル（小）
  if (data.category) {
    ctx.font = `600 ${Math.floor(h * 0.028)}px "sans-serif"`;
    ctx.fillStyle = theme.accent;
    ctx.letterSpacing = '0.15em';
    ctx.fillText(data.category.toUpperCase(), Math.floor(w * 0.09), Math.floor(h * 0.22));
  }

  // メインタイトル
  const titleSize = data.mainTitle.length <= 10
    ? Math.floor(h * 0.14)
    : data.mainTitle.length <= 20
    ? Math.floor(h * 0.10)
    : Math.floor(h * 0.075);

  ctx.font = `700 ${titleSize}px "sans-serif"`;
  ctx.fillStyle = '#FFFFFF';
  const titleLines = wrapText(ctx, data.mainTitle, w * 0.78);
  titleLines.forEach((line, i) => {
    ctx.fillText(line, Math.floor(w * 0.09), Math.floor(h * 0.38) + i * (titleSize * 1.2));
  });

  // サブタイトル
  if (data.subTitle) {
    ctx.font = `400 ${Math.floor(h * 0.038)}px "sans-serif"`;
    ctx.fillStyle = '#BBBBBB';
    const subLines = wrapText(ctx, data.subTitle, w * 0.7);
    const titleBottom = Math.floor(h * 0.38) + titleLines.length * titleSize * 1.2;
    subLines.forEach((line, i) => {
      ctx.fillText(line, Math.floor(w * 0.09), titleBottom + Math.floor(h * 0.06) + i * Math.floor(h * 0.048));
    });
  }

  // 右下：会社名 or ブランド名
  if (data.brand) {
    ctx.font = `500 ${Math.floor(h * 0.030)}px "sans-serif"`;
    ctx.fillStyle = theme.accent;
    ctx.textAlign = 'right';
    ctx.fillText(data.brand, w - Math.floor(w * 0.06), h - Math.floor(h * 0.07));
    ctx.textAlign = 'left';
  }

  // 右下：デコレーション円
  ctx.beginPath();
  ctx.arc(w - Math.floor(w * 0.08), h - Math.floor(h * 0.25), Math.floor(h * 0.18), 0, Math.PI * 2);
  ctx.strokeStyle = theme.accent + '33';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(w - Math.floor(w * 0.08), h - Math.floor(h * 0.25), Math.floor(h * 0.28), 0, Math.PI * 2);
  ctx.strokeStyle = theme.accent + '1A';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ============================================================
// スタンダードスタイル描画（プレミアム・スタートアップ等）
// ============================================================
function drawStandard(ctx, w, h, data, theme) {
  // 背景
  drawGradientOverlay(ctx, w, h, theme.bg, shiftColor(theme.bg, 20), 'diagonal');

  // トップバー
  ctx.fillStyle = theme.accent;
  ctx.fillRect(0, 0, w, Math.floor(h * 0.008));

  // 背景デコ：大きな円
  ctx.beginPath();
  ctx.arc(w * 0.85, h * 0.15, h * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = theme.accent + '0D';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(w * 0.85, h * 0.15, h * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = theme.accent + '1A';
  ctx.fill();

  // カテゴリラベル
  if (data.category) {
    const labelX = Math.floor(w * 0.07);
    const labelY = Math.floor(h * 0.20);
    const labelW = ctx.measureText(data.category.toUpperCase()).width + Math.floor(w * 0.03);
    const labelH = Math.floor(h * 0.06);
    ctx.fillStyle = theme.accent + '33';
    roundRect(ctx, labelX, labelY - labelH * 0.75, labelW, labelH, 4);
    ctx.font = `600 ${Math.floor(h * 0.03)}px "sans-serif"`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(data.category.toUpperCase(), labelX + Math.floor(w * 0.015), labelY);
  }

  // メインタイトル
  const titleSize = data.mainTitle.length <= 12
    ? Math.floor(h * 0.12)
    : data.mainTitle.length <= 22
    ? Math.floor(h * 0.09)
    : Math.floor(h * 0.07);

  ctx.font = `700 ${titleSize}px "sans-serif"`;
  ctx.fillStyle = theme.text;
  const titleLines = wrapText(ctx, data.mainTitle, w * 0.72);
  titleLines.forEach((line, i) => {
    ctx.fillText(line, Math.floor(w * 0.07), Math.floor(h * 0.42) + i * titleSize * 1.2);
  });

  // アクセントライン
  const accentY = Math.floor(h * 0.42) + titleLines.length * titleSize * 1.2 + Math.floor(h * 0.025);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(Math.floor(w * 0.07), accentY, Math.floor(w * 0.08), 3);

  // サブタイトル
  if (data.subTitle) {
    ctx.font = `400 ${Math.floor(h * 0.036)}px "sans-serif"`;
    ctx.fillStyle = theme.sub + 'CC';
    const subLines = wrapText(ctx, data.subTitle, w * 0.65);
    subLines.forEach((line, i) => {
      ctx.fillText(line, Math.floor(w * 0.07), accentY + Math.floor(h * 0.075) + i * Math.floor(h * 0.048));
    });
  }

  // ブランド名
  if (data.brand) {
    ctx.font = `500 ${Math.floor(h * 0.028)}px "sans-serif"`;
    ctx.fillStyle = theme.accent;
    ctx.textAlign = 'right';
    ctx.fillText(data.brand, w - Math.floor(w * 0.06), h - Math.floor(h * 0.06));
    ctx.textAlign = 'left';
  }
}

// ============================================================
// 角丸矩形
// ============================================================
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

// ============================================================
// 色を少し明るくする
// ============================================================
function shiftColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

// ============================================================
// メイン生成関数
// ============================================================
async function generateThumbnail(data, outputPath) {
  const ratioKey = data.aspectRatio || '16:9';
  const size = ASPECT_RATIOS[ratioKey] || ASPECT_RATIOS['16:9'];
  const { width: w, height: h } = size;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  // テーマ解決
  let themeKey = 'editorial';
  const t = (data.theme || '').toLowerCase();
  if (t.includes('プレミアム') || t.includes('premium')) themeKey = 'premium';
  else if (t.includes('スタートアップ') || t.includes('startup')) themeKey = 'startup';
  else if (t.includes('テクノロジー') || t.includes('tech')) themeKey = 'technology';
  else if (t.includes('信頼') || t.includes('trust')) themeKey = 'trust';
  else if (t.includes('エネルギー') || t.includes('energy')) themeKey = 'energy';

  // カスタムカラー対応
  let theme = { ...THEMES[themeKey] };
  if (t.includes('カスタム') || t.includes('custom')) {
    theme.bg = data.bgColor || theme.bg;
    theme.accent = data.accentColor || theme.accent;
    theme.text = data.textColor || theme.text;
  }

  // スタイル別描画
  if (themeKey === 'editorial') {
    drawEditorial(ctx, w, h, data, theme);
  } else {
    drawStandard(ctx, w, h, data, theme);
  }

  // PNG保存
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ サムネイル生成完了: ${outputPath}`);
  console.log(`   サイズ: ${w}×${h}px / テーマ: ${themeKey}`);
  return outputPath;
}

// ============================================================
// CLI実行
// ============================================================
const args = process.argv.slice(2);
if (args.length >= 1) {
  const jsonPath = args[0];
  const outPath = args[1] || path.join(path.dirname(jsonPath), 'thumbnail.png');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  generateThumbnail(data, outPath).catch(console.error);
} else {
  // デモ実行
  const demo = {
    mainTitle: 'AIが変える営業の未来',
    subTitle: '次世代セールスオートメーション戦略',
    category: 'SALES',
    brand: 'Pretatsu Inc.',
    theme: 'Editorial',
    aspectRatio: '16:9',
  };
  generateThumbnail(demo, '/tmp/pptx_build/thumbnail_demo.png').catch(console.error);
}

module.exports = { generateThumbnail };
