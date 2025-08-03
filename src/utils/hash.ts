export function bigIntToHex(hash: bigint) {
    const hex = hash.toString(16)
    return hex.length % 2 ? '0' + hex : hex;
}
