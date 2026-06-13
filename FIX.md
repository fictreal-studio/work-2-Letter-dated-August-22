# FIX.md

## 修正履歴

| 日付 | 対象 | 内容 | 結果 | 懸念 |
| -- | -- | -- | -- | -- |
| 2026-06-12 | AGENTS.md / WORLD.md / ROUTES.md / DESIGN.md / FIX.md | 作品全体のルール、固有名詞、導線、デザイン基準、修正履歴テンプレートを作成 | 今後の実装参照先を固定 | なし |
| 2026-06-12 | index.html / styles.css / script.js | 入口ページを作成し、固定フィクションヘッダー、免責事項、同意チェック、/briefing/ への開始導線、スマホ優先の暗色レイアウトを実装 | チェックボックス連動と遷移先を確認済み | /briefing/ は未実装の場合、遷移先ページが404になる可能性あり |
| 2026-06-12 | article/famous-people/index.html / article/famous-people/styles.css / FIX.md | 地元の名士記事ページを新規作成し、三名のプロフィールカード、本文、強調キーワード、組織ページへの別タブ導線、検索ページへの戻り導線を実装 | 必須表記とリンク先を確認済み | /yorozuya /azuma-construction /west-tv /search は未実装の場合、遷移先ページが404になる可能性あり |
| 2026-06-12 | briefing/index.html / briefing/styles.css / WORLD.md / FIX.md | 上司からの指示書ページを新規作成し、よろずや社内文書、未完了依頼の説明、社員番号、注意事項、/search への導線を実装 | 必須表記、社員番号、検索導線を確認済み | 上司名「白瀬灯」は本ページ用の架空名としてWORLD.mdへ追加。/search は未実装の場合、遷移先ページが404になる可能性あり |
| 2026-06-12 | search/index.html / search/styles.css / search/script.js / FIX.md | 架空の記録検索端末ページを新規作成し、検索フォーム、ハードコード検索結果、制限記録表示、ヒントパネル、別タブリンクを実装 | 必須表記、検索キーワード、別タブ設定、JS構文、/search 表示を確認済み | /yorozuya /azuma-construction /west-tv は未実装の場合、検索結果リンク先が404になる可能性あり |
| 2026-06-12 | article/famous-people/index.html / article/famous-people/styles.css / kondo/index.html / Kakeru/index.html / Morihito/index.html / search/script.js / FIX.md | 地元の名士記事を地方人物録風に再調整し、一覧から3名の個別インタビュー記事へ遷移できる構成、架空画像枠、Q&A本文、記事末尾の架空注記を実装。検索結果の個別記事リンクも新URLへ更新 | /article/famous-people /kondo /Kakeru /Morihito の表示、往復導線、FICTIONAL表記、JS構文を確認済み | 実画像は未設定のため、CSSプレースホルダーで架空人物イメージを表現 |

## 初回作成

* AGENTS.md / WORLD.md / ROUTES.md / DESIGN.md / FIX.md を作成
* 作品全体のルールと導線を固定
