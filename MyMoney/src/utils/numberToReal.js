export function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

export function sumTotals(arr, sep) {
    return arr.map(el => String(el.value)).reduce((acc, el) =>  addReduce(acc, el, sep));
}

function addReduce(l, r, sep) {
    if (!sep) sep = '.';

    const [ll, lr] = l.split(/[,.]/).map(el => el.split('').map(Number));
    const [rl, rr] = r.split(/[,.]/).map(el => el.split('').map(Number));

    let carry = 0;
    const result = [[], []];

    for (let i = Math.max(lr?.length ?? 0, rr?.length ?? 0); i > 0; --i) {
        result[1][i - 1] = (lr?.[i - 1] ?? 0) + (rr?.[i - 1] ?? 0) + carry;
        carry = Math.floor(result[1][i - 1] / 10);
        result[1][i - 1] %= 10;
    }

    for (let il = ll.length, ir = rl.length, iResult = Math.max(ll.length, rl.length); iResult > 0; --il, --ir, --iResult) {
        result[0][iResult - 1] = (ll[il - 1] ?? 0) + (rl[ir - 1] ?? 0) + carry;
        carry = Math.floor(result[0][iResult - 1] / 10);
        result[0][iResult - 1] %= 10;
    }

    if (carry) result[0] = [carry, ...result[0]];

    return result[0].join('') + sep + result[1].join('');
}