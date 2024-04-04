<script>
  import { onMount } from "svelte";
  import Content from "./lib/content.svelte";
  import LeftSide from "./lib/left-side.svelte";
  import inference from "./lib/stores/inference";

  onMount(async () => {
    inference.init();
  });
</script>

<LeftSide />
<Content />
