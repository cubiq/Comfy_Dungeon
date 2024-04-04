<script>
    export let modal;
</script>

<div bind:this={modal} id="app-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">An error occurred</h2>
    <p id="modal-message"></p>
    <p class="uk-text-center">
      <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
    </p>
  </div>
</div>
