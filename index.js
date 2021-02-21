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

// Easter egg
function ee() {
    show(eePhrases[rand(0, eePhrases.length - 1)], "linear-gradient(50deg, #FF0000, #FF9900)");
}

// Random
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Boolean Random
function brand() {
    return rand(0, 1);
}

// Calculates the string that his summed digits are divisible by 7
function calcMod7(len) {
    let str = "0".repeat(len);

    for(let i = 0, p = 0, sum = 7 * rand(1, len); sum > 0; i++, p = i % len) {
        if(brand() && parseInt(str.charAt(p)) < 9) {
            str = str.replaceAt(p, parseInt(str.charAt(p)) + 1);
            sum--;
        }
    }

    return str;
}

/*
 * Gen Win95 Retail
 * NNN-MMMMMMM
 * NNN = any number from 0 to 999
 * MMMMMMM = the sum of the digits MUST be divisible by 7
 */
function gO95ret() {
    return rand(0, 999).toString().padStart(3, '0') + "-" + calcMod7(7);
}

/*
 * Gen Win95 Retail
 * NNN-MMMMMMM
 * NNN = any number from 0 to 999 (except 333, 444, 555 ... 999)
 * MMMMMMM = the sum of the digits MUST be divisible by 7
 */
function gW95ret() {
    let seg1;

    do {
        seg1 = rand(0, 999);
    } while(seg1 === 333 || seg1 === 444 || seg1 === 555 || seg1 === 666 || seg1 === 777 || seg1 === 888 || seg1 === 999);

    return seg1.toString().padStart(3, '0') + "-" + calcMod7(7);
}

/*
 * Gen Office95 OEM
 * NNNNN-OEM-MMMMMMM-PPPPP
 * MMMMMZ = the sum of the digits MUST be divisible by 7
 * NNNNN, PPPPP = any number from 0 to 99999
 */
function gO95oem() {
    return rand(0, 99999).toString().padStart(5, '0') + "-OEM-" + calcMod7(7) + "-" + rand(0, 99999).toString().padStart(5, '0');
}

/*
 * Gen Win95 OEM
 * DDDYY-OEM-0MMMMMZ-NNNNN
 * DDD = Day of the year (1-366)
 * YY = year (95-02)
 * 0 = the first digit of the mod7 check MUST be 0
 * MMMMMZ = the 2-5 digits can be any number (except to the last, MUST NOT be 0), the sum of the digits MUST be divisible by 7
 * NNNNN = any number from 0 to 99999
 */
function gW95oem() {
    let seg1;

    do {
        seg1 = calcMod7(6);
    } while(seg1.endsWith("0"));

    return rand(1, 366).toString().padStart(3, '0') + (brand()? rand(95, 99) : rand(0, 2)).toString().padStart(2, '0') + "-OEM-0" + seg1 + "-" + rand(0, 99999).toString().padStart(5, '0');
}

// Generate the key
function gen(prod, ver) {
    /*
     * If it was not initialized, removes the class 'initField' so the code is black and not gray
     */
    if(!init) {
        keyField.removeClass(initField);
        init = true;
    }

    // Takes the function from the keyType 'enum'
    keyField.val(keyType[prod][ver]());
}

// Show a notification
let presses = 0;
function show(text, bg) {
    note.html(text);
    note.css("background", bg);

    note.addClass(noteVisible);
    presses++;

    setTimeout(function () {
        /*
         * removes the class only if the button was not pressed more times.
         * necessary for not make the note go up and down.
         */
        if(presses <= 1)
            note.removeClass(noteVisible);

        presses--;
    }, 2000);
}

/*
 * Copy the code from the KEY_FIELD to the clipboard,
 * showing a notification if was copied successfully.
 */
function copy() {
    if(init) {
        navigator.clipboard.writeText(keyField.val());
        show("Copied to clipboard!", "#FF9900");
    } else
        show("Nothing to copy!", "#FF0000");
}