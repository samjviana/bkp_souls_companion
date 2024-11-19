class DamageInfo {
    /**
     * @param {NativePointer} address - The address of the `DamageInfo` object in memory
     * @constructor
     */
    constructor(address) {
        this.address = address;
        this.pad0_0x00 = Memory.readByteArray(address, 552);    // 0x0
        this.damage = Memory.readInt(address.add(0x228));     // 0x228
    }
}