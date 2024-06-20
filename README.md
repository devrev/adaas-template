# ADaaS Template

This GitHub repository provides a template with example code to implement an Airdrop as a Service (ADaaS) Snap-in .

## Prerequisites

1\. Install [DevRev CLI](https://developer.devrev.ai/snapin-development/references/cli-install) by following the instructions as per the Operating System.

2\. Install [jq](https://jqlang.github.io/jq/download/).


## Build, Deploy and Run

1\. Clone Repository:

- Either clone this repository or create a new repository from it by clicking the "Use this template" button above.
- Set the desired repository name for your own copy (e.g., `airdrop-<external system>-snapin`).

2\. Open the project in your IDE and set up project environment variables, by following these steps:

- Rename `Makefile.variable.example` to `Makefile.variable`.
- In `Makefile.variable` set the slug of your organization, and your email.

3\. Update `manifest.yaml`:

- Modify the `allowed_connection_types` field in the `imports` section to match your Snap-in's connection type.

NOTE: The current manifest demonstrates usage with a dynamic keyring (Basic Freshdesk Connection) as an example. If you're testing with basic Freshdesk dynamic keyring, you can leave it as is. Otherwise, update this field with the appropriate connection type configuration.

4\. Build the Snap-in using the following command:

```bash
make build
```

5\. Deploy the Snap-in to the organization:

```bash
make deploy
```

NOTE: This process may take some time. Command authenticates you to the org using the DevRev CLI, prompts you to select the keyring where you saved GitHub PAT and creates a Snap-in package, its Snap-in version, and finally the Snap-in draft.

6\. After the Snap-in draft is created, install the Snap-in in the DevRev UI (`Settings` -> `Snap-ins` -> `Install snap-in`).

7\. Start the import (`Imports` -> `Start import` -> `<your Snap-in>`).

## Common Pitfalls

#### Q: `Conflict` error after the `Creating snap-in package...` output during `make deploy`.

    A: Snap-in package with the same slug already exists. Override the `SNAP_IN_SLUG` variable by explicitly updating the variable in `scripts/vars.sh`.

#### Q: Snap-in version `build/deployment failed` after the `Waiting for snap-in version to be ready...` message

    A: The snap-in version could not be built. Check the logs by running the DevRev CLI command `devrev snap_in_package logs`. For prettier UI, pipe the output to `jq`
