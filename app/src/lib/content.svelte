<script>
  import params from "../lib/stores/params";
  import { COMFY_HOST, ethnicities, negative_template, positive_template } from "../lib/constants";
  import { seed, seededRandom } from "../lib/utils";
  import inference, { isGenerating } from "../lib/stores/inference";
  import { onMount } from "svelte";
  import Modal from "./modal.svelte";

  let seed_input;
  let is_random_input;

  let progressbar;

  let modal;

  let startTime;
  function timerStart() {
    startTime = new Date();
  }

  function updateProgress(max = 0, value = 0) {
    progressbar.max = max;
    progressbar.value = value;
  }
  onMount(async () => {
    function elapsedTime() {
      if (!startTime) return 0;
      const now = new Date();
      return (now.getTime() - startTime) / 1000;
    }

    let server_address = window.location.hostname + ":" + window.location.port;
    if (process.env.NODE_ENV === "development") {
      server_address = "localhost:8188";
    }

    // const modal = _("#app-modal");

    is_random_input.addEventListener("change", (event) => {
      if (is_random_input.checked) {
        seed_input.disabled = true;
      } else {
        seed_input.disabled = false;
      }
    });

    // WebSocket
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    console.log($inference)
    const socket = new WebSocket(protocol + "//" + server_address + "/ws?clientId=" + $inference.client_id);
    console.log(socket)
    socket.addEventListener("open", (event) => {
      console.log("Connected to the server");
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      if (data.type === "progress") {
        updateProgress(data["data"]["max"], data["data"]["value"]);
      } else if (data.type === "executed") {
        const execution_time = elapsedTime();
        console.log("Execution time: " + execution_time + "s");
        if ("images" in data["data"]["output"]) {
          const images = data["data"]["output"]["images"];
          const grid = images.length > 1 ? ' class="uk-width-1-2"' : "";

          const inferenceResults = [];
          for (let i = 0; i < images.length; i++) {
            const filename = images[i]["filename"];
            const subfolder = images[i]["subfolder"];
            const rand = Math.random();

            const href = `${COMFY_HOST}/view?filename=${filename}&type=output&subfolder=${subfolder}&rand=${rand}`;
            const img = `${COMFY_HOST}/view?filename=${filename}&type=output&subfolder=${subfolder}&rand=${rand}`;
            console.log(href, img)
            inferenceResults.push({ href, img });
          }
          inference.updateResults(inferenceResults);
        }
      } else if (data.type === "execution_interrupted") {
        console.log("Execution Interrupted");
      } else if (data.type === "status") {
        isGenerating.set(data["data"]["status"]["exec_info"]["queue_remaining"] > 0 ? true : false);
        updateProgress();
      }
    });
  });
  async function onRoll() {
    if ($isGenerating) {
      await inference.interrupt();
    } else {
      let wf = structuredClone($inference.workflows["basic_portrait"]);
      let base_steps = 14; // minimum number of steps
      let step_increment = 14; // number of steps multiplied by the quality factor
      let sampler_name = "dpmpp_2m";
      let scheduler = "exponential";
      let CFG = 6.5;

      const style_input = $params.styles;
      let model = style_input.selected;
      let positive = positive_template;
      let negative = negative_template;
      let setting = $params.settings.selected;
      let body_structure = String($params.bodyStructure.value);
      let race = $params.race.selected;
      let race_helper = "";
      let negative_race = "";
      let age = String($params.age.value);
      let gender = String($params.gender.value);
      let negative_gender = "";
      let dndclass = $params.class.selected;
      let gear = $params.armor.selected;
      let haircolor = $params.hairStyle.selected;
      let hairstyle = $params.hairStyle.selected;
      let background = $params.backgrounds.selected;
      let mood = $params.moods.selected;
      let atmosphere = $params.colors.selected;
      let ethnicity_id = $params.ethnicity.selected;
      let custom_prompt = "";
      let ethnic_bias = "";
      let negative_background = "";
      let style = "";
      let nagative_style = "";
      let is_cinematic = false;
      // seed number
      // @REFACTOR
      let rndseed = seed_input.value;
      if (is_random_input.checked) {
        rndseed = seed();
        seed_input.value = rndseed;
      }

      let localrand = seededRandom(rndseed);
      // Style
      if (model.includes("-Cinematic")) {
        style = "film still cinematic photo";
        nagative_style = "illustration, anime, cosplay, ";
        is_cinematic = true;
      } else if (model.includes("-Anime")) {
        style = "anime illustration";
        nagative_style = "photo, fanart, ";
      } else {
        style = "illustration digital painting";
        nagative_style = "photo, anime, ";
      }
      positive = positive.replace("{{STYLE}}", style);
      negative = negative.replace("{{STYLE}}", nagative_style);
      // Setting
      if (setting === "fantasy") {
        positive = positive.replace("{{SETTING}}", "fantasy");
        if (is_cinematic) {
          positive = positive.replace("{{SETTING_HELPER}}", ", (D&D:1.1), Lord of the rings");
        } else {
          positive = positive.replace("{{SETTING_HELPER}}", ", (D&D:1.1), (Lord of the rings:0.8)");
        }
      }
      // Body structure
      if (body_structure == "0") {
        body_structure = "slender ";
      } else if (body_structure == "1") {
        body_structure = "";
        if (race === "halfling" || race === "gnome" || race === "dwarf") {
          body_structure = "stocky ";
        }
      } else if (body_structure == "2") {
        if (gender == "0" || gender == "1") {
          body_structure = "strong muscular ";
        } else {
          body_structure = "strong ";
        }
        if (race === "halfling" || race === "gnome" || race === "dwarf") {
          body_structure = "stocky " + body_structure;
        }
      } else if (body_structure == "3") {
        body_structure = "chubby ";
        if (race === "halfling" || race === "gnome" || race === "dwarf") {
          body_structure = "stocky " + body_structure;
        }
      }
      positive = positive.replace("{{BODY}}", body_structure);
      // Race
      if (race === "human") {
        negative_race = "(elf, long pointy ears:1.2), ";
      } else if (race === "half-elf" || race === "halfling") {
        race_helper = " pointy ears.";
      } else if (race === "elven") {
        // have to use Elven instead of Elf to avoid Christmas contamination
        negative_race = "green, beard, ";
      }
      positive = positive.replace("{{RACE}}", race);
      positive = positive.replace("{{RACE_HELPER}}", race_helper);
      negative = negative.replace("{{RACE}}", negative_race);
      // Age
      if (age == "0") {
        age = "young";
      } else if (age == "1") {
        age = "30yo";
      } else if (age == "2") {
        age = "45yo";
      } else if (age == "3") {
        age = "60yo";
      }
      positive = positive.replace("{{AGE}}", age);
      // Gender
      if (gender == "0") {
        gender = "female";
        negative_gender = "horror, ";
      } else if (gender == "1") {
        gender = "(masculine:1.1) female";
        if (race !== "elven") {
          negative_gender = "beard, ";
        }
      } else if (gender == "2") {
        gender = "(queer:0.9) feminine male";
        negative_gender = "zombie, beard, ";
      } else if (gender == "3") {
        gender = "male";
      }
      positive = positive.replace("{{GENDER}}", gender);
      negative = negative.replace("{{GENDER}}", negative_gender);
      // Class
      positive = positive.replace("{{CLASS}}", dndclass);
      // Gear
      if (gear !== "") {
        gear = " wearing " + gear;
      }
      positive = positive.replace("{{GEAR}}", gear);
      // Hair color and hairstyle
      if (hairstyle === "bald") {
        haircolor = "";
      }
      if (hairstyle === "simple braid hairstyle") {
        if (gender.includes("female")) {
          hairstyle = "(simple braid hairstyle:0.7)";
        } else {
          hairstyle = "simple braid hairstyle";
        }
      }
      if (haircolor !== "") {
        if (hairstyle.includes("{{COLOR}}")) {
          haircolor = " with " + hairstyle.replace("{{COLOR}}", haircolor + " ");
          hairstyle = "";
        } else {
          haircolor = " with " + haircolor + " hair";
        }
      }
      positive = positive.replace("{{HAIR_COLOR}}", haircolor);
      hairstyle = hairstyle.replace("{{COLOR}}", "");
      if (hairstyle !== "") {
        if (haircolor !== "") {
          hairstyle = " and " + hairstyle;
        } else {
          hairstyle = " with " + hairstyle;
        }
      }
      positive = positive.replace("{{HAIRSTYLE}}", hairstyle);
      // Background
      if (background !== "") {
        background = " " + background + ".";
        negative_background = "flat background, ";
      }
      positive = positive.replace("{{BACKGROUND}}", background);
      negative = negative.replace("{{BACKGROUND}}", negative_background);
      // select checkpoint and main workflow
      let is_LCM = model.includes("-LCM") ? true : false;
      let is_Turbo = model.includes("Turbo") ? true : false;
      model = model.replace("-LCM", "");
      model = model.replace("-Anime", "");
      model = model.replace("-Cinematic", "");
      // lower the number of steps for LCM and Turbo models
      if (is_LCM || is_Turbo) {
        base_steps = 4;
        step_increment = 4;
      }
      if (is_LCM) {
        wf = structuredClone($inference.workflows["basic_portrait_lcm"]);
        CFG = 2.5;
        sampler_name = "lcm";
        scheduler = "normal";
      }
      if (is_Turbo) {
        CFG = 2;
      }
      // Atmospere and mood
      if (mood !== "") {
        mood = " " + mood;
        atmosphere = ", " + atmosphere;
      }
      positive = positive.replace("{{MOOD}}", mood);
      positive = positive.replace("{{ATMOSPHERE}}", atmosphere);
      // Ethnicity
      if (ethnicity_id !== "") {
        let ethnic1, ethnic2, mainArea1, mainArea2;
        if (ethnicity_id === "0") {
          let keys = Object.keys(ethnicities);
          mainArea1 = ethnicities[keys[Math.floor(localrand() * keys.length)]];
          mainArea2 = ethnicities[keys[Math.floor(localrand() * keys.length)]];
        } else {
          mainArea1 = ethnicities[ethnicity_id];
          mainArea2 = ethnicities[ethnicity_id];
        }
        ethnic1 = mainArea1[Math.floor(localrand() * mainArea1.length)];
        ethnic2 = mainArea2[Math.floor(localrand() * mainArea2.length)];
        while (ethnic1 === ethnic2) {
          ethnic2 = mainArea2[Math.floor(localrand() * mainArea2.length)];
        }
        console.log("Ethnicity: " + ethnic1 + ", " + ethnic2);
        ethnic_bias = "(" + ethnic1 + ", " + ethnic2 + ":0.7) ";
      }
      positive = positive.replace("{{ETHNICITY}}", ethnic_bias);
      // model specific settings
      if (model === "DreamShaperXLTurboV2") {
        sampler_name = "dpmpp_sde";
        // Activate CFGRescale for DreamShaperXLTurboV2 that really doesn't want to listen otherwise
        wf["14"] = {
          inputs: {
            multiplier: 0.7,
            model: ["1", 0],
          },
          class_type: "RescaleCFG",
          _meta: {
            title: "RescaleCFG",
          },
        };
        wf["7"]["inputs"]["model"] = ["14", 0];
        CFG = 4;
        base_steps = 6;
        scheduler = "karras";
      }
      // custom input
      if (custom_prompt !== "") {
        wf["20"] = {
          inputs: {
            width: 1024,
            height: 1024,
            size_cond_factor: 4,
            text: custom_prompt.replace(/(\r\n|\n|\r)/gm, " "),
            clip: ["1", 1],
          },
          class_type: "CLIPTextEncodeSDXL+",
          _meta: {
            title: "🔧 SDXLCLIPTextEncode",
          },
        };
        wf["21"] = {
          inputs: {
            conditioning_to: ["20", 0],
            conditioning_from: ["4", 0],
          },
          class_type: "ConditioningConcat",
          _meta: {
            title: "Conditioning (Concat)",
          },
        };
        wf["7"]["inputs"]["positive"] = ["21", 0];
      }
      // update the workflow with the selected parameters
      wf["1"]["inputs"]["ckpt_name"] = $inference.available_checkpoints[model];
      wf["7"]["inputs"]["sampler_name"] = sampler_name;
      wf["7"]["inputs"]["scheduler"] = scheduler;
      wf["7"]["inputs"]["seed"] = rndseed;
      wf["7"]["inputs"]["steps"] = base_steps + Math.round($params.quality.value * step_increment);
      wf["7"]["inputs"]["cfg"] = CFG;
      wf["6"]["inputs"]["batch_size"] = $params.batchSize.value;
      wf["4"]["inputs"]["text"] = positive;
      wf["5"]["inputs"]["text"] = negative;
      timerStart();
      let response = await inference.queue_prompt(wf);
      wf = null;
      if ("error" in response) {
        updateProgress();
        // _("#modal-message").innerHTML = response["error"]["message"];
        // @ts-ignore
        UIkit.modal(modal).show();
        console.log("Error: " + response["error"]["message"]);
      }
    }
  }
</script>

<Modal bind:modal />
<div id="content" class="uk-light" data-uk-height-viewport="expand: true">
  <progress bind:this={progressbar} id="main-progress" class="progress" value="0" max="0"></progress>

  <div class="uk-text-center uk-container uk-container-expand">
    <form>
      <button on:click={onRoll} id="roll" class="uk-button uk-button-danger" type="button"
        >{#if $isGenerating}<span id="main-spinner" uk-spinner="ratio: 0.7"></span><span
            id="roll-icon"
            uk-icon="icon: bolt"
          ></span>{/if}&nbsp;Roll</button
      ><input
        bind:this={seed_input}
        id="main-seed"
        class="uk-input"
        type="text"
        placeholder="Seed"
        aria-label="Seed"
        value="0"
      /><label
        >Random <input bind:this={is_random_input} id="is-random" class="uk-checkbox" type="checkbox" checked /></label
      >
    </form>
  </div>

  <div class="uk-child-width-expand uk-text-center" uk-grid uk-lightbox>
    {#each $inference.results as { href, img }}
      <div class={$inference.results.length > 1 ? "uk-width-1-2" : ""}>
        <a {href} data-type="image"><img src={img} width="1024" height="1024" alt="" /></a>
      </div>
    {/each}
  </div>
</div>
