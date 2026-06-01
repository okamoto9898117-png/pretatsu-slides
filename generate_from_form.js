/**
 * プレゼンテーション自動生成スクリプト
 * 使い方: node generate_from_form.js '<フォームJSON>' '<出力パス>'
 */

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const {
  FaExclamationTriangle, FaClock, FaChartLine,
  FaFileAlt, FaMicrophone, FaBrain, FaCog, FaGlobe, FaRocket,
  FaCheckCircle, FaStar, FaHandshake, FaPhoneAlt, FaArrowRight, FaLightbulb, FaShieldAlt
} = require("react-icons/fa");

// ─── Icon helpers ───────────────────────────────────────────────────────────
function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ─── Color palette ──────────────────────────────────────────────────────────
const NAVY  = "1B2E4B";
const GOLD  = "D4AF37";
const WHITE = "FFFFFF";
const LIGHT = "F4F6F9";
const GRAY  = "8A9BB0";
const DARK  = "0D1B2A";
const NAVY2 = "253D5E";

// ─── Header helper ──────────────────────────────────────────────────────────
function addHeader(s, pres, num, tag, title, bg = NAVY) {
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: bg }, line: { color: bg } });
  s.addText(num, { x: 0.25, y: 0.15, w: 0.55, h: 0.45, fontSize: 9, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
  s.addText(tag, { x: 0.85, y: 0.15, w: 3.5, h: 0.25, fontSize: 8, color: GOLD, charSpacing: 4, align: "left", margin: 0 });
  s.addText(title, { x: 0.85, y: 0.42, w: 8, h: 0.5, fontSize: 22, bold: true, color: WHITE, align: "left", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.3, y: 5.2, w: 0.7, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText(num, { x: 9.3, y: 5.2, w: 0.7, h: 0.3, fontSize: 9, bold: true, color: DARK, align: "center", valign: "middle", margin: 0 });
}

// ─── 3-column card helper ────────────────────────────────────────────────────
function addCard(s, pres, idx, iconData, title, body, yStart = 1.85) {
  const cx = 0.35 + idx * 3.2;
  s.addShape(pres.shapes.RECTANGLE, { x: cx, y: yStart, w: 3.0, h: 3.35, fill: { color: WHITE }, shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.1 }, line: { color: WHITE } });
  s.addShape(pres.shapes.RECTANGLE, { x: cx, y: yStart, w: 3.0, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });
  s.addImage({ data: iconData, x: cx + 0.2, y: yStart + 0.2, w: 0.5, h: 0.5 });
  s.addText(title, { x: cx + 0.1, y: yStart + 0.82, w: 2.8, h: 0.75, fontSize: 13, bold: true, color: NAVY, align: "left", margin: 0 });
  s.addText(body, { x: cx + 0.1, y: yStart + 1.67, w: 2.8, h: 1.5, fontSize: 11, color: GRAY, align: "left", margin: 0 });
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  // フォームデータをコマンドライン引数から受け取る
  const formData = JSON.parse(process.argv[2]);
  const outputPath = process.argv[3] || path.join(process.env.HOME, "My Campany", "presentation_output.pptx");

  const f = formData; // alias

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = `${f.serviceName} | ${f.companyName}`;

  // ══════════════════════════════════════════════════════
  // SLIDE 1: 表紙
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: GOLD }, line: { color: GOLD } });
    s.addShape(pres.shapes.OVAL, { x: 7.5, y: -1.2, w: 3.5, h: 3.5, fill: { color: NAVY2 }, line: { color: NAVY2 } });
    s.addShape(pres.shapes.OVAL, { x: 8.2, y: -0.5, w: 2.0, h: 2.0, fill: { color: GOLD, transparency: 80 }, line: { color: GOLD, transparency: 80 } });
    s.addText("BUSINESS PROPOSAL", { x: 0.5, y: 1.0, w: 9, h: 0.35, fontSize: 10, bold: true, color: GOLD, charSpacing: 6, align: "left", margin: 0 });
    s.addText(f.serviceName, { x: 0.5, y: 1.5, w: 8.5, h: 1.4, fontSize: 36, bold: true, color: WHITE, align: "left", margin: 0 });
    s.addText(f.catchCopy + "\n" + f.companyName + "が全力サポートします。", { x: 0.5, y: 3.05, w: 7.5, h: 1.0, fontSize: 14, color: "CADCFC", align: "left", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.2, w: 2.5, h: 0.04, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(`${f.companyName}　　${f.date}　　${f.personName}`, { x: 0.5, y: 4.38, w: 8, h: 0.35, fontSize: 10, color: GRAY, align: "left", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 9.3, y: 5.2, w: 0.7, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("01", { x: 9.3, y: 5.2, w: 0.7, h: 0.3, fontSize: 9, bold: true, color: DARK, align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 2: 課題
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };
    addHeader(s, pres, "02", "PROBLEM", "あなたが直面している課題");
    s.addText("多くの方が抱える課題——あなたも感じていませんか？", { x: 0.5, y: 1.3, w: 9, h: 0.4, fontSize: 12, color: GRAY, align: "left", margin: 0 });

    const problemIcons = [
      await iconToBase64Png(FaExclamationTriangle, "#D4AF37", 256),
      await iconToBase64Png(FaClock, "#D4AF37", 256),
      await iconToBase64Png(FaChartLine, "#D4AF37", 256),
    ];
    f.problems.forEach((p, i) => addCard(s, pres, i, problemIcons[i], p.title, p.body));
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 3: 市場機会
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    addHeader(s, pres, "03", "MARKET OPPORTUNITY", "市場機会の全体像", DARK);
    s.addText("この市場には大きな成長ポテンシャルがあります", { x: 0.5, y: 1.25, w: 9, h: 0.4, fontSize: 12, color: GRAY, align: "left", margin: 0 });

    const stats = [
      { label: "TAM\n(全体市場規模)", value: f.marketTAM || "〇〇兆円", sub: "国内対象市場の総規模" },
      { label: "SAM\n(獲得可能市場)", value: f.marketSAM || "〇〇億円", sub: "当社がターゲットとする市場" },
      { label: "SOM\n(実現可能市場)", value: f.marketSOM || "〇〇億円", sub: "3ヶ年で獲得目標とする市場" },
    ];
    stats.forEach((st, i) => {
      const cx = 0.4 + i * 3.1;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.85, w: 2.85, h: 2.8, fill: { color: NAVY2 }, line: { color: GOLD, width: 1, transparency: 60 } });
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.85, w: 2.85, h: 0.06, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(st.label, { x: cx + 0.1, y: 1.98, w: 2.65, h: 0.6, fontSize: 11, bold: true, color: GOLD, align: "center", margin: 0 });
      s.addText(st.value, { x: cx + 0.05, y: 2.65, w: 2.75, h: 0.9, fontSize: 22, bold: true, color: WHITE, align: "center", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.5, y: 3.6, w: 1.85, h: 0.03, fill: { color: GOLD, transparency: 60 }, line: { color: GOLD, transparency: 60 } });
      s.addText(st.sub, { x: cx + 0.1, y: 3.75, w: 2.65, h: 0.7, fontSize: 10, color: GRAY, align: "center", margin: 0 });
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 9.2, h: 0.55, fill: { color: DARK }, line: { color: DARK } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 0.06, h: 0.55, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(f.marketNote || "市場は成長中。今こそ最適なタイミングです。", { x: 0.6, y: 4.88, w: 8.8, h: 0.5, fontSize: 11, color: WHITE, italic: true, align: "left", margin: 0 });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 4: 解決策
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };
    addHeader(s, pres, "04", "SOLUTION", "私たちのソリューション——3つの強み");
    s.addText("3つの核心的な強みで、貴社の課題を根本から解決します", { x: 0.5, y: 1.25, w: 9, h: 0.4, fontSize: 12, color: GRAY, align: "left", margin: 0 });

    const solIcons = [
      await iconToBase64Png(FaLightbulb, "#FFFFFF", 256),
      await iconToBase64Png(FaRocket, "#FFFFFF", 256),
      await iconToBase64Png(FaShieldAlt, "#FFFFFF", 256),
    ];
    f.strengths.forEach((st, i) => {
      const cx = 0.35 + i * 3.2;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.85, w: 3.0, h: 3.35, fill: { color: WHITE }, shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.1 }, line: { color: WHITE } });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.9, y: 2.0, w: 1.2, h: 1.2, fill: { color: NAVY }, line: { color: NAVY } });
      s.addImage({ data: solIcons[i], x: cx + 1.1, y: 2.2, w: 0.8, h: 0.8 });
      s.addShape(pres.shapes.OVAL, { x: cx + 1.95, y: 1.88, w: 0.32, h: 0.32, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(String(i + 1), { x: cx + 1.95, y: 1.88, w: 0.32, h: 0.32, fontSize: 9, bold: true, color: DARK, align: "center", valign: "middle", margin: 0 });
      s.addText(st.title, { x: cx + 0.1, y: 3.3, w: 2.8, h: 0.75, fontSize: 13, bold: true, color: NAVY, align: "center", margin: 0 });
      s.addText(st.body, { x: cx + 0.1, y: 4.15, w: 2.8, h: 1.0, fontSize: 10, color: GRAY, align: "left", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 5: 価値提案（ビフォー/アフター）
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addHeader(s, pres, "05", "VALUE PROPOSITION", "導入前後の変化——価値提案");

    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.25, w: 4.1, h: 4.1, fill: { color: LIGHT }, line: { color: "CCCCCC", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.25, w: 4.1, h: 0.55, fill: { color: "8A9BB0" }, line: { color: "8A9BB0" } });
    s.addText("BEFORE　導入前の状態", { x: 0.35, y: 1.28, w: 4.0, h: 0.48, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    f.before.forEach((item, i) => {
      s.addText("❌ " + item, { x: 0.45, y: 1.95 + i * 0.58, w: 3.8, h: 0.5, fontSize: 11, color: NAVY, align: "left", margin: 0 });
    });

    const arrowIcon = await iconToBase64Png(FaArrowRight, "#D4AF37", 256);
    s.addImage({ data: arrowIcon, x: 4.6, y: 2.8, w: 0.8, h: 0.8 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: 1.25, w: 4.1, h: 4.1, fill: { color: LIGHT }, line: { color: GOLD, width: 2 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: 1.25, w: 4.1, h: 0.55, fill: { color: NAVY }, line: { color: NAVY } });
    s.addText("AFTER　導入後の変化", { x: 5.65, y: 1.28, w: 4.0, h: 0.48, fontSize: 13, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
    f.after.forEach((item, i) => {
      s.addText("✅ " + item, { x: 5.7, y: 1.95 + i * 0.58, w: 3.9, h: 0.5, fontSize: 11, color: NAVY, align: "left", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 6: 実績
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    addHeader(s, pres, "06", "TRACK RECORD", "数字が語る実績と信頼性", DARK);
    s.addText("実績は作られるものではなく、積み重ねるものです", { x: 0.5, y: 1.2, w: 9, h: 0.4, fontSize: 12, color: GRAY, italic: true, align: "left", margin: 0 });

    f.kpis.forEach((k, i) => {
      const cx = 0.3 + i * 2.4;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.75, w: 2.1, h: 2.6, fill: { color: NAVY2 }, line: { color: GOLD, width: 1, transparency: 70 } });
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.75, w: 2.1, h: 0.07, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(k.num, { x: cx + 0.05, y: 1.95, w: 2.0, h: 1.0, fontSize: 32, bold: true, color: GOLD, align: "center", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.4, y: 3.0, w: 1.3, h: 0.04, fill: { color: GOLD, transparency: 60 }, line: { color: GOLD, transparency: 60 } });
      s.addText(k.label, { x: cx + 0.05, y: 3.1, w: 2.0, h: 0.45, fontSize: 12, bold: true, color: WHITE, align: "center", margin: 0 });
      s.addText(k.sub, { x: cx + 0.05, y: 3.6, w: 2.0, h: 0.55, fontSize: 9, color: GRAY, align: "center", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.55, w: 9.4, h: 0.85, fill: { color: DARK }, line: { color: DARK } });
    s.addText("【導入企業ロゴ / クライアント名・受講者の声をここに配置】", { x: 0.3, y: 4.6, w: 9.4, h: 0.75, fontSize: 11, color: GRAY, italic: true, align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 7: 導入プロセス
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };
    addHeader(s, pres, "07", "PROCESS", "導入ロードマップ——シンプルな3ステップ");
    s.addText("お問い合わせからスタートまで、担当者が丁寧にサポートします。", { x: 0.5, y: 1.25, w: 9, h: 0.4, fontSize: 12, color: GRAY, align: "left", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.6, y: 2.85, w: 6.8, h: 0.06, fill: { color: GOLD, transparency: 60 }, line: { color: GOLD, transparency: 60 } });

    f.steps.forEach((step, i) => {
      const cx = 0.35 + i * 3.2;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.85, w: 3.0, h: 3.55, fill: { color: WHITE }, shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.1 }, line: { color: WHITE } });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.85, y: 1.68, w: 0.8, h: 0.8, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(`0${i + 1}`, { x: cx + 0.85, y: 1.68, w: 0.8, h: 0.8, fontSize: 13, bold: true, color: DARK, align: "center", valign: "middle", margin: 0 });
      s.addText(`STEP ${i + 1}\n${step.title}`, { x: cx + 0.1, y: 2.55, w: 2.8, h: 0.75, fontSize: 13, bold: true, color: NAVY, align: "center", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.5, y: 3.38, w: 2.0, h: 0.3, fill: { color: NAVY }, line: { color: NAVY } });
      s.addText(step.duration, { x: cx + 0.5, y: 3.38, w: 2.0, h: 0.3, fontSize: 10, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
      step.items.forEach((item, j) => {
        s.addText("▸  " + item, { x: cx + 0.2, y: 3.82 + j * 0.36, w: 2.6, h: 0.32, fontSize: 10, color: GRAY, align: "left", margin: 0 });
      });
    });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 8: 料金
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    addHeader(s, pres, "08", "PRICING", "シンプルで明確な料金体系");
    s.addText("まずは無料相談から。貴社に最適なプランをご提案します。", { x: 0.5, y: 1.2, w: 9, h: 0.4, fontSize: 12, color: GRAY, align: "left", margin: 0 });

    f.plans.forEach((plan, i) => {
      const cx = 0.35 + i * 3.15;
      const bg = plan.popular ? NAVY : LIGHT;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.75, w: 2.9, h: 3.6, fill: { color: bg }, shadow: plan.popular ? { type: "outer", color: "000000", blur: 15, offset: 5, angle: 135, opacity: 0.2 } : { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.08 }, line: plan.popular ? { color: GOLD, width: 2 } : { color: "DDDDDD", width: 1 } });
      if (plan.popular) {
        s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.7, y: 1.62, w: 1.5, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });
        s.addText("人気No.1", { x: cx + 0.7, y: 1.62, w: 1.5, h: 0.3, fontSize: 9, bold: true, color: DARK, align: "center", valign: "middle", margin: 0 });
      }
      s.addText(plan.name, { x: cx + 0.1, y: 1.88, w: 2.7, h: 0.45, fontSize: 13, bold: true, color: plan.popular ? GOLD : NAVY, charSpacing: 3, align: "center", margin: 0 });
      s.addText(plan.price + plan.unit, { x: cx + 0.05, y: 2.4, w: 2.8, h: 0.7, fontSize: 20, bold: true, color: plan.popular ? WHITE : NAVY, align: "center", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.3, y: 3.18, w: 2.3, h: 0.04, fill: { color: plan.popular ? GOLD : "CCCCCC", transparency: 40 }, line: { color: plan.popular ? GOLD : "CCCCCC", transparency: 40 } });
      plan.features.forEach((f2, j) => {
        const isDash = f2 === "—";
        s.addText((isDash ? "—  —" : "✓  " + f2), { x: cx + 0.15, y: 3.3 + j * 0.38, w: 2.6, h: 0.34, fontSize: 10, color: isDash ? (plan.popular ? "6B7D93" : "BBBBBB") : GRAY, align: "left", margin: 0 });
      });
    });
  }

  // ══════════════════════════════════════════════════════
  // SLIDE 9: CTA
  // ══════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    s.addShape(pres.shapes.OVAL, { x: -0.8, y: 3.5, w: 4, h: 4, fill: { color: NAVY2 }, line: { color: NAVY2 } });
    s.addShape(pres.shapes.OVAL, { x: 8.2, y: -0.8, w: 3, h: 3, fill: { color: DARK }, line: { color: DARK } });
    addHeader(s, pres, "09", "NEXT STEP", "今すぐ、次の一歩を踏み出しましょう", DARK);

    s.addText(`貴社の課題解決に向けて\n${f.companyName}が全力でサポートします`, { x: 0.8, y: 1.3, w: 8.4, h: 1.2, fontSize: 24, bold: true, color: WHITE, align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 2.62, w: 3.0, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });

    const ctaIcons = [
      await iconToBase64Png(FaPhoneAlt, "#D4AF37", 256),
      await iconToBase64Png(FaHandshake, "#D4AF37", 256),
      await iconToBase64Png(FaCheckCircle, "#D4AF37", 256),
    ];
    const ctas = [
      { title: "無料相談", body: "まずは30分の\nオンライン相談から" },
      { title: "デモ・体験", body: "実際の使い心地を\n体感してください" },
      { title: "お見積もり", body: "ご要望に合わせた\n最適プランをご提案" },
    ];
    ctas.forEach((cta, i) => {
      const cx = 1.0 + i * 2.9;
      s.addImage({ data: ctaIcons[i], x: cx + 0.85, y: 2.85, w: 0.5, h: 0.5 });
      s.addText(cta.title, { x: cx, y: 3.45, w: 2.2, h: 0.4, fontSize: 14, bold: true, color: GOLD, align: "center", margin: 0 });
      s.addText(cta.body, { x: cx, y: 3.9, w: 2.2, h: 0.6, fontSize: 10, color: GRAY, align: "center", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.65, w: 9.0, h: 0.75, fill: { color: DARK }, line: { color: GOLD, width: 1, transparency: 50 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.65, w: 0.06, h: 0.75, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(`TEL: ${f.tel}　　EMAIL: ${f.email}　　WEB: ${f.web}`, { x: 0.7, y: 4.72, w: 8.6, h: 0.6, fontSize: 11, color: WHITE, align: "center", valign: "middle", margin: 0 });
  }

  await pres.writeFile({ fileName: outputPath });
  console.log("✅ 生成完了: " + outputPath);
}

main().catch(err => { console.error("❌ エラー:", err.message); process.exit(1); });
