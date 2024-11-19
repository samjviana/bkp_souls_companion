class ChrModuleBag {
    /**
     * @param {NativePointer} address - The address of the `ChrModuleBag` object in memory
     * @constructor
     **/
    constructor(address) {
        this.address = address
        this.statModule = new StatModule(Memory.readPointer(address));                      // 0x0
        this.pad0_0x8 = Memory.readByteArray(address.add(0x8), 24);                         // 0x8
        this.chrResistModule = new ChrResistModule(Memory.readPointer(address.add(0x20)));  // 0x20
        this.behaviorModule = Memory.readPointer(address.add(0x28));                        // 0x28
        this.pad1_0x30 = Memory.readByteArray(address.add(0x30), 80);                       // 0x30
        this.actionReqModule = Memory.readPointer(address.add(0x80));                       // 0x80
        this.pad2_0x88 = Memory.readByteArray(address.add(0x88), 16);                       // 0x88
        this.chrHitStopModule = Memory.readPointer(address.add(0x98));                      // 0x98
    }
}