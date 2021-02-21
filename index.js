String.prototype.replaceAt = function (index, repl) {
    if(index > this.length)
        return this.valueOf();

    return this.substr(0, index) + repl + this.substr(index + 1)
}

let init = false;
const keyField = $(".key-field");
const initField = "key-field-init";
const note = $(".note");
const noteVisible = "note-visible";
const eePhrases = ["You are not supposed to see this!", "Someone is curious, huh?", "DON'T TOUCH ME!", "visitor.give(Actions.HUG);"];
const keyType = {
    OFF: {
        RET: gO95ret,
        OEM: gO95oem
    },
    WIN: {
        RET: gW95ret,
        OEM: gW95oem
    }
}

function ee() {
    show(eePhrases[rand(0, eePhrases.length - 1)], "linear-gradient(50deg, #FF0000, #FF9900)");
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function brand() {
    return rand(0, 1);
}

function calcSumStr(len) {
    let str = "0".repeat(len);

    for(let i = 0, p = 0, sum = 7 * rand(1, len); sum > 0; i++, p = i % len) {
        if(brand() && parseInt(str.charAt(p)) < 9) {
            str = str.replaceAt(p, parseInt(str.charAt(p)) + 1);
            sum--;
        }
    }

    return str;
}

function gO95ret() {
    return rand(0, 999).toString().padStart(3, '0') + "-" + calcSumStr(7);
}

function gW95ret() {
    let seg1;

    do {
        seg1 = rand(0, 999);
    } while(seg1 === 333 || seg1 === 444 || seg1 === 555 || seg1 === 666 || seg1 === 777 || seg1 === 888 || seg1 === 999);

    return seg1.toString().padStart(3, '0') + "-" + calcSumStr(7);
}

function gO95oem() {
    return rand(0, 99999).toString().padStart(5, '0') + "-OEM-" + calcSumStr(7) + "-" + rand(0, 99999).toString().padStart(5, '0');
}

function gW95oem() {
    return rand(1, 366).toString().padStart(3, '0') + (brand()? rand(95, 99) : rand(0, 2)).toString().padStart(2, '0') + "-OEM-0" + calcSumStr(6) + "-" + rand(0, 99999).toString().padStart(5, '0');
}

function gen(prod, ver) {
    if(!init) {
        keyField.removeClass(initField);
        init = true;
    }

    keyField.val(keyType[prod][ver]());
}

let presses = 0;
function show(text, bg) {
    note.html(text);
    note.css("background", bg);

    note.addClass(noteVisible);
    presses++;

    setTimeout(function () {
        if(presses <= 1)
            note.removeClass(noteVisible);

        presses--;
    }, 2000);
}

function copy() {
    if(init) {
        navigator.clipboard.writeText(keyField.val());
        show("Copied to clipboard!", "#FF9900");
    } else
        show("Nothing to copy!", "#FF0000");
}