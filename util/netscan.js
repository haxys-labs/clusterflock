import { get_owned_hosts, get_hackable_hosts, get_nukable_hosts } from "/lib/meta";

const SPLASH = "\
     __     _   __                 \n\
  /\\ \\ \\___| |_/ _\\ ___ __ _ _ __  \n\
 /  \\/ / _ \\ __\\ \\ / __/ _` | '_ \\ \n\
/ /\\  /  __/ |__\\ \\ (_| (_| | | | |\n\
\\_\\ \\/ \\___|\\__\\__/\\___\\__,_|_| |_|\n\
  by haxys                 v0.3.0\
";

/** @param {NS} ns **/
export async function main(ns) {
    const scans = {
        "Owned": get_owned_hosts,
        "Hackable": get_hackable_hosts,
        "Nukable": get_nukable_hosts
    };

    ns.tprintf(SPLASH);
    for (const type of Object.keys(scans)) {
        ns.tprintf(" \n%s Hosts:", type);
        print_hosts(scans[type](ns))
    }

    function print_hosts(hosts) {
        for (const host of hosts) {
            ns.tprintf("🖥   %s", host);
        }
    }
}
