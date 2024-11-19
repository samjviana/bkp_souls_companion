class ChrSet {
    /**
     * @param {NativePointer} address - The address of the `ChrSet` object in memory
     * @constructor
     **/
    constructor(address) {
        this.address = address;
        this.pad0_0x00 = Memory.readByteArray(address, 16);             // 0x0
        this.count = Memory.readInt(address.add(0x10));                 // 0x10
        this.pad1_0x14 = Memory.readByteArray(address.add(0x14), 4);    // 0x14
        this.chrArray = [];                                             // 0x18

        const chrArrayPointer = Memory.readPointer(address.add(0x18));
        for (let i = 0; i < this.count; i++) {
            const chrPair = new ChrPair(chrArrayPointer.add(i * 0x10));
            this.chrArray.push(chrPair);
            // // TODO: Remember to remove this break statement when not debugging
            // break;
        }
    }
}