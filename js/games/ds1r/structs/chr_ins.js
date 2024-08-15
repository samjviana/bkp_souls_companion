class ChrIns {
    /**
     * Creates an instance of `ChrIns`.
     * @param {NativePointer} address The address of the `ChrIns` instance.
     */
    constructor(address) {
        this.address = address;
    }

    /**
     * @private
     */
    get _pad0_0x000() {
        return Memory.readByteArray(this.address, 8);
    }

    get handle() {
        return Memory.readInt(this.address.add(0x008));
    }

    /**
     * @private
     */
    get _pad1_0x00C() {
        return Memory.readByteArray(this.address.add(0x00C), 124);
    }

    get modelId() {
        return Memory.readUtf16String(this.address.add(0x088), 6);
    }

    /**
     * @private
     */
    get _pad2_0x094() {
        return Memory.readByteArray(this.address.add(0x094), 52);
    }

    get paramId() {
        return Memory.readInt(this.address.add(0x0C8));
    }

    /**
     * @private
     */
    get _pad3_0x0CC() {
        return Memory.readByteArray(this.address.add(0x00CC), 796);
    }

    get hp() {
        return Memory.readInt(this.address.add(0x3E8));
    }

    get maxHp() {
        return Memory.readInt(this.address.add(0x3EC));
    }

    /**
     * @private
     */
    get _pad4_0x3F0() {
        return Memory.readByteArray(this.address.add(0x3F0), 8);
    }

    get stamina() {
        return Memory.readInt(this.address.add(0x3F8));
    }

    get maxStamina() {
        return Memory.readInt(this.address.add(0x3FC));
    }

    /**
     * @private
     */
    get _pad5_0x400() {
        return Memory.readByteArray(this.address.add(0x400), 24);
    }

    get poisonResist() {
        return Memory.readInt(this.address.add(0x418));
    }

    get toxicResist() {
        return Memory.readInt(this.address.add(0x41C));
    }

    get bleedResist() {
        return Memory.readInt(this.address.add(0x420));
    }

    get curseResist() {
        return Memory.readInt(this.address.add(0x424));
    }

    get maxPoisonResist() {
        return Memory.readInt(this.address.add(0x428));
    }

    get maxToxicResist() {
        return Memory.readInt(this.address.add(0x42C));
    }

    get maxBleedResist() {
        return Memory.readInt(this.address.add(0x430));
    }

    get maxCurseResist() {
        return Memory.readInt(this.address.add(0x434));
    }

    /**
     * @private
     */
    get _pad6_0x438() {
        return Memory.readByteArray(this.address.add(0x438), 44);
    }

    get talkId() {
        return Memory.readInt(this.address.add(0x464));
    }

    /**
     * @private
     */
    get _pad7_0x468() {
        return Memory.readByteArray(this.address.add(0x468), 272);
    }

    get playerData() {
        return Memory.readPointer(this.address.add(0x578));
    }

    /**
     * @private
     */
    get _pad8_0x580() {
        return Memory.readByteArray(this.address.add(0x580), 2416);
    }

    get targetHandle() {
        return Memory.readInt(this.address.add(0xEF0));
    }
}