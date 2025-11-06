/**
 * @param {string} file
 * @param {string} id
 */
const load_text = (file, id) => {
    fetch(file)
        .then((res) => res.text())
        .then((data) => {
            let buttons = document.getElementsByClassName("here");
            if (id == "home" || id == "quiz") pop_up_starter();
            for (let i = 0; i < buttons.length; i++)
                if (
                    (buttons[i].id != id &&
                        buttons[i].classList.contains("here")) ||
                    (buttons[i].id == id &&
                        !buttons[i].classList.contains("here"))
                )
                    buttons[i].classList.toggle("here");

            const MAIN = document.getElementById("main");

            clear(MAIN);
            sessionStorage.clear();

            let start = data.indexOf("#") + 1;
            let end = data.indexOf("#", start);

            append_this(MAIN, "h1", data.slice(start, end));

            add_contet(MAIN, data.slice(end + 1).split("[q]"));
        })
        .catch((e) => console.log(e));
};

(() => {
    document.onload = load_text("./TXT/test.txt", "home");
})();
