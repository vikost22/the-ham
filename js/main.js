"use strict"
document.addEventListener('DOMContentLoaded',()=>{

    // Our Services Tabs
const tabsService = document.querySelectorAll(".service-item");
const serviceInfos = document.querySelectorAll(".service-info");
tabsService.forEach(element => {
    for (const item of serviceInfos) {
        if(item.dataset.name === undefined){
            item.setAttribute("data-name",element.textContent);
            break;
        }
    }
    element.addEventListener("click", onServiceClick);
});

function onServiceClick(event) {
    const serviceList = document.querySelector(".service-list");
    serviceList.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    const serviceInfoList = document.querySelector(".service-info-list")
    serviceInfoList.querySelector(".active").classList.remove("active");
    for (const item of serviceInfos) {
        if(event.target.textContent === item.dataset.name){
            item.classList.add("active");
            $('.service-info-list').find('.active').fadeIn();
        }
    }
}

// Section Amazing Works
const tabsWorks = document.querySelectorAll(".amazing-work-item");
tabsWorks.forEach((element)=>{
    element.addEventListener('click', onSortButtonClick);
})
function onSortButtonClick(event) {
    const workExamples = document.querySelectorAll(".amazing-work-example");
    document.querySelector(".amazing-work-list").querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    workExamples.forEach(element => {
        element.classList.remove("active");
        if(event.target.textContent === "All"){
            element.classList.add("active");
        }
        if(element.dataset.name === event.target.textContent){
            element.classList.add("active");
        }
    });
}
let countOfWorks = 0;
function loadNewWorks() {
    ++countOfWorks;
    const sectionAmazingWorks = document.querySelector(".amazing-work-examples");
    document.querySelector(".load-more").remove();
    const dotesWrap = document.createElement("div");
    dotesWrap.classList.add("loading");
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dotesWrap.append(dot);        
    }
    sectionAmazingWorks.after(dotesWrap);
    setTimeout(()=>{
        const fragment = document.createDocumentFragment();
    for (let i = 0; i < 12; i++) {
        const listItem = document.createElement("li");
        listItem.innerHTML = sectionAmazingWorks.querySelector('.amazing-work-example').innerHTML;
        listItem.classList.add('amazing-work-example', 'active');
        if(i>=0&&i<3){
            listItem.setAttribute("data-name", "Graphic Design");
            if(countOfWorks>1){
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/graphic-design${i+4}.jpg`);
            }else{
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/graphic-design${i+1}.jpg`);
            }
        }
        if(i>=3&&i<6){
            listItem.setAttribute("data-name", "Web Design");
            if(countOfWorks>1){
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/web-design${i+1}.jpg`);
            }else{
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/web-design${i-2}.jpg`);
            }
        }
        if(i>=6&&i<10){
            listItem.setAttribute("data-name", "Wordpress");
            if(countOfWorks>1){
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/wordpress${i-1}.jpg`);
            }else{
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/wordpress${i-5}.jpg`);
            }
        }
        if(i>=10&&i<12){
            listItem.setAttribute("data-name", "Landing Pages");
            if(countOfWorks>1){
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/landing-page${i-7}.jpg`);
            }else{
                listItem.querySelector('img').setAttribute("src", `./image/amazing-works/landing-page${i-9}.jpg`);
            }
        }
        listItem.querySelector('.example-text').querySelector('.example-text-type').textContent=listItem.dataset.name;
        fragment.append(listItem);
    }
    sectionAmazingWorks.append(fragment);
    dotesWrap.remove();
    if(countOfWorks<2){
        const loadButton = document.createElement("button");
        loadButton.addEventListener("click",loadNewWorks);
        loadButton.classList.add("load-more");
        loadButton.textContent='LOAD MORE';
        sectionAmazingWorks.after(loadButton);
    }
    document.querySelector(".amazing-work-list").querySelector(".active").click();
    },1500);
    
}
document.querySelector(".load-more").addEventListener("click",loadNewWorks);

// About Ham sleider
const commentPeople = document.querySelectorAll(".commentator-tab");
const commentList = document.querySelectorAll(".commentator");
commentPeople.forEach((element)=>{
    for (let i = 0; i < commentPeople.length; i++) {
        if(commentList[i].dataset.name === undefined){
            commentList[i].setAttribute("data-name", i+1);
        }
        if(commentPeople[i].dataset.name === undefined){
            commentPeople[i].firstElementChild.setAttribute("data-name", i+1);
        }
    }
    element.firstElementChild.addEventListener("click", onComentatorClick);
});

function onComentatorClick(event) {
    document.querySelector(".commentators-tabs").querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    chooseComment();
}
document.querySelector(".button-back").addEventListener('click', onArrowBackClick)
function onArrowBackClick() {
    for (let i = 1; i < commentPeople.length; i++) {
        if(commentPeople[i].firstElementChild.classList.contains('active')){
            commentPeople[i].firstElementChild.classList.remove('active');
            commentPeople[i-1].firstElementChild.classList.add('active')
            break;
        }
    }
    chooseComment();
}
document.querySelector(".button-forth").addEventListener('click', onArrowForthClick)
function onArrowForthClick() {
    for (let i = 0; i < commentPeople.length; i++) {
        if(commentPeople[i].firstElementChild.classList.contains('active') && commentPeople.length !== i+1 ){
            commentPeople[i].firstElementChild.classList.remove('active');
            commentPeople[i+1].firstElementChild.classList.add('active')
            break;
        }
    }
    chooseComment();
}

function chooseComment() {
    const tab = document.querySelector(".commentators-tabs").querySelector(".active");
    document.querySelector(".comment-list").querySelector(".active").classList.remove('active');
    commentList.forEach((element) => {
        if(element.dataset.name === tab.dataset.name){
            element.classList.add('active');
        }
    });
}




// Adding JQuery and use Masonry Plagin


    const $gallery = $('.gallery-wrap').imagesLoaded(()=>{
        $('.gallery-wrap').masonry({
            itemSelector: '.grid-item',
            columnWidth: 378,
            gutter: 13,
            horizontalOrder: true,
        });
    })
    
    $('#btn-gallery').on('click', ()=>{
        $("#btn-gallery").remove();
        const dotesWrap = document.createElement("div");
        dotesWrap.classList.add("loading");
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dotesWrap.append(dot);        
        }
        document.querySelector('.gallery-wrap').after(dotesWrap);
        setTimeout(()=>{
            dotesWrap.remove();
            const elements = createNewElements();
            const $elements = $(elements);
            // ????
            $gallery.append($elements).imagesLoaded(()=>{
                $gallery.append($elements).masonry('appended', $elements);
            })
        },1500)
    })

    function createNewElements() {
        const elements = [];
            for (let i = 0; i < 10; i++) {
                const gridItem = document.createElement('div');
                gridItem.innerHTML=document.querySelector('.gallery-wrap').querySelector('.grid-item').innerHTML;
                gridItem.classList.add('grid-item');
                gridItem.querySelector('img').setAttribute('src', `./image/gallery/masonry-extra-img-${i+1}.jpg`);
                elements.push(gridItem);
            }
            return elements;
    }
            
    $('.gallery-wrap').on('click', (event)=>{
        if(event.target.classList.contains('increase-foto')
        ||event.target.closest('button').classList.contains('increase-foto')){
            const imgSrc = event.target.closest('button').parentElement.previousElementSibling.getAttribute('src');
            $('.image-show').attr('src',imgSrc);
            $('.increase-block').removeAttr('style');
        }
    });
    $('.btn-close').on('click', ()=>{
        $('.increase-block').attr('style', 'display: none');
    })
});