export function isValidHexColorCode(hex) {
    // keep in mind that hex code start with the '#' character
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)
}

export function convertHexColorToRGB(hex) {
    
    // Hex codes can also be only 3 chars long 
    // (4 including the '#' char)
    if (hex.length === 4) {
        let r = parseInt(hex.charAt(1), 16);
        let g = parseInt(hex.charAt(2), 16)
        let b = parseInt(hex.charAt(3), 16)
        return {
            red: r + r * 16,
            green: g + g * 16,
            blue: b + b * 16
        }
    }
    return {
        red: parseInt(hex.substring(1, 3), 16),
        green: parseInt(hex.substring(3,5), 16),
        blue: parseInt(hex.substring(5,7), 16)
    };
}

function paddedHexStr(number) {
    if (typeof number == "string") {
        number = parseInt(number);
    }
    let hex = number.toString(16);
    return hex.length === 1? "0" + hex : hex;
}

export function convertRGBColorToHexCode(rgb) {
    return "#" + 
        paddedHexStr(rgb.red) +
        paddedHexStr(rgb.green) + 
        paddedHexStr(rgb.blue);
}