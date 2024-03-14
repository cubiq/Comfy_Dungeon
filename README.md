# Comfy Dungeon
Build D&D Character Portraits with ComfyUI.

**IMPORTANT:** At the moment this is mostly a tech demo to show how to build a web app on top of ComfyUI. The code is *very* messy and the application doesn't guaratee consistent results.

Please let me know your thoughs and if you would like this repository to be implemented and expanded into a more feature rich application.

![Comfy Dungeon](./comfy_dungeon.jpg)

## Installation

Download or git clone this repository in the ComfyUI `custom_nodes` directory. You then can access it going to the URL: `http://[comfy address]:[comfy port]/dungeon`.

This extension requires the following checkpoints:

- [Proteus V0.3](https://huggingface.co/dataautogpt3/ProteusV0.3/resolve/main/ProteusV0.3.safetensors?download=true) (doesn't work with other versions)
- [DreamShaperTurbo v2.x](https://huggingface.co/Lykon/dreamshaper-xl-v2-turbo/resolve/main/DreamShaperXL_Turbo_v2_1.safetensors?download=true) (only needed for the "cinematic" results, not needed for illustrations)
- [SDXL LCM Lora](https://huggingface.co/latent-consistency/lcm-lora-sdxl/resolve/main/pytorch_lora_weights.safetensors?download=true).


**Important:** The LORA needs to be renamed to `lcm-lora-sdxl.safetensors` or you can set your own name in the `web/js/basic_portrait_lcm.json` by changing the  `"lora_name": "[FILENAME HERE]"` value at the top of JSON.
