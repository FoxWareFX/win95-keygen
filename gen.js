String.prototype.replaceAt = function (index, repl) {
    if(index > this.length)
        return this.valueOf();

    return this.substr(0, index) + repl + this.substr(index + 1)
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

function gen(field, initField) {
    if(!init) {
        $(field).removeClass(initField);
        init = true;
    }

    let seg1;
    let seg2 = "0000000";
    let fld = $(field);

    for(let i = 0, p = 0, sum = 7 * rand(1, seg2.length); sum > 0; i++, p = i % seg2.length) {
        if(brand() && parseInt(seg2.charAt(p)) < 9) {
            seg2 = seg2.replaceAt(p, parseInt(seg2.charAt(p)) + 1);
            sum--;
        }
    }

    do {
        seg1 = rand(0, 999);
    } while(seg1 === 333 || seg1 === 444 || seg1 === 555 || seg1 === 666 || seg1 === 777 || seg1 === 888 || seg1 === 999);

    fld.val(seg1.toString().padStart(3, '0') + "-" + seg2);
}

function copy(field) {
    navigator.clipboard.writeText($(field).val());
}