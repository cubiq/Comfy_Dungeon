<script>
  import params from "./stores/params";

  /** @type {RangeParam} */
  export let props;
  const { key, value, min, max, step, values } = props;

  /** @type {string}*/
  export let label;

  /** @type {any[]}*/
  export let bottomLabels;

  function onChange(event) {
    params.updateSelected(key, event.target.value);
  }

  const isBottomLabelArrows = bottomLabels.length === 2;
</script>

<div class="uk-width-1-2@s">
  <label class="uk-form-label" for="{key}-input">{label}</label>
  <input on:change={onChange} class="uk-range" id="{key}-input" type="range" {value} {min} {max} {step} aria-label="Range" />
  {#if isBottomLabelArrows}
  <div class="uk-form-label uk-text-muted" uk-grid>
    <div class="uk-width-1-2@s"><span uk-icon="icon: arrow-left"></span>{bottomLabels[0]}</div>
    <div class="uk-width-1-2@s" style="text-align:right;">
      {bottomLabels[1]}<span uk-icon="icon: arrow-right"></span>
    </div>
  </div>
  {/if}

  {#if !isBottomLabelArrows}
  <datalist id="batch-size-values" class="uk-form-label uk-text-muted">
    {#each bottomLabels as value, i}
      <option {value} label={String(i + 1)}></option>
    {/each}
  </datalist>
  {/if}
</div>
