// Unclickable menu items on mobile/tablet - a:hover problem
var unclickableMenuItemsOnMobileOrTablet = [".header:not(.header--active) .header__nav > ul > li:nth-child(3) > a"]
if (DeviceMeta.isMobileOrTablet()) {
    unclickableMenuItemsOnMobileOrTablet.forEach(menuItem => {
        document.querySelectorAll(menuItem)[0].addEventListener("click", (e) => {
            e.preventDefault();
            var item = document.querySelectorAll(menuItem + " + ul")[0];
            if(!item.classList.contains('displayed-none')){
                item.classList.add('displayed-none');
            }
            item.classList.toggle('displayed-block');
        })
    })
}

// Mobile/tablet navigation menu
(function() {
    const headerEl = document.getElementsByClassName('header')[0];
    const headerActiveCls = 'header--active';
    const navbtnEl = document.getElementsByClassName('header__navbtn')[0];

    navbtnEl.addEventListener('click', function() {
        headerEl.classList.toggle(headerActiveCls);
    })
})()