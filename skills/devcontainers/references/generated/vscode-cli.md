---
title: "VS Code devcontainer CLI"
source: "https://code.visualstudio.com/docs/devcontainers/devcontainer-cli"
fetched_at: "2026-06-29T05:39:22.452Z"
sha256: "5e2bce0b52cad9ac4df3adb08bc4f1e4ae33d8fa55a1b55dedf666680835d795"
---

# VS Code devcontainer CLI

Source: https://code.visualstudio.com/docs/devcontainers/devcontainer-cli

# Dev Container CLI


This topic covers the development container command-line interface (dev container CLI), which allows you to build and manage development containers, and is a companion to the Development Containers Specification.


## Development containers


A consistent, predictable environment is key to a productive and enjoyable software development experience.


Containers (for example Docker containers) have historically been used to standardize apps when they're deployed, but there's a great opportunity to support additional scenarios, including continuous integration (CI), test automation, and full-featured coding environments. A development container provides this working environment and ensures your project has the tools and software it needs, whether it's complex and distributed or just has a few requirements.


Development containers are supported in Visual Studio Code via the Dev Containers extension and in GitHub Codespaces. This support is backed by devcontainer.json, a structured JSON with Comments (jsonc) metadata format to configure a containerized environment.


As containerizing production workloads becomes commonplace, dev containers have become broadly useful for scenarios beyond VS Code. To promote dev containers in any environment, work has started on the Development Containers Specification, which empowers anyone in any tool to configure a consistent dev environment. The open-source dev container CLI serves as the reference implementation of the specification.


## The dev container CLI


When tools like VS Code and Codespaces detect a `devcontainer.json` file in a user's project, they use a CLI to configure a dev container. The dev container CLI is a reference implementation so that individual users and other tools can read in `devcontainer.json` metadata and create dev containers from it.


This CLI can either be used directly or integrated into product experiences, similar to how it's integrated with Dev Containers and Codespaces today. It currently supports both a simple single container option and integrates with Docker Compose for multi-container scenarios.


The CLI is available in the devcontainers/cli repository.


## Installation


You can quickly try out the CLI through the Dev Containers extension. Select the Dev Containers: Install devcontainer CLI command from the Command Palette (F1).


## Alternate installation


There are additional options for using the CLI elsewhere:


- Install its npm package

- Use the GitHub Action or Azure DevOps Task

You may find these in devcontainers/ci


Build the CLI repo from sources

- You may learn more about building from sources in the CLI repo's README


On this page, we'll focus on using the npm package.


### npm install


To install the npm package, you will need Python, Node.js (version 14 or greater), and C/C++ installed to build one of the dependencies. The VS Code How to Contribute wiki has details about the recommended toolsets.


```
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">npm</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> install</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> -g</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> @devcontainers/cli</span></span>
<span class="line"></span>
```
Verify you can run the CLI and see its help text:


```
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">devcontainer</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">comman</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">d></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">Commands:</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> up</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">                   Create</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> and</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> run</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> dev</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> container</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> build</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> [path]         Build a dev container image</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> run-user-commands</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">    Run</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> user</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> commands</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> read-configuration</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">   Read</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> configuration</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> features</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">             Features</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> commands</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> templates</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">            Templates</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> commands</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> exec</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">cm</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">d> [args..]  Execute a command on a running dev container</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">Options:</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  --help</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">     Show</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> help</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">                                                 [boolean]</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">  --version</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">  Show</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> version</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> number</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">                                       [boolean]</span></span>
<span class="line"></span>
```
> Note: The `open` command to open your dev container will be listed if you installed the CLI via VS Code.

## Running the CLI


Once you have the CLI, you can try it out with a sample project, like this Rust sample.


Clone the Rust sample to your machine, and start a dev container with the CLI's `up` command:


```
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">git</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> clone</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> https://github.com/microsoft/vscode-remote-try-rust</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> up</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --workspace-folder</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">path-to-vscode-remote-try-rus</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">t></span></span>
<span class="line"></span>
```
This will download the container image from a container registry and start the container. Your Rust container should now be running:


```
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">[</span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658">88</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> ms] dev-containers-cli 0.1.0.</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">[</span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658">165</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> ms] Start: Run: docker build -f /home/node/vscode-remote-try-rust/.devcontainer/Dockerfile -t vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2 --build-arg </span><span style="--shiki-dark:#9CDCFE;--shiki-light:#001080">VARIANT</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">=</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">bullseye</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26"> /home/node/vscode-remote-try-rust/.devcontainer</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">[+] Building 0.5s (</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">5/5</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">) FINISHED</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> [internal] load build definition from Dockerfile                       0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> => </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">transferring</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> dockerfile:</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> 38B</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">                                        0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> [internal] load .dockerignore                                          0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> => </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">transferring</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> context:</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> 2B</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">                                            0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> [internal] load metadata </span><span style="--shiki-dark:#C586C0;--shiki-light:#AF00DB">for</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> mcr.microsoft.com/vscode/devcontainers/r  0.4s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">CACHED</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> [1/1] FROM mcr.microsoft.com/vscode/devcontainers/rust:1-bulls  0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">exporting</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> to</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> image</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">                                                     0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> => </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">exporting</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> layers</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">                                                    0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> => </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">writing</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> image</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> sha256:39873ccb81e6fb613975e11e37438eee1d49c963a436d</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">  0.0s</span></span>
<span class="line"><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> =</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">> => </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">naming</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> to</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> docker.io/library/vsc-vscode-remote-try-rust-89420ad7399</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">  0.0s</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">[</span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658">1640</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> ms] Start: Run: docker run </span><span style="--shiki-dark:#9CDCFE;--shiki-light:#001080">--sig-proxy</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">=</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">false</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26"> -a</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> STDOUT</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> -a</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> STDERR</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --mount</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> type=bind,source=/home/node/vscode-remote-try-rust,target=/workspaces/vscode-remote-try-rust</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> -l</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> devcontainer.local_folder=/home/node/vscode-remote-try-rust</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --cap-add=SYS_PTRACE</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --security-opt</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> seccomp=unconfined</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --entrypoint</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> /bin/sh</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> vsc-vscode-remote-try-rust-89420ad7399ba74f55921e49cc3ecfd2-uid</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> -c</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> echo</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> Container</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> started</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">Container</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> started</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">{</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"outcome"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">:</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"success"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">,</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"containerId"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">:</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"f0a055ff056c1c1bb99cc09930efbf3a0437c54d9b4644695aa23c1d57b4bd11"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">,</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"remoteUser"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">:</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"vscode"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">,</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"remoteWorkspaceFolder"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">:</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"/workspaces/vscode-remote-try-rust"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">}</span></span>
<span class="line"></span>
```
You can then run commands in this dev container:


```
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> exec</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --workspace-folder</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">path-to-vscode-remote-try-rus</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">t> </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">cargo</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> run</span></span>
<span class="line"></span>
```
This will compile and run the Rust sample, outputting:


```
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">[</span><span style="--shiki-dark:#B5CEA8;--shiki-light:#098658">33</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> ms] dev-containers-cli 0.1.0.</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">   Compiling</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> hello_remote_world</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> v0.1.0</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> (/workspaces/vscode-remote-try-rust)</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">    Finished</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> dev</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> [unoptimized </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">+</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> debuginfo]</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> target</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">(</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">s</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">) </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">in</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> 1.06s</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">     Running</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> `</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">target/debug/hello_remote_world</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">`</span></span>
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">Hello,</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> VS</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> Code</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> Dev</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> Containers!</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">{</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"outcome"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">:</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">"success"</span><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">}</span></span>
<span class="line"></span>
```
These steps above are also provided in the CLI repo's README.


## Automation


If you'd like to use the dev container CLI in your CI/CD builds or test automation, you can find examples of GitHub Actions and Azure DevOps Tasks in the devcontainers/ci repository.


## Pre-building


The `devcontainer build` command allows you to quickly build a dev container image following the same steps as used by the Dev Containers extension or GitHub Codespaces. This is particularly useful when you want to pre-build a dev container image using a CI or DevOps product like GitHub Actions.


`build` accepts a path to the folder containing a `.devcontainer` folder or `.devcontainer.json` file. For example, `devcontainer build --workspace-folder ` will build the container image for `my_repo`.


### Example of building and publishing an image


For example, you may want to pre-build a number of images that you then reuse across multiple projects or repositories. To do so, follow these steps:


1. Create a source code repository.

2. Create dev container configuration for each image you want to pre-build, customizing as you wish (including dev container Features). For example, consider this `devcontainer.json` file:


```
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">{</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5">  "build"</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5">    "dockerfile"</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">"Dockerfile"</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">  },</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5">  "features"</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5">    "ghcr.io/devcontainers/features/docker-in-docker:1"</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">: {</span></span>
<span class="line"><span style="--shiki-dark:#9CDCFE;--shiki-light:#0451A5">      "version"</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">: </span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">"latest"</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">    }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">  }</span></span>
<span class="line"><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">}</span></span>
<span class="line"></span>
```

3. Use the `devcontainer build` command to build the image and push it to your image registry. See documentation for your image registry (such as Azure Container Registry, GitHub Container Registry, or Docker Hub) for information on image naming and additional steps like authentication.


```
<span class="line"><span style="--shiki-dark:#DCDCAA;--shiki-light:#795E26">devcontainer</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515"> build</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --workspace-folder</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">my_rep</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">o> </span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF">--push</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> true</span><span style="--shiki-dark:#569CD6;--shiki-light:#0000FF"> --image-name</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000"> &#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">my_image_nam</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">e></span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">:</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">&#x3C;</span><span style="--shiki-dark:#CE9178;--shiki-light:#A31515">optional_image_versio</span><span style="--shiki-dark:#D4D4D4;--shiki-light:#000000">n></span></span>
<span class="line"></span>
```


## Avoiding problems with images built using Docker


Given Dockerfiles and Docker Compose files can be used without VS Code or the `devcontainer` CLI, you may want to let users know that they should not try to build the image directly. You may learn more in the advanced dev container documentation.


## Templates and Features


You can work with dev container Templates and Features using the dev container CLI. As you create and use Templates, you may want to publish them for others, which you may learn more about in the dev container spec.


## Feedback


The dev container CLI and specification are under active development and we welcome your feedback, which you can provide in this issue, or through new issues and pull requests in the devcontainers/cli repository.


## Next steps


- Dev container specification repository - Read and contribute to the open specification.

- devcontainer.json reference - Review the `devcontainer.json` schema.

- Create a Development Container - Create a custom container for your work environment.

- Advanced Containers - Find solutions to advanced container scenarios.


                
                
                6/24/2026
