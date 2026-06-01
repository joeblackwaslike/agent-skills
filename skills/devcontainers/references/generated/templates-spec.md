---
title: "Templates specification"
source: "https://containers.dev/implementors/templates/"
fetched_at: "2026-06-01T11:08:54.644Z"
sha256: "4c566a4caa79f1ab364bfb22f494732dd82a145d7c4325ff5dd4b37d58740b4e"
---

# Templates specification

Source: https://containers.dev/implementors/templates/

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


            ## Dev Container Templates reference


            Development Container Templates are source files packaged together that encode configuration for a complete development environment. A Template can be used in a new or existing project, and a supporting tool will use the configuration from the Template to build a development container.


The configuration is placed in a `.devcontainer.json` which can also reference other files within the Template. Alternatively, `.devcontainer/devcontainer.json` can also be used if the container needs to reference other files, such as a `Dockerfile` or `docker-compose.yml`. A Template can also provide additional source files (eg: boilerplate code or a lifecycle script).


Template metadata is captured by a `devcontainer-template.json` file in the root folder of the Template.


## Folder Structure


A single Template is a folder with at least a `devcontainer-template.json` and `devcontainer.json`.  Additional files are permitted and are packaged along side the required files.


```
+-- template
|    +-- devcontainer-template.json
|    +-- .devcontainer.json
|    +-- (other files)
```

## devcontainer-template.json properties


The `devcontainer-template.json` file defines information about the Template to be used by any supporting tools.


The properties of the file are as follows:


| Property | Type | Description |
| --- | --- | --- |
| `id` | string | ID of the Template. The `id` should be unique in the context of the repository/published package where the Template exists and must match the name of the directory where the `devcontainer-template.json` resides. |
| `version` | string | The semantic version of the Template. |
| `name` | string | Name of the Template. |
| `description` | string | Description of the Template. |
| `documentationURL` | string | Url that points to the documentation of the Template. |
| `licenseURL` | string | Url that points to the license of the Template. |
| `options` | object | A map of options that the supporting tools should use to populate different configuration options for the Template. |
| `platforms` | array | Languages and platforms supported by the Template. |
| `publisher` | string | Name of the publisher/maintainer of the Template. |
| `keywords` | array | List of strings relevant to a user that would search for this Template. |
| `optionalPaths` | array | An array of files or directories that tooling may consider “optional” when applying a Template. Directories are indicated with a trailing `/*`, (eg: `.github/*`). |


### The `options` property


The `options` property contains a map of option IDs and their related configuration settings. These `options` are used by the supporting tools to prompt the user to choose from different Template configuration options. The tools would replace the option ID with the selected value in all the files (within the sub-directory of the Template). This replacement would happen before dropping the `.devcontainer.json` (or `.devcontainer/devcontainer.json`) and other files (within the sub-directory of the Template) required to containerize your project. See option resolution for more details. For example:


```
<span class="p">{</span><span class="w">
  </span><span class="nl">"options"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"optionId"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
      </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"string"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Description of the option"</span><span class="p">,</span><span class="w">
      </span><span class="nl">"proposals"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="s2">"value1"</span><span class="p">,</span><span class="w"> </span><span class="s2">"value2"</span><span class="p">],</span><span class="w">
      </span><span class="nl">"default"</span><span class="p">:</span><span class="w"> </span><span class="s2">"value1"</span><span class="w">
    </span><span class="p">}</span><span class="w">
  </span><span class="p">}</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

| Property | Type | Description |
| --- | --- | --- |
| `optionId` | string | ID of the option used by the supporting tools to replace the selected value in the files within the sub-directory of the Template. |
| `optionId.type` | string | Type of the option. Valid types are currently: `boolean`, `string` |
| `optionId.description` | string | Description for the option. |
| `optionId.proposals` | array | A list of suggested string values. Free-form values are allowed. Omit when using `optionId.enum`. |
| `optionId.enum` | array | A strict list of allowed string values. Free-form values are not allowed. Omit when using `optionId.proposals`. |
| `optionId.default` | string | Default value for the option. |


> `Note`: The `options` must be unique for every `devcontainer-template.json`


### The `optionalPaths` property


Before applying a Template, tooling must inspect the `optionalPaths` property of a Template and prompt the user on whether each file or folder should be included in the resulting output workspace folder.  A path is relative to the root of the Template source directory.


  - For a single file, provide the full relative path (without any leading or trailing path delimiters).

  - For a directory, provide the full relative path with a trailing slash and asterisk (`/*`) appended to the path.  The directory and its children will be recursively ignored.


Examples are shown below:


```
<span class="p">{</span><span class="w">
    </span><span class="nl">"id"</span><span class="p">:</span><span class="w"> </span><span class="s2">"cpp"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"version"</span><span class="p">:</span><span class="w"> </span><span class="s2">"3.0.0"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"C++"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Develop C++ applications"</span><span class="p">,</span><span class="w">
    </span><span class="nl">"optionalPaths"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
         </span><span class="s2">"GETTING-STARTED.md"</span><span class="p">,</span><span class="w">                 </span><span class="c1">// Single file</span><span class="w">
         </span><span class="s2">"example-project-1/MyProject.csproj"</span><span class="p">,</span><span class="w"> </span><span class="c1">// Single file in nested directory</span><span class="w">
         </span><span class="s2">".github/*"</span><span class="w">                           </span><span class="c1">// Entire recursive contents of directory</span><span class="w">
     </span><span class="p">]</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

### Referencing a Template


The `id` format (`//[:]`) dictates how a supporting tool will locate and download a given Template from an OCI registry. For example:


  - `ghcr.io/user/repo/go`

  - `ghcr.io/user/repo/go:1`

  - `ghcr.io/user/repo/go:latest`


The registry must implement the OCI Artifact Distribution Specification. Some implementors can be found here.


## Versioning


Each Template is individually versioned according to the semver specification.  The `version` property in the respective `devcontainer-template.json` file is updated to increment the Template’s version.


Tooling that handles releasing Templates will not republish Templates if that exact version has already been published; however, tooling must republish major and minor versions in accordance with the semver specification.


## Release


For information on distributing Templates, see the Templates distribution doc.


### Option Resolution


A Template’s `options` property is used by a supporting tool to prompt for different configuration options. A supporting tool will parse the `options` object provided by the user. If a value is selected for a Template, it will be replaced in the files (within the sub-directory of the Template).


### Option resolution example


Consider a `java` Template with the following folder structure:


```
+-- java
|    +-- devcontainer-template.json
|    +-- .devcontainer.json
```

Suppose the `java` Template has the following `options` parameters declared in the `devcontainer-template.json` file:


```
<span class="err">//</span><span class="w"> </span><span class="err">...</span><span class="w">
</span><span class="nl">"options"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="nl">"imageVariant"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"string"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Specify version of java."</span><span class="p">,</span><span class="w">
        </span><span class="nl">"proposals"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
          </span><span class="s2">"17-bullseye"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"17-buster"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"11-bullseye"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"11-buster"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"17"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"11"</span><span class="w">
        </span><span class="p">],</span><span class="w">
    </span><span class="nl">"default"</span><span class="p">:</span><span class="w"> </span><span class="s2">"17-bullseye"</span><span class="w">
    </span><span class="p">},</span><span class="w">
    </span><span class="nl">"nodeVersion"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"string"</span><span class="p">,</span><span class="w"> 
        </span><span class="nl">"proposals"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
          </span><span class="s2">"latest"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"16"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"14"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"10"</span><span class="p">,</span><span class="w">
          </span><span class="s2">"none"</span><span class="w">
        </span><span class="p">],</span><span class="w">
        </span><span class="nl">"default"</span><span class="p">:</span><span class="w"> </span><span class="s2">"latest"</span><span class="p">,</span><span class="w">
        </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Specify version of node, or 'none' to skip node installation."</span><span class="w">
    </span><span class="p">},</span><span class="w">
    </span><span class="nl">"installMaven"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="nl">"type"</span><span class="p">:</span><span class="w"> </span><span class="s2">"boolean"</span><span class="p">,</span><span class="w"> 
        </span><span class="nl">"description"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Install Maven, a management tool for Java."</span><span class="p">,</span><span class="w">
        </span><span class="nl">"default"</span><span class="p">:</span><span class="w"> </span><span class="s2">"false"</span><span class="w">
    </span><span class="p">},</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

and it has the following `.devcontainer.json` file:


```
<span class="p">{</span><span class="w">
     </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Java"</span><span class="p">,</span><span class="w">
     </span><span class="nl">"image"</span><span class="p">:</span><span class="w"> </span><span class="s2">"mcr.microsoft.com/devcontainers/java:0-${templateOption:imageVariant}"</span><span class="p">,</span><span class="w">
     </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"ghcr.io/devcontainers/features/node:1"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
               </span><span class="nl">"version"</span><span class="p">:</span><span class="w"> </span><span class="s2">"${templateOption:nodeVersion}"</span><span class="p">,</span><span class="w">
               </span><span class="nl">"installMaven"</span><span class="p">:</span><span class="w"> </span><span class="s2">"${templateOption:installMaven}"</span><span class="w">
          </span><span class="p">}</span><span class="w">
     </span><span class="p">},</span><span class="w">
</span><span class="err">//</span><span class="w">	</span><span class="err">...</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

A user tries to add the `java` Template to their project using the supporting tools and selects `17-bullseye` when prompted for `"Specify version of Go"` and the `default` values when prompted for `"Specify version of node, or 'none' to skip node installation"` and `"Install Maven, a management tool for Java"`.


The supporting tool could then use a string replacer for all the files within the sub-directory of the Template. In this example, `.devcontainer.json` needs to be modified and hence, the inputs can provided to it as follows:


```
<span class="p">{</span><span class="w">
  </span><span class="err">imageVariant:</span><span class="s2">"17-bullseye"</span><span class="p">,</span><span class="w">
  </span><span class="err">nodeVersion:</span><span class="w"> </span><span class="s2">"latest"</span><span class="p">,</span><span class="w">
  </span><span class="err">installMaven:</span><span class="w"> </span><span class="s2">"false"</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

The modified `.devcontainer.json` will be as follows:


```
<span class="p">{</span><span class="w">
     </span><span class="nl">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Go"</span><span class="p">,</span><span class="w">
     </span><span class="nl">"image"</span><span class="p">:</span><span class="w"> </span><span class="s2">"mcr.microsoft.com/devcontainers/go:0-17-bullseye"</span><span class="p">,</span><span class="w">
     </span><span class="nl">"features"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
          </span><span class="nl">"ghcr.io/devcontainers/features/node:1"</span><span class="p">:</span><span class="w"> </span><span class="p">{</span><span class="w">
               </span><span class="nl">"version"</span><span class="p">:</span><span class="w"> </span><span class="s2">"latest"</span><span class="p">,</span><span class="w">
               </span><span class="nl">"installMaven"</span><span class="p">:</span><span class="w"> </span><span class="s2">"false"</span><span class="w">
	  </span><span class="p">}</span><span class="w">
     </span><span class="p">},</span><span class="w">
     </span><span class="err">...</span><span class="w">
</span><span class="p">}</span><span class="w">
</span>
```

The modified `.devcontainer.json` would be dropped into any existing folder as a starting point for containerizing your project.



        

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
