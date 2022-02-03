# ClusterFlock

A BitBurner automation project.

## Installation

`ClusterFlock` is designed to be launched on a fresh instance of [BitBurner](https://danielyxie.github.io/bitburner/), and thus requires little effort to get started:

1. Either finish the tutorial or click **Skip Tutorial**. Then execute the following commands in the in-game terminal:
2. `wget https://raw.githubusercontent.com/haxys-labs/clusterflock/main/installer/install.js install.js`
3. `./install.js`

That's it! `ClusterFlock` will handle it from there.

## Goals

`ClusterFlock` is a growing project. It has the following core goals:

1. Zero Requirements. `ClusterFlock` will work on a fresh game, or any point after.
2. Hands-Off. `ClusterFlock` should require no human intervention beyond initial installation.
3. Full-Auto. `Clusterflock` will automate as much as possible for maximum output.

## Features

Currently, `ClusterFlock` performs the following tasks:

* Automatically `nuke` systems when requirements are met.
* Maintain a list of hackable systems in `/data/hackable_hosts.txt`.
* Notify the player of nuked and newly-hackable systems.

## Additional Tools

While not part of the core `ClusterFlock` package (see: [MANIFEST.txt](https://github.com/haxys-labs/bitburner_scripts/blob/main/MANIFEST.txt)), the following tools have been included in this repository for their general utility:

* `util/netscan.js` - A simple network scanner.
* `util/scrape.js` - Scrapes useful information from discoverable hosts.

These tools depend on `lib/meta.js`, which is installed along with `ClusterFlock` using the `install.js` file.

## "ClusterFlock?" ...Why?

My original vision was orchestrating an automated flock of automated bots operating as an elite super-hacking cluster...thing. I couldn't settle on whether to call it a cluster of nodes or a flock of drones.

¿Porqué no los dos?

`ClusterFlock`.