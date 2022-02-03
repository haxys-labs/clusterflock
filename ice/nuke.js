import { get_tools_owned } from "/lib/meta";

// nuke.js v0.1.2 by haxys

/** @param {import("..").NS } ns */
export async function main(ns) {
    const tools = {
        "BruteSSH.exe": ns.brutessh,
        "FTPCrack.exe": ns.ftpcrack,
        "HTTPWorm.exe": ns.httpworm,
        "relaySMTP.exe": ns.relaysmtp,
        "SQLInject.exe": ns.sqlinject
    }
    let target = ns.args[0];

    // LAUNCH EVERY TOOL WE GOT!
    for (const tool of get_tools_owned(ns)) {
        await tools[tool](target);
    }

    // FIRE THE NUKES!
    await ns.nuke(target);
    ns.toast("🔥 " + target + " nuked! 🔥");
}