import { encode } from 'gpt-3-encoder';
// chrome中无法使用fs,弃用

function countTokens(str) {
    const encoded = encode(str);
    return encoded.length;
}

// 示例用法
const text = "sdfj cs sdfiw fsjdk文章知，识点与官方sdfsd知识档案匹配，可进一步学习相关知识";
const tokenCount = countTokens(text);
console.log('Token number:', tokenCount);