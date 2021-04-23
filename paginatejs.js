(function() {

    let pages = null;
    let arr = [];

    const _buttons_color = {
        "blue": "blue",
        "red": "red",
        "orange": "orange",
        "green": "green",
        "yellow": "yellow"
    };

    const _align_buttons = {
        "left": "paginate_left",
        "center": "paginate_center",
        "right": "paginate_right",
    };

    let default_colors = {
        "gradient": false,
        "animation": false,
        "color": _buttons_color.blue
    };

    let config_page = {
        "total_items": 0,
        "total_pages": 0,
        "current_page": 1,
        "items_in_page": 10,
        "buttons_next_previous": true,
        "buttons_first_last": true,
        "input_between": false,
        "num_middle_buttons": 2,
        "align_buttons": _align_buttons.center,
    };

    let configuration = {
        "page": config_page,
        "language": {
            "next": "next",
            "previous": "previous",
            "first": "first",
            "last": "last"
        },
        "buttons_style": default_colors,

    };

    function _createButtons() {
        let buttons = [];
        let div = document.createElement('div');
        div.classList.add('alignment_'+config_page.align_buttons);
        if (config_page.buttons_first_last) {
            buttons.push(createLinks(configuration.language.first, 'first'));
        }
        if (config_page.buttons_next_previous) {
            buttons.push(createLinks(configuration.language.previous, 'previous'));
        }

        for (let i = 0; i < config_page.total_pages; i++) {
            if (config_page.input_between && config_page.total_pages / 2 === i) {
                buttons.push(createInput());
            }
            buttons.push(createLinks(i + 1, 'number'));
        }

        if (config_page.buttons_first_last) {
            buttons.push(createLinks(configuration.language.next, 'next'));
        }
        if (config_page.buttons_next_previous) {
            buttons.push(createLinks(configuration.language.last, 'last'));
        }

        buttons.map((i) => {
            div.append(i)
        });

        let paginate = document.getElementsByClassName('paginate');
        paginate[0].append(div);
    }

    function logicPaginate(total_items) {
        config_page.total_pages = pages;
        arr.map((i, j) => {

            if (j >= config_page.current_page * config_page.items_in_page - config_page.items_in_page && j <= config_page.current_page * config_page.items_in_page - 1) {
                i.style.display = 'block';
            } else {
                i.style.display = 'none';
            }
        })
    }

    function init() {
        let total_items = document.getElementsByClassName('paginate_item');
        config_page.total_items = total_items.length;
        pages = Math.ceil(config_page.total_items / config_page.items_in_page);
        arr = Array.prototype.slice.call(total_items);
        logicPaginate(total_items);
        if (config_page.total_items > config_page.items_in_page) {
            _createButtons();
        }
    }

    init();

    function createLinks(name, type) {
        let style = configuration.buttons_style.color;
        if (configuration.buttons_style.gradient) {
            style += '_gradient';
        }

        let a = document.createElement('a');
        a.href = '#';
        a.text = name;
        a.classList.add('paginate_links');
        a.classList.add(style);
        a.addEventListener('click', ()=>{
            changePage(name, type);
        });
        return a;
    }

    function createInput() {
        let i = document.createElement('input');
        i.classList.add('paginate_input');
        i.classList.add('border_input_'+configuration.buttons_style.color)
        i.addEventListener('keyup', (e)=>{
            changePage(e.target.value, 'input');
        });
        return i;
    }

    function changePage(name, type) {

        if (type === configuration.language.first) {
            config_page.current_page = 1;
        }
        if (type === configuration.language.last) {
            config_page.current_page = config_page.total_pages;
        }
        if (type === configuration.language.previous) {
            if(config_page.current_page - 1 > 0) {
                config_page.current_page -= 1;
            }
        }
        if (type === configuration.language.next) {
            if(config_page.current_page + 1 <= config_page.total_pages) {
                config_page.current_page += 1;
            }
        }
        if (type === 'number') {
            config_page.current_page = parseInt(name);
        }

        if (type === 'input') {
            if (parseInt(name) >= 0 && parseInt(name) <= config_page.total_pages) {
                config_page.current_page = name;
            }
        }

        logicPaginate(config_page.total_items)
    }
})();