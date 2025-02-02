// gameObject.js
class Back extends Material {
    constructor(x, y, dw, dh, imagesrc) {
        super(x, y, dw, dh, imagesrc); // Materialクラスのコンストラクタを呼び出す
    }
    //オーバーロードっぽく関数を作成（オブジェクトサイズ変更用）
    draw(ctx) {
        //色の指定
        ctx.fillStyle = this.collor;

        //四角形の塗りつぶしを描画
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawimage(ctx) {
        //画像の表示(表示場所はキャラクターの中心)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
