<script>
	import "@vscode/codicons/dist/codicons.css";
	import PortTable from "./PortTable.svelte";
	let ports = [];
	window.addEventListener("message", (event) => {
		if (event.data.command === "updatePorts") {
			ports = event.data.ports.sort(
				(a, b) => a.status.localPort - b.status.localPort
			);
		}
	});
	vscode.postMessage({ command: "queryPortData" });
</script>

<main>
	<PortTable {ports} />
</main>

<style>
	@font-face {
		font-family: "yourFont";
		src: url("/fonts/yourFont.woff") format("woff");
	}
</style>
