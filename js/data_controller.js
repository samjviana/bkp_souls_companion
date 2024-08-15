class DataController {
    /**
     * @private
     */
    static _sendData(data) {
        send({
            event: 'game_data',
            data: data
        });
    }

    /**
     * Send current target data to the socket server
     * @param {ChrIns} target
     */
    static sendTarget(target) {
        let data = {
            type: 'target'
        };
        if (target !== null) {
            data.data = {
                address: target.address,
                handle: target.handle,
                modelId: target.modelId,
                paramId: target.paramId,
                hp: target.hp,
                maxHp: target.maxHp,
                stamina: target.stamina,
                maxStamina: target.maxStamina,
                poisonResist: target.poisonResist,
                toxicResist: target.toxicResist,
                bleedResist: target.bleedResist,
                curseResist: target.curseResist,
                maxPoisonResist: target.maxPoisonResist,
                maxToxicResist: target.maxToxicResist,
                maxBleedResist: target.maxBleedResist,
                maxCurseResist: target.maxCurseResist
            };
        }

        DataController._sendData(data);
    }
}