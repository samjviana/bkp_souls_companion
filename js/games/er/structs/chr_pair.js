class ChrPair {
    /**
     * @param {NativePointer} address - The address of the `ChrPair` object in memory
     * @constructor
     **/
    constructor(address) {
        const chrInsPointer = Memory.readPointer(address); 
        if (chrInsPointer.isNull()) {
            return;
            throw new Error('NullPointerException: `ChrIns` pointer is NULL');
        }

        this.chrIns = new ChrIns(chrInsPointer);                    // 0x0
        this.pad0_0x8 = Memory.readByteArray(address.add(0x8), 8);  // 0x8
    }
}