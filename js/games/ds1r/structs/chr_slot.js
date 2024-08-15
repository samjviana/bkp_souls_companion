class ChrSlot {
    /**
     * Creates an instance of `ChrSlot`.
     * @param {NativePointer} address The address of the `ChrSlot` instance.
     */
    constructor(address) {
        this.address = address;
    }

    get chrIns() {
        return new ChrIns(Memory.readPointer(this.address));
    }

    /**
     * @private
     */
    get _pad0_0x008() {
        return Memory.readByteArray(this.address.add(0x008), 16);
    }

    get spEffect() {
        return Memory.readInt(this.address.add(0x018));
    }

    /**
     * @private
     */
    get _pad1_0x01C() {
        return Memory.readByteArray(this.address.add(0x020), 24);
    }
}