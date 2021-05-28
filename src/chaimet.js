export class WordInfo {
    constructor(site, pinyin, description) {
        this.site = site;
        this.pinyin = pinyin;
        this.description = description;
    }
    getWardInfo() {
        return this.pinyin
    }
}