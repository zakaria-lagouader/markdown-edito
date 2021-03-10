const text = document.getElementById('text')
const result = document.getElementById('result')
const render = document.getElementById('render')

render.addEventListener('click', () => {
    let lines = text.value.split("\n");
    renderLines(lines);
})
text.addEventListener('keyup', () => {
    let lines = text.value.split("\n");
    renderLines(lines);
})

let Dom = [];

const renderLines = lines => {
    result.innerHTML = "";
    lines.forEach((line, i) => {
        const ident = getIdent(line);

        switch (ident) {
            case "#":
                Dom.push(`<h1>${line.replace(ident, "").trim()}</h1>`) ;
            break;
            case "##":
                Dom.push(`<h2>${line.replace(ident, "").trim()}</h2>`) ;
            break;
            case "###":
                Dom.push(`<h3>${line.replace(ident, "").trim()}</h3>`) ;
            break;
            case "####":
                Dom.push(`<h4>${line.replace(ident, "").trim()}</h4>`) ;
            break;
            case "#####":
                Dom.push(`<h5>${line.replace(ident, "").trim()}</h5>`) ;
            break;
            case "-":
                if(!lines[i - 1] || getIdent(lines[i - 1]) != "-"){
                    Dom.push(`<ul>`);
                }
                Dom.push(`<li>${line.replace(ident, "").trim()}</li>`);
                if(!lines[i + 1] || getIdent(lines[i + 1]) != "-"){
                    Dom.push(`</ul>`);
                }
            break;
            case ">":
                if(!lines[i - 1] || getIdent(lines[i - 1]) != ">"){
                    Dom.push(`<blockquote><p class="mb-0">`);
                }
                Dom.push(`${line.replace(ident, "").trim()}<br>`);
                if(!lines[i + 1] || getIdent(lines[i + 1]) != ">"){
                    Dom.push(`</blockquote></p>`);
                }
            break;
        
            default:
                if (line == "") {
                    Dom.push(`<br>`) ;
                } else {
                    Dom.push(`<p>${line}</p>`) ;
                }
            break;
        }
    });

    renderDom()
}

const getIdent = line => line.trim().slice(0, line.trim().search(" "));

function renderDom() {
    let text = '';
    Dom.forEach(item => {
        text += item;
    })
    //look for modifiers
    
    result.innerHTML = parsetext(text);
    Dom = [];
}

function parsetext(test) {
    //Search for bold text
    let res = test.replace(/\*(.*?)\*/g, (word) => {

         return `<b>${word.replace(/\*/g, "")}</b>`; 

    })
    // Search for italic text
    res = res.replace(/&(.*?)&/g, (word) => {

        return `<i>${word.replace(/\&/g, "")}</i>`; 
    
    })
    // convert text to link
    res = res.replace(/\[(.*?)\]\((.*?)\)/g, (word) => {

        let linkName = word.match(/\[(.*?)\]/g)[0].replace(/(\[|\])/g, '')
        let link = word.match(/\((.*?)\)/g)[0].replace(/(\(|\))/g, '')
        return `<a href="${link}">${linkName}</a>`
      
    })
    return res;
}

render.click();




