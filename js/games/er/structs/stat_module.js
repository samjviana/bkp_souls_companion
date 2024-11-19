class StatModule {
    /**
     * @param {NativePointer} address - The address of the `StatModule` object in memory
     * @constructor
     **/
    constructor(address) {
        this.vtable = Memory.readPointer(address);                          // 0x0
        this.pad0_0x8 = Memory.readByteArray(address.add(0x8), 192);        // 0x8
        this.id = Memory.readUtf16String(address.add(0xC8), 6);             // 0xC8
        this.pad1_0xD4 = Memory.readByteArray(address.add(0xD4), 100);      // 0xD4
        this.hp = Memory.readInt(address.add(0x138));                       // 0x138
        this.maxHp1 = Memory.readInt(address.add(0x13C));                   // 0x13C
        this.maxHp2 = Memory.readInt(address.add(0x140));                   // 0x140
        this.baseHp = Memory.readInt(address.add(0x144));                   // 0x144
        this.fp = Memory.readInt(address.add(0x148));                       // 0x148
        this.maxFp = Memory.readInt(address.add(0x14C));                    // 0x14C
        this.baseFp = Memory.readInt(address.add(0x150));                   // 0x150
        this.stamina = Memory.readInt(address.add(0x154));                  // 0x154
        this.maxStamina = Memory.readInt(address.add(0x158));               // 0x158
        this.baseStamina = Memory.readInt(address.add(0x15C));              // 0x15C
        this.pad2_0x160 = Memory.readByteArray(address.add(0x160), 64);     // 0x160
        this.variantId = Memory.readUtf16String(address.add(0x1A0), 32);    // 0x1A
    }
}
