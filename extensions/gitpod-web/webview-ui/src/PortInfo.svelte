<script>
	export let port = {};

	$: title = port.status.name || port.status.localPort.toString();

	$: showPortDetail =
		port.status.remotePort != null &&
		port.info.localPort !== port.status.remotePort;

	function getPortInfo(port) {
		if (showPortDetail) {
			return title === port.status.name
				? ` (${port.status.localPort}:${port.status.remotePort})`
				: ` :${port.status.remotePort}`;
		} else {
			return title === port.status.name ? `(${port.status.localPort})` : "";
		}
	}
	$: portDetail = getPortInfo(port);

</script>

<main>
	<div class="container" title={port.info.tooltip}>
		<span class="title">{title}</span>
		<span class="port-detail">{portDetail}</span>
	</div>
</main>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	span {
		display: inline-block;
	}
	.title {
		flex: 0 1 auto;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.port-detail {
		display: inline-block;
	}
</style>
