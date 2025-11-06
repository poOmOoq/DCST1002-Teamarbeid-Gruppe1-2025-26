const pop_up_starter = () => {
    fetch("./TXT/popUp.txt")
        .then((res) => res.text())
        .then((data) => {
            data = data.split("\n");
            let str = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].includes("\r")) data[i] = data[i].slice(0, -1);
                str += data[i] + "|";
            }
            sessionStorage.setItem("ads", str);
            console.log(sessionStorage);
            test();
            return pop_up_machine();
        });
};

const test = () => {
    const t = document.getElementById("popUp");
    t.style.marginTop = (-t.offsetHeight).toString();
};

const pop_up_machine = () => {
    const ALL_ADS = sessionStorage
        .getItem("ads")
        .split("|")
        .slice(0, -1)
        .map((ad) => {
            return ad.split("*");
        });
    let adId = Math.ceil(Math.random() * ALL_ADS.length);
    let time = Math.floor(Math.random() * 3) + 5;

    setTimeout(() => {}, time * 1000);
};

const pop_up_close = () => {
    const grayOut = document.getElementById("grayOut");
    const popUp = document.getElementById("popUp");

    for (let el in [grayOut, popUp]) {
        if (!el.classList.contains("hide")) el.classList.toggle("hide");
    }

    return pop_up_machine();
};
