class ChrDamageModule {
    /**
     * @param {NativePointer} address - The address of the `ChrDamageModule` object in memory
     * @constructor
     */
    constructor(address) {
        this.address = address;
        this.pad0_0x00 = Memory.readByteArray(address, 8);              // 0x0
        this.chrIns = new ChrIns(Memory.readPointer(address.add(0x8))); // 0x8
    }
}