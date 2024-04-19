/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// This file includes code which was modified from https://github.com/openai/gpt-2
const fs = __webpack_require__(896)
const path = __webpack_require__(928);

const encoder = JSON.parse(fs.readFileSync(path.join(__dirname, './encoder.json')));
const bpe_file = fs.readFileSync(path.join(__dirname, './vocab.bpe'), 'utf-8');

const range = (x, y) => {
  const res = Array.from(Array(y).keys()).slice(x)
  return res
}

const ord = x => {
  return x.charCodeAt(0)
}

const chr = x => {
  return String.fromCharCode(x)
}

const textEncoder = new TextEncoder("utf-8")
const encodeStr = str => {
  return Array.from(textEncoder.encode(str)).map(x => x.toString())
}

const textDecoder = new TextDecoder("utf-8")
const decodeStr = arr => {
  return textDecoder.decode(new Uint8Array(arr));
}

const dictZip = (x, y) => {
  const result = {}
  x.map((_, i) => { result[x[i]] = y[i] })
  return result
}

function bytes_to_unicode() {
  const bs = range(ord('!'), ord('~') + 1).concat(range(ord('¡'), ord('¬') + 1), range(ord('®'), ord('ÿ') + 1))

  let cs = bs.slice()
  let n = 0
  for (let b = 0; b < 2 ** 8; b++) {
    if (!bs.includes(b)) {
      bs.push(b)
      cs.push(2 ** 8 + n)
      n = n + 1
    }
  }

  cs = cs.map(x => chr(x))

  const result = {}
  bs.map((_, i) => { result[bs[i]] = cs[i] })
  return result
}

function get_pairs(word) {
  const pairs = new Set()
  let prev_char = word[0]
  for (let i = 1; i < word.length; i++) {
    const char = word[i]
    pairs.add([prev_char, char])
    prev_char = char
  }
  return pairs
}

const pat = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu

const decoder = {}
Object.keys(encoder).map(x => { decoder[encoder[x]] = x })

const lines = bpe_file.split('\n')

// bpe_merges = [tuple(merge_str.split()) for merge_str in bpe_data.split("\n")[1:-1]]
const bpe_merges = lines.slice(1, lines.length - 1).map(x => {
  return x.split(/(\s+)/).filter(function(e) { return e.trim().length > 0 })
})

const byte_encoder = bytes_to_unicode()
const byte_decoder = {}
Object.keys(byte_encoder).map(x => { byte_decoder[byte_encoder[x]] = x })

const bpe_ranks = dictZip(bpe_merges, range(0, bpe_merges.length))
const cache = new Map;

function bpe(token) {
  if (cache.has(token)) {
    return cache.get(token)
  }``

  let word = token.split('')

  let pairs = get_pairs(word)

  if (!pairs) {
    return token
  }

  while (true) {
    const minPairs = {}
    Array.from(pairs).map(pair => {
      const rank = bpe_ranks[pair]
      minPairs[(isNaN(rank) ? 10e10 : rank)] = pair
    })



    const bigram = minPairs[Math.min(...Object.keys(minPairs).map(x => {
      return parseInt(x)
    }
    ))]

    if (!(bigram in bpe_ranks)) {
      break
    }

    const first = bigram[0]
    const second = bigram[1]
    let new_word = []
    let i = 0

    while (i < word.length) {
      const j = word.indexOf(first, i)
      if (j === -1) {
        new_word = new_word.concat(word.slice(i))
        break
      }
      new_word = new_word.concat(word.slice(i, j))
      i = j

      if (word[i] === first && i < word.length - 1 && word[i + 1] === second) {
        new_word.push(first + second)
        i = i + 2
      } else {
        new_word.push(word[i])
        i = i + 1
      }
    }

    word = new_word
    if (word.length === 1) {
      break
    } else {
      pairs = get_pairs(word)
    }
  }

  word = word.join(' ')
  cache.set(token, word)

  return word
}

function encode(text) {
  let bpe_tokens = []
  const matches = Array.from(text.matchAll(pat)).map(x => x[0])
  for (let token of matches) {
    token = encodeStr(token).map(x => {
      return byte_encoder[x]
    }).join('')
    
    const new_tokens = bpe(token).split(' ').map(x => encoder[x])
    bpe_tokens = bpe_tokens.concat(new_tokens)
  }
  return bpe_tokens
}

function decode(tokens) {
  let text = tokens.map(x => decoder[x]).join('')
  text = decodeStr(text.split('').map(x => byte_decoder[x]))
  return text
}

module.exports = {
  encode,
  decode
};

/***/ }),

/***/ 171:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { encode, decode } = __webpack_require__(671);

module.exports = {
  encode,
  decode,
};


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(171);


// module.exports = {
//     // ...
//     resolve: {
//         fallback: {
//             fs: require.resolve('browserify-fs'),
//             path: require.resolve('path-browserify'),
//             buffer: require.resolve('buffer/'),
//             crypto: require.resolve('crypto-browserify'),
//             stream: require.resolve('stream-browserify'),
//             zlib: require.resolve('browserify-zlib')
//         },
//         alias: {
//             '@': path.resolve(__dirname, 'src')
//         }
//     },
//     // ...
// };

function extractAnswersByUserAndAI(selector) {
    const answerElements = document.querySelectorAll(selector); // 获取所有包含回答的元素
    const userInputs = [];
    const aiAnswers = [];

    answerElements.forEach((element, index) => {
        let text = "";

        function traverse(node) {
            if (node.nodeType === 3) { // 检查节点类型是否为文本节点
                text += node.nodeValue.trim(); // 提取文本内容并去除首尾空格
            } else {
                for (const child of node.childNodes) {
                    traverse(child); // 递归遍历子节点
                }
            }
        }

        traverse(element);

        if (index % 2 === 0) { // 根据索引判断是用户输入还是 AI 回答
            userInputs.push(text); // 偶数索引为用户输入
        } else {
            aiAnswers.push(text); // 奇数索引为 AI 回答
        }
    });
    return {userInputs, aiAnswers}; // 返回包含两个列表的对象
}

function countTokens(str) {
    const encoded = (0,gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0__.encode)(str);
    return encoded.length;
}

// 定时任务执行的函数
function scheduleDataFetch(interval) {
    setInterval(() => {
        const {userInputs, aiAnswers} = extractAnswersByUserAndAI("div.text-message");
        // 将用户输入列表合并为一个字符串
        const userInputsString = userInputs.join("\n\n"); // 使用两个换行符作为分隔符
        // 将 AI 回答列表合并为一个字符串
        const aiAnswersString = aiAnswers.join("\n\n"); // 使用两个换行符作为分隔符
        // 打印合并后的字符串
        // console.log("Merged User Inputs:", userInputsString);
        // console.log("Merged AI Answers:", aiAnswersString);
        console.log("Length of User Inputs:", userInputsString.length);
        console.log("Length of AI Answers:", aiAnswersString.length);

        // 计算token数量
        const userInputTokenCount = countTokens(userInputsString);
        const aiAnswerTokenCount = countTokens(aiAnswersString);

        // 打印合并后的字符串及token数量
        console.log("Token count of User Inputs:", userInputTokenCount);
        console.log("Token count of AI Answers:", aiAnswerTokenCount);
    }, interval);
}

// 页面加载完成后开始定时任务，这里设置为每10秒执行一次
window.addEventListener('load', () => {
    scheduleDataFetch(10000);
});
})();

/******/ })()
;