# ソースとなるPDF文書に署名と日付を追加して、ファイル名 {PDF文書ファイル}_signed.pdfを出力する

## 前準備
 NodeJSをインストールする。　こちらのリンクに手順がかかれています。
 https://nodejs.org/ja/download

 このページにある、Windowsインストーラー(.msi)をダウンロードしてインストールする
##  プログラム実行用のフォルダを作成し、Nodeの初期化を行う
 npm init -y

 package.jsonというファイルが作成されるので、ファイルを編集する
 （編集前）"main": "index.js",
 （編集後) "main": "pdfsignature.js",

## NPMパッケージをインストールする
  npm install pdf-lib

## このGitレポジトリにある pdfsignature.js　を選択しダウンロードする
 ショートカットキー
　CTRL+SHIFT+s

 
 
