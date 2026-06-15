---
title: "Features distribution"
source: "https://containers.dev/implementors/features-distribution/"
fetched_at: "2026-06-15T05:52:46.055Z"
sha256: "9fcecb6f74c714b6aeea5fa215965d9a2d96637585d9463f36aa3cdef9831d50"
---

# Features distribution

Source: https://containers.dev/implementors/features-distribution/

#### Topics


                
                    
                    
                    Specification
                    
                    Reference Implementation
                    
                    devcontainer.json schema
                    
                    Dev Container metadata reference
                    
                    Features
                    
                    Features distribution
                    
                    Templates
                    
                    Templates distribution
                    
                    Contributing
                    
                
            

            # Specification


            ## Dev container Features contribution and discovery


            TL;DR Check out the quick start repository to get started on distributing your own Dev Container Features.


This specification defines a pattern where community members and organizations can author and self-publish Dev Container Features.


Goals include:


  - For Feature authors, create a “self-service” way to publish a Feature, either publicly or privately, that is not centrally controlled.

  - For users, provide the ability to validate the integrity of previously fetched Feature assets.

  - For users, provide the ability for a user to pin to a particular version (absolute, or semantic version) of a Feature to allow for consistent, repeatable environments.

  - Provide the ability to standardize publishing such that supporting tools may implement their own mechanism to aid Feature discoverability as they see fit.


> Tip: This section covers details on the Features specification. If you are looking for summarized information on creating your own Features, check out the quick start and core Features repositories.


## Source Code


Features source code is stored in a git repository.


For ease of authorship and maintenance, [1..n] features can share a single git repository. This set of Features is referred to as a “collection,” and will share the same `devcontainer-collection.json` file and “namespace” (eg. `/`).


Source code for the set follows the example file structure below:


```
.
├── README.md
├── src
│   ├── dotnet
│   │   ├── devcontainer-feature.json
│   │   ├── install.sh
│   │   └── ...
|   ├
│   ├── go
│   │   ├── devcontainer-feature.json
│   │   └── install.sh
|   ├── ...
│   │   ├── devcontainer-feature.json
│   │   └── install.sh
├── test
│   ├── dotnet
│   │   ├── test.sh
│   │   └── ...
│   └── go
│   |   └── test.sh
|   ├── ...
│   │   └── test.sh
├── ...
```

… where `src` is a directory containing a sub-folder with the name of the Feature (e.g. `src/dotnet` or `src/go`) with at least a file named `devcontainer-feature.json` that contains the Feature metadata, and an `install.sh` script that implementing tools will use as the entrypoint to install the Feature.


Each sub-directory should be named such that it matches the `id` field of the `devcontainer-feature.json`.  Other files can also be included in the Feature’s sub-directory, and will be included during the packaging step alongside the two required files.  Any files that are not part of the Feature’s sub-directory (e.g. outside of `src/dotnet`) will not included in the packaging step.


Optionally, a mirrored `test` directory can be included with an accompanying `test.sh` script.  Implementing tools may use this to run tests against the given Feature.


## Versioning


Each Feature is individually versioned according to the semver specification.  The `version` property in the respective `devcontainer-feature.json` file is parsed to determine if the Feature should be republished.


Tooling that handles publishing Features will not republish Features if that exact version has already been published; however, tooling must republish major and minor versions in accordance with the semver specification.


## Packaging


Features are distributed as tarballs. The tarball contains the entire contents of the Feature sub-directory, including the `devcontainer-feature.json`, `install.sh`, and any other files in the directory.


The tarball is named `devcontainer-feature-.tgz`, where `` is the Feature’s `id` field.


A reference implementation for packaging and distributing Features is provided as a GitHub Action.


### devcontainer-collection.json


The `devcontainer-collection.json` is an auto-generated metadata file.


| Property | Type | Description |
| --- | --- | --- |
| `sourceInformation` | object | Metadata from the implementing packaging tool. |
| `features` | array | The list of features that are contained in this collection. |


Each Features’s `devcontainer-feature.json` metadata file is appended into the `features` top-level array.


## Distribution


There are several supported ways to distribute Features. Distribution is handled by the implementing packaging tool such as the Dev Container CLI or Dev Container Publish GitHub Action. See the quick start repository for a full working example.


A user references a distributed Feature in a `devcontainer.json` as defined in ‘referencing a Feature’.


### OCI Registry


An OCI registry that implements the OCI Artifact Distribution Specification serves as the primary distribution mechanism for Features.


Each packaged Feature is pushed to the registry following the naming convention `//[:version]`, where version is the major, minor, and patch version of the Feature, according to the semver specification.


> Note: The `namespace` is a unique identifier for the collection of Features.  There are no strict rules for the `namespace`; however, one pattern is to set `namespace` equal to source repository’s `/`.


A custom media type `application/vnd.devcontainers` and `application/vnd.devcontainers.layer.v1+tar` are used as demonstrated below.


For example, the `go` Feature in the `devcontainers/features` namespace at version `1.2.3` would be pushed to the ghcr.io OCI registry.


> Note: The example below uses `oras` for demonstration purposes.  A supporting tool should directly implement the required functionality from the aforementioned OCI artifact distribution specification.


```
<span class="c"># ghcr.io/devcontainers/features/go:1 </span>
<span class="nv">REGISTRY</span><span class="o">=</span>ghcr.io
<span class="nv">NAMESPACE</span><span class="o">=</span>devcontainers/features
<span class="nv">FEATURE</span><span class="o">=</span>go

<span class="nv">ARTIFACT_PATH</span><span class="o">=</span>devcontainer-feature-go.tgz

<span class="k">for </span>VERSION <span class="k">in </span>1  1.2  1.2.3  latest
<span class="k">do
    </span>oras push <span class="k">${</span><span class="nv">REGISTRY</span><span class="k">}</span>/<span class="k">${</span><span class="nv">NAMESPACE</span><span class="k">}</span>/<span class="k">${</span><span class="nv">FEATURE</span><span class="k">}</span>:<span class="k">${</span><span class="nv">VERSION</span><span class="k">}</span> <span class="se">\</span>
            <span class="nt">--config</span> /dev/null:application/vnd.devcontainers <span class="se">\</span>
                             ./<span class="k">${</span><span class="nv">ARTIFACT_PATH</span><span class="k">}</span>:application/vnd.devcontainers.layer.v1+tar
<span class="k">done</span>
```

The “namespace” is the globally identifiable name for the collection of Features. (eg: `owner/repo` for the source code’s git repository).


The auto-generated `devcontainer-collection.json` is pushed to the registry with the same `namespace` as above and no accompanying `feature` name. The collection file is always tagged as `latest`.


```
<span class="c"># ghcr.io/devcontainers/features</span>
<span class="nv">REGISTRY</span><span class="o">=</span>ghcr.io
<span class="nv">NAMESPACE</span><span class="o">=</span>devcontainers/features

oras push <span class="k">${</span><span class="nv">REGISTRY</span><span class="k">}</span>/<span class="k">${</span><span class="nv">NAMESPACE</span><span class="k">}</span>:latest <span class="se">\</span>
        <span class="nt">--config</span> /dev/null:application/vnd.devcontainers <span class="se">\</span>
                            ./devcontainer-collection.json:application/vnd.devcontainers.collection.layer.v1+json
```

Additionally, an annotation named `dev.containers.metadata` should be populated on the manifest when published by an implementing tool.  This annotation is the escaped JSON object of the entire `devcontainer-feature.json` as it appears during the packaging stage.


An example manifest with the `dev.containers.metadata` annotation:


```
<span class="p">{</span><span class="w">
  </span><span class="nl">"schemaVersion"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
  </span><span class="nl">"mediaType"</span><span class="p">:</span><span class="w"> </span><span class="s2">"application/vnd.oci.image.manifest.v1+json"</span><span class="p">,</span><span class="w">
  </span><span class="nl">"config"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"mediaType"</span><span class="p">:</span><span class="w"> </span><span class="s2">"application/vnd.devcontainers"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"digest"</span><span class="p">:</span><span class="w"> </span><span class="s2">"sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"size"</span><span class="p">:</span><span class="w"> </span><span class="mi">0</span><span class="w">
  </span><span class="p">},</span><span class="w">
  </span><span class="nl">"layers"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
    </span><span class="p">{</span><span class="w">
      </span><span class="nl">"mediaType"</span><span class="p">:</span><span class="w"> </span><span class="s2">"application/vnd.devcontainers.layer.v1+tar"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"digest"</span><span class="p">:</span><span class="w"> </span><span class="s2">"sha256:738af5504b253dc6de51d2cb1556cdb7ce70ab18b2f32b0c2f12650ed6d2e4bc"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"size"</span><span class="p">:</span><span class="w"> </span><span class="mi">3584</span><span class="p">,</span><span class="w">
      </span><span class="nl">"annotations"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"org.opencontainers.image.title"</span><span class="p">:</span><span class="w"> </span><span class="s2">"devcontainer-feature-myFeature.tgz"</span><span class="w">
      </span><span class="p">}</span><span class="w">
    </span><span class="p">}</span><span class="w">
  </span><span class="p">],</span><span class="w">
  </span><span class="nl">"annotations"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"dev.containers.metadata"</span><span class="p">:</span><span class="w"> </span><span class="s2">"{</span><span class="se">\"</span><span class="s2">name</span><span class="se">\"</span><span class="s2">: </span><span class="se">\"</span><span class="s2">My Feature</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">id</span><span class="se">\"</span><span class="s2">: </span><span class="se">\"</span><span class="s2">myFeature</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">version</span><span class="se">\"</span><span class="s2">: </span><span class="se">\"</span><span class="s2">1.0.0</span><span class="se">\"</span><span class="s2">,</span><span class="se">\"</span><span class="s2">dependsOn</span><span class="se">\"</span><span class="s2">: {</span><span class="se">\"</span><span class="s2">ghcr.io/myotherFeature:1</span><span class="se">\"</span><span class="s2">: {</span><span class="se">\"</span><span class="s2">flag</span><span class="se">\"</span><span class="s2">: true},</span><span class="se">\"</span><span class="s2">features.azurecr.io/aThirdFeature:1</span><span class="se">\"</span><span class="s2">: {},</span><span class="se">\"</span><span class="s2">features.azurecr.io/aFourthFeature:1.2.3</span><span class="se">\"</span><span class="s2">: {}}}"</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

### Directly referencing a tarball


A Feature can be referenced directly in a user’s `devcontainer.json` file by HTTPS URI that points to the tarball from the package step.


The `.tgz` archive file must be named `devcontainer-feature-.tgz`.


### Locally referenced Features


Instead of publishing a Feature to an OCI registry, a Feature’s source code may be referenced from a local folder. Locally referencing a Feature may be useful when first authoring a Feature.


A local Feature is referenced in the devcontainer’s `feature` object relative to the folder containing the project’s `devcontainer.json`.


Additional constraints exists when including local Features in a project:


  - The project must have a `.devcontainer/` folder at the root of the project workspace folder.

  - A local Feature’s source code must be contained within a sub-folder of the `.devcontainer/` folder.

  - The sub-folder name must match the Feature’s `id` field.

  - A local Feature may not be referenced by absolute path.

  - The local Feature’s sub-folder must contain at least a `devcontainer-feature.json` file and `install.sh` entrypoint script, mirroring the previously outlined file structure.


The relative path is provided using unix-style path syntax (eg `./myFeature`) regardless of the host operating system.


An example project is illustrated below:


```
.
├── .devcontainer/
│   ├── localFeatureA/
│   │   ├── devcontainer-feature.json
│   │   ├── install.sh
│   │   └── ...
│   ├── localFeatureB/
│   │   ├── devcontainer-feature.json
│   │   ├── install.sh
│   │   └── ...
│   ├── devcontainer.json
```

##### devcontainer.json


```
<span class="p">{</span><span class="w">
        </span><span class="c1">// ...</span><span class="w">
        </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
                </span><span class="nl">"./localFeatureA"</span><span class="p">:</span><span class="w"> </span><span class="p">{},</span><span class="w">
                </span><span class="nl">"./localFeatureB"</span><span class="p">:</span><span class="w"> </span><span class="p">{}</span><span class="w">
        </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

        

        -->

        
    

        
    

    
    
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
