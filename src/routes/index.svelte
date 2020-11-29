<script>
  import {
		DataTable,
		Modal,
    OverflowMenu,
		OverflowMenuItem,
		Toolbar,
    ToolbarContent,
    Button,
	} from "carbon-components-svelte";
	import { onMount } from "svelte";

  const headers = [
    { key: "name", value: "Name" },
    { key: "port", value: "Port" },
    { key: "rule", value: "Rule" },
    { key: "overflow", empty: true },
	];

	const initialModalData = {
		id: null,
		name: null,
		port: null,
		rule: null
	};

  let rows = [];

	let isModalVisible = false;

	let modalData = initialModalData;

	onMount(async () => {
		try {
			const res = await fetch('balancer.json');
			const balancers = await res.json();

			rows = balancers;
		} catch (err) {
			console.log(err)
		}
	});

	function onModalSubmit() {
		fetch('balancer.json', {
			method: modalData.id == null? 'POST': 'PUT',
			body: JSON.stringify(modalData),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(result => {
				alert(result?.message);
				onModalClosed();
			})
			.catch(err => console.log(`${modalData.id == null? 'POST': 'PUT'} error`, err.message));
	}

	function onModalClosed() {
		modalData = initialModalData;
		isModalVisible = false;
	}

	function onBalancerDelete(rowData) {
		if (rowData.hasOwnProperty("id")) {
			fetch('balancer.json', {
				method: 'DELETE',
				body: JSON.stringify({ id: rowData.id }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(result => alert(result?.message))
				.catch(err => console.log('DELETE error', err.message));
		}
	}
</script>

<DataTable sortable {headers} {rows}>
	<Toolbar>
    <ToolbarContent>
      <Button on:click={() => (isModalVisible = true)}>
				Create balancer
			</Button>
    </ToolbarContent>
  </Toolbar>
  <span slot="cell" let:cell let:row>
    {#if cell.key === 'overflow'}
      <OverflowMenu flipped>
				<OverflowMenuItem
					text="Edit"
					on:click={() => {
						modalData = row
						isModalVisible = true
					}}
				/>
				<OverflowMenuItem
					danger
					on:click={() => onBalancerDelete(row)}
					text="Delete"
				/>
      </OverflowMenu>
    {:else}{cell.value}{/if}
  </span>
</DataTable>

<Modal
  bind:open={isModalVisible}
  modalHeading="Balancer data"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={onModalClosed}
  on:open
  on:close={onModalClosed}
  on:submit={onModalSubmit}
>
	<input type="text" placeholder="name" name="name" id="name" bind:value={modalData.name}>
	<input type="text" placeholder="port" name="port" id="port" bind:value={modalData.port}>
	<input type="text" placeholder="rule" name="rule" id="rule" bind:value={modalData.rule}>
</Modal>