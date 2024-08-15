/**
 * Scans a module for a signature.
 * @param {string} signature The signature to scan for.
 * @param {string} module_name The name of the module to scan in. Defaults to the `mainModule` global.
 * @returns {NativePointer} The address of the first match.
 */
function signatureScan(signature, module_name = mainModule) {
    const module = Process.getModuleByName(module_name);
    const matches = Memory.scanSync(module.base, module.size, signature);
    if (matches.length === 0) {
        return null;
    }
    return matches[0].address;
}

/**
 * Dereferences an address.
 * @param {NativePointer} address The address to dereference.
 * @returns {NativePointer} The dereferenced address.
 */
function dereferenceAddress(address) {
    address = address.add(3);
    address = address.add(Memory.readInt(address) + 4);
    address = Memory.readPointer(address);

    return address;
}