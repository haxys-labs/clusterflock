const SPLASH = "CLUSTERFLOCK INSTALLER  v0.1.4  by haxys";
const BASE_URL = "https://raw.githubusercontent.com/haxys-labs/clusterflock/main/";

/** @param {import(".").NS } ns */
export async function main(ns) {
    ns.tprintf(SPLASH);
    ns.tprintf("Installing ClusterFlock...");
    await install_clusterflock();
    ns.tprintf("Installation complete! Launching...");
    ns.run("clusterflock.js");

    function del(filename) {
        ns.run("/util/rm.js", 1, filename);
    }

    async function download(filename) {
        await ns.wget(
            BASE_URL + filename,
            (filename.includes("/")? "/" + filename : filename),
            "home"
        );
    }

    async function get_manifest() {
        await download("MANIFEST.txt");
        let manifest = ns.read("MANIFEST.txt").split("\n");
        return manifest;
    }

    async function install_clusterflock() {
        const manifest = await get_manifest();
        for (const filename of manifest) {
            if (filename[0] != "#") {
                await download(filename);
            }
        }
        del("MANIFEST.txt");
        await ns.asleep(200);
    }
}