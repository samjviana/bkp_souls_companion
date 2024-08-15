class SoulsCompanion {
    static WORLD_CHR_MAN_SIGNATURE = '48 8B 05 ?? ?? ?? ?? 48 8B 48 68 48 85 C9 0F';

    constructor() {
        Logger.info('Initializing SoulsCompanion...');

        this.worldChrMan = null;
        this.worldChrManWatch = setInterval(this.watchWorldChrMan.bind(this), 750);

        this.targetWatch = setInterval(this.watchTarget.bind(this), 500);
    }

    watchWorldChrMan() {
        const address = dereferenceAddress(signatureScan(SoulsCompanion.WORLD_CHR_MAN_SIGNATURE));
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
        if (targetHandle == -1) {
            DataController.sendTarget(null);
        }

        const target = this.worldChrMan.loadedWorldChrs.get(targetHandle);
        if (target === undefined) {
            return;
        }

        DataController.sendTarget(target);
    }
}

rpc.exports.start = function() {
    const soulsCompanion = new SoulsCompanion();
}