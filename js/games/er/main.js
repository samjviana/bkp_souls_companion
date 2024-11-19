class SoulsCompanion {
    static WORLD_CHR_MAN_SIGNATURE = '48 8B 05 ?? ?? ?? ?? 48 85 C0 74 0F 48 39 88';
    static WORLD_CHR_MAN_IMP_ADDRESS = 0x1C77E50;

    constructor() {
        Logger.info('Initializing SoulsCompanion...');

        this.worldChrMan = null;
        this.worldChrManWatch = setInterval(this.watchWorldChrMan.bind(this), 750);

        this.targetWatch = setInterval(this.watchTarget.bind(this), 500);
        this.previousTarget = null;
    }

    watchWorldChrMan() {
        const address = dereferenceAddress(signatureScan(SoulsCompanion.WORLD_CHR_MAN_SIGNATURE));
        // console.log(Memory.readPointer(SoulsCompanion.WORLD_CHR_MAN_IMP_ADDRESS));
        if (this.worldChrMan !== null && address.equals(this.worldChrMan.address)) {
            return;
        }

        this.worldChrMan = new WorldChrManImp(address);
        if (this.worldChrMan.address.isNull()) {
            return;
        }
        
        Logger.info(`WorldChrMan initialized at ${this.worldChrMan.address}`);
    }

    watchTarget() {
        if (this.worldChrMan === null || this.worldChrMan.address.isNull()) {
            return;
        }

        const targetHandle = this.worldChrMan.localPlayer.targetHandle;
        if (targetHandle === null) {
            return;
        }
        if (targetHandle.compare(new UInt64('0xFFFFFFFFFFFFFFFF')) === 0) {
            DataController.sendTarget(this.previousTarget);
            return;
        }

        const target = this.worldChrMan.loadedWorldChrs[targetHandle];
        if (target === undefined) {
            return;
        }

        this.previousTarget = target;
        DataController.sendTarget(target);
    }
}

rpc.exports.start = function() {
    const soulsCompanion = new SoulsCompanion();
}