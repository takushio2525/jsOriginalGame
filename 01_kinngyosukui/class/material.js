class Material {
    constructor(x, y, dw, dh, imageSrc) {
        //オブジェクトのサイズ取得には一度ロードが必要だそうです

        this.x = x;
        this.y = y;
        this.width = dw; //横幅
        this.height = dh; //縦幅
        this.dx;
        this.dy;

        this.image = new Image();
        this.image.src = imageSrc; //イメージファイルパス

        this.image.onload = () => {
            // this.width = (this.image.width * this.percent) / 100; //横幅
            // this.height = (this.image.height * this.percent) / 100; //縦幅
            this.image.onload = null; // onload イベントハンドラを削除(一度のみの実行なので)
        };
    }

    overlap(obj) {
        let x1, y1, w1, h1, x2, y2, w2, h2;
        x1 = this.x;
        x2 = obj.x;
        y1 = this.y;
        y2 = obj.y;
        w1 = this.width;
        w2 = obj.width;
        h1 = this.height;
        h2 = obj.height;
        if (x2 < x1 + w1 && x1 < x2 + w2 && y2 < y1 + h1 && y1 < y2 + h2) {
            return true; //２つのオブジェクトが重なっていればtrueを返す
        } else {
            return false; // ２つのオブジェクトが重なっていなければfalseを返す
        }
    }


    // overlap_percent(obj) {
    //     let x1, y1, w1, h1, x2, y2, w2, h2, square_whidth, spuare_height;
    //     x1 = this.x;
    //     x2 = obj.x;
    //     y1 = this.y;
    //     y2 = obj.y;
    //     w1 = this.width;
    //     w2 = obj.width;
    //     h1 = this.height;
    //     h2 = obj.height;
    //     if (x2 < x1 + w1 && x1 < x2 + w2 && y2 < y1 + h1 && y1 < y2 + h2) {
    //         if (x2 < x1 + w1) {

    //         }
    //     } else {
    //         return 0;// ２つのオブジェクトが重なっていなければfalseを返す
    //     }
    // }


    reset() {
        this.x = this.defaultX;
        this.y = this.defaultY;
        this.width = this.defaultWidth; //横幅
        this.height = this.defaultHeight; //縦幅
        this.color = this.defaultColor;
        this.invisible = false;
    }

    nullCheck(array) {
        if (!Array.isArray(array)) {
            return false;
        }

        // 配列内の要素を順番に確認し、最初に見つかったnullの要素を返す
        for (let i = 0; i < array.length; i++) {
            if (array[i] == null) {
                return i; // 最初に見つかったnullの要素を返す
            }
        }

        // nullが見つからなかった場合はfalseを返す
        return false;
    }
}
