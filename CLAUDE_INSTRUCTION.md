# Claude プレゼンテーション自動生成 設計書

> このファイルはClaudeへの指示書です。フォームと一緒に貼り付けてください。

---

## Claudeへの指示

以下のフォームデータを読み取り、この設計書に従って9枚のPPTXスライドを生成してください。
PptxGenJSのNode.jsスクリプトを `/tmp/pptx_build/` で実行して生成すること。
出力先は `/Users/[ユーザー名]/My Campany/presentation_[会社名].pptx` とすること。

---

## デザイン仕様（変更禁止・社内共通）

### カラーパレット
| 変数名 | カラーコード | 用途 |
|--------|------------|------|
| NAVY | `1B2E4B` | 背景・ヘッダー |
| GOLD | `D4AF37` | アクセント・強調 |
| WHITE | `FFFFFF` | テキスト・カード背景 |
| LIGHT | `F4F6F9` | スライド背景（明るいスライド） |
| GRAY | `8A9BB0` | 本文・補足テキスト |
| DARK | `0D1B2A` | 暗い背景 |
| NAVY2 | `253D5E` | カードの背景 |

### 基本ルール
- スライドサイズ：`LAYOUT_16x9`（10" × 5.625"）
- 全スライド右下にスライド番号（ゴールドの四角）
- ヘッダーバー：全スライド上部（高さ1.1"）にNAVYの帯
- ヘッダー左に番号（01〜09）、英語タグ、日本語タイトル
- カードには必ず薄いドロップシャドウ
- アイコンはreact-iconsをPNGに変換して使用

---

## スライド構成（9枚）

### Slide 01｜表紙
- 背景：NAVY
- 左端に細いGOLDの縦線（幅0.12"）
- 右上にNAVY2の大きな円（装飾）
- 英語タグ「BUSINESS PROPOSAL」（GOLD・文字間隔6）
- サービス名（36pt・太字・WHITE）
- キャッチコピー（14pt・CADCFC）
- 区切り線（GOLD）
- 会社名・日付・担当者名（10pt・GRAY）

### Slide 02｜課題・背景
- 背景：LIGHT
- ヘッダー：NAVY、タグ「PROBLEM」、タイトル「あなたが直面している課題」
- リード文（12pt・GRAY）
- 3列カード：幅3.0"×高さ3.35"、白背景、上部にGOLDの細線
  - カード上部：GOLDアイコン（FaExclamationTriangle / FaClock / FaChartLine）
  - 課題タイトル（13pt・太字・NAVY）
  - 課題説明（11pt・GRAY）

### Slide 03｜市場機会
- 背景：NAVY
- ヘッダー背景：DARK、タグ「MARKET OPPORTUNITY」
- リード文（GRAY）
- 3列ボックス（NAVY2背景、GOLD上線）：TAM / SAM / SOM
  - ラベル（11pt・太字・GOLD）
  - 数値（22pt・太字・WHITE）
  - 説明（10pt・GRAY）
- 下部にDARK帯＋GOLD左線＋補足テキスト（11pt・WHITE・italic）

### Slide 04｜解決策（強み）
- 背景：LIGHT
- ヘッダー：NAVY、タグ「SOLUTION」
- 3列カード：白背景
  - 中央にNAVYの円＋WHITE アイコン（FaLightbulb / FaRocket / FaShieldAlt）
  - 右上にGOLDの小丸＋番号（1/2/3）
  - 強みタイトル（13pt・太字・NAVY・中央揃え）
  - 強み説明（10pt・GRAY）

### Slide 05｜価値提案（ビフォー/アフター）
- 背景：WHITE
- ヘッダー：NAVY、タグ「VALUE PROPOSITION」
- 左パネル（BEFORE）：LIGHT背景、グレーヘッダー、❌テキスト5行
- 中央：GOLDの右矢印アイコン
- 右パネル（AFTER）：LIGHT背景、NAVYヘッダー（GOLD文字）、✅テキスト5行
- AFTERパネルはGOLDの枠線

### Slide 06｜実績・信頼性
- 背景：NAVY
- ヘッダー背景：DARK、タグ「TRACK RECORD」
- 4列KPIボックス（NAVY2背景、GOLD上線）：
  - 数値（32pt・太字・GOLD）
  - ラベル（12pt・太字・WHITE）
  - 補足（9pt・GRAY）
- 下部にDARK帯「導入企業ロゴ配置エリア」

### Slide 07｜導入プロセス
- 背景：LIGHT
- ヘッダー：NAVY、タグ「PROCESS」
- 3列カード：白背景
  - 上部にGOLDの円＋番号（01/02/03）
  - ステップタイトル（13pt・太字・NAVY）
  - NAVYの期間バッジ（GOLD文字）
  - 内容リスト4項目（▸マーク・10pt・GRAY）
- 3カードをまたぐGOLDの横線（接続線）

### Slide 08｜料金・プラン
- 背景：WHITE
- ヘッダー：NAVY、タグ「PRICING」
- 3列プランカード：
  - BASIC：LIGHT背景、グレー枠
  - STANDARD：NAVY背景、GOLD枠、上部に「人気No.1」バッジ
  - ENTERPRISE：LIGHT背景、グレー枠
  - プラン名（13pt・太字）、価格（20pt・太字）、特徴5項目（✓マーク）

### Slide 09｜クロージング（CTA）
- 背景：NAVY
- ヘッダー背景：DARK、タグ「NEXT STEP」
- 左下・右上に装飾円（NAVY2・DARK）
- メインメッセージ（24pt・太字・WHITE・中央）
- GOLD区切り線
- 3つのCTAアイコン（FaPhoneAlt / FaHandshake / FaCheckCircle・GOLD）
  - タイトル（14pt・太字・GOLD）
  - 説明（10pt・GRAY）
- 下部にDARK帯＋GOLD左線＋連絡先（TEL / EMAIL / WEB）

---

## フォームデータの対応表

| フォーム項目 | 使用スライド |
|------------|------------|
| 会社名 | 01表紙・09CTA |
| サービス名 | 01表紙タイトル |
| キャッチコピー | 01表紙サブタイトル |
| 担当者名・日付 | 01表紙下部 |
| 課題1〜3 | 02課題カード |
| 市場規模TAM/SAM/SOM | 03市場機会 |
| 強み1〜3 | 04解決策カード |
| ビフォー5項目 | 05左パネル |
| アフター5項目 | 05右パネル |
| 実績KPI×4 | 06実績ボックス |
| ステップ1〜3 | 07プロセスカード |
| プラン1〜3 | 08料金カード |
| TEL/EMAIL/WEB | 09連絡先 |
