interface Crypto {
    getRandomValues<T extends ArrayBufferView>(array: T): T;
}

declare var crypto: Crypto;