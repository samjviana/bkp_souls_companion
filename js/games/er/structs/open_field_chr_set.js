class OpenFieldChrSet {
    /**
     * @param {NativePointer} address - The address of the `OpenFieldChrSet` object in memory
     * @constructor
     **/
    constructor(address) {
        this.address = address;
        this.pad0_0x0 = Memory.readByteArray(address, 24);      // 0x0
        this.chrArray = [];                                     // 0x18
        this.count = Memory.readInt(address.add(0x20));         // 0x20

        const chrArrayPointer = Memory.readPointer(address.add(0x18));
        for (let i = 0; i < this.count; i++) {
            const chrPair = new ChrPair(chrArrayPointer.add(i * 0x10));
            this.chrArray.push(chrPair);
            // // TODO: Remember to remove this break statement when not debugging
            // break;
        }
    }
}