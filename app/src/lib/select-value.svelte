<script>
  import params from "./stores/params";

  /** @type {SelectParam} */
  export let props;
  const { key, options, selected } = props;

  /** @type {string} */
  export let label;
  /** @type {'full-width' | 'half-width'}*/
  export let size = "full-width";

  function onChange(event) {
    params.updateSelected(key, event.target.value);
  }

  const sizeClass = size === "full-width" ? "uk-width-1-1@s" : "uk-width-1-2@s";
</script>

<div class={sizeClass}>
  <label class="uk-form-label" for="{key}-input">{label}</label>
  <div class="uk-form-controls">
    <select on:change={onChange} class="uk-select" id="{key}-input" aria-label="Select">
      {#each options as option}
        <option value={option.value} selected={option.value === selected}>{option.label}</option>
      {/each}
    </select>
  </div>
</div>
