class WorldChrManImp {
    /**
     * @private
     */
    _prevNumLoadedChrs;
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
        this._prevNumLoadedChrs = 0;
        this._loadedWorldChrs = new Map();
    }

    /**
     * @private
     */
    get _pad0_0x000() {
        return Memory.readByteArray(this.address, 69368);
    }

    get playerArray() {
        // TODO: Revise is this is a 100% case, maybe read the player count from the game?
        const playerCount = 6;
        const playerArrayPtr = Memory.readPointer(this.address.add(0x10EF8));
        const playerArray = [];
        for (let i = 0; i < playerCount; i++) {
            const playerPtr = playerArrayPtr.add(i * 0x10);
            const player = new ChrPair(playerPtr);
            if (!player.chrIns) {
                continue;
            }

            playerArray.push(player);
        }

        return playerArray;
    }

    get localPlayer() {
        return new ChrIns(Memory.readPointer(Memory.readPointer(this.address.add(0x10EF8))));
    }

    /**
     * @private
     */
    get pad1_0x10F00() {
        return Memory.readByteArray(this.address.add(0x10F00), 48480);
    }

    get legacyDungeonChrSet() {
        return new ChrSet(Memory.readPointer(this.address.add(0x1CC60)));
    }

    /**
     * @private
     */
    get pad2_0x1CC68() {
        return Memory.readByteArray(this.address.add(0x1CC68), 5640);
    }

    get openWorldChrSet() {
        return new OpenFieldChrSet(Memory.readPointer(this.address.add(0x1E270)));
    }

    get numLoadedChrs() {
        const legacyDungeonChrSet = this.legacyDungeonChrSet;
        const openWorldChrSet = this.openWorldChrSet;
        return legacyDungeonChrSet.count + openWorldChrSet.count;
    }

    get loadedWorldChrs() {
        const currentLoadedChrs = this.numLoadedChrs;
        if (currentLoadedChrs == this._prevNumLoadedChrs) {
            return this._loadedWorldChrs;
        }
        this._prevNumLoadedChrs = currentLoadedChrs; 

        this._loadedWorldChrs = new Map();

        for (const chrPair of this.legacyDungeonChrSet.chrArray) {
            if (chrPair.chrIns.address.isNull()) {
                continue;
            }

            this._loadedWorldChrs.set(chrPair.chrIns.handle, chrPair.chrIns);
        }
        for (const chrPair of this.openWorldChrSet.chrArray) {
            if (chrPair.chrIns.address.isNull()) {
                continue;
            }

            this._loadedWorldChrs.set(chrPair.chrIns.handle, chrPair.chrIns);
        }

        return this._loadedWorldChrs;
    }
}