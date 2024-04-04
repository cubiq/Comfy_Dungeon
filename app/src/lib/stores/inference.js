import { get, writable } from "svelte/store";
import { uuidv4 } from "../utils";
import { COMFY_HOST } from "../constants";

const isGenerating = writable(false);

function inferenceStore() {
  const inference = writable({
    client_id: uuidv4(),
    workflows: {},
    available_checkpoints: {},
    results: [],
  });
  const { subscribe, set, update } = inference
  // Preload all API workflows
  async function load_api_workflows() {
    let wf = {
      basic_portrait: "/workflows/basic_portrait.json",
      basic_portrait_lcm: "/workflows/basic_portrait_lcm.json",
    };

    for (let key in wf) {
      let response = await fetch(wf[key]);
      wf[key] = await response.json();
    }

    return wf;
  }

  async function get_checkpoints() {
    let response = await fetch(COMFY_HOST + "/object_info/CheckpointLoaderSimple", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    let checkpoints = response["CheckpointLoaderSimple"]["input"]["required"]["ckpt_name"][0];
    const checkpoints_regex = {
      DreamShaperXLTurboV2: /.*dreamshaper.*xl.*turbo.*v2.*\.safetensors$/gi,
      "ProteusV0.3": /.*proteus.*0\.3.*\.safetensors$/gi,
    };
    let available_checkpoints = {};

    for (let key in checkpoints_regex) {
      available_checkpoints[key] = "";

      checkpoints.forEach((ckpt) => {
        if (checkpoints_regex[key].test(ckpt)) {
          available_checkpoints[key] = ckpt;
        }
      });
    }
    return available_checkpoints;
  }

  async function queue_prompt(prompt = {}) {
    isGenerating.set(true);
    const data = { prompt: prompt, client_id: get(inference).client_id };

    const response = await fetch(COMFY_HOST + "/prompt", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  }

  async function interrupt() {
    const response = await fetch(COMFY_HOST + "/interrupt", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/html",
      },
    });
    return await response.json();
  }

  return {
    init: async () => {
      const workflows = await load_api_workflows();
      const available_checkpoints = await get_checkpoints();
    //   update({ workflows, client_id, available_checkpoints, results: [] });
      update((state) => {
        state.workflows = workflows;
        state.available_checkpoints = available_checkpoints;
        return state;
      });
    },
    updateResults: (results) => {
      update((state) => {
        state.results = results;
        return state;
      });
    },
    interrupt,
    queue_prompt,
    subscribe,
  };
}

export default inferenceStore();
export { isGenerating };
