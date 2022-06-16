<script>
	import "@vscode/codicons/dist/codicon.css";
	// Served | NotServed | Detecting | ExposureFailed
	export let status = "NotServed";

	const fillArr = ["Detecting", "Served"];
	$: circleFill = fillArr.includes(status);
</script>

<main>
	<div class="container">
		{#if status === "ExposureFailed"}
			<i class="codicon codicon-warning ExposureFailed"></i>
		{:else}
			{#if circleFill}
			<i class={"codicon codicon-circle-filled " + status}></i>
			{:else}
			<i class={"codicon codicon-circle-outline " + status}></i>
			{/if}
		{/if}
	</div>
</main>


<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.Served {
		color: var(--vscode-ports-iconRunningProcessForeground);
	}
	.NotServed {
		color: var(--vscode-foreground);
	}
	.Detecting {
		color: var(--vscode-editorWarning-foreground);
	}
	.ExposureFailed {
		color: var(--vscode-editorWarning-foreground);
	}
</style>
