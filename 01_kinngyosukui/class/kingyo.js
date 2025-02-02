class Kingyo extends Material {

    constructor(x, y, dw, dh, imagesrc) {
        super(x, y, dw, dh, imagesrc); // Materialクラスのコンストラクタを呼び出す
        this.angle = this.getRandomInt(0, 359);
        this.imageangle;
        this.nowangle = this.angle - 45;
        this.angleflag = false;

        this.speed = this.getRandomInt(1, 3) * 2;
        this.dx = this.speed * Math.cos((this.angle) * (Math.PI / 180));
        this.dy = this.speed * Math.sin((this.angle) * (Math.PI / 180));



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
        ctx.save(); // コンテキストの現在の状態を保存

        // 画像の中心に移動
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // 画像を回転

        this.imageangle = -this.angle + 45;
        ctx.rotate((this.imageangle) * (Math.PI / 180));

        // 画像を描画（描画位置は中心からずらす）
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore(); // コンテキストの状態を復元
    }

    move() {

        this.setDirection(this.angle);

        this.x += this.dx;
        this.y -= this.dy;

        if (this.x < 0) {
            this.x = 0;

            if (this.angle >= 90 && this.angle < 180) {
                let nasukaku = this.angle - 90;

                this.angle = 90 - nasukaku;
                //    console.log(1);

            }

            else {
                let nasukaku = this.angle - 180;

                this.angle = 270 + nasukaku;
                //      console.log(2);

            }

            this.setDirection(this.angle);

        }
        if (this.x > objBack.width - this.width) {
            this.x = objBack.width - this.width;

            if (this.angle >= 270 && this.angle < 360) {
                let nasukaku = 360 - this.angle;

                this.angle = 270 - nasukaku;
                //    console.log(3);

            }

            else {
                let nasukaku = 90 - this.angle;

                this.angle = 90 + nasukaku;
                //    console.log(4);

            }

            this.setDirection(this.angle);

        }

        if (this.y < 0) {
            this.y = 0;


            if (this.angle >= 0 && this.angle < 90) {
                let nasukaku = this.angle;

                this.angle = 360 - nasukaku;
                //    console.log(5);

            }

            else {
                let nasukaku = 180 - this.angle;

                this.angle = 180 + nasukaku;
                //console.log(6);

            }


            this.setDirection(this.angle);


        }





        if (this.y > objBack.height - this.height) {
            this.y = objBack.height - this.height;
            if (this.angle >= 180 && this.angle < 270) {
                let nasukaku = this.angle - 180;

                this.angle = 180 - nasukaku;
                //  console.log(7);

            }

            else {
                let nasukaku = 360 - this.angle;

                this.angle = nasukaku;
                //  console.log(nasukaku);

            }

            this.setDirection(this.angle);

        }
        // console.log(this.imageangle);

    }




    setDirection(angleInDegrees) {
        // 移動方向を設定するメソッド
        this.dx = this.speed * Math.cos(angleInDegrees * (Math.PI / 180));
        this.dy = this.speed * Math.sin(angleInDegrees * (Math.PI / 180));
    }

    setDxDy(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    set_angle(angle) {
        this.angle = angle;
    }

    set_speed(speed) {
        this.speed = speed;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    kingyo_randome_angle() {
        this.angle = this.getRandomInt(this.angle - 30, this.angle + 30);
        this.speed = this.getRandomInt(1, 3) * 2;
    }



}