class WorldChrMan {
    /**
     * @param {NativePointer} address - The address of the `WorldChrMan` object in memory
     * @constructor
     **/
    constructor(address) {
        this.address = address;
        this.pad0_0x00000 = Memory.readByteArray(address, 69368);                               // 0x00000
        this.playerArray = [];                                                                  // 0x10EF8
        this.pad1_0x10F00 = Memory.readByteArray(address.add(0x10F00), 48480);                  // 0x10F00
        this.legacyDungeonChrSet = new ChrSet(Memory.readPointer(address.add(0x1CC60)));        // 0x1CC60
        this.pad2_0x1CC68 = Memory.readByteArray(address.add(0x1CC68), 5640);                   // 0x1CC68
        this.openWorldChrSet = new OpenFieldChrSet(Memory.readPointer(address.add(0x1E270)));   // 0x1E270

        const playerArrayPointer = Memory.readPointer(address.add(0x10EF8));
        for (let i = 0; i < 6; i++) {
            const pointer = playerArrayPointer.add(i * 0x10);
            try {
                const chrPair = new ChrPair(pointer);
                if (!chrPair.chrIns) {
                    continue;
                }
                this.playerArray.push(chrPair);
            }
            catch (ex) {
                if (ex.message.startsWith('NullPointerException')) {
                    continue;
                }
            }
        }
    }

    getChrArray() {
        const legacyChrArray = this.legacyDungeonChrSet.chrArray;
        const openWorldChrArray = this.openWorldChrSet.chrArray;
        const chrArray = legacyChrArray.concat(openWorldChrArray);
        return chrArray;
    }

    getChr(handle) {
        const chrArray = this.getChrArray();
        const chr = chrArray.find(chr => chr.handle == handle);
        return chr;
    }

    /**
     * @returns {boolean} `true` if the `WorldChrMan` were correctly initialized and `false` otherwise
     */
    isValid() {
        const validPlayerArray = this.playerArray.length > 0;
        const validLegacyDungeonChrSet = this.legacyDungeonChrSet.chrArray.length > 0;
        const validOpenWorldChrSet = this.legacyDungeonChrSet.chrArray.length > 0;
        const validChrSet = validLegacyDungeonChrSet || validOpenWorldChrSet;
        return validPlayerArray && validChrSet;
    }
}