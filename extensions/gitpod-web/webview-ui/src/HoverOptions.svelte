<script>
	import { createEventDispatcher } from "svelte";
	import {
		provideVSCodeDesignSystem,
		vsCodeButton,
	} from "@vscode/webview-ui-toolkit";
	provideVSCodeDesignSystem().register(vsCodeButton());

	export let options = [{ icon: "copy", command: "copy", title: "Copy Url" }];

	const dispatch = createEventDispatcher();
	function clickOption(command) {
		dispatch("command", { command });
	}
</script>

<main>
	<div class="container">
		<div class="slot">
			<slot />
		</div>
		<span class="hide">
			{#each options as opt}
				{#if opt.icon != null}
					<span
						title={opt.title}
						class="svg-container"
						on:click={(e) => clickOption(opt.command)}
					>
						<vscode-button appearance="icon" aria-label={opt.title}>
							<span class={"codicon codicon-" + opt.icon} />
						</vscode-button>
					</span>
				{/if}
			{/each}
		</span>
	</div>
</main>

<style>
	.hide {
		display: none;
		flex: none;
		padding-left: 4px;
		box-sizing: border-box;
		align-content: center;
	}

	.slot {
		flex: 0 1 auto;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-flex;
		align-content: center;
	}

	.container {
		display: flex;
		justify-content: space-between;
	}

	.hide:hover,
	.container:hover > .hide {
		display: inline-flex;
	}
	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 16px;
	}
</style>
