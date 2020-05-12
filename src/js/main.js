function ready() {

    var navigation_bottom = document.getElementById("navigation_bottom");
    var scrollDownArrow = document.getElementsByClassName("scrollDown__arrow")[0];

    //проверяет проскролили или нет до нижнего меню
    function checkAccessToBottom() {
        var top = window.pageYOffset || document.documentElement.scrollTop;
        var bottomMenu = document.getElementsByClassName('menu_bottom')[0];

        if (top >= navigation_bottom.offsetTop - 300) {
            bottomMenu.style.display = 'flex';
        } else if (top < navigation_bottom.offsetTop - 300) {
            bottomMenu.style.display = 'none';
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;

        return function executedFunction() {
            var context = this;
            var args = arguments;

            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };

            var callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    //декорирует функцией троттлинга
    var debouncedFunc = debounce(checkAccessToBottom, 150);

    //вешает обработчик на стрелку
    scrollDownArrow.addEventListener('click', function () {
        navigation_bottom.scrollIntoView({block: "start", behavior: "smooth"});
    });

    //вешает обработчик на скролл
    document.addEventListener('scroll', debouncedFunc);
}

document.addEventListener("DOMContentLoaded", ready);