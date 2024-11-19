class ChrIns {
    /**
     * @param {NativePointer} address - The address of the `ChrIns` object in memory
     * @constructor
     **/
    constructor(address) {
        this.address = address;
        this.vtable = Memory.readPointer(address);                                      // 0x0
        this.handle = Memory.readU64(address);                                          // 0x8
        this.pad0_0x010 = Memory.readByteArray(address.add(0x8), 80);                   // 0x10
        this.paramId = Memory.readInt(address.add(0x60));                               // 0x60
        this.modelId = Memory.readInt(address.add(0x64));                               // 0x64
        this.chrType = Memory.readInt(address.add(0x68));                               // 0x68
        this.teamType = Memory.readU8(address.add(0x6C));                               // 0x6C
        this.pad1_0x06D = Memory.readByteArray(address.add(0x6D), 267);                 // 0x6D
        this.effectSet = Memory.readPointer(address.add(0x178));                        // 0x178
        this.pad2_0x180 = Memory.readByteArray(address.add(0x180), 8);                  // 0x180
        this.chrId = Memory.readInt(address.add(0x188));                                // 0x188
        this.pad3_0x18C = Memory.readByteArray(address.add(0x18C), 4);                  // 0x18C
        this.chrModuleBag = new ChrModuleBag(Memory.readPointer(address.add(0x190)));   // 0x190
        this.pad4_0x198 = Memory.readByteArray(address.add(0x198), 1000);               // 0x198
        this.playerData = new PlayerData(Memory.readPointer(address.add(0x580)));       // 0x580
        this.pad5_0x588 = Memory.readByteArray(address.add(0x588), 296);                // 0x588
        this.targetHandle = Memory.readU64(address.add(0x6B0));                         // 0x6B0
    }
}