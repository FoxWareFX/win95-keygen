String.prototype.replaceAt = function (index, repl) {
    if(index > this.length)
        return this.valueOf();

    return this.substr(0, index) + repl + this.substr(index + 1)
}

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

function digitSum(num) {
    let sum = 0;

    while(num) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function brand() {
    return rand(0, 1);
}

let init = false;

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

function gen(field, initField, prod, ver) {
    if(!init) {
        $(field).removeClass(initField);
        init = true;
    }

    $(field).val(keyType[prod][ver]());
}

function copy(field) {
    navigator.clipboard.writeText($(field).val());
}