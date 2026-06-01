---
title: "Feature authoring best practices"
source: "https://containers.dev/guide/feature-authoring-best-practices"
fetched_at: "2026-06-01T11:08:54.686Z"
sha256: "880101dc85e1389db780b60e9924d2d6d9d49c23067fd6976d2381fd39db1edc"
---

# Feature authoring best practices

Source: https://containers.dev/guide/feature-authoring-best-practices

# Best Practices: Authoring a Dev Container Feature


            
    14 Jun 2023 -
        
        
            @joshspicer


    Last November I wrote about the basics around authoring a Dev Container Feature. Since then, hundreds of Features have been written by the community. The flexibility of Features has enabled a wide variety of use cases, from installing a single tool to setting up specific aspects of a project’s development environment that can be shared across repositories.  To that effect, many different patterns for Feature authorship have emerged, and the core team has learned a lot about what works well and what doesn’t.


## Utilize the `test` command


Bundled with the devcontainer cli is the `devcontainer features test` command.  This command is designed to help Feature authors test their Feature in a variety of scenarios.  It is highly recommended that Feature authors use this command to test their Feature before publishing. Some documentation on the `test` command can be found here, and an example can be found in the Feature quick start repo. This repo is updated periodically as new functionality is added to the reference implementation.


## Feature idempotency


The most useful Features are idempotent. This means that if a Feature is installed multiple times with different options (something that will come into play with Feature Dependencies), the Feature should be able to handle this gracefully. This is especially important for option-rich Features that you anticipate others may depend on in the future.


> 🔧 There is an open spec proposal for installing the same Feature twice in a given `devcontainer.json` (devcontainers/spec#44).  While the syntax to do so in a given `devcontainer.json` is not yet defined, Feature dependencies will effectively allow for this.


For Features that install a versioned tool (eg: version x of `go` and version y of `ruby` ), a robust Feature should be able to install multiple versions of the tool.  If your tool has a version manager (java’s `SDKMAN`, ruby’s `rvm`) it is usually as simple as installing the version manager and then running a command to install the desired version of that tool.


For instances where there isn’t an existing version manager available, a well-designed Feature should consider installing distict versions of itself to a well known location.  A pattern that many Features utilize successfully is writing each version of each tool to a central folder and symlinking the “active” version to a folder on the PATH.


Features can redefine the PATH variable with `containerEnv`, like so:


```
<span class="c"># devcontainer-feature.json</span>
<span class="s2">"containerEnv"</span>: <span class="o">{</span>
    <span class="s2">"PATH"</span>: <span class="s2">"/usr/local/myTool/bin:</span><span class="k">${</span><span class="nv">PATH</span><span class="k">}</span><span class="s2">"</span>
<span class="o">}</span>
```

> 🔧 A spec proposal is open for simplifying the process of adding a path to the $PATH variable: (devcontainers/spec#251).


To make testing for idempotency easy, this change to the reference implementation introduces a new mode to the `devcontainer features test` command that will attempt to install a Feature multiple times.  This is useful for testing that a Feature is idempotent, and also for testing that a Feature is able to logically “juggle” multiple versions of a tool.


## Writing your install script


> 🔧 Many of the suggestions in this section may benefit from the Feature library/code reuse proposal.


This section includes some tips for the contents of the `install.sh` entrypoint script.


### Detect Platform/OS


> 🔧 A spec proposal is open for detecting the platform/OS and providing better warnings (devcontainers/spec#58).


Features are often designed to work on a subset of possible base images.  For example, the majority of Features in the `devcontainers/features` repo are designed to work broadly with debian-derived images.  The limitation is often simply due to the wide array of base images available, and the fact that many Features will use an OS-specific package manager.  To make it easy for users to understand which base images a Feature is designed to work with, it is recommended that Features include a check for the OS and provide a helpful error message if the OS is not supported.


One possible way to implement this check is shown below.


```
<span class="c"># Source /etc/os-release to get OS info</span>
<span class="c"># Looks something like:</span>
<span class="c">#     PRETTY_NAME="Debian GNU/Linux 11 (bullseye)"</span>
<span class="c">#     NAME="Debian GNU/Linux"</span>
<span class="c">#     VERSION_ID="11"</span>
<span class="c">#     VERSION="11 (bullseye)"</span>
<span class="c">#     VERSION_CODENAME=bullseye</span>
<span class="c">#     ID=debian</span>
<span class="c">#     HOME_URL="https://www.debian.org/"</span>
<span class="c">#     SUPPORT_URL="https://www.debian.org/support"</span>
<span class="c">#     BUG_REPORT_URL="https://bugs.debian.org/"</span>
<span class="nb">.</span> /etc/os-release
<span class="c"># Store host architecture</span>
<span class="nv">architecture</span><span class="o">=</span><span class="s2">"</span><span class="si">$(</span>dpkg <span class="nt">--print-architecture</span><span class="si">)</span><span class="s2">"</span>

<span class="nv">DOCKER_MOBY_ARCHIVE_VERSION_CODENAMES</span><span class="o">=</span><span class="s2">"buster bullseye focal bionic xenial"</span>
<span class="k">if</span> <span class="o">[[</span> <span class="s2">"</span><span class="k">${</span><span class="nv">DOCKER_MOBY_ARCHIVE_VERSION_CODENAMES</span><span class="k">}</span><span class="s2">"</span> <span class="o">!=</span> <span class="k">*</span><span class="s2">"</span><span class="k">${</span><span class="nv">VERSION_CODENAME</span><span class="k">}</span><span class="s2">"</span><span class="k">*</span> <span class="o">]]</span><span class="p">;</span> <span class="k">then
    </span>print_error <span class="s2">"Unsupported  distribution version '</span><span class="k">${</span><span class="nv">VERSION_CODENAME</span><span class="k">}</span><span class="s2">'. To resolve, either: (1) set feature option '</span><span class="se">\"</span><span class="s2">moby</span><span class="se">\"</span><span class="s2">: false' , or (2) choose a compatible OS distribution"</span>
    print_error <span class="s2">"Supported distributions include:  </span><span class="k">${</span><span class="nv">DOCKER_MOBY_ARCHIVE_VERSION_CODENAMES</span><span class="k">}</span><span class="s2">"</span>
    <span class="nb">exit </span>1
<span class="k">fi</span>
```

If you are targeting distros that may not have your desired scripting language installed (eg: `bash` is often not installed on `alpine` images), you can either use plain `/bin/sh` - which is available virtually everywhere - or you can verify (and install) the scripting language in a small bootstrap script as shown below.


```
<span class="c">#!/bin/sh </span>

<span class="c"># ... </span>
<span class="c"># ...</span>

<span class="k">if</span> <span class="o">[</span> <span class="s2">"</span><span class="si">$(</span><span class="nb">id</span> <span class="nt">-u</span><span class="si">)</span><span class="s2">"</span> <span class="nt">-ne</span> 0 <span class="o">]</span><span class="p">;</span> <span class="k">then
    </span><span class="nb">echo</span> <span class="nt">-e</span> <span class="s1">'Script must be run as root. Use sudo, su, or add "USER root" to your Dockerfile before running this script.'</span>
    <span class="nb">exit </span>1
<span class="k">fi</span>

<span class="c"># If we're using Alpine, install bash before executing</span>
<span class="nb">.</span> /etc/os-release
<span class="k">if</span> <span class="o">[</span> <span class="s2">"</span><span class="k">${</span><span class="nv">ID</span><span class="k">}</span><span class="s2">"</span> <span class="o">=</span> <span class="s2">"alpine"</span> <span class="o">]</span><span class="p">;</span> <span class="k">then
    </span>apk add <span class="nt">--no-cache</span> bash
<span class="k">fi

</span><span class="nb">exec</span> /bin/bash <span class="s2">"</span><span class="si">$(</span><span class="nb">dirname</span> <span class="nv">$0</span><span class="si">)</span><span class="s2">/main.sh"</span> <span class="s2">"</span><span class="nv">$@</span><span class="s2">"</span>
<span class="nb">exit</span> <span class="nv">$?</span>
```

Validating functionality against several base images can be done by using the `devcontainer features test` command with the `--base-image` flag, or with a scenario.  For example,  one could add a workflow like this to their repo.


```
<span class="na">name</span><span class="pi">:</span> <span class="s2">"</span><span class="s">Test</span><span class="nv"> </span><span class="s">Features</span><span class="nv"> </span><span class="s">matrixed</span><span class="nv"> </span><span class="s">with</span><span class="nv"> </span><span class="s">a</span><span class="nv"> </span><span class="s">set</span><span class="nv"> </span><span class="s">of</span><span class="nv"> </span><span class="s">base</span><span class="nv"> </span><span class="s">images"</span>
<span class="na">on</span><span class="pi">:</span>
  <span class="na">push</span><span class="pi">:</span>
    <span class="na">branches</span><span class="pi">:</span>
      <span class="pi">-</span> <span class="s">main</span>
  <span class="na">workflow_dispatch</span><span class="pi">:</span>

<span class="na">jobs</span><span class="pi">:</span>
  <span class="na">test</span><span class="pi">:</span>
    <span class="na">runs-on</span><span class="pi">:</span> <span class="s">ubuntu-latest</span>
    <span class="na">continue-on-error</span><span class="pi">:</span> <span class="no">true</span>
    <span class="na">strategy</span><span class="pi">:</span>
      <span class="na">matrix</span><span class="pi">:</span>
        <span class="na">features</span><span class="pi">:</span> <span class="pi">[</span>
            <span class="s2">"</span><span class="s">anaconda"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">aws-cli"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">azure-cli"</span><span class="pi">,</span>
            <span class="c1"># ...</span>
        <span class="pi">]</span>
        <span class="na">baseImage</span><span class="pi">:</span>
          <span class="pi">[</span>
            <span class="s2">"</span><span class="s">ubuntu:bionic"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">ubuntu:focal"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">ubuntu:jammy"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">debian:11"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">debian:12"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">mcr.microsoft.com/devcontainers/base:ubuntu"</span><span class="pi">,</span>
            <span class="s2">"</span><span class="s">mcr.microsoft.com/devcontainers/base:debian"</span><span class="pi">,</span>
          <span class="pi">]</span>
    <span class="na">steps</span><span class="pi">:</span>
      <span class="pi">-</span> <span class="na">uses</span><span class="pi">:</span> <span class="s">actions/checkout@v3</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s2">"</span><span class="s">Install</span><span class="nv"> </span><span class="s">latest</span><span class="nv"> </span><span class="s">devcontainer</span><span class="nv"> </span><span class="s">CLI"</span>
        <span class="na">run</span><span class="pi">:</span> <span class="s">npm install -g @devcontainers/cli</span>
        
      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s2">"</span><span class="s">Generating</span><span class="nv"> </span><span class="s">tests</span><span class="nv"> </span><span class="s">for</span><span class="nv"> </span><span class="s">'${{</span><span class="nv"> </span><span class="s">matrix.features</span><span class="nv"> </span><span class="s">}}'</span><span class="nv"> </span><span class="s">against</span><span class="nv"> </span><span class="s">'${{</span><span class="nv"> </span><span class="s">matrix.baseImage</span><span class="nv"> </span><span class="s">}}'"</span>
        <span class="na">run</span><span class="pi">:</span> <span class="s">devcontainer features test  --skip-scenarios -f ${{ matrix.features }} -i ${{ matrix.baseImage }}</span>
```

### Detect the non-root user


Feature installation scripts are run as `root`.  In contrast, many dev containers have a `remoteUser` set (either implicitly through image metadata or directly in the `devcontainer.json`).  In a Feature’s installation script, one should be mindful of the final user and account for instances where the user is not `root`.


Feature authors should take advantage of the `_REMOTE_USER` and similar variables injected during the build.


```
<span class="c"># Install tool in effective remoteUser's bin folder</span>
<span class="nb">mkdir</span> <span class="nt">-p</span> <span class="s2">"</span><span class="nv">$_REMOTE_USER_HOME</span><span class="s2">/bin"</span>
curl <span class="nv">$TOOL_DOWNLOAD_LINK</span> <span class="nt">-o</span> <span class="s2">"</span><span class="nv">$_REMOTE_USER_HOME</span><span class="s2">/bin/</span><span class="nv">$TOOL</span><span class="s2">"</span>
<span class="nb">chown</span> <span class="nv">$_REMOTE_USER</span>:<span class="nv">$_REMOTE_USER</span> <span class="s2">"</span><span class="nv">$_REMOTE_USER_HOME</span><span class="s2">/bin/</span><span class="nv">$TOOL</span><span class="s2">"</span>
<span class="nb">chmod </span>755 <span class="s2">"</span><span class="nv">$_REMOTE_USER_HOME</span><span class="s2">/bin/</span><span class="nv">$TOOL</span><span class="s2">"</span>
```

### Implement redundant paths/strategies


Most Features in the index today have some external/upstream dependency.  Very often these upstream dependencies can change (ie: versioning pattern, rotated GPG key, etc…) that may cause a Feature to fail to install.  To mitigate this, one strategy is to implement multiple paths to install a given tool (if available).  For example, a Feature that installs `go` might try to install it from the upstream package manager, and if not fall back to a GitHub release.


Writing several scenario tests that force the Feature to go down distinct installation paths will help you catch cases where a given path no longer works.



        
        
        
    

        
    

    
    
        function manageConsent() {
            if (WcpConsent.siteConsent.isConsentRequired) {
                WcpConsent.siteConsent.manageConsent();
            }
        }
    

    
        
            
                
                    - Star

                    - Watch

                

            
            
                
                    - Manage cookies

                    - © 2026 Microsoft

                

            
        
    


    
  var baseurl = ''
