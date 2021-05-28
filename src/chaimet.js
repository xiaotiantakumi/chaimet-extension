export class WordInfo {
    #site
    #pinyinEle
    #descriptionEle
    constructor(site, pinyinEle, descriptionEle) {
        this.#site = site;
        this.#pinyinEle = pinyinEle;
        this.#descriptionEle = descriptionEle;
        this.#setPinyin();
        this.#setDescription();
        //this.#toConsoleLog();
    }
    toConsoleLog() {
        if (this.pinyin) {
            console.log(this.pinyin);
        }
        if (this.Description) {
            console.log(this.Description);
        }
    }
    #setPinyin() {
        let item = this.#pinyinEle[0];
        if (item) {
            this.pinyin = item.innerText;
            return;
        }
        this.pinyin
    }
    #setDescription() {
        let result = '';
        if (!this.#descriptionEle) return result;
        let length = this.#descriptionEle.length > 3 ? 3 : this.#descriptionEle.length;
        for (let i = 0; i < length; i++) {
            if (i != 0) {
                result += '\n';
            }
            result += this.#descriptionEle[i].innerText
        }
        this.Description = result;
    }
}