import { get_hosts } from "/lib/meta";

/* Server Scraper v0.0.2 by haxys
 * Extract static information from discoverable hosts.
 */

/** @param {NS} ns **/
export async function main(ns) {
    await save_scraped_hosts(ns, scrape_hosts(ns));
}

async function save_scraped_hosts(ns, scraped_hosts) {
    await ns.write("servers.txt", JSON.stringify(scraped_hosts), "w");
    if (ns.getHostname() != "home") {
        await ns.scp("servers.txt", "home");
        ns.rm("servers.txt");
    }
}

function scrape_hosts(ns) {
    let scraped_hosts = {};
    for (const host of get_hosts(ns)) {
        const server = ns.getServer(host);
        let host_data = {
            cpuCores: server.cpuCores,
            minDifficulty: server.minDifficulty,
            moneyMax: server.moneyMax,
            numOpenPortsRequired: server.numOpenPortsRequired,
            requiredHackingSkill: server.requiredHackingSkill,
            serverGrowth: server.serverGrowth
        };
        scraped_hosts[host] = host_data;
    }
    return scraped_hosts;
}