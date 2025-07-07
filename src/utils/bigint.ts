import { Buffer } from "buffer";

export function txHashToBuffer(hash: bigint) {
    return bigIntToBuffer(hash, 32)
}

function bigIntToBuffer(bigint: bigint, byteLength?: number) {
    return Buffer.from(bigIntToHex(bigint, byteLength), 'hex')
}

function bigIntToHex(bigint: bigint, byteLength?: number) {
    if (bigint < 0) {
        throw new TypeError("Negative values are not supported")
    }
    if (byteLength !== undefined && byteLength <= 0) {
        throw new TypeError("Invalid byte length")
    }

    const hex = bigint.toString(16)
    if (byteLength === undefined) {
        return hex.length % 2 ? `0${hex}` : hex
    }

    const maxValue = (1n << BigInt(byteLength * 8)) - 1n
    if (bigint > maxValue) {
        throw new TypeError(
            `Value exceeds the maximum for ${byteLength} bytes`
        )
    }

    return hex.padStart(byteLength * 2, '0')
}
