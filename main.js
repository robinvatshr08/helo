window.addEventListener('scroll',()=>{
    let navbar=document.getElementsByClassName('navigation')
    if (window.scrollY>100){
        navbar.classList.add('sticky')
    }

    else{
        navbar.classList.remove('sticky')
    }
})