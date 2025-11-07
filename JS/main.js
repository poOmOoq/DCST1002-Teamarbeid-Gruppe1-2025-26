/**
 * @param {string} file
 * @param {string} id
 */
const load_text = (file, id) => {
    try {
        clear_time();
        pop_up_close();
    } catch {}
    fetch(file)
        .then((res) => res.text())
        .then((data) => {
            if (id == "quiz") pop_up_starter();

            try {
                document.getElementsByClassName("here")[0].classList = "";
            } catch {}
            document.getElementById(id).classList = "here";

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
    document.onload = load_text("./TXT/welcome.txt", "home");
})();
