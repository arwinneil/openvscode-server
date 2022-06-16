<script>
	import { createEventDispatcher } from "svelte";
	import HoverOptions from "./HoverOptions.svelte";

	export let port = {};

	$: isPrivate = port.status?.exposed.visibility !== 1;

	const makePrivateOption = {
		icon: "lock",
		command: "makePrivate",
		title: "Make Private",
	};
	const makePublicOption = {
		icon: "unlock",
		command: "makePublic",
		title: "Make Public",
	};

	$: hoverOpts = [
		{ icon: "copy", command: "urlCopy", title: "Copy Url" },
		isPrivate ? makePublicOption : makePrivateOption,
		{ icon: "globe", command: "openBrowser", title: "Open in Browser" },
		{ icon: "open-preview", command: "preview", title: "Open in Preview" },
	];
	const dispatch = createEventDispatcher();
	function onHoverCommand(event) {
		const { command } = event.detail;
		dispatch("hoverCommand", { command, port });
	}
</script>

<HoverOptions options={hoverOpts} on:command={onHoverCommand}>
	<a href={port.status.exposed.url}>{port.status.exposed.url}</a>
</HoverOptions>

<style>
	a {
		color: var(--vscode-foreground);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}
	a:focus {
		outline: none;
	}
</style>
