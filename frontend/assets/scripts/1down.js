// const down = document.getElementsByClassName('down')[0];
const info2 = down.getElementsByClassName('info2')[0];

const cell2 = info2.getElementsByClassName('cell2')[0];
const cell3 = info2.getElementsByClassName('cell3')[0];

const content1 = cell2.getElementsByClassName('content')[0];
const content2 = cell3.getElementsByClassName('content')[0];

const img1 = content1.getElementsByTagName('img')[0];
const img2 = content2.getElementsByTagName('img')[0];

const imgUrl = '/graphics/down/';

content1.addEventListener("mouseover", () => {
    // img1.src = imgUrl + '8f.png';
    setTimeout(function() {
        // event.target.style.color = "";
        img1.src = imgUrl + '8f.png';
    }, 85);
});
content1.addEventListener("mouseout", () => {
    setTimeout(() => img1.src = imgUrl + '7f.png');
});

content2.addEventListener("mouseover", () => {
    setTimeout(() => img2.src = imgUrl + '4g.png', 85);
});
content2.addEventListener("mouseout", () => {
    setTimeout(() => img2.src = imgUrl + '3g.png');
});

// content.addEventListener(event ,() => {
//     setTimeout(() => img.src = imgUrl + imgName);
// }, delay);
content.addEventListener(event ,() => {
    setTimeout(() => img.src = imgUrl + imgName);
}, delay);

function common1() {

}