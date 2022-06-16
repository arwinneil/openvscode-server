<script>
	import {
		provideVSCodeDesignSystem,
		vsCodeDataGrid,
		vsCodeDataGridCell,
		vsCodeDataGridRow,
	} from "@vscode/webview-ui-toolkit";
	import ContextMenu from "./ContextMenu.svelte";
	import PortInfo from "./PortInfo.svelte";
	import PortStatus from "./PortStatus.svelte";
	import PortLocalAddress from "./PortLocalAddress.svelte";

	provideVSCodeDesignSystem().register(
		vsCodeDataGrid(),
		vsCodeDataGridCell(),
		vsCodeDataGridRow()
	);

	export let ports = [];
	let menuData = {
		x: 0,
		y: 0,
		showMenu: false,
		port: undefined,
	};

	async function onRightClick(event, port) {
		if (menuData.showMenu) {
			menuData.showMenu = false;
			await new Promise((res) => setTimeout(res, 100));
		}
		const { x, y } = event;
		menuData.x = x;
		menuData.y = y;
		menuData.port = port;
		menuData.showMenu = true;
	}

	function closeMenu() {
		menuData.showMenu = false;
	}

	let currentSelectPort = undefined;

	function menuCommand(event) {
		const { command, port } = event.detail;
		vscode.postMessage({
			command,
			port,
		});
		closeMenu();
	}

	let tableHovered = false;

	setTimeout(() => {
		makeTableResizable();
	}, 2000);

	const headers = ["", "Port", "Address", "Description", "State"];
</script>

<main>
	<ContextMenu
		{...menuData}
		on:clickoutside={closeMenu}
		on:command={menuCommand}
	/>

	<vscode-data-grid
		class="table"
		id="table"
		grid-template-columns="40px 180px 1fr 180px 180px"
		class:table-hover={tableHovered}
		on:mouseenter={() => (tableHovered = true)}
		on:mouseleave={() => (tableHovered = false)}
	>
		<vscode-data-grid-row class="tr" row-type="sticky-header">
			{#each headers as header, i (i)}
				<vscode-data-grid-cell
					class="th"
					cellType="columnheader"
					grid-column={i + 1}>{header}</vscode-data-grid-cell
				>
			{/each}
		</vscode-data-grid-row>
		{#each ports as port, i (port.status.localPort)}
			<vscode-data-grid-row
				class="tr tr-data"
				on:contextmenu|preventDefault={(event) => onRightClick(event, port)}
			>
				<vscode-data-grid-cell
					class="td"
					grid-column="1"
					class:served={port.status.served}
					style="text-align: center"
				>
					<PortStatus status={port.info.iconStatus} />
				</vscode-data-grid-cell>

				<vscode-data-grid-cell class="td" grid-column="2">
					<PortInfo {port} />
				</vscode-data-grid-cell>

				<vscode-data-grid-cell class="td" grid-column="3">
					{#if (port.status.exposed?.url.length ?? 0) > 0}
						<PortLocalAddress on:hoverCommand={menuCommand} {port} />
					{/if}
				</vscode-data-grid-cell>

				<vscode-data-grid-cell class="td" grid-column="4">
					<span title={port.status.description}>{port.status.description}</span>
				</vscode-data-grid-cell>

				<vscode-data-grid-cell class="td" grid-column="5">
					<span title={port.info.description}>{port.info.description}</span>
				</vscode-data-grid-cell>
			</vscode-data-grid-row>
		{/each}
	</vscode-data-grid>
</main>

<style>
	.table {
		width: 100%;
		height: 100%;
		font-size: 13px;
	}
	.td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.th {
		font-weight: bold;
	}

	.tr-data:nth-child(odd) {
		background-color: var(--vscode-tree-tableOddRowsBackground);
	}
	.tr-data:hover {
		background-color: var(--vscode-list-hoverBackground);
	}
</style>
