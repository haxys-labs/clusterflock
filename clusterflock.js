import { get_hackable_hosts, get_nukable_hosts } from "/lib/meta";

const SPLASH = " \n\
  ___ _         _           ___ _         _   \n\
 / __| |_  _ __| |_ ___ _ _| __| |___  __| |__\n\
| (__| | || (_-<  _/ -_) '_| _|| / _ \\/ _| / /\n\
 \\___|_|\\_,_/__/\\__\\___|_| |_| |_\\___/\\__|_\\_\\\n\
  by haxys                            v0.3.1\
";

/** @param {import(".").NS } ns */
export async function main(ns) {
    // Configuration Values
    const hackable_hostfile = "/data/hackable_hosts.txt";
    const sleep_delay_seconds = 1.0; // Don't set to 0.

    // Installer clean-up.
    await let_install_script_die();

    // Down to business.
    ns.tprint(SPLASH);
    while(true){
        await launch_nukes();
        await hack_the_planet();
        await take_a_nap();
    }

    async function hack_the_planet() {
        // Attack all possible targets.
        let hackable_hosts = await update_hackable_hosts();
        if (hackable_hosts.length > 0) {
            /* Hack! (WIP) */
        }
    }

    async function update_hackable_hosts() {
        // Check for new hackable hosts.
        const known_hosts = read_list(hackable_hostfile);
        const new_hosts = get_hackable_hosts(ns).filter(
            x => !known_hosts.includes(x)
        );
        if (new_hosts.length > 0) {
            for (const new_host of new_hosts) {
                ns.toast("🎯 New Target: " + new_host + "🎯");
            }
        }
        const hackable_hosts = unique(
            known_hosts.concat(new_hosts)
        );
        await write_list(hackable_hostfile, hackable_hosts);
        return hackable_hosts;
    }

    async function launch_nukes() {
        // Nuke all possible targets.
        for (const target of get_nukable_hosts(ns)) {
            ns.run("/ice/nuke.js", 1, target);
        }
    }

    async function let_install_script_die() {
        // Clean up the installer script.
        if (ns.fileExists("install.js", "home")) {
            await ns.asleep(500);
            ns.run("/util/rm.js", 1, "install.js", "home");
        }
    }

    function read_list(filename) {
        // Read a file as a list of lines.
        try {
            let contents = ns.read(filename);
            let items = contents.split("\n").filter(
                x => x.length > 0
            );
            return items;
        } catch (error) {
            ns.tprint("Error reading file: ", filename);
            return [];
        }
    }

    async function take_a_nap() {
        // Hacking is hard work, okay?
        await ns.asleep(sleep_delay_seconds * 1000);
    }

    function unique(data_list) {
        // Remove duplicate elements from the list.
        let unique_list = [];
        for (const item of data_list) {
            if (!unique_list.includes(item)) {
                unique_list.push(item);
            }
        }
        return unique_list;
    }

    async function write_list(filename, data_list) {
        // Write a list to a file.
        let contents = data_list.join("\n");
        await ns.write(filename, contents, "w");
    }
}