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

function calculateCost(tokenCountInput, tokenCountOutput, model) {
    let costPerTokenInput, costPerTokenOutput;

    switch (model) {
        case 'gpt-4':
            costPerTokenInput = 0.03 / 1000;
            costPerTokenOutput = 0.06 / 1000;
            break;
        case 'gpt-3.5':
            costPerTokenInput = 0.0005 / 1000;
            costPerTokenOutput = 0.0015 / 1000;
            break;
        default:
            throw new Error('Invalid model name');
    }

    const inputCost = tokenCountInput * costPerTokenInput;
    const outputCost = tokenCountOutput * costPerTokenOutput;
    return inputCost + outputCost;
}

// 创建 HTML 元素 (如果尚未创建)
const costDisplay = document.createElement('div');
costDisplay.id = 'gpt-cost-display';

// 设置样式 (如果尚未设置)
const style = document.createElement('style');
style.textContent = `
  #gpt-cost-display {
    font-family: sans-serif;
    font-size: 12px;
    color: #666; // 设置文本颜色
    margin-top: 10px; // 添加上边距
    text-align: center; // 居中对齐文本
  }
`;
document.head.appendChild(style);

// 定时任务执行的函数
// function scheduleDataFetch(interval) {
//     setInterval(() => {
//         const {userInputs, aiAnswers} = extractAnswersByUserAndAI("div.text-message");
//         // 将用户输入列表合并为一个字符串
//         const userInputsString = userInputs.join("\n\n"); // 使用两个换行符作为分隔符
//         // 将 AI 回答列表合并为一个字符串
//         const aiAnswersString = aiAnswers.join("\n\n"); // 使用两个换行符作为分隔符
//         // 打印合并后的字符串
//         // console.log("Merged User Inputs:", userInputsString);
//         // console.log("Merged AI Answers:", aiAnswersString);
//         // console.log("Length of User Inputs:", userInputsString.length);
//         // console.log("Length of AI Answers:", aiAnswersString.length);
//
//         const userInputsStringResult = separateChinese(userInputsString);
//         const userInputsStringTokenCount = countTokensByLanguage(userInputsStringResult.chinese, userInputsStringResult.other);
//         // console.log("userInputsStringTokenCount数量:", userInputsStringTokenCount);
//
//         const aiAnswersStringResult = separateChinese(aiAnswersString);
//         const aiAnswerTokenCount = countTokensByLanguage(aiAnswersStringResult.chinese, aiAnswersStringResult.other);
//         // console.log("aiAnswerTokenCount数量:", aiAnswerTokenCount);
//
//         const usdToCnyRate = 7.24;
//         const costGPT4 = calculateCost(userInputsStringTokenCount, aiAnswerTokenCount, 'gpt-4');
//         console.log(`总token: ${aiAnswerTokenCount + userInputsStringTokenCount}`);
//         console.log(`GPT4花费: $${costGPT4.toFixed(5)} (¥${(costGPT4 * usdToCnyRate).toFixed(5)})`);
//         const costGPT3_5 = calculateCost(userInputsStringTokenCount, aiAnswerTokenCount, 'gpt-3.5');
//         console.log(`GPT3.5花费: $${costGPT3_5.toFixed(5)} (¥${(costGPT3_5 * usdToCnyRate).toFixed(5)})`);
//
//         costDisplay.innerHTML = `
//        总token: ${aiAnswerTokenCount + userInputsStringTokenCount}
//       GPT4花费: $${costGPT4.toFixed(5)} (¥${(costGPT4 * usdToCnyRate).toFixed(5)})
//       GPT3.5花费: $${costGPT3_5.toFixed(5)} (¥${(costGPT3_5 * usdToCnyRate).toFixed(5)})`;
//
//
//         const parentElement = document.querySelector("div.relative.px-2.py-2.text-center");
//         if (!parentElement.contains(costDisplay)) {
//             parentElement.appendChild(costDisplay);
//         }
//
//         // const parentElement = document.querySelector("div.w-full.pt-2");
//         // if (!parentElement.contains(costDisplay)) {
//         //     parentElement.appendChild(costDisplay);
//         // }
//
//     }, interval);
// }
//
// // 页面加载完成后开始定时任务
// window.addEventListener('load', () => {
//     scheduleDataFetch(10000);
// });

function fetchDataAndUpdateUI() {
    const {userInputs, aiAnswers} = extractAnswersByUserAndAI("div.text-message");
    const userInputsString = userInputs.join("\n\n");
    const aiAnswersString = aiAnswers.join("\n\n");

    const userInputsStringResult = separateChinese(userInputsString);
    const userInputsStringTokenCount = countTokensByLanguage(userInputsStringResult.chinese, userInputsStringResult.other);

    const aiAnswersStringResult = separateChinese(aiAnswersString);
    const aiAnswerTokenCount = countTokensByLanguage(aiAnswersStringResult.chinese, aiAnswersStringResult.other);

    const usdToCnyRate = 7.24;
    const costGPT4 = calculateCost(userInputsStringTokenCount, aiAnswerTokenCount, 'gpt-4');
    // console.log(`总token: ${aiAnswerTokenCount + userInputsStringTokenCount}`);
    // console.log(`GPT4花费: $${costGPT4.toFixed(5)} (¥${(costGPT4 * usdToCnyRate).toFixed(5)})`);
    const costGPT3_5 = calculateCost(userInputsStringTokenCount, aiAnswerTokenCount, 'gpt-3.5');
    // console.log(`GPT3.5花费: $${costGPT3_5.toFixed(5)} (¥${(costGPT3_5 * usdToCnyRate).toFixed(5)})`);

    costDisplay.innerHTML = `
       总token: ${aiAnswerTokenCount + userInputsStringTokenCount}
      GPT4花费: $${costGPT4.toFixed(5)} (¥${(costGPT4 * usdToCnyRate).toFixed(5)})
      GPT3.5花费: $${costGPT3_5.toFixed(5)} (¥${(costGPT3_5 * usdToCnyRate).toFixed(5)})`;

    const parentElement = document.querySelector("div.relative.px-2.py-2.text-center");
    if (!parentElement.contains(costDisplay)) {
        parentElement.appendChild(costDisplay);
    }
}


function scheduleDataFetch() {
    // 首先从chrome.storage中获取保存的设置
    chrome.storage.sync.get(['isEnabled', 'refreshInterval'], function(data) {
        if (data.isEnabled) { // 检查是否启用
            const interval = parseInt(data.refreshInterval, 10) * 1000; // 将秒转换为毫秒
            setInterval(() => {
                //打印isEnabled和refreshInterval的值
                // console.log("isEnabled:", data.isEnabled);
                // console.log("refreshInterval:", data.refreshInterval);
                fetchDataAndUpdateUI(); // 调用一个新的函数来处理数据获取和更新UI
            }, interval);
        }
    });
}


// 页面加载完成后开始定时任务
window.addEventListener('load', scheduleDataFetch);
