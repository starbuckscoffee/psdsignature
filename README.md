# ソースとなるPDF文書に署名と日付を追加して、ファイル名 {PDF文書ファイル}_signed.pdfを出力する

## 前準備
 NodeJSをインストールする。　\
 こちらのリンクに手順がかかれています。\
 https://nodejs.org/ja/download

 このページにある、Windowsインストーラー(.msi)をダウンロードしてインストールしてください。
 
##  プログラム実行用のフォルダを作成し、Nodeの初期化を行う
```
 mkdir C:\pdfsignature
 cd C:\pdfsignature
 npm init -y
```

 **package.json**というファイルが作成されるので、ファイルを編集する

+ （編集前）"main": "index.js",
+ （編集後）"main": "pdfsignature.js",

## NPMパッケージをインストールする
```  npm install pdf-lib  ```

## このGitレポジトリにある pdfsignature.js　を選択しダウンロードする
 ショートカットキー　**CTRL+SHIFT+s**　でダウンロードできる

## ダウンロードしたファイルをプログラム実行用のフォルダに移動する
```　mv "C:\Users\starb\Downloads\pdfsignature.js" C:\pdfsignature ```
 
# プログラム pdfsignature.js の実行
```  node pdfsignature.js   ```

## 実行画面のサンプル
```
Enter the path to the PDF file: C:\PDFsignatureJS\invoice_sample.pdf
Enter signature text: 22-mar-2025
Enter X position (or press Enter for default):
Enter Y position (or press Enter for default):
Enter font size (or press Enter for default):
Do you want to add a signature image? (y/n): y
Enter the path to your signature image file: C:\pdftest\Signature2.png
PDF successfully signed and saved to: C:\PDFsignatureJS\invoice_sample_signed.pdf
PDF signing process completed successfully.
```


> [!IMPORTANT]
> X,Yの座標の指定は、用意されたPDFファイルから値を算出する必要があります。 \
> このプログラムの既定値（X,Yの入力値を省略場合）は、(width-200, 100)　になっています。\
> フォントサイズの既定値は 12 になっています。 \
> 署名画像の配置はプログラムコードで決め打ち (width-200, 120) になっているのでコードに直接、値を代入してください。 
> 署名・日付ありのファイル(invoice_sample_signed.pdf)を、このGitレポジトリにアップしてあるので、参考にしてください。





