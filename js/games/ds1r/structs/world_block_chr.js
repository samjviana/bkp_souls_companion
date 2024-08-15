class WorldBlockChr {
    /**
     * Creates an instance of `WorldBlockChr`.
     * @param {NativePointer} address The address of the `WorldBlockChr` instance.
     */
    constructor(address) {
        this.address = address;
    }

    /**
     * @private
     */
    get _pad0_0x000() {
        return Memory.readByteArray(this.address, 72);
    }

    get numChrSlots() {
        return Memory.readInt(this.address.add(0x048));
    }

    /**
     * @private
     */
    get pad1_0x04C() {
        return Memory.readByteArray(this.address.add(0x04C), 4);
    }

    get chrSlots() {
        const chrSlotsAddress = Memory.readPointer(this.address.add(0x050));
        const _chrSlots = [];
        for (let i = 0; i < this.numChrSlots; i++) {
            const chrSlot = new ChrSlot(chrSlotsAddress.add(i * 56));
            _chrSlots.push(chrSlot);
        }

        return _chrSlots;
    }
}