// // Created with ReClass.NET 1.2 by KN4CK3R

// class ChrResistModule
// {
// public:
// 	char pad_0000[16]; //0x0000
// 	int32_t poisonImmunity; //0x0010
// 	int32_t scarletRotImmunity; //0x0014
// 	int32_t hemorrhageRobustness; //0x0018
// 	int32_t deathblightVitality; //0x001C
// 	int32_t frostbiteRobustness; //0x0020
// 	int32_t sleepFocus; //0x0024
// 	int32_t madnessFocus; //0x0028
// 	int32_t maxPoisonImmunity; //0x002C
// 	int32_t maxScarletRotImmunity; //0x0030
// 	int32_t maxHemorrhageRobustness; //0x0034
// 	int32_t maxDeathblightVitality; //0x0038
// 	int32_t maxFrostbiteRobustness; //0x003C
// 	int32_t maxSleepFocus; //0x0040
// 	int32_t maxMadnessFocus; //0x0044
// }; //Size: 0x0048
class ChrResistModule {
    /**
     * @param {NativePointer} address - The address of the `ChrResistModule` object in memory
     * @constructor
     **/
    constructor(address) {
        this.pad0_0x00 = Memory.readByteArray(address, 16);                 // 0x0
        this.poisonImmunity = Memory.readInt(address.add(0x10));            // 0x10
        this.scarletRotImmunity = Memory.readInt(address.add(0x14));        // 0x14
        this.hemorrhageRobustness = Memory.readInt(address.add(0x18));      // 0x18
        this.deathblightVitality = Memory.readInt(address.add(0x1C));       // 0x1C
        this.frostbiteRobustness = Memory.readInt(address.add(0x20));       // 0x20
        this.sleepFocus = Memory.readInt(address.add(0x24));                // 0x24
        this.madnessFocus = Memory.readInt(address.add(0x28));              // 0x28
        this.maxPoisonImmunity = Memory.readInt(address.add(0x2C));         // 0x2C
        this.maxScarletRotImmunity = Memory.readInt(address.add(0x30));     // 0x30
        this.maxHemorrhageRobustness = Memory.readInt(address.add(0x34));   // 0x34
        this.maxDeathblightVitality = Memory.readInt(address.add(0x38));    // 0x38
        this.maxFrostbiteRobustness = Memory.readInt(address.add(0x3C));    // 0x3C
        this.maxSleepFocus = Memory.readInt(address.add(0x40));             // 0x40
        this.maxMadnessFocus = Memory.readInt(address.add(0x44));           // 0x44
    }
}