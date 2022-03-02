// function divisão(divisor, dividendo){
//     resto = divisor%dividendo;
//     inteira = parseInt(divisor/dividendo);
    
//     console.log(resto, inteira)
//     return resto, inteira
// }

// divisão(10,3)

// function capicua(param){
//     const string = String(param)
//     const array = string.split("");
//     let isTrueOrFalse
//     console.log(array)
//         for (let index = 0; index < array.length; index++) {
//             if (index < array.length/2 ) {
//                 isTrueOrFalse = array[index] == array[array.length-index-1]
//             }
//         }
//     console.log(isTrueOrFalse)
//     return isTrueOrFalse
// }

// capicua(1321)

// =============== Maskifiy ====================

// escrever uma função que mascare todos os caracteres exeto os ultimos 4.

function maskify(param) {
    const string = String(param)
    const length = string.length;
    let array = string.split("");
    let newArray = [];
    for (let index = 0; index < length; index++) {
        if (index < length - 4) {
            newArray.push(array[index].replace(array[index], "#"));
        }  
        else if( index >= length - 4) {
            newArray.push(array[index])
        } 
    }
    return newArray.join("");
}
