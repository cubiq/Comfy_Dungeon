<script>
  import RangeValue from "./range-value.svelte";
  import SelectValue from "./select-value.svelte";
  import params from "./stores/params";
</script>

<aside id="left-col" class="uk-light uk-visible@m">
  <h4 class="uk-text-center uk-margin-remove-vertical text-light">Comfy Dungeon<small><sup> v0.1.1</sup></small></h4>
  <div class="left-content-box left-nav-wrap">
    <form class="uk-grid-small">
      <div uk-accordion="collapsible: false">
        <div>
          <a class="uk-accordion-title" href>Generation params</a>

          <div class="uk-accordion-content uk-grid-small" uk-grid>
            <RangeValue label="Quality" props={$params.quality} bottomLabels={["Speed", "Accuracy"]} />
            <RangeValue
              label="Results per generation"
              props={$params.batchSize}
              bottomLabels={$params.batchSize.values}
            />

            <SelectValue label="Preset" props={$params.styles} />
          </div>
        </div>

        <div>
          <a class="uk-accordion-title" href>Scene</a>

          <div class="uk-accordion-content uk-grid-small" uk-grid>
            <SelectValue label="Setting" props={$params.settings} size="half-width" />
            <SelectValue label="Background" props={$params.backgrounds} size="half-width" />
            <SelectValue label="Mood" props={$params.moods} size="half-width" />
            <SelectValue label="Color" props={$params.colors} size="half-width" />

            <!-- <label class="uk-form-label" for="atmosphere-input">Color hint</label>
              <button uk-icon="icon: question" type="button"></button>
              <div class="uk-card uk-card-small uk-card-body uk-card-default" uk-drop="pos: right-top; mode: click;">
                The picture will have a predominant color.
              </div> -->
          </div>
        </div>

        <div>
          <a class="uk-accordion-title" href>Character</a>

          <div class="uk-accordion-content uk-grid-small" uk-grid>
            <RangeValue label="Gender" props={$params.gender} bottomLabels={["Femininity", "Masculinity"]} />
            <!-- <button uk-icon="icon: question" type="button"></button>
            <div class="uk-card uk-card-small uk-card-body uk-card-default" uk-drop="pos: right-top; mode: click;">
              Femininity/Masculinity slider trait is tentative, the result may not be what you expect.
            </div> -->
            <RangeValue label="Age" props={$params.age} bottomLabels={["Young", "Old"]} />
            <RangeValue label="Body Structure" props={$params.bodyStructure} bottomLabels={["Slender", "Chubby"]} />

            <div class="width-1-2@s"></div>

            <SelectValue label="Race" props={$params.race} size="half-width" />
            <SelectValue label="Ethnic Bias" props={$params.ethnicity} size="half-width" />
            <!-- <button uk-icon="icon: question" type="button"></button>
              <div class="card card-small card-body card-default" uk-drop="pos: right-top; mode: click;">
                Adds a random ethnicity to the character based on the area selected. It's a light conditioning that
                helps making the generations more interesting; it doesn't guarantee an exact nationality.
              </div>-->
            <SelectValue label="Class" props={$params.class} size="half-width" />
            <SelectValue label="Clothing/Armor" props={$params.armor} size="half-width" />
            <SelectValue label="Hair Style" props={$params.hairStyle} size="half-width" />
            <!-- <button uk-icon="icon: question" type="button"></button>
            <div class="uk-card uk-card-small uk-card-body uk-card-default" uk-drop="pos: right-top; mode: click;">
              Please note that some hairstyles work better (or at all) with a specific gender and/or ethnicity.
            </div> -->

            <SelectValue label="Hair Color" props={$params.hairColor} size="half-width" />
          </div>
        </div>

        <div>
          <a class="uk-accordion-title" href>Custom</a>

          <div class="uk-accordion-content uk-grid-small" uk-grid>
            <div class="uk-width-1-1@s">
              <label class="uk-form-label" for="custom-input">Custom prompt</label>
              <button uk-icon="icon: question" type="button"></button>
              <div class="uk-card uk-card-small uk-card-body uk-card-default" uk-drop="pos: right-top; mode: click;">
                Keep it simple. Don't be too discoursive, write the element that you'd want to add. Eg: "red scarf" or
                "silver tiara". You might need to add strength with the syntax "(silver tiara:1.2)".<br />If the element
                is generic and could be misinterpreted try to give context. Eg: instead of "crown" try with "wearing a
                silver crown on his head".
              </div>
              <div class="uk-form-controls">
                <textarea
                  name="custom-input"
                  class="uk-textarea"
                  id="custom-input"
                  rows="3"
                  placeholder="Add a custom element"
                  aria-label="Textarea"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</aside>
