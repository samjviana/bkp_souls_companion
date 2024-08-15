class WorldChrManImp {
    /**
     * @private
     */
    _prevNumLoadedWorldBlocks;
    /**
     * @private
     */
    _loadedWorldChrs;

    /**
     * Creates an instance of `WorldChrManImp`.
     * @param {NativePointer} address The address of the `WorldChrManImp` instance.
     */
    constructor(address) {
        this.address = address;
        this._prevNumLoadedWorldBlocks = 0;
        this._loadedWorldChrs = new Map();
    }

    /**
     * @private
     */
    get _pad0_0x000() {
        return Memory.readByteArray(this.address, 104);
    }

    get localPlayer() {
        return new ChrIns(Memory.readPointer(this.address.add(0x068)));
    }

    /**
     * @private
     */
    get pad1_0x070() {
        return Memory.readByteArray(this.address.add(0x070), 48);
    }

    get numLoadedWorldBlocks() {
        return Memory.readInt(this.address.add(0x0A0));
    }

    /**
     * @private
     */
    get pad2_0x00A4() {
        return Memory.readByteArray(this.address.add(0x0A4), 4);
    }

    get loadedWorldBlocks() {
        // TODO: Maybe write some sort of buffer to avoid reading the same memory multiple times?
        const _loadedWorldBlocks = [];
        for (let i = 0; i < this.numLoadedWorldBlocks; i++) {
            const worldBlock = new WorldBlockChr(Memory.readPointer(this.address.add(0x0A8 + i * 8)));
            _loadedWorldBlocks.push(worldBlock);
        }

        return _loadedWorldBlocks;
    }

    get loadedWorldChrs() {
        if (this.numLoadedWorldBlocks == this._prevNumLoadedWorldBlocks) {
            return this._loadedWorldChrs;
        }
        this._prevNumLoadedWorldBlocks = this.numLoadedWorldBlocks; 

        this._loadedWorldChrs = new Map();
        for (const worldBlock of this.loadedWorldBlocks) {
            for (const chrSlot of worldBlock.chrSlots) {
                if (chrSlot.chrIns.address.isNull()) {
                    continue;
                }

                this._loadedWorldChrs.set(chrSlot.chrIns.handle, chrSlot.chrIns);
            }
        }

        return this._loadedWorldChrs;
    }
}