const SUBSTITUTES = {
    "Theme Name": "name",
    "Background Color": "bgColor",
    "Command Color": "cmdColor",
    "Suggestions Color": "suggestionsColor",
    "Suggestion Bar Color": "suggestionsBgColor",
    "Input Color": "inputAndBtnsColor",
    "Normal Text & Arrow Color": "resultColor",
    "Error Text Color": "errorColor",
    "Positive Text Color": "successColor",
    "Warning Text Color": "warnColor"
}

const oldToNewConfig = (text) => {
    const newConfig = {}

    for (const line of text.split("\n")) {
        const [pseudoKey, value] = line.split(":** ")
        const sub = SUBSTITUTES[pseudoKey?.slice(2)]
        if (!sub) continue;
        newConfig[sub] = (sub != "name" ? '#' : '') + value
    }

    return newConfig
}

const convertButton = async () => {
    const oldConfTag = document.getElementById("old");
    const convBtnTag = document.getElementById("convbtn");

    const newConfig = oldToNewConfig(oldConfTag.value)
    await navigator.clipboard.writeText(JSON.stringify(newConfig, null, 4))

    const _oldTxt = convBtnTag.textContent
    convBtnTag.textContent = "Result copied to clipboard!"
    oldConfTag.value = ""
    await new Promise(r => setTimeout(r, 2000));
    convBtnTag.textContent = _oldTxt
}
