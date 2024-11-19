class PlayerData {
    /**
     * @param {NativePointer} address - The address of the `PlayerData` object in memory
     * @constructor
     **/
    constructor(address) {
        this.pad0_0x8 = Memory.readByteArray(address, 8);               // 0x8
        this.hp = Memory.readInt(address.add(0x10));                    // 0x10
        this.maxHp = Memory.readInt(address.add(0x14));                 // 0x14
        this.baseHp = Memory.readInt(address.add(0x18));                // 0x18
        this.fp = Memory.readInt(address.add(0x1C));                    // 0x1C
        this.maxFp = Memory.readInt(address.add(0x20));                 // 0x20
        this.baseFp = Memory.readInt(address.add(0x24));                // 0x24
        this.pad1_0x28 = Memory.readByteArray(address.add(0x28), 4);    // 0x28
        this.stamina = Memory.readInt(address.add(0x2C));               // 0x2C
        this.maxStamina = Memory.readInt(address.add(0x30));            // 0x30
        this.baseStamina = Memory.readInt(address.add(0x34));           // 0x34
        this.pad2_0x38 = Memory.readByteArray(address.add(0x38), 4);    // 0x38
        this.vigor = Memory.readInt(address.add(0x3C));                 // 0x3C
        this.mind = Memory.readInt(address.add(0x40));                  // 0x40
        this.endurance = Memory.readInt(address.add(0x44));             // 0x44
        this.strength = Memory.readInt(address.add(0x48));              // 0x48
        this.dexterity = Memory.readInt(address.add(0x4C));             // 0x4C
        this.intelligence = Memory.readInt(address.add(0x50));          // 0x50
        this.faith = Memory.readInt(address.add(0x54));                 // 0x54
        this.arcane = Memory.readInt(address.add(0x58));                // 0x58
        this.pad3_0x5C = Memory.readByteArray(address.add(0x5C), 12);   // 0x5C
        this.level = Memory.readInt(address.add(0x68));                 // 0x68
        this.runes = Memory.readInt(address.add(0x6C));                 // 0x6C
        this.totalRunes = Memory.readInt(address.add(0x70));            // 0x70
        this.pad4_0x74 = Memory.readByteArray(address.add(0x74), 4);    // 0x74
        this.poisonImmunity = Memory.readInt(address.add(0x78));        // 0x78
        this.scarletRotImmunity = Memory.readInt(address.add(0x7C));    // 0x7C
        this.hemorrhageRobustness = Memory.readInt(address.add(0x80));  // 0x80
        this.deathblightVitality = Memory.readInt(address.add(0x84));   // 0x84
        this.frostbiteRobustness = Memory.readInt(address.add(0x88));   // 0x88
        this.sleepFocus = Memory.readInt(address.add(0x8C));            // 0x8C
        this.madnessFocus = Memory.readInt(address.add(0x90));          // 0x90
        this.pad5_0x94 = Memory.readByteArray(address.add(0x94), 8);    // 0x94
        this.name = Memory.readUtf16String(address.add(0x9C), 16);      // 0x9C
    }
}