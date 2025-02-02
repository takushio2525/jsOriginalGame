class Poi extends Material {

    constructor(x, y, dw, dh, imagesrc) {
        super(x, y, dw, dh, imagesrc); // Materialクラスのコンストラクタを呼び出す
        this.invisible = true;
    }
    //オーバーロードっぽく関数を作成（オブジェクトサイズ変更用）
    draw(ctx) {
        // 色の指定
        ctx.fillStyle = this.collor;
        // 円の描画
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, Math.min(this.width, this.height) / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    drawimage(ctx) {
        //画像の表示(表示場所はキャラクターの中心)
        if (this.invisible == true) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    moveMouse(x, y) {
        this.x = x - this.width / 2 - 10;

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > objBack.width - this.width) {
            this.x = objBack.width - this.width;
        }

        this.y = y - this.width;

        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > objBack.height - this.height / 2 - 15) {
            this.y = objBack.height - this.height / 2 - 15;
        }

    }

    setDxDy(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }



}