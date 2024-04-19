const sampleText = "HELLO! brings you the latest celebrity & royal news from the UK & around the world, magazine exclusives, fashion, beauty, lifestyle news, celeb babies, ...";

function separateChinese(text) {
    const chineseChars = [];
    const otherChars = [];
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (isChineseChar(charCode)) {
            chineseChars.push(text[i]);
        } else {
            otherChars.push(text[i]);
        }
    }
    return {
        chinese: chineseChars.join(""),
        other: otherChars.join(""),
    };
}

function isChineseChar(charCode) {
    // 判断字符编码是否在中文字符范围内
    return (charCode >= 0x4E00 && charCode <= 0x9FFF) ||
        (charCode >= 0x3400 && charCode <= 0x4DBF);
}

function estimateChineseTokenCount(chineseText) {
    const chineseCharCount = chineseText.length;
    return Math.ceil(chineseCharCount / (0.75)); // 向上取整
}

function estimateOtherTokenCount(otherText) {
    const otherCharCount = otherText.length;
    return Math.ceil(otherCharCount / 4); // 向上取整
}

function countTokensByLanguage(chineseText, otherText) {
    const chineseTokenCount = estimateChineseTokenCount(chineseText);
    const otherTokenCount = estimateOtherTokenCount(otherText);
    return chineseTokenCount + otherTokenCount;
}

const result = separateChinese(sampleText);
const tokenCounts = countTokensByLanguage(result.chinese, result.other);
console.log("中文字符串:", result.chinese);
console.log("其他字符:", result.other);
console.log("token数量:", tokenCounts);