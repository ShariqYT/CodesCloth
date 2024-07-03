export function formatIndianCurrency(amount) {
    if (typeof amount !== 'number') {
        throw new TypeError('The input must be a number');
    }

    // Convert the number to a string and split into integer and fractional parts
    let [integerPart, fractionalPart] = amount.toString().split('.');
    
    // Reverse the integer part for easier manipulation
    let reversedIntegerPart = integerPart.split('').reverse().join('');
    
    // Insert commas after every two digits, starting from the third digit
    let formattedIntegerPart = '';
    for (let i = 0; i < reversedIntegerPart.length; i++) {
        if (i === 3 || (i > 3 && (i - 1) % 2 === 0)) {
            formattedIntegerPart += ',';
        }
        formattedIntegerPart += reversedIntegerPart[i];
    }
    
    // Reverse the integer part back to normal
    formattedIntegerPart = formattedIntegerPart.split('').reverse().join('');
    
    // Combine the integer and fractional parts
    if (fractionalPart && fractionalPart !== '00') {
        return `${formattedIntegerPart}.${fractionalPart}`;
    } else {
        return formattedIntegerPart;
    }
}