function formatDoc(cmd, value=null){
    if(value){
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd);
    }
}

function addLink(){
    const url = prompt('Insert URL');
    formatDoc('createLink', url);
}



const content = document.getElementById('content');

content.addEventListener('mouseenter', () => {
    const a = content.querySelectorAll('a');
    a.forEach(item => {
        item.addEventListener('mouseenter', () => {
            content.setAttribute('contenteditable', false);
            item.target ="_blank";
        })
    })
})

const showCode = document.getElementById("show-code");
let active = false;

showCode.addEventListener('click', () => {
    showCode.dataset.active = !active;
    active = !active
    if(active){
        content.textContent = content.innerHTML;
        content.setAttribute('contenteditable', false);

    } else {
        content.innerHTML = content.textContent;
        content.setAttribute('contenteditable', true);
    }
})

const fileName = document.getElementById("fileName");

function fileHandle(value){
    if(value=== 'new') {
        content.innerHTML = " ";
        fileName.value = 'untitled';
    } else if(fileName === 'txt') {
        const blob = new Blob([content.innerText]);
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('a');
        link.href = url;
        link.download = `${fileName.value}.txt`
        link.click();
    } else if(value ==="pdf") {
        html2pdf(content).save(fileName.value);
    }
}